import {createContext, useEffect, useState} from 'react'
import ProductsApi from './api';

const DataContext = createContext();

function DataProvider( {children} ) {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [shops, setShops] = useState([]);

    const addProduct = async(shop, name) => {
        try {
            const response = await ProductsApi.post('/products', { name, shop });
            const newProducts = [...products, response.data];
            setProducts(newProducts);
            if (shops.indexOf(shop) < 0) {
                const newShops = [...shops, shop];
                setShops(newShops);
            }
                
        }
        catch (err) {
            setError(err);
        }
    }

    const deleteProduct = async (id) => {
        try {
            await ProductsApi.delete(`/products/${id}`);
            const newProducts = products.filter(product => product.id !== id);
            setProducts(newProducts);
        }
        catch(err) {
            setError(err);
        }
    }

    const getShops = (productsList) => {
        const shops = productsList.map(product => product.shop);
        return shops.filter((shop, index) => shops.indexOf(shop) === index);
    };

    const toggleProduct = async (id) => {
        try {
            const existingProduct = products.find(product => product.id === id);
            if (existingProduct) {
                await ProductsApi.put(`/products/${id}`, {
                    handled: !existingProduct.handled,
                    name: existingProduct.name,
                    shop: existingProduct.shop
                });
                setProducts(products.map(product => (product.id === id) ? {...product, handled: !product.handled} : product));
            }
        } catch(err) {
            setError(err);
        }
    }

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await ProductsApi.get('/products');
                setProducts(response.data);
                setShops(getShops(response.data));
            }
            catch (err) {
                setError(err);
            }
            finally {
                setIsLoading(false);
            }
        }
    
        fetchProducts();
    }, [])

    return (
        <DataContext.Provider
            value={{
                addProduct,
                deleteProduct,
                error,
                isLoading,
                products,
                shops,
                toggleProduct
            }}
        >
            {children}
        </DataContext.Provider>
    )
}

export {
    DataContext,
    DataProvider
}