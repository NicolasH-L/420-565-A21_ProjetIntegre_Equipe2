import React from 'react'
import { Redirect, Route } from 'react-router-dom'

const GuardedRoute = ({component: Component, auth, ...rest}) => {
    return (
        <Route {...rest} render={(props) => (
            auth === true ? <Component {...props}/> : <Redirect to="/" />
        )}/>
    )
}

export default GuardedRoute
