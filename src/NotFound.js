import { Link } from 'react-router-dom';
import './App.css';
import Header from './Header';

function NotFound() {
  return (
    <div className='App'>
        <Header title='Nie znaleziono strony' />
        <Link to="/">Wróć do strony głównej</Link>
    </div>
  );
}

export default NotFound;
