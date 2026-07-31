import React from 'react'
import { createState, useState } from '@hookstate/core'
import { useHistory } from 'react-router-dom'

import { db, firebase } from 'core/firebase'
import fetch from 'core/fetch'

const INITIAL_STATE = {
	isAuthenticated: false,
	user: null
}

const AUTH_STATE = createState(INITIAL_STATE)

export default () => {
	const history = useHistory()
	const authState = useState(AUTH_STATE)

	const signup = async (data, goBack) => {
    const response = await fetch('/authentication', {
      method: 'post',
      headers: {
            'content-type': 'application/json'
      },
      body: JSON.stringify({
            ...data,
            type: 'register'
      })
    })
    const user = response.json()

    if(response.ok) {
 			authState.set({
				user: user,
				isAuthenticated: true
			})
      goBack()
    }
	}

	const signin = async (data, goBack) => {
  	const response = await fetch('/authentication', {
      method: 'post',
      headers: {
            'content-type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    const user = response.json()

    if(response.ok) {
   			authState.set({
       	user: user,
       	isAuthenticated: true
      })
      goBack()
    }
	}

	const authStateChangeHandler = async () => {
		const response = await fetch('/authentication', {
		  credentials: 'same-origin'
		})
		if(response.ok) {
      const user = await response.json()
			authState.set({
        user: user,
				isAuthenticated: true
			})
		} else {
      authState.set(INITIAL_STATE)
		}
	}

	const resetPassword = async ({ email }) => {
		const user = await db.collection('users').where('email', '==', email).get()

		if (!user.docs.length) {
			throw new Error('The email is not registered')
		}

		await firebase.auth().sendPasswordResetEmail(email)
	}

	const signOut = async () => {
		const response = await fetch('/authentication', {
		  method: 'put',
			credentials: 'same-origin'
		})
		if(response.ok) {
		  authState.set(INITIAL_STATE)
		  history.push('/')
		}
	}

	const updateUserDetails = async data => {
		const userId = authState.user.id
		await db.collection('users').doc(userId).update(data)
	}

	return React.useMemo(() => ({
		...authState.get(),
		signup,
		signin,
		authStateChangeHandler,
		updateUserDetails,
		resetPassword,
		signOut
	}), [authState])
}
