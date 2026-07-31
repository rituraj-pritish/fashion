import React from 'react'
import { Link, Redirect } from 'react-router-dom'

import Logo from 'assets/Logo'
import Button from 'atoms/Button'
import Text from 'atoms/Text'
import { PageContainer } from 'index.styles'
import { StyledLogo, Container } from './SignUp.styles'
import { Form, Field } from 'react-final-form'
import TextFieldAdapter from 'components/forms/TextFieldAdapter'
import { emailValidator, passwordValidator } from 'helpers/validations'
import { Error } from 'components/forms/Form.styled'
import useAuthentication from 'hooks/useAuthentication'

const SignUp = ({ history }) => {
	const { isAuthenticated, signup } = useAuthentication()

	if (isAuthenticated) return <Redirect to='/' />

	return (
		<PageContainer>
			<Container>
				<StyledLogo>
					<Link to='/'>
						<Logo />
					</Link>
				</StyledLogo>

				<Form
					onSubmit={values => signup(values, history.goBack)}
					render={({
						handleSubmit,
						values,
						submitError,
						submitting,
						dirtySinceLastSubmit,
					}) => {
						return (
							<form onSubmit={handleSubmit}>
								<Field
									name='name'
									label='Name'
									validate={val => !val && 'Required'}
									isRequired
									component={TextFieldAdapter}
								/>
								<Field
									name='email'
									label='Email'
									isRequired
									validate={emailValidator}
									component={TextFieldAdapter}
								/>
								{/* <Field
									name='phone'
									label='Phone'
									component={TextFieldAdapter}
								/>*/}
								<Field
									name='password'
									label='Password'
									type='password'
									isRequired
									validate={passwordValidator}
									component={TextFieldAdapter}
								/>
								{/* <Field
									name='confirmPassword'
									label='Confirm Password'
									validate={val => {
										if (!val) return 'Required'
										if (val !== values.password)
											return 'Does not match with password'
									}}
									isRequired
									component={TextFieldAdapter}
								/>*/}
								<Button type='submit' isLoading={submitting}>
                  Sign Up
								</Button>
								<Error>
									{!!submitError && !dirtySinceLastSubmit && submitError}
								</Error>
							</form>
						)
					}}
				/>

				<Text mt='2rem'>
          Already have an account ?
					<Link to='/signin'>
						<Text display='inline' color='blue'>
							{' '}
              Sign In
						</Text>
					</Link>
				</Text>
			</Container>
		</PageContainer>
	)
}

export default SignUp
