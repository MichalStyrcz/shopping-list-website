import { useContext } from 'react';
import { DataContext } from './DataContext';
import Products from './Products';
import Toolbar from './Toolbar'


function MainPage() {

    const { error, isLoading } = useContext(DataContext);

    return (
        <main className='MainPage'>
            { error && (
                <p style={{color: "red"}}>{error.message}</p>
            )}
            { isLoading && (
                <p>Loading...</p>
            )}
            { !error && !isLoading && (
                <>
                    <Toolbar />
                    <Products />
                </>
            )}
        </main>
    );
}

export default MainPage;