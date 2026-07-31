import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'

import ProductOverview from './ProductOverview'
import ProductCarousel from 'components/ProductCarousel'
import { PageContainer } from 'index.styles'
import ProductReviews from './ProductReviews'
import useProducts from 'hooks/useProducts'
import { useParams } from 'react-router-dom'

const ProductPage = () => {
	const {productId} = useParams()
	const { products, getProduct } = useProducts()

	const product = getProduct(productId)
	return (
		<PageContainer>
			<ProductOverview product={product} />
			{/* <ProductReviews productId={product.id} />
			<ProductCarousel
				title='Similar Products'
				data={products}
				excludeProduct={product.id}
			/>*/}
		</PageContainer>
	)
}

ProductPage.propTypes = {
	product: PropTypes.shape({
		id: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		variants: PropTypes.object.isRequired
	}).isRequired,
	products: PropTypes.array.isRequired
}

export default ProductPage
