import Product from "../components/Product";
import { useGetProductsQuery } from "../slices/productsApiSlice.js";

const Home = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();
  return (
    <>
      {isLoading ? (
        <p>Loading... </p>
      ) : error ? (
        <p>{error?.data?.message || error.error}</p>
      ) : (
        <>
            <div className="flex w-full text-2xl py-8 full-bleed-accent bg-accent">
              <div className="w-1/2 h-64 flex">
                <div className="flex flex-col">
                  <h1 className="ml-24 mt-8">HANDMADE CROCHET</h1>
                  <p className="ml-24 py-4 text-sm">Welcome to Hangy Shop, your destination for beautifully crafted crochet creations. Explore our unique, handmade items with love in every stitch. Shop with us and experience the artistry of crochet today!</p>
                </div>
              </div>
              <div className="flex justify-center w-1/2">
                <img className="h-64 -mt-8" src="/images/yarn.png" />
              </div>
            </div>
            <div className="flex justify-center items-center text-3xl pt-12">Products</div>
            <div className="bg-white pt-6 grid grid-cols-fluid gap-8">
              {products.map((product) => (
                <Product key={product._id} product={product} />
              ))}
            </div>
        </>
      )}
    </>
  );
};

export default Home;
