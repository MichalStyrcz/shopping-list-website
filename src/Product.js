import './App.css';
import { useContext } from 'react';
import { DataContext } from './DataContext';

function Product() {
    const { description, name, setDescription, setName, setShop, shop } = 
      useContext(DataContext);
    return (
        <div className='Product'>
            <div>
                <label htmlFor='shop'>Sklep:</label>
                <input
                  id='shop'
                    onChange={ (e) => setShop(e.target.value) }
                    placeholder='Sklep'
                    required
                    type='text'
                    value={ shop }/>
            </div>
            <div>
                <label htmlFor='name'>Produkt:</label>
                <input
                  id='name'
                    onChange={ (e) => setName(e.target.value) }
                    placeholder='Produkt'
                    required
                    type='text'
                    value={ name }/>
            </div>
            <div>
                <label htmlFor='description'>Uwagi:</label>
                <input
                  id='description'
                    onChange={ (e) => setDescription(e.target.value) }
                    placeholder='Uwagi'
                    type='text'
                    value={ description }/>
            </div>
        </div>
  );
}

export default Product;
