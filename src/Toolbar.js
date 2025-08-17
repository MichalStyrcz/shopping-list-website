import { useContext } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "./DataContext";

function Toolbar() {
    const { selectedId } = useContext(DataContext);
    return (
        <div className="Toolbar">
            <button><Link to="/product-new">Dodaj produkt</Link></button>
            { selectedId > 0 && (
                <>
                    <button><Link to="/product-edit">Edytuj produkt</Link></button>
                    <button><Link to="/product-delete">Usuń produkt</Link></button>
                </>
            )}
        </div>
    )
}

export default Toolbar;