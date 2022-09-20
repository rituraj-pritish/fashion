import React from 'react'

import { PageContainer } from 'index.styles'
import { Container } from './SearchResults.styled'
import searchProducts from 'helpers/searchProducts'
import filter from 'helpers/filter'
import { useParams } from 'react-router'
import useProducts from 'hooks/useProducts'
import useFilter from 'hooks/useFilter'
import FilterPanel from 'modules/product/Products/FilterPanel'
import ProductsContainer from 'modules/product/Products/ProductsContainer'

const SearchResults = () => {
	const { searchQuery } = useParams()
	const { products: allProducts } = useProducts() 
	const { criteria } = useFilter()
	const products = filter(
		searchProducts(allProducts, searchQuery),
		criteria
	)
  
	return (
		<PageContainer>
			<Container>
				<FilterPanel />
				<ProductsContainer products={products} />
			</Container>
		</PageContainer>
	)
}

export default SearchResults
