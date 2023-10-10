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
          <h1 className="text-3xl font-bold text-black">Your Favorites</h1>
          {favoriteItems.length === 0 && (
            <div className="text-xl mt-8">
              No items in favorites.
            </div>
          )}
          {favoriteItems.length > 0 && <hr className="w-4/5 mx-auto" />}
          {favoriteItems.length > 0 &&
            favoriteItems.map((product) => (
              <FavoriteItem key={product._id} product={product} />
            ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
