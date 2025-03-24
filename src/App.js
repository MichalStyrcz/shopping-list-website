import './App.css';
import { DataProvider } from './DataContext';
import Header from './Header';
import MainPage from './MainPage';

function App() {
  return (
    <div className='App'>
      <DataProvider>
        <Header title='Lista Zakupów' />
        <MainPage />
      </DataProvider>
    </div>
  );
}

export default App;
