import { useContext } from 'react';
import { DataContext } from './DataContext'

function Products() {
    const { deleteProduct, products, selectedId, selectProduct, shops, toggleProduct } = useContext(DataContext);

    return (
        (
            <ul className='Products' >
                {
                    shops.map(shop => (
                        <li key={shop}>
                            <h2>{shop}</h2>
                            <ul>
                                {
                                    products.filter(product => product.shop === shop).map(product => (
                                        <li className='product-item' key={product.id} onClick={(e) => {
                                            selectProduct(product);
                                            }} style={product.id === selectedId ? {backgroundColor:"blue", color:"white"} : {}}>
                                            <input type='checkbox' checked={product.handled} onChange={async() => await toggleProduct(product.id)} />
                                            <label>{product.name} ({product.description})</label>
                                        </li>
                                    ))
                                }
                            </ul>
                        </li>
                    ))
                }
            </ul>
        )
    );
};

export default Products;