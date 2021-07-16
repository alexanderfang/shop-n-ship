import { cartReducerActionTypes } from "./reducer";
import Swal from 'sweetalert2';
import handleError from "../../helpers/handleError";

const Toast = Swal.mixin({
    toast: true,
    position: 'bottom-end',
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  });

export const addToCart = (product) => {
    return (dispatch, getState) => {
        return new Promise(async(resolve, reject) => {
            try{
                const {cart, total} = getState().cartReducer;
                if(cart.some(cartItem => product._id === cartItem._id)){ // Cek apakah produk sudah ada di cart
                    // Kalau sudah ada add quantity
                    dispatch({
                        type: cartReducerActionTypes.ADD_QTY,
                        data: { product: product, total: total + product.price }
                    });
                    Toast.fire({
                        icon: 'success',
                        title: 'Added to Cart'
                    });
                }else{
                    // Kalau belum ada add produk baru ke cart
                    dispatch({
                        type: cartReducerActionTypes.ADD,
                        data: { product: {...product, quantity: 1}, total: total + product.price }
                    });
                    Toast.fire({
                        icon: 'success',
                        title: 'Added to Cart'
                    });
                }
                resolve();
            }catch(error){
                handleError(error);
                reject(error);
            }
        });
    };
};

export const removeFromCart = (product) => {
    return (dispatch, getState) => {
        return new Promise(async(resolve, reject) => {
            try{
                const {cart, total} = getState().cartReducer;
                Swal.fire({
                    title: 'Do you want to remove product from the cart?',
                    showCancelButton: true,
                    confirmButtonText: `Remove`,
                }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                        if(cart.some(cartItem => product._id === cartItem._id)){ // Cek apakah produk ada di cart
                            const newCart = cart.filter((cartItem) => cartItem._id !== product._id);
                            
                            dispatch({
                                type: cartReducerActionTypes.REMOVE,
                                data: { cart: newCart, total: total - (product.price * product.quantity) }
                            });
                            Toast.fire({
                                icon: 'warning',
                                title: 'Removed from Cart'
                            });
                        }else{
                            // Kalau belum ada tampilkan error
                            handleError({error: {response: {data: {error_message: "Produk sudah tidak ada di cart"}}}}); // Kasus ini hampir tidak mungkin
                        }
                    }
                })
                resolve();
            }catch(error){
                handleError(error);
                reject(error);
            }
        });
    };
};

export const checkout = () => {
    return (dispatch, getState) => {
        return new Promise(async(resolve, reject) => {
            try{
                
                dispatch({
                    type: cartReducerActionTypes.REMOVE_ALL,
                });

                Swal.fire({
                    icon: 'success',
                    title: 'Checkout Success',
                    text: 'Thanks for shopping with us!'
                });
                resolve();
            }catch(error){
                handleError(error);
                reject(error);
            }
        });
    };
};