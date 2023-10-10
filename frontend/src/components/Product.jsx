import { Link } from "react-router-dom";
import { LiaShoppingBagSolid, LiaHeart } from "react-icons/lia";
import Rating from "./Rating";
import { useUpdateFavoritesMutation } from "../slices/usersApiSlice";
import { addToCart } from "../slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const Product = ({ product }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);
  let favoriteItems = cart.favoriteItems;
  const [updateFavorites, { isLoading: loadingUpdateFavorites }] =
    useUpdateFavoritesMutation();

  const dispatch = useDispatch();

  const addToCartHandler = () => {
    const cnt = 1;
    dispatch(addToCart({ ...product, cnt }));
  };

  const addToFavoritesHandler = async () => {
    try {
      const res = await updateFavorites({
        userId: userInfo._id,
        favorites: product._id,
      }).unwrap();
      if (res.didUpdate) {
        toast.success("Added to favorites.");
      } else {
        toast.warning("Already in favorites.");
      }
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  return (
    <div>
      <div className="flex flex-col border w-56 mx-auto group overflow-hidden">
        <div className="relative flex h-56 w-56">
          <Link to={`/product/${product._id}`}>
            <img
              className="absolute top-0 right-0 h-full w-full object-cover"
              src={product.image}
              alt="img"
            />
          </Link>
          <div className="absolute text-bold -right-11 bottom-3 space-y-3 transition-all duration-500 group-hover:right-3">
            <button
              className="flex h-8 w-8 items-center justify-center bg-secondary text-red-800 transition hover:bg-accent"
              onClick={addToFavoritesHandler}
            >
              <LiaHeart />
            </button>
            <button
              className="flex h-8 w-8 items-center justify-center bg-secondary text-black transition hover:bg-accent"
              onClick={addToCartHandler}
            >
              <LiaShoppingBagSolid />
            </button>
          </div>
        </div>

        <div className="mx-5">
          <Link to={`/product/${product._id}`}>
            <div className="flex justify-between space-y-1">
              <h5 className="w-3/4 truncate text-gray-700 mt-1">
                {product.name}
              </h5>
              <Rating value={product.rating} />
            </div>
            <h5 className="text-center font-bold text-gray-900 mb-2">
              ${product.price.toFixed(2)}
            </h5>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Product;
