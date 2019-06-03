import React from 'react'
import { UserConsumer } from '../context/user-context'
import { Redirect, navigate } from '@reach/router'
import { ROUTES } from '../constants/routes'

export const PrivateRoute = ({
  component: Component,
  location,
  path,
  ...rest
}) => {
  return (
    <UserConsumer>
      {context => (
        console.log(location),
        console.log(context),
        context.isLoading === false &&
          (context.userId.length !== 0 ? (
            <Component {...rest} />
          ) : (
            <Redirect from={path} to={ROUTES.signIn} noThrow />
          ))
      )}
    </UserConsumer>
  )
}
