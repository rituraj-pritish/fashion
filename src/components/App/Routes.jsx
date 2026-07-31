import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from 'modules/home/Home'
import SignUp from 'modules/authentication/SignUp'
import Product from 'modules/product/Product'
import Reviews from 'modules/product/Reviews'
import Products from 'modules/product/Products'
import SearchResults from 'components/SearchResults'
import Cart from 'modules/product/Cart'
import Wishlist from 'modules/product/Wishlist'
import Payment from 'modules/payment/Payment'
import Account from 'modules/account/Account'
import Orders from 'modules/account/Orders'
import PrivateRoute from 'components/PrivateRoute'
import Review from 'modules/product/Review'
import SignIn from 'modules/authentication/SignIn'
import ForgotPassword from 'modules/authentication/ForgotPassword'
import Upload from 'modules/product/Upload'

const Routes = () => {
	return (
		<Switch>
		<Route exact path='/products/upload' component={Upload} />
			<Route exact path='/product/:productId/variant/:variantId' component={Product} />
			<Route exact path='/products/:productsCategory' component={Products} />
			<Route exact path='/s/:searchQuery' component={SearchResults} />
			<Route exact path='/user/cart' component={Cart} />
			<PrivateRoute exact path='/user/wishlist' component={Wishlist} />
			<PrivateRoute exact path='/user/checkout' component={Payment} />
			<PrivateRoute exact path='/user/account' component={Account} />
			<PrivateRoute exact path='/user/orders' component={Orders} />
			<PrivateRoute
				exact
				path='/user/review/:orderId/p/:productId/v/:variantId'
				component={Review}
			/>
			<Route exact path='/reviews/:productId' component={Reviews} />
			<Route exact path='/signin' component={SignIn} />
			<Route exact path='/forgot-password' component={ForgotPassword} />
			<Route exact path='/signup' component={SignUp} />
			<Route path='/' component={Home} />
		</Switch>
	)
}

export default Routes
