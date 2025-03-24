import { useContext, useState } from "react";
import { DataContext } from "./DataContext";

function Toolbar() {
    const { addProduct } = useContext(DataContext);
    const [name, setName] = useState('');
    const [shop, setShop] = useState('');

    const submitProduct = async(e) => {
        e.preventDefault();
        await addProduct(shop, name);
        setName('');
    }
    return (
        <form className='Toolbar' id='toolbarForm' onSubmit={ (e) => submitProduct(e) }>
            <label htmlFor='shop'>Sklep:</label>
            <input
                id='shop'
                onChange={ (e) => setShop(e.target.value) }
                placeholder='Sklep'
                required
                type='text'
                value={ shop } />
            <label htmlFor='name'>Produkt:</label>
            <input
                id='name'
                onChange={ (e) => setName(e.target.value) }
                placeholder='Produkt'
                required
                type='text'
                value={ name }/>
            <button type='submit'>Dodaj</button>
        </form>
    )
}

export default Toolbar;