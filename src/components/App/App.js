import React, { useEffect } from 'react'
import { ThemeProvider } from 'styled-components'
import ReactTooltip from 'react-tooltip'
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'

import Navbar from 'modules/layout/Navbar'
import TopButton from 'modules/layout/TopButton'
import Loader from 'modules/layout/Loader'
import ScrollToTop from 'components/ScrollToTop'
import Footer from 'modules/layout/Footer'
import theme from 'theme'
import Routes from './Routes'
import useProducts from 'hooks/useProducts'
import useAuthentication from 'hooks/useAuthentication'
import useCart from 'hooks/useCart'
import useWishlist from 'hooks/useWishlist'
import useCurrency from 'hooks/useCurrency'

const App = () => {
	const { getCartItems } = useCart()
	const { getWishlistItems } = useWishlist()
	const { getProducts, products, setProducts } = useProducts()
  const { getCurrencies } = useCurrency()
	const { authStateChangeHandler, isAuthenticated } = useAuthentication()

	const getDetails = async () => {
    const products = await getProducts()
		setProducts(products)
	}

	useEffect(() => {
    getDetails()
		// getCurrencies()
	}, [])

	useEffect(() => {
		authStateChangeHandler()
		if(isAuthenticated) {
			getCartItems()
			// getWishlistItems()
		}
	}, [isAuthenticated])

	if (!products) {
		return <Loader />
	}

	return (
		<>
			<ThemeProvider theme={theme}>
				<Navbar />
				<ScrollToTop>
					<Routes/>
				</ScrollToTop>
				<TopButton />
				<Footer />
			</ThemeProvider>
			<ReactNotification />
			<ReactTooltip />
		</>
	)
}

export default App
