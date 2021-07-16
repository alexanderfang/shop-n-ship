import { adminReducerActionTypes } from "./reducer";
import Swal from 'sweetalert2';
import api from "../../api";
import handleError from "../../helpers/handleError";
import handleSuccess from "../../helpers/handleSuccess";

export const loadProduct = () => {
    return (dispatch, getState) => {
        dispatch({
            type: adminReducerActionTypes.START_LOAD
        });
        return new Promise(async(resolve, reject) => {
            try{
                const { username } = getState().authReducer;
                const { data } = await api.get(`/products`);
                const results = data.filter((product) => {
                    return username === product.createdBy
                });

                dispatch({
                    type: adminReducerActionTypes.LOAD_PRODUCT,
                    data: { products: results }
                });
            } catch(error){
                handleError(error);
            } 
            dispatch({
                type: adminReducerActionTypes.END_LOAD
            });
        });
    };
}

export const addProduct = (product_name, product_description, price, image) => {
    return (dispatch) => {
        dispatch({
            type: adminReducerActionTypes.START_LOAD
        });
        return new Promise(async(resolve, reject) => {
            try{
                await api.post('/products', {
                    name: product_name,
                    description: product_description,
                    price: price,
                    image: image,
                });
                handleSuccess("Product has been added!");
                resolve();
            }catch(error){
                handleError(error);
                reject(error);
            }
            dispatch({
                type: adminReducerActionTypes.END_LOAD
            });
        });
    };
}

export const deleteProduct = (product_id) => {
    return (dispatch, getState) => {
        dispatch({
            type: adminReducerActionTypes.START_LOAD
        });
        return new Promise(async(resolve, reject) => {
            try{
                const { products } = getState().adminReducer;
                Swal.fire({
                    title: 'Do you want to delete this product ?',
                    showCancelButton: true,
                    confirmButtonText: `Remove`,
                }).then(async (result) => {
                    if(result.isConfirmed){
                        const newProducts = products.filter((product) => product._id !== product_id);
                        await api.delete(`/products/${product_id}`);
                        dispatch({
                            type: adminReducerActionTypes.LOAD_PRODUCT,
                            data: { products: newProducts }
                        });
                        handleSuccess("Product has been deleted!");
                    }
                });
                resolve();
            }catch(error){
                handleError(error);
                reject(error);
            }
            dispatch({
                type: adminReducerActionTypes.END_LOAD
            });
        });
    };
}