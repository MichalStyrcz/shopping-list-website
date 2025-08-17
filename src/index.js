import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import CreateProduct from './CreateProduct';
import DeleteProduct from './DeleteProduct';
import EditProduct from './EditProduct';
import NotFound from './NotFound';
import { DataProvider } from './DataContext';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
  },
  {
    path: '/product-delete',
    element: <DeleteProduct />,
  },
  {
    path: '/product-edit',
    element: <EditProduct />,
  },
  {
    path: '/product-new',
    element: <CreateProduct />,
  }
]);

root.render(
  <React.StrictMode>
    <DataProvider>
    <RouterProvider router={router} />
    </DataProvider>
  </React.StrictMode>
);