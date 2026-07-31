import { db } from 'core/firebase'
import fetch from 'core/fetch'

export const getCartItems = email => {
  return fetch(`/carts/${email}/details`)
}

export const addToCart = (email, variant_id) => {
  return fetch(`/carts/${email}/${variant_id}`, {
    method: 'post',
  })
}

export const removeFromCart = (email, variant_id) => {
  return fetch(`/carts/${email}/${variant_id}`, {
    method: 'delete',
  })
}

export const updateCart = async (email, data) => {
  return fetch(`/carts/${email}/${data.variant_id}`, {
    method: 'post',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(data)
  })
}

export const emptyCart = email => {
  return fetch(`/carts/${email}`, {method: 'delete'})
}
