import React from 'react';
import {useSelector} from 'react-redux'
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({ component: Component, ...rest }) => {
    // get isLoggedIn from store
    const isLoggedIn = useSelector(state => state.LoginReducer.isLoggedIn);
   return <Route
        {...rest}
        render={props =>
            isLoggedIn ? (
                <Component {...props} />
            ) : (
                    <Redirect
                        to={{ pathname: '/login', state: { from: props.location } }}
                    />
                )
        }
    />
}
