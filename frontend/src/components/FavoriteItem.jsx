import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromFavorites} from "../slices/cartSlice";
import { LiaTrashAlt, LiaShoppingBagSolid } from "react-icons/lia";
import { useRemoveFavoritesMutation } from "../slices/usersApiSlice";
import { toast } from "react-toastify";
import Rating from "./Rating";

const FavoriteItem = ({ product, refetch }) => {
  const dispatch = useDispatch();
  const addToCartHandler = async (item, cnt) => {
    dispatch(addToCart({ ...item, cnt }));
  };

  const { userInfo } = useSelector((state) => state.auth);

  const [removeFavorites, { isLoading: loadingRemoveFavorites }] =
    useRemoveFavoritesMutation();

  const removeFromFavoritesHandler = async (productId) => {
    dispatch(removeFromFavorites({ ...product }))
    try {
      const res = await removeFavorites({
        userId: userInfo._id,
        favoriteId: productId,
      }).unwrap();
      if (res.didUpdate) {
        toast.success("Removed from favorites.");
        refetch();
      } else {
        toast.warning("Already removed from favorites.");
      }
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  return (
    <div className="mx-auto">
      <div className="grid grid-cols-5 items-center justify-center gap-8">
        <img
          src={product.image}
          alt="image"
          className="h-32 w-32 rounded object-cover"
        />
        <div>
          <Link to={`/product/${product._id}`}>
            <h3 className="text-lg text-gray-700 hover:cursor-pointer hover:underline">
              {product.name}
            </h3>
          </Link>
        </div>
        <h5 className="text-lg text-center font-bold text-gray-900">
          ${product.price.toFixed(2)}
        </h5>
        <Rating value={product.rating} />
        <div className="flex flex-1 items-center justify-end gap-6">
          <LiaShoppingBagSolid
            className="text-xl text-black hover:text-gray-500 hover:cursor-pointer"
            onClick={() => addToCartHandler(product, Number(1))}
          />
          <LiaTrashAlt
            className="text-xl text-red hover:text-red hover:cursor-pointer"
            onClick={() => removeFromFavoritesHandler(product._id)}
          />
        </div>
      </div>
      <hr className="text-lightgray" />
    </div>
  );
};

export default FavoriteItem;
