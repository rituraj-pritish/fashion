import React, { useState, useEffect } from 'react'
import Slider from 'react-slick'
import { Link } from 'react-router-dom'
import LazyLoad from 'react-lazy-load'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import alert from 'core/alert'
import HeartIcon from 'assets/icons/HeartIcon'
import SaleBanner from 'modules/product/Product/SaleBanner'
import {
	ProductCarouselContainer,
	CarouselItemContainer,
	ItemBottom,
	Title
} from './ProductCarousel.styles'
import Button from 'atoms/Button'
import Icon from 'atoms/Icon'
import Text from 'atoms/Text'
import Image from 'components/Image'
import useAuthentication from 'hooks/useAuthentication'
import useCurrency from 'hooks/useCurrency'
import useWishlist from 'hooks/useWishlist'
import useCart from 'hooks/useCart'

const settings = {
	infinite: false,
	slidesToScroll: 5,
	slidesToShow: 5,
	speed: 500,
	swipeToSlide: true,
	arrows: true,
	rows: 1,
	responsive: [
		{
			breakpoint: 600,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 2
			}
		},
		{
			breakpoint: 800,
			settings: {
				slidesToShow: 3,
				slidesToScroll: 3
			}
		},
		{
			breakpoint: 1000,
			settings: {
				slidesToShow: 4,
				slidesToScroll: 4
			}
		}
	]
}

const CarouselProductItem = ({ product }) => {
	const { currency } = useCurrency()
	const { addToWishlist, removeFromWishlist, wishlistItems } = useWishlist()
	const { addToCart, cartItems } = useCart()
	const { isAuthenticated } = useAuthentication()
	const [isLoading, setIsLoading] = useState(false)

	const { name, variants, id, sale } = product
	const { price, images, id: variantId } = variants.find(({ stock }) => stock > 0)


	const isInCart = cartItems.find(item => item.variant_id.toString() === variantId.toString())
	const isInWishlist = wishlistItems.find(({ productId }) => productId === product.id)

	const handleCartBtn = async () => {
		if (isInCart) return
		setIsLoading(true)
		await addToCart({
  		variant_id: variantId
		})
		setIsLoading(false)
	}

	const handleWishlist = async () => {
		if (!isAuthenticated) {
			return alert.error({ message: 'Login to continue' })
		}

		if (isInWishlist) {
			await removeFromWishlist(id)
		} else {
			await addToWishlist({
				productId: id,
				variantId,
				imageUrl: images[0],
				name,
				price,
				quantity: 1
			})
		}
	}

	return (
		<CarouselItemContainer key={id}>
			<Link to={`/product/${id}/variant/${variantId}`}>
				<LazyLoad
					className='lazyload'
					offsetBottom={250}
					offsetRight={2000}
				>
					<Image s3Key={`${id}/${images[0]}`} alt={name} />
				</LazyLoad>
			</Link>
			{sale && <SaleBanner />}
			<ItemBottom>
				{/* <Icon
					className='wishlist-icon'
					color={isInWishlist ? 'red' : 'lightGrey'}
					onClick={handleWishlist}
				>
					<HeartIcon />
				</Icon>*/}
				<Text fontWeight='bold' mt={2}>{name}</Text>
				<Text mt='0.5rem' mb='1.5rem'>
					{`${currency.symbol} ${(currency.rate * price).toFixed(2)}`}
				</Text>
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
		</CarouselItemContainer>
	)
}

const ProductCarousel = ({
	title,
	data,
	excludeProduct
}) => {
	const render = () => data
	// filter out out of stock products
		.filter(product => {
			if (excludeProduct === product.id) return null
			const variant = product.variants.find(
				({ stock }) => stock > 0
			)
			if (!variant) return null
			return product
		})
		.map(product => {
			return <CarouselProductItem key={product.id} product={product} />
		})

	return (
		<ProductCarouselContainer>
			<Title>{title[0].toUpperCase() + title.slice(1)}</Title>
			<Slider {...settings}>{render()}</Slider>
		</ProductCarouselContainer>
	)
}

export default ProductCarousel
