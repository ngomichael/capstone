import React from 'react'
import { UserConsumer } from '../context/user-context'
import { Redirect, navigate } from '@reach/router'
import { ROUTES } from '../constants/routes'

export const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <UserConsumer>
      {context => (
        console.log(context.isLoading),
        console.log(context.userId.length !== 0),
        // console.log('PRIVATE ROUTE'),
        context.isLoading === false && context.userId.length !== 0 ? (
          <Component {...rest} />
        ) : (
          // <Redirect to={ROUTES.signIn} noThrow />
          <Component {...rest} />
        )
      )}
    </UserConsumer>
  )
}
