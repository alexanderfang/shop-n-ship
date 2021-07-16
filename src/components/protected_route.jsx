import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { loginToken } from '../store/auth/actions';

export default function ProtectedRoute({path, component: Component, ...props}) {
    const isLoggedIn = useSelector(state => state.authReducer.isLoggedIn);
    const dispatch = useDispatch();

    useEffect(() => {
        if(!isLoggedIn){
            const token = localStorage.getItem('token');
            if(token){
                dispatch(loginToken());
            }
        }
    }, [isLoggedIn, dispatch]);
    
    return (
        <Route {...props} path={path} render={(props) => 
            isLoggedIn ? <Component {...props}/> : <Redirect to="/login"/>
        }/>
    )
}