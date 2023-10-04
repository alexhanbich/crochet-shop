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
              <div className="w-1/2 h-96 flex">
                <div className="flex flex-col justify-center">
                  <h1 className="ml-24">HANDMADE CROCHET</h1>
                  <p className="ml-24 py-4 text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                  <p className="ml-24 mt-4 underline text-sm">Discover More</p>
                </div>
              </div>
              <div className="flex justify-center w-1/2">
                <img className="h-96 p-8" src="/images/yarn.png" />
              </div>
            </div>
            <div className="bg-white pt-12 flex flex-wrap justify-around gap-8">
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
