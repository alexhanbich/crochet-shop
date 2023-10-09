import { useSelector } from "react-redux";
import FavoriteItem from "../components/FavoriteItem";
import { useGetFavoriteProductsQuery } from "../slices/productsApiSlice";

const Favorites = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const {
    data: products,
    isLoading,
    error,
  } = useGetFavoriteProductsQuery(userInfo._id);

  return (
    <div>
      {isLoading ? (
        <div>loading</div>
      ) : (
        <div>
          <div className="flex justify-center text-3xl pt-12 pb-6">
            Favorites
          </div>
          <hr className="w-4/5 mx-auto" />
          {products.map((product) => (
            <FavoriteItem key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
