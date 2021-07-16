const defaultValue = {
    isLoggedIn: false,
    username: "",
    email: "",
    isLoading: false,
};

export const authReducerActionTypes = {
    LOGIN: "LOGIN",
    LOGOUT: "LOGOUT",
    REGISTER: "REGISTER",
    START_LOAD: "START_LOAD",
    END_LOAD: "END_LOAD",
};

export default function authReducer(state=defaultValue, action){
    switch(action.type){
        case authReducerActionTypes.LOGIN:
            return{
                ...state,
                isLoggedIn: true,
                username: action.data.username,
                email: action.data.email,
            };
        case authReducerActionTypes.LOGOUT:
            return{
                ...state,
                isLoggedIn: false,
                username: '',
                email: ''
            };
        case authReducerActionTypes.REGISTER:
            return{
                ...state,
                username: action.data.username,
                email: action.data.email
            };
        case authReducerActionTypes.START_LOAD:
            return{
                ...state,
                isLoading: true,
            };
        case authReducerActionTypes.END_LOAD:
            return{
                ...state,
                isLoading: false,
            };
        default:
            return state;
    }
}