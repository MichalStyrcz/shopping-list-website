import {createContext, useEffect, useState} from 'react'
import ProductsApi from './api';

const DataContext = createContext();

function DataProvider( {children} ) {
    const [description, setDescription] = useState('');
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [name, setName] = useState('');
    const [products, setProducts] = useState([]);
    const [selectedId, setSelectedId] = useState(0);
    const [shop, setShop] = useState('');
    const [shops, setShops] = useState([]);

    const addProduct = async(shop, name, description) => {
        try {
            const response = await ProductsApi.post('/products', { description, name,
                shop });
            const newProducts = [...products, response.data];
            setProducts(newProducts);
            if (shops.indexOf(shop) < 0) {
                const newShops = [...shops, shop];
                setSelectedId(0);
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
            setSelectedId(0);
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

    const selectProduct = (product) => {
        if (product.id === selectedId) {
            setDescription('');
            setName('');
            setSelectedId(0);
        }
        else {
            setDescription(product.description);
            setName(product.name);
            setSelectedId(product.id);
            setShop(product.shop);
        }
    }

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

    const updateProduct = async (id, shop, name, description) => {
        try {
            const existingProduct = products.find(product => product.id === id);
            if (existingProduct) {
                await ProductsApi.put(`/products/${id}`, {
                    description,
                    handled: existingProduct.handled,
                    name,
                    shop
                });
                setSelectedId(0);
                setProducts(products.map(product => (product.id === id) ? {...product, description, name, shop} : product));
                if (shops.indexOf(shop) < 0) {
                    const newShops = [...shops, shop];
                    setSelectedId(0);
                    setShops(newShops);
                }
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
                description,
                error,
                isLoading,
                name,
                products,
                selectProduct,
                selectedId,
                setDescription,
                setName,
                setSelectedId,
                setShop,
                shop,
                shops,
                toggleProduct,
                updateProduct
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