import { useGetProductsQuery } from "../slices/productsApiSlice.js";
import Product from "../components/Product";

const Products = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();

  return (
    <div>
      {isLoading ? (
        <div>loading</div>
      ) : (
        <div className="mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-black pb-8">All Products</h1>
          <div className="bg-white grid grid-cols-fluid gap-8">
            {products.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
