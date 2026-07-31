import React, { useState, useRef, useEffect } from 'react'

import clickOutside from 'helpers/clickOutside'
import Icon from 'atoms/Icon'
import PriceSlider from './PriceSlider'
import BarsIcon from 'assets/icons/BarsIcon'
import {
	Line,
	List,
	FilterBtnContainer,
	FilterPanelSidebar,
	FilterBtn
} from './FilterPanel.styles'
import useFilter from 'hooks/useFilter'
import useProducts from 'hooks/useProducts'

const FilterPanel = () => {
	const { products } = useProducts()
	const { setFilterCriteria } = useFilter()
	const [show, setShow] = useState(false)
	const [currentBrand, setCurrentBrand] = useState('brand-all')
	const [sort, setSort] = useState('rating')
	const node = useRef()

	const brands = [
		...new Set(products.map(product => product.brand.toUpperCase()))
	]

	useEffect(
		() => () => {
			// reset filter criteria
			setFilterCriteria({
				sort: 'all',
				price: 'all',
				brand: 'brand-all'
			})
		},
		[]
	)

	const handleClick = () => {
		setShow(!show)
	}

	const handleSortChange = e => {
		if (sort === e.target.getAttribute('id')) return

		setSort(e.target.getAttribute('id'))
		setFilterCriteria({
			sort: e.target.getAttribute('id')
		})
	}

	const handleBrandChange = e => {
		if (currentBrand === e.target.getAttribute('id')) return

		setCurrentBrand(e.target.getAttribute('id'))
		setFilterCriteria({
			brand: e.target.getAttribute('id')
		})
	}

	clickOutside(node, () => setShow(false))

	return (
		<>
			<FilterBtnContainer>
				<FilterBtn onClick={handleClick}>
					<Icon display='inline-block' width='15px'>
						<BarsIcon />
					</Icon>{' '}
					<p style={{marginLeft: '8px'}}>Filter</p>
				</FilterBtn>
			</FilterBtnContainer>
			<FilterPanelSidebar show={show} ref={node}>
				<h2>Filter</h2>
				<Line />

				<h3>Sort By</h3>
				<List>
					<li>
						<div>
							<input
								type='checkbox'
								onChange={handleSortChange}
								id='rating'
								checked={sort === 'rating'}
							/>
							<label htmlFor='rating'>Rating</label>
						</div>
					</li>
					<li>
						<div>
							<input
								type='checkbox'
								onChange={handleSortChange}
								id='priceLtoH'
								checked={sort === 'priceLtoH'}
							/>
							<label htmlFor='priceLtoH'>Price: Low to High</label>
						</div>
					</li>
					<li>
						<div>
							<input
								type='checkbox'
								onChange={handleSortChange}
								id='priceHtoL'
								checked={sort === 'priceHtoL'}
							/>
							<label htmlFor='priceHtoL'>Price: High to Low</label>
						</div>
					</li>
				</List>
				<Line />

				<h3>Price</h3>
				<List>
					<PriceSlider />
				</List>
				<Line />

				<h3>Brand</h3>
				<List>
					<li key='brand-all'>
						<div>
							<input
								type='checkbox'
								id='brand-all'
								checked={currentBrand === 'brand-all'}
								onChange={handleBrandChange}
							/>
							<label htmlFor='brand-all'>All</label>
						</div>
					</li>
					{brands.map(brand => (
						<li key={brand}>
							<div>
								<input
									type='checkbox'
									id={brand}
									checked={currentBrand === brand}
									onChange={handleBrandChange}
								/>
								<label htmlFor={brand}>{brand}</label>
							</div>
						</li>
					))}
				</List>
				<Line />
			</FilterPanelSidebar>
		</>
	)
}

export default FilterPanel
