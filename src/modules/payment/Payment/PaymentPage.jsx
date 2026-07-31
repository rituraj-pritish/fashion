import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import Button from 'atoms/Button'
import PaymentButton from './PaymentButton'
import {
	CardInfo,
	OrderSuccess,
	Amount,
	Container
} from './PaymentsPage.styles'
import { PageContainer } from 'index.styles'
import useCurrency from 'hooks/useCurrency'
import useCart from 'hooks/useCart'
import useOrders from 'hooks/useOrders'

const PaymentsPage = () => {
	const { cartItems, emptyCart } = useCart()
	const { currency } = useCurrency()
	const { addNewOrder } = useOrders()

	const [isOrderPlaced, setIsOrderPlaced] = useState(false)

	const amount = cartItems.reduce(
		(total, curr) => total + curr.price * curr.quantity,
		0
	)

	const finalAmount = amount > 29 ? amount : amount + 19
	const payableAmount = `${currency.symbol} ${(
		currency.rate * finalAmount
	).toFixed(2)}`

	const handleOrderComplete = () => {
		emptyCart()
		setIsOrderPlaced(true)
		addNewOrder({
			products: cartItems,
			currency_code: currency.code,
			currency_symbol: currency.symbol,
			currency_rate: currency.rate,
			order_total: payableAmount,
		})
	}

	return (
		<PageContainer>
			{!isOrderPlaced ? (
				<Container>
					<Amount>
            Total payable amount:
						<span>{payableAmount}</span>
					</Amount>
					<PaymentButton
						amount={finalAmount}
						onOrderComplete={handleOrderComplete}
						currency={currency}
					/>

					<CardInfo>
            *email: email@email.com <br />
            *card no: 4242 4242 4242 4242 <br />
            *exp: 2/32 *cvc: 222
					</CardInfo>
				</Container>
			) : (
				<Container>
					<OrderSuccess>
            Your order has been placed <br />
            Thankyou for shopping
					</OrderSuccess>
					<Link to='/'>
						<Button secondary fullWidth>
              Continue Shopping
						</Button>
					</Link>
				</Container>
			)}
		</PageContainer>
	)
}

PaymentsPage.propTypes = {
	emptyCart: PropTypes.func.isRequired,
	currency: PropTypes.object.isRequired,
	cart: PropTypes.array.isRequired,
	addNewOrder: PropTypes.func.isRequired
}

export default PaymentsPage
