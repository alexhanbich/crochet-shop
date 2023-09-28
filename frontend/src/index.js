import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import './index.css';
import App from './App';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import ShoppingCart from './pages/ShoppingCart';
import Login from './pages/Login';
import Register from './pages/Register';
import PrivateRoute from './components/PrivateRoute';
import OrderDetails from './pages/OrderDetails';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={ <App />}>
      <Route index={ true } path='/' element={ <Home />} />
      <Route path='/product/:id' element={<ProductDetails />} />
      <Route path='/cart' element={<ShoppingCart />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='' element={<PrivateRoute />}>
        <Route path='/order/:id' element={<OrderDetails />} />
      </Route>
    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
     <RouterProvider router={ router } />
    </Provider>
  </React.StrictMode>
);
