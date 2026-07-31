import React, { useRef } from 'react'
import { Link } from 'react-router-dom'

import clickOutside from 'helpers/clickOutside'
import SignOutIcon from 'assets/icons/SignOutIcon'
import HeartIcon from 'assets/icons/HeartIcon'
import CartIcon from 'assets/icons/CartIcon'
import { ReactComponent as AccountIcon } from 'assets/icons/account.svg'
import { ReactComponent as OrdersIcon } from 'assets/icons/orders.svg'
import Button from 'atoms/Button'
import Icon from 'atoms/Icon'
import { UserOptions, NoAuthOptions, AuthOptions } from './NavUserOptions.styles'
import useAuthentication from 'hooks/useAuthentication'

const NavUserOptions = ({ show, setShow, userRef, history }) => {
	const { isAuthenticated, signOut } = useAuthentication()
	const node = useRef()
	clickOutside(node, () => setShow(false), userRef)

	const noAuthOptions = (
		<NoAuthOptions>
			<Link to='/signin'>
				<Button>Sign In</Button>
			</Link>
			<div>
				<p>New Customer ?</p>
				<Link to='/signup'>
					<Button variant='secondary'>Sign up</Button>
				</Link>
			</div>
		</NoAuthOptions>
	)

	const authOptions = (
		<AuthOptions>
			<ul>
				{/* <li>
					<Link to='/user/wishlist'>
						<Icon>
							<HeartIcon />
						</Icon>
						Wishlist
					</Link>
				</li>
				<li>
					<Link to='/user/orders'>
						<Icon>
							<OrdersIcon />
						</Icon>
						Orders
					</Link>
				</li>
				<li>
					<Link to='/user/account'>
						<Icon>
							<AccountIcon />
						</Icon>
						Account
					</Link>
				</li>*/}
				<li>
					<Link to='#' onClick={() => signOut(history)}>
						<Icon>
							<SignOutIcon />
						</Icon>
						Sign Out
					</Link>
				</li>
			</ul>
		</AuthOptions>
	)

	return (
		<UserOptions ref={node} show={show}>
			{isAuthenticated ? authOptions : noAuthOptions}
		</UserOptions>
	)
}

export default NavUserOptions
