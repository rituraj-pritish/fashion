import React, { useState } from 'react'
import LazyLoad from 'react-lazy-load'

import QuantityCounter from 'components/QuantityCounter'
import Button from 'atoms/Button'

import Icon from '../../../../atoms/Icon'
import Text from '../../../../atoms/Text'
import TrashIcon from '../../../../assets/icons/TrashIcon'
import { CartItemContainer, Details, Remove } from './CartItem.styles'
import { Link } from 'react-router-dom'
import LoadingWrap from 'components/LoadingWrap'
import Image from 'components/Image'
import theme from 'theme'
import useCart from 'hooks/useCart'
import useCurrency from 'hooks/useCurrency'
import useWishlist from 'hooks/useWishlist'

const CartItem = ({
	page,
	images,
	price,
	product_id,
	variant_id,
	name,
	quantity,
	isSavedForLater,
}) => {
	const [isLoading, setIsLoading] = useState(false)
	const { currency } = useCurrency()
	const { updateCart, removeFromCart, saveForLater, backToCart } = useCart()
	const { removeFromWishlist } = useWishlist()

	const handleRemove = async () => {
		setIsLoading(true)
		if (page === 'cart') {
			await removeFromCart(variant_id)
		} else {
			await removeFromWishlist(product_id)
		}
		setIsLoading(false)
	}

	const secondaryCallToAction =
		page === 'cart' ? (
			isSavedForLater ? (
				<Button variant='secondary' onClick={() => backToCart(variant_id)}>
					Move to Cart
				</Button>
			) : (
				<Button variant='secondary' onClick={() => saveForLater(variant_id)}>
					Save for Later
				</Button>
			)
		) : (
			<Button variant='secondary' onClick={() => {}}>
				move to cart
			</Button>
		)

	return (
		<LoadingWrap isLoading={isLoading}>
			<CartItemContainer>
				<LazyLoad className='lazyload'>
					<Link to={`/product/${product_id}/variant/${variant_id}`}>
						<Image s3Key={`${product_id}/${images[0]}`} alt={name} />
					</Link>
				</LazyLoad>

				<Details>
					<p>{name}</p>

					{/* {page === 'cart' && (
						<QuantityCounter
							count={quantity}
							onIncrement={async () => {
								setIsLoading(true)
								await updateCart({ id: variant_id, quantity: quantity + 1 })
								setIsLoading(false)
							}}
							onDecrement={async () => {
								if (quantity === 1) return
								setIsLoading(true)
								await updateCart({ id: variant_id, quantity: quantity - 1 })
								setIsLoading(false)
							}}
						/>
					)}*/}
				</Details>

				<Text fontWeight='bold'>
					{`${currency.symbol} `}
					{quantity
						? (Math.round(quantity * (currency.rate * price) * 100) / 100).toFixed(2)
						: price}
				</Text>

				<Remove className='far fa-trash-alt'>
					<Icon width='16px' onClick={handleRemove} hoverColor={theme.colors.red}>
						<TrashIcon />
					</Icon>
					{false && secondaryCallToAction}
				</Remove>
			</CartItemContainer>
		</LoadingWrap>
	)
}

export default CartItem
