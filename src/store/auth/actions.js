import { authReducerActionTypes } from "./reducer";
import api from "../../api";
import handleError from "../../helpers/handleError";
import handleSuccess from "../../helpers/handleSuccess";

export const register = (username, password, email) => {
    return (dispatch) => {
        dispatch({
            type: authReducerActionTypes.START_LOAD
        });
        return new Promise(async(resolve, reject) => {
            try{
                const { data } = await api.post('/register', {
                    username,
                    password,
                    email,
                });

                dispatch({
                    type: authReducerActionTypes.REGISTER,
                    data: { username: data.username, email: data.email }
                });
                handleSuccess("Your account has been created!");
                resolve();
            }catch(error){
                handleError(error);
                reject(error);
            }
            dispatch({
                type: authReducerActionTypes.END_LOAD
            });
        });
    };
}

export const login = (username, password, email) => {
    return (dispatch) => {
        dispatch({
            type: authReducerActionTypes.START_LOAD
        });
        return new Promise(async(resolve, reject) => {
            try{
                const { data } = await api.post('/login', {
                    username,
                    password,
                    email,
                });
                localStorage.setItem('token', data.token);
                api.defaults.headers.token = data.token;
                dispatch({
                    type: authReducerActionTypes.LOGIN,
                    data: { username: data.username, email: data.email }
                });
                resolve();
            }catch(error){
                handleError(error);
                reject(error);
            }
            dispatch({
                type: authReducerActionTypes.END_LOAD
            });
        });
    };
};

export const loginToken = () => {
    return (dispatch) => {
        dispatch({
            type: authReducerActionTypes.START_LOAD
        });
        return new Promise(async(resolve, reject) => {
            try{
                const {data} = await api.post('/login/token',{},{
                    headers: {
                        token: localStorage.getItem('token'),
                    },
                });
                localStorage.setItem('token', data.token);
                api.defaults.headers.token = data.token;
                dispatch({
                    type: authReducerActionTypes.LOGIN,
                    data: { username: data.user.username }
                });
                resolve();
            }catch(error){
                handleError(error);
                reject(error);
            }

            dispatch({
                type: authReducerActionTypes.END_LOAD
            });
        });
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    return (dispatch) => {
        dispatch({
            type: authReducerActionTypes.LOGOUT,
        });
    }
};