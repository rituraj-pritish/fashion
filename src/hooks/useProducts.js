import React from 'react'
import { createState, useState } from '@hookstate/core'

import { db } from 'core/firebase'
import fetch from 'core/fetch'

const PRODUCTS_STATE = createState(null)

export default () => {
	const productsState = useState(PRODUCTS_STATE)

	const getProducts = React.useCallback(async () => {
		const res = await fetch('/products')
		const products = res.json()
		return products
	})

	const products = productsState.get()

	const setProducts = (productsArray) => {
    productsState.set(productsArray)
	}

	const getProduct = productId => {
		if(!productId) throw new Error('product id is required')
		return products.find(({ id }) => id.toString() === productId.toString())
	}

	const updateProductRating = async (
		productId,
		rating,
		remove = false
	) => {
		try {
			const product = await (
				await db.collection('products').doc(productId).get()
			).data()
			const { avg_rating, total_ratings } = product

			let newRating
			let totalRatings

			if (remove) {
				newRating = ((avg_rating * total_ratings) - rating) / (total_ratings - 1)
				totalRatings = total_ratings - 1
			} else {
				newRating = (avg_rating * total_ratings + rating) / (total_ratings + 1)
				totalRatings = total_ratings + 1
			}

			await db
				.collection('products')
				.doc(productId)
				.update({
					avg_rating: Math.round(newRating * 100) / 100,
					total_ratings: totalRatings
				})
		} catch (err) {
			console.log('er', err)
		}
	}

	const updateProductReviews = async productId => {
		try {
			const product = await (
				await db.collection('products').doc(productId).get()
			).data()
			const { total_ratings = 0 } = product

			await db
				.collection('products')
				.doc(productId)
				.update({
					total_ratings: total_ratings + 1
				})
		} catch (err) {
			console.log('er', err)
		}
	}

	return React.useMemo(() => ({
		products,
		getProducts,
		getProduct,
		setProducts,
		updateProductRating,
		updateProductReviews
	}))
}
