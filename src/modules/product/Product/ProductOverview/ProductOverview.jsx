import React, { useState } from 'react'
import LazyLoad from 'react-lazy-load'
import ReactTooltip from 'react-tooltip'
import Rating from 'react-rating'

import { ReactComponent as StarOutlineIcon } from 'assets/icons/star-outline.svg'
import alert from 'core/alert'
import returnImg from 'assets/images/return.webp'
import worldwideImg from 'assets/images/worldwide.webp'
import Button from 'atoms/Button'
import Text from 'atoms/Text'
import Icon from 'atoms/Icon'
import HeartIcon from 'assets/icons/HeartIcon'
import StarIcon from 'assets/icons/StarIcon'
import Image from 'components/Image'
import {
	SmallImages,
	SmallImage,
	ActionsContainer,
	ImagesContainer,
	ProductOverviewContainer,
	Variants,
	Variant,
	CartBtn,
	Policy,
	Wishlist,
} from './ProductOverview.styles'
import { useEffect } from 'react'
import ProductDetails from '../ProductDetails'
import QuantityCounter from 'components/QuantityCounter'
import theme from 'theme'
import useAuthentication from 'hooks/useAuthentication'
import useCurrency from 'hooks/useCurrency'
import { useParams, useHistory } from 'react-router-dom'
import useCart from 'hooks/useCart'
import useWishlist from 'hooks/useWishlist'

const ProductOverview = ({ product }) => {
	const history = useHistory()
	const { addToCart, cartItems } = useCart()
	const { addToWishlist, wishlistItems } = useWishlist()
	const { variantId } = useParams()
	const { currency } = useCurrency()
	const { isAuthenticated } = useAuthentication()
	const { name, avg_rating, brand, variants, id } = product

	const [isLoading, setIsLoading] = useState(false)
	const [variant, setVariant] = useState(product.variants.find(({id}) => id.toString() === variantId.toString()))
	const [currentImg, setCurrentImg] = useState(variant.images[0])
	const [price, setPrice] = useState(variant.price)
	const [quantity, setQuantity] = useState(1)

	useEffect(() => {
		setVariant(product.variants.find(({id}) => id.toString() === variantId.toString()))
		ReactTooltip.rebuild()
		return () => {
			setVariant('')
		}
	}, [id, variantId])

	if (!variant) return 'loading'

	const images = variant?.images.map(imageUrl => {
		const isCurrentImage = imageUrl === currentImg
		return (
			<SmallImage
				key={imageUrl}
				isCurrentImage={isCurrentImage}
				onClick={() => setCurrentImg(imageUrl)}
			>
				<LazyLoad className='lazyload'>
					<Image s3Key={`/${id}/${imageUrl}`} alt='img' size='small' />
				</LazyLoad>
			</SmallImage>
		)
	})

	const isInStock = variant?.stock > 0
	const isInCart = cartItems.find(item => item.variant_id.toString() === variantId.toString())
	const isInWishlist = wishlistItems.find(item => item.productId === id)

	const changeVariant = newVariant => {
		if (variant.id.toString() === newVariant.id.toString()) return
		setVariant(newVariant)
		setCurrentImg(newVariant.images[0])
		setPrice(newVariant.price)
		history.push(`/product/${id}/variant/${newVariant.id}`)
	}

	const handleCartBtn = async () => {
		if (isInCart) return
		setIsLoading(true)
		await addToCart({
			variant_id: variantId,
		})
		setIsLoading(false)
	}

	const handleWishlist = () => {
		if (!isAuthenticated) {
			return alert.error({ message: 'Login to continue' })
		}
		if (isInWishlist) return
		addToWishlist({
			productId: id,
			variantId,
			name,
			price,
			imageUrl: variants[variant].images[0],
		})
	}

	const handleBuy = async e => {
		e.preventDefault()

		if (!isAuthenticated) {
			history.push('/signin')
			return
		}
		if(!isInCart) {
			await addToCart({
				variant_id: variantId,
			})
		}
		history.push('/user/cart')
	}

	return (
		<ProductOverviewContainer>
			<div>
				<ImagesContainer>
					<SmallImages>{images}</SmallImages>
					<LazyLoad>
						<LazyLoad className='lazyload'>
							<Image s3Key={`/${id}/${currentImg}`} alt={name} />
						</LazyLoad>
					</LazyLoad>
				</ImagesContainer>
			</div>

			<ActionsContainer>
				<Text fontSize='3rem'>{name}</Text>
				<Text fontSize='1.5rem' color='grey' mt='-15px'>
					{brand.toUpperCase()}
				</Text>
				<Text fontSize='2.3rem'>
          {`${currency.symbol} ${(currency.rate * price).toFixed(2)}`}
				</Text>
				{/* <Rating
					initialRating={avg_rating}
					emptySymbol={
						<Icon noPointer mr='0.3rem' color={theme.colors.golden}>
							<StarOutlineIcon />
						</Icon>
					}
					fullSymbol={
						<Icon noPointer color={theme.colors.golden} mr='0.3rem'>
							<StarIcon />
						</Icon>
					}
					readonly
				/>*/}
				<Text fontSize='1.9rem' color={isInStock ? 'green' : 'red'}>
					{isInStock ? 'In Stock' : 'Out of stock'}
				</Text>

				<Variants>
					{variants.map(item => (
						<Variant
							key={item.id}
							data-tip={item.variant[0].toUpperCase() + item.variant.slice(1)}
							onClick={() => changeVariant(item)}
							color={item.color}
						/>
					))}
				</Variants>

				<Policy>
					<span>
						<LazyLoad className='lazyload'>
							<img src={worldwideImg} alt='worldwide shipping' />
						</LazyLoad>
						<p>
							Worldwide <br /> Shipping
						</p>
					</span>
					<span>
						<LazyLoad className='lazyload'>
							<img src={returnImg} alt={'return policy'} />
						</LazyLoad>
						<p>
							30 Days
							<br />
							Return
						</p>
					</span>
				</Policy>

				<CartBtn>
					{/* <QuantityCounter disabled={!isInStock || isInCart} count={quantity} setCount={setQuantity} />*/}
					<Button
						variant='secondary'
						isLoading={isLoading}
						disabled={!isInStock}
						onClick={handleCartBtn}
					>
						{isInCart ? 'ADDED TO CART' : 'ADD TO CART'}
					</Button>
				</CartBtn>

				<Button
					height='50px'
					fontWeight='bold'
					fontSize='2rem'
					letterSpacing='4px'
					mb={5}
					onClick={handleBuy}
					disabled={!isInStock}
				>
					BUY NOW
				</Button>

				{/* <Wishlist onClick={handleWishlist}>
					<Icon color={isInWishlist ? 'red' : 'lightGrey'} mr='1rem'>
						<HeartIcon />
					</Icon>
					<Text>{isInWishlist ? 'Added To Wishlist' : 'Add To Wishlist'}</Text>
				</Wishlist>*/}
				{/* <ProductDetails product={product} variant={variant} />*/}
			</ActionsContainer>
		</ProductOverviewContainer>
	)
}

export default ProductOverview
