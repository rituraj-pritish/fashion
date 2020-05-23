import produce from 'immer'

import { firebase, db } from 'services/firebase'
import setAlert from 'setAlert'
import { setAppLoading } from 'redux/app'
import { setCartIds } from 'redux/cart'
import { setWishlistIds } from 'redux/wishlist'

// types

const AUTH_REQUEST = 'AUTH_REQUEST'
const AUTH_FAILURE = 'AUTH_FAILURE'
const AUTH_SUCCESS = 'AUTH_SUCCESS'

// action creators

export const signup = data => async dispatch => {
  dispatch({ type: AUTH_REQUEST })

  const { email, password, name, phone } = data
  try {
    const res = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)

    const userPayload = {
      name,
      phone,
      id: res.user.id,
      email
    }

    if (res.user.uid) {
      db.collection('users').doc(res.user.uid).set(userPayload)
    }

    dispatch({ type: AUTH_SUCCESS, payload: userPayload })
    setAlert('Sign up successful', 'success')
  } catch (err) {
    dispatch({ type: AUTH_FAILURE, payload: err })
    setAlert(err.message, 'danger')
  }
}

export const signin = ({ email, password }) => async dispatch => {
  dispatch({ type: AUTH_REQUEST })
  try {
    const res = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)

    let user
    if (res.user.uid) {
      user = await db.collection('users').doc(res.user.uid).get()
    }

    const userData = user.data()

    if (user) {
      setAlert('Sign in successful', 'success')
      dispatch({ type: AUTH_SUCCESS, payload: userData() })

      if (userData.cart.length) {
        dispatch(setCartIds(userData.cart))
      }

      if (userData.wishlist.length) {
        dispatch(setWishlistIds(userData.wishlist))
      }
    }
  } catch (err) {
    dispatch({ type: AUTH_FAILURE })
    if (
      err.code === 'auth/invalid-email' ||
      err.code === 'auth/wrong-password'
    ) {
      setAlert('Wrong Credentials', 'danger')
    } else {
      setAlert(err.message, 'danger')
    }
  }
}

export const authStateChangeHandler = () => async dispatch => {
  firebase.auth().onAuthStateChanged(async user => {
    if (user) {
      const res = await db.collection('users').doc(user.uid).get()

      dispatch({
        type: AUTH_SUCCESS,
        payload: res.data()
      })
      dispatch(setAppLoading(false))
    } else {
      dispatch(setAppLoading(false))
    }
  })
}

export const signOut = () => async dispatch => {
  try {
    await firebase.auth().signOut()
    localStorage.clear()
    setAlert('Sign out successful', 'success')
  } catch (err) {}
  dispatch({ type: AUTH_FAILURE })
}

//reducer

const initialState = {
  user: null,
  isLoading: false,
  isAuthenticated: false
}

export default (state = initialState, { type, payload }) =>
  produce(state, draft => {
    //eslint-disable-next-line
    switch (type) {
      case AUTH_REQUEST:
        draft.isLoading = true
        draft.isAuthenticated = false
        draft.user = null
        break
      case AUTH_SUCCESS:
        draft.isLoading = false
        draft.isAuthenticated = true
        draft.user = payload
        break
      case AUTH_FAILURE:
        draft.isLoading = false
        draft.isAuthenticated = false
        draft.user = null
        break
    }
  })
