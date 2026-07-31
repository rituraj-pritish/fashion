import React from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'

import filter from 'helpers/filter'
import FilterPanel from './FilterPanel'
import ProductsContainer from './ProductsContainer/ProductsContainer'
import { Container } from './Products.styles'
import { PageContainer } from 'index.styles'
import useProducts from 'hooks/useProducts'
import useFilter from 'hooks/useFilter'

const Products = () => {
	const { products: allProducts } = useProducts()
	const { productsCategory } = useParams()
	const { filterCriteria } = useFilter()

	let products = []
	products = allProducts.filter(product => product.category === productsCategory)
	if (!products.length) products = allProducts

	products = filter(products, filterCriteria)

	return (
		<PageContainer>
			<Container>
				<FilterPanel />
				<ProductsContainer products={products} />
			</Container>
		</PageContainer>
	)
}

Products.propTypes = {
	products: PropTypes.array.isRequired
}

export default Products
