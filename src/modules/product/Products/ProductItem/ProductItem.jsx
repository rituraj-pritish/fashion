import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import LazyLoad from 'react-lazy-load'

import Image from 'components/Image'
import HeartIcon from 'assets/icons/HeartIcon'
import SaleBanner from '../../../../modules/product/Product/SaleBanner'
import {
	ItemBottom,
	ProductItemContainer,
	Wishlist
} from './ProductItem.styles'
import Button from 'atoms/Button'
import Icon from 'atoms/Icon'
import useAuthentication from 'hooks/useAuthentication'
import useCurrency from 'hooks/useCurrency'
import useWishlist from 'hooks/useWishlist'
import useCart from 'hooks/useCart'
import alert from 'core/alert'
import { useState } from 'react'

const ProductItem = ({
	product,
}) => {
	const [isLoading, setIsLoading] = useState(false)
	const { addToWishlist, wishlistItems } = useWishlist()
	const { addToCart, cartItems } = useCart()
	const { currency } = useCurrency()
	const { isAuthenticated } = useAuthentication()

	const { name, variants, id, sale } = product
	const variant = variants[0]
	const image = variant.images[0]

	const isInCart = cartItems?.find(item => item.variant_id.toString() === variant.id.toString())
	const isInWishlist = wishlistItems?.find(item => item.productId === id)

	const handleCartBtn = async e => {
		e.preventDefault()
		if (isInCart) return
		setIsLoading(true)
		await addToCart({
			variant_id: variant.id,
		})
		setIsLoading(false)
	}

	const handleWishlist = () => {
		if (!isAuthenticated) {
			return alert.error({ message: 'Login to add to wishlist' })
		}
		if (isInWishlist) return

		addToWishlist({
			productId: id,
			variantId: variant.id,
			price: variant.price,
			name,
			imageUrl: image
		})
	}

	return (
		<ProductItemContainer>
			<Link to={`/product/${id}/variant/${variant.id}`}>
				<LazyLoad className='lazyload'>
					<Image s3Key={`${id}/${image}`} alt={name} />
				</LazyLoad>
			</Link>
			{sale && <SaleBanner />}
			<ItemBottom>
				{/* <Wishlist>
					<Icon
						onClick={handleWishlist}
						color={isInWishlist ? 'red' : 'lightGrey'}
					>
						<HeartIcon />
					</Icon>
				</Wishlist>*/}

				<h3 style={{marginTop: '8px'}}>{name}</h3>
				<p>
					{`${currency.symbol} ${(variant.price * currency.rate).toFixed(2)}`}
				</p>
				<Button
					onClick={handleCartBtn}
					variant={isInCart ? 'secondary' : 'primary'}
					minHeight='35px'
					height='auto'
					isLoading={isLoading}
				>
					{isInCart ? 'ADDED TO CART' : 'ADD TO CART'}
				</Button>
			</ItemBottom>
		</ProductItemContainer>
	)
}

ProductItem.propTypes = {
	product: PropTypes.shape({
		id: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		brand: PropTypes.string.isRequired,
		variants: PropTypes.object.isRequired
	}).isRequired,
	addToCart: PropTypes.func.isRequired,
	addToWishlist: PropTypes.func.isRequired,
	cart: PropTypes.array.isRequired,
	wishlist: PropTypes.array.isRequired,
	isAuthenticated: PropTypes.bool.isRequired,
	inFocus: PropTypes.string,
	isLoading: PropTypes.bool.isRequired,
	currency: PropTypes.object.isRequired
}

export default ProductItem
