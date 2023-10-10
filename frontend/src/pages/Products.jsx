import { useSelector } from "react-redux";
import FavoriteItem from "../components/FavoriteItem";
import { useGetFavoriteProductsQuery } from "../slices/productsApiSlice";

const Favorites = () => {
  const cart = useSelector((state) => state.cart);
  let favoriteItems = cart.favoriteItems;

  const { userInfo } = useSelector((state) => state.auth);
  const {
    data: products,
    isLoading,
    error,
  } = useGetFavoriteProductsQuery(userInfo?._id);

  if (products) {
    favoriteItems = products;
  }

  return (
    <div>
      {isLoading ? (
        <div>loading</div>
      ) : (
        <div className="mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-black">All Products</h1>
          {favoriteItems.map((product) => (
            <FavoriteItem key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
