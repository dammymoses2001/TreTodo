import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import decode from 'jwt-decode'
import { logOutUserAction } from '../../Redux/Actions'
import { useDispatch } from 'react-redux'
//function to logout




export default function ProtectedRoutes({ component: Component, ...rest }) {
    const dispatch = useDispatch()
    const checkJwtExipres = () => {

        const token = localStorage.getItem('token');
        if (!token) {
            return false
        }

        if (token) {
            const { exp } = decode(token);
            if (Date.now() >= exp * 1000) {
                dispatch(logOutUserAction())
                //return false
                return false
            }
            else {
                return true
            }

        }

    }
    return <Route {...rest} component={(props) => {
        if (checkJwtExipres()) {
            return <Component {...props} />
        }
        else {
            return <Redirect to='/login' />
        }
    }} />


}
