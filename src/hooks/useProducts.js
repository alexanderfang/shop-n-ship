import { useEffect, useState } from "react";
import api from "../api";

const useProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const fetchData = async () => {
        try{
            const { data } = await api.get(`/products`);
            setProducts(data);
        } catch(error){
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return { products, loading };
}

export default useProducts;