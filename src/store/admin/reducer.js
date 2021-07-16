const defaultValue = {
    isLoading: false,
    products: []
};

export const adminReducerActionTypes = {
    LOAD_PRODUCT: "LOAD_PRODUCT",
    START_LOAD: "START_LOAD",
    END_LOAD: "END_LOAD",
};

export default function adminReducer(state=defaultValue, action){
    switch(action.type){
        case adminReducerActionTypes.LOAD_PRODUCT:
            return{
                ...state,
                products: action.data.products,
            }
        case adminReducerActionTypes.START_LOAD:
            return{
                ...state,
                isLoading: true,
            };
        case adminReducerActionTypes.END_LOAD:
            return{
                ...state,
                isLoading: false,
            };
        default:
            return state;
    }
}