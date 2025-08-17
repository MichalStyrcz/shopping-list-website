import { useContext} from "react";

import { DataContext } from "./DataContext";
import Header from "./Header";

function DeleteProduct() {
    const { deleteProduct, name, selectedId } = useContext(DataContext);

    const submitProduct = async(e) => {
        e.preventDefault();
        await deleteProduct(selectedId);
        window.history.back();
    }
 
    return (
        <form className='DeleteProduct' id='deleteProductForm' onSubmit={ (e) => submitProduct(e) }>
        <Header title='Pytanie' />
        <div>Czy na pewno chcesz usunąć {name}?</div>
        <button type='submit'>Tak</button>
        <button type='button' onClick={() => window.history.back()}>Nie</button>
        </form>
    );
}

export default DeleteProduct;