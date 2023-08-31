import { useEffect, useState } from 'react';
import axios from 'axios';
import Product from '../components/Product';

const Home = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const getProducts = async () => {
      const { data } = await axios.get('/api/products');
      setProducts(data);
    };
    getProducts();
  }, []);
  return (
    <Product product={products}/>
  )
};

export default Home;