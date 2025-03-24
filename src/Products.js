import { useContext } from 'react';
import { DataContext } from './DataContext'

function Products() {
    const { deleteProduct, products, shops, toggleProduct } = useContext(DataContext);

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
                                        <li key={product.id}>
                                            <input type='checkbox' checked={product.handled} onChange={async() => await toggleProduct(product.id)} />
                                            <label>{product.name}</label>
                                            <button onClick={async () => await deleteProduct(product.id)}>Usuń</button>
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