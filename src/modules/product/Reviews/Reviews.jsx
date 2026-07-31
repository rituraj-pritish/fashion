import React, { useState, useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import Rating from 'react-rating'
import theme from 'theme'

import { PageContainer } from 'index.styles'
import { ReactComponent as StarOutlineIcon } from 'assets/icons/star-outline.svg'
import StarIcon from 'assets/icons/StarIcon'
import Icon from 'atoms/Icon'
import ReviewItem from 'components/ReviewItem'
import {
	SpinnerWrapper,
	AvgRating,
	Image,
	TopSection,
	NoReviews
} from './Reviews.styled'
import Spinner from 'components/Spinner/Spinner'
import ProductCarousel from 'components/ProductCarousel'
import useUserActions from 'hooks/useUserActions'
import { useParams } from 'react-router-dom'
import useProducts from 'hooks/useProducts'

const Reviews = () => {
	const { productId } = useParams()
	const { products, getProduct } = useProducts()

	const product = getProduct(productId)

	const { getProductReviews } = useUserActions()
	const [reviews, setReviews] = useState([])
	const [isFetching, setIsFetching] = useState(true)

	const getReviews = useCallback(async () => {
		const res = await getProductReviews(productId)
		setReviews(res)
		setIsFetching(false)
	}, [productId])

	useEffect(() => {
		setIsFetching(true)
		getReviews()
	}, [getReviews, productId])

	if (isFetching)
		return (
			<PageContainer>
				<SpinnerWrapper>
					<Spinner size={35} />
				</SpinnerWrapper>
			</PageContainer>
		)

	const {
		avg_rating,
		total_ratings,
		total_reviews = 0,
		name,
		variants
	} = product
	const { images } = variants[Object.keys(variants)[0]]

	return (
		<PageContainer align='left'>
			<TopSection>
				<Image src={images[0]} alt='name' />
				<div>
					<div>{name}</div>

					<AvgRating>
						<Rating
							initialRating={4.3}
							emptySymbol={
								<Icon
									noPointer
									mr='0.3rem'
									width='18px'
									color={theme.colors.golden}
								>
									<StarOutlineIcon />
								</Icon>
							}
							fullSymbol={
								<Icon
									noPointer
									width='18px'
									color={theme.colors.golden}
									mr='0.3rem'
								>
									<StarIcon />
								</Icon>
							}
							readonly
						/>
						<div>{avg_rating} out of 5</div>
					</AvgRating>

					<div>
						<span>{total_ratings}</span>
            ratings & <span>{total_reviews}</span>
            reviews
					</div>
				</div>
			</TopSection>

			{reviews.length === 0 ? (
				<NoReviews>No reviews yet</NoReviews>
			) : (
				reviews.map((review, idx) => <ReviewItem {...review} key={idx} />)
			)}

			<ProductCarousel data={products} title='On Sale' />
		</PageContainer>
	)
}

Reviews.propTypes = {
	productId: PropTypes.string.isRequired,
	product: PropTypes.object.isRequired,
	products: PropTypes.array.isRequired
}

export default Reviews
