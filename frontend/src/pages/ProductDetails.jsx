import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';


const ProductDetails = () => {
  const [product, setProduct] = useState({});
  const { id } = useParams();
  useEffect(() => {
    const getProduct = async () => {
      const { data } = await axios.get('/api/product');
      setProduct(data);
    };
    getProduct();
  }, [id])
  return (
    <div>ProductDetails</div>
  )
};
export default ProductDetails;