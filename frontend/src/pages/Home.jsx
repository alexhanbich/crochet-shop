import Product from "../components/Product";
import { useGetProductsQuery } from "../slices/productsApiSlice.js";

const Home = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();
  const featuredProducts = products?.slice(0, 4);
  return (
    <>
      {isLoading ? (
        <p>Loading... </p>
      ) : error ? (
        <p>{error?.data?.message || error.error}</p>
      ) : (
        <>
          <div className="flex w-full text-2xl py-8 full-bleed-accent bg-primary">
            <div className="w-1/2 h-48 flex">
              <div className="flex flex-col">
                <h1 className="ml-24">Handmade Crochet</h1>
                <p className="ml-24 py-4 text-sm">
                  Welcome to Hangy Shop, your destination for beautifully
                  crafted crochet creations. Explore our unique, handmade items
                  with love in every stitch. Shop with us and experience the
                  artistry of crochet today!
                </p>
                <button className="ml-24 text-sm w-32 bg-black text-white p-2 mt-2 rounded">View Products {"->"}</button>
              </div>
            </div>
            <div className="flex justify-center w-1/2">
              <img className="h-48 -mt-4" src="/images/yarn.png" />
            </div>
          </div>
          <div className="text-3xl py-4 px-8"> Featured Products</div>
          <div className="bg-white grid grid-cols-fluid gap-8">
            {featuredProducts.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Home;
