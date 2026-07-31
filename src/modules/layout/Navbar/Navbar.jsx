import React, { useState, useEffect, useRef } from 'react'
import { Link, useHistory } from 'react-router-dom'

import UserIcon from '../../../assets/icons/UserIcon'
import CartIcon from '../../../assets/icons/CartIcon'
import SearchIcon from '../../../assets/icons/SearchIcon'
import Logo from '../../../assets/Logo'
import Icon from '../../../atoms/Icon'

import SearchBar from './SearchBar'
import {
	Nav,
	Search,
	NavLinks,
	Cart,
	Container,
	SearchIconContainer,
	StyledLogo
} from './Navbar.styles'
import NavUserOptions from './NavUserOptions'
import CurrencySelector from './CurrencySelector'
import useCart from 'hooks/useCart'

const Navbar = () => {
	const history = useHistory()
	const [showUserOptions, setShowUserOptions] = useState(false)
	const [show, setShow] = useState(true)
	const [showSearchBar, setShowSearchBar] = useState(false)
	const [text, setText] = useState('')
	const cartRef = useRef()
	const userRef = useRef()

	const { cartItems } = useCart()
	const cartCount = cartItems?.length

	useEffect(() => {
		if (
			history.location.pathname === '/signin' ||
      history.location.pathname === '/signup' ||
      history.location.pathname === '/forgot-password'
		) {
			setShow(false)
		} else {
			setShow(true)
		}
	}, [history.location])

	const handleCart = () => {
		history.push('/user/cart')
	}

	const handleSearch = e => {
		e.preventDefault()
		if (!text) return

		setText('')
		setShowSearchBar(false)
		history.push(`/s/${text}`)
	}

	return (
		<Nav id='my-nav' show={show}>
			<Container>
				<StyledLogo show={showSearchBar}>
					<Link to='/'>
						<Logo />
					</Link>
				</StyledLogo>

				<Search onSubmit={handleSearch} className='search'>
					<input
						type='text'
						value={text}
						onChange={e => setText(e.target.value)}
						className='search-input'
					/>
					<button className='search-btn'>Search</button>
				</Search>

				<NavLinks>
					<SearchIconContainer onClick={() => setShowSearchBar(true)}>
						<Icon>
							<SearchIcon />
						</Icon>
					</SearchIconContainer>
					<SearchBar
						showSearchBar={showSearchBar}
						setShowSearchBar={setShowSearchBar}
						handleSearch={handleSearch}
						searchQuery={text}
						setSearchQuery={setText}
					/>

					{/* <li>
						<CurrencySelector />
					</li>*/}

					<li
						ref={userRef}
						onClick={() => setShowUserOptions(!showUserOptions)}
					>
						<Icon size='2.2rem'>
							<UserIcon />
						</Icon>

						<NavUserOptions
							userRef={userRef}
							show={showUserOptions}
							setShow={setShowUserOptions}
							history={history}
						/>
					</li>

					<Cart ref={cartRef} onClick={handleCart}>
						<Icon width='30px'>
							<CartIcon />
						</Icon>
						<span className='cart-count'>{cartCount}</span>
					</Cart>
				</NavLinks>
			</Container>
		</Nav>
	)
}

export default Navbar
