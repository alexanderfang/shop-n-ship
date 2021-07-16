const defaultValue = {
    cart: [],
    total: 0,
};

export const cartReducerActionTypes = {
    ADD: "ADD",
    ADD_QTY: "ADD_QTY",
    REMOVE: "REMOVE",
    REMOVE_ALL: "REMOVE_ALL",
};

export default function cartReducer(state=defaultValue, action){
    switch(action.type){
        case cartReducerActionTypes.ADD:
            return{
                ...state,
                cart: [...state.cart, action.data.product],
                total: action.data.total,
            };
        case cartReducerActionTypes.ADD_QTY:
            // Tambah quantitynya
            // Pertanyaan React "Do Not Modify State Directly" apakah seperti ini tidak apa - apa?
            const newCart = state.cart.map((cartItem) => (cartItem._id === action.data.product._id ? Object.assign(cartItem, {quantity: cartItem.quantity + 1}) : cartItem));
            return{
                ...state,
                cart: newCart,
                total: action.data.total,
            };
        case cartReducerActionTypes.REMOVE:
            return{
                ...state,
                cart: action.data.cart,
                total: action.data.total,
            };
        case cartReducerActionTypes.REMOVE_ALL:
            return{
                ...state,
                cart: [],
                total: 0
            };
        default:
            return state;
    }
}