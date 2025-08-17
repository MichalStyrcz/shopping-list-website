import { useContext} from "react";

import { DataContext } from "./DataContext";
import Header from "./Header";
import Product from "./Product";

function EditProduct() {
    const { description, name, selectedId, shop, updateProduct } = useContext(DataContext);

    const submitProduct = async(e) => {
        e.preventDefault();
        await updateProduct(selectedId, shop.toUpperCase().trim(), name.toUpperCase().trim(),
            description.toUpperCase().trim());
        window.history.back();
    }
 
    return (
        <form className='EditProduct' id='editProductForm' onSubmit={ (e) => submitProduct(e) }>
        <Header title='Produkt' />
        <Product />
        <button type='submit'>Zapisz</button>
        <button type='button' onClick={() => window.history.back()}>Anuluj</button>
        </form>
    );
}

export default EditProduct;