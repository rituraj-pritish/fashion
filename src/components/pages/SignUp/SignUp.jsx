import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'

import Logo from 'assets/Logo'
import { signup } from 'redux/auth'
import setAlert from 'setAlert'
import Input from 'components/ui/Input'
import Button from 'components/ui/Button'
import Text from 'components/ui/Text'
import { PageContainer } from 'index.styles'
import { StyledLogo, Container } from './SignUp.styles'

const SignUp = ({ signup, isAuthenticated, isLoading }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password1: '',
    password2: ''
  })

  if (isAuthenticated) return <Redirect to='/' />

  const { name, email, password1, password2, phone } = formData

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = e => {
    e.preventDefault()

    if (email === '' || name === '' || password1 === '' || password2 === '') {
      setAlert('All fields are required', 'danger')
      return
    } else if (password1 !== password2) {
      setAlert('Passwords do not match', 'danger')
      return
    } else if (password1.length < 6) {
      setAlert('Password must be at least six characters long', 'danger')
      return
    }
    signup({ ...formData, password: password1 })
  }

  return (
    <PageContainer>
      <Container>
        <StyledLogo>
          <Link to='/'>
            <Logo />
          </Link>
        </StyledLogo>
        <form onSubmit={handleSubmit}>
          <label htmlFor='name'>Name</label>
          <Input type='text' name='name' value={name} onChange={handleChange} />

          <label htmlFor='phone'>Phone (optional)</label>
          <Input
            type='number'
            name='phone'
            value={phone}
            onChange={handleChange}
          />

          <label htmlFor='email'>Email</label>
          <Input
            type='text'
            name='email'
            value={email}
            onChange={handleChange}
          />

          <label htmlFor='password1'>Password</label>
          <Input
            type='password'
            name='password1'
            value={password1}
            onChange={handleChange}
          />

          <label htmlFor='password2'>Confirm Password</label>
          <Input
            type='password'
            name='password2'
            value={password2}
            onChange={handleChange}
          />

          <Button isLoading={isLoading}>Sign Up</Button>
          <Text mt='2rem'>
            Already have an account ?
            <Link to='/signin'>
              <Text display='inline' color='blue'>
                {' '}
                Sign In
              </Text>
            </Link>
          </Text>
        </form>
      </Container>
    </PageContainer>
  )
}

const mapStateToProps = ({ auth: { isAuthenticated, isLoading } }) => ({
  isAuthenticated,
  isLoading
})

export default connect(mapStateToProps, { signup })(SignUp)