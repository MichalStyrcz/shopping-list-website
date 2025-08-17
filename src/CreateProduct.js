import { useContext, useEffect } from "react";

import { DataContext } from "./DataContext";
import Header from "./Header";
import Product from "./Product";

function CreateProduct() {
    const { addProduct, description, name, setDescription,
            setName, shop } = useContext(DataContext);

    useEffect(() => {
        setDescription('');
        setName('');
    }, []);

    const submitProduct = async(e) => {
        e.preventDefault();
        await addProduct(shop.toUpperCase().trim(), name.toUpperCase().trim(),
            description.toUpperCase().trim());
        window.history.back();
    }
 
    return (
        <form className='CreateProduct' id='createProductForm' onSubmit={ (e) => submitProduct(e) }>
        <Header title='Nowy produkt' />
        <Product />
        <button type='submit'>Zapisz</button>
        <button type='button' onClick={() => window.history.back()}>Anuluj</button>
        </form>
    );
}

export default CreateProduct;