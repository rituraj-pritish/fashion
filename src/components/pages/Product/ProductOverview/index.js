import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { addToCart } from 'redux/cart'
import { addToWishlist } from 'redux/wishlist'
import ProductOverview from './ProductOverview'

const mapStateToProps = (
  { cart, wishlist, auth },
  {
    match: {
      params: { productId }
    }
  }
) => ({
  cart: cart.items,
  wishlist: wishlist.items,
  isAuthenticated: auth.isAuthenticated,
  cartLoading: cart.isLoading && cart.inFocus === productId
})

export default withRouter(
  connect(mapStateToProps, {
    addToCart,
    addToWishlist
  })(ProductOverview)
)
