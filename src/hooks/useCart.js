import React from 'react'
import { createState, useState } from '@hookstate/core'

import {
	getCartItems as getCartItemsApi,
	addToCart as addToCartApi,
	removeFromCart as removeFromCartApi,
	updateCart as updateCartApi,
	emptyCart as emptyCartApi,
} from 'endpoints/cart'
import useAuthentication from './useAuthentication'
import alert from 'core/alert'

const CART_STATE = createState([])

export default () => {
	const { user } = useAuthentication()
	const [isFetching, setIsFetching] = React.useState(false)

	const cartState = useState(CART_STATE)
	const cartItems = cartState.get()

	const getCartItems = async () => {
		setIsFetching(true)
		const res = await getCartItemsApi(user?.email)
		const items = await res.json()
		cartState.set(items)
		setIsFetching(false)
	}

	const addToCart = async data => {
		if (!user.email) {
			return alert.error({ message: 'Login to continue' })
		}

		const response = await addToCartApi(user.email, data.variant_id)
		if(response.ok) {
  		const cartItem = await response.json()
		  cartState.set(prevItems => prevItems.concat(cartItem))
		}
	}

	const removeFromCart = async variant_id => {
		const response = await removeFromCartApi(user.email, variant_id)
		if(response.ok) {
  		cartState.set(prevItems => prevItems.filter((item) => item.variant_id.toString() !== variant_id.toString()))
		}
	}

	const updateCart = async ({ id, quantity }) => {
		const userId = user?.id
		await updateCartApi(userId, id, { quantity })
		cartState.set(prevItems => prevItems.map(item => item.variantId === id ? {
			...item,
			quantity
		} : item))
	}

	const emptyCart = async () => {
		const response = await emptyCartApi(user.email)
		if(response.ok) {
	    cartState.set([])
		}
	}

	const saveForLater = async id => {
		const userId = user?.id
		await updateCartApi(userId, id, { forLater: true })
		cartState.set(prevItems => prevItems.map(item => item.variantId === id ? {
			...item,
			forLater: true
		} : item))
	}

	const backToCart = async id => {
		const userId = user?.id
		await updateCartApi(userId, id, { forLater: false })
		cartState.set(prevItems => prevItems.map(item => item.variantId === id ? {
			...item,
			forLater: false
		} : item))
	}

	return React.useMemo(
		() => ({
			cartItems,
			getCartItems,
			saveForLater,
			backToCart,
			addToCart,
			removeFromCart,
			emptyCart,
			updateCart,
			isFetching,
		}),
		[user],
	)
}
