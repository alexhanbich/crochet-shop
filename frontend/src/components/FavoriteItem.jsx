import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromFavorites } from "../slices/cartSlice";
import { LiaTrashAlt, LiaShoppingBagSolid } from "react-icons/lia";
import { useRemoveFavoritesMutation } from "../slices/usersApiSlice";
import { toast } from "react-toastify";
import Rating from "./Rating";

const FavoriteItem = ({ product, refetch }) => {
  const [cnt, setCnt] = useState(1);
  const dispatch = useDispatch();
  const addToCartHandler = async (item, cnt) => {
    dispatch(addToCart({ ...item, cnt }));
  };

  const { userInfo } = useSelector((state) => state.auth);

  const [removeFavorites, { isLoading: loadingRemoveFavorites }] =
    useRemoveFavoritesMutation();

  const removeFromFavoritesHandler = async (productId) => {
    dispatch(removeFromFavorites({ ...product }));
    try {
      const res = await removeFavorites({
        userId: userInfo._id,
        favoriteId: productId,
      }).unwrap();
      if (res.didUpdate) {
        refetch();
      }
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  return (
    <div className="mx-auto">
      <div className="grid grid-cols-6 items-center justify-center gap-8">
        <img
          src={product.image}
          alt="image"
          className="h-32 w-32 rounded object-cover"
        />
        <div>
          <Link to={`/product/${product._id}`}>
            <h3 className="text-lg hover:cursor-pointer hover:underline">
              {product.name}
            </h3>
          </Link>
        </div>
        <h5 className="text-lg text-center font-body2 font-medium">
          ${product.price.toFixed(2)}
        </h5>
        <Rating value={product.rating} />
        {product.numStock > 0 && (
          <select
            value={cnt}
            onChange={(i) => setCnt(Number(i.target.value))}
            className="py-2 px-2 border w-fit h-fit focus:outline-none"
          >
            {[...Array(product.numStock).slice(0, 9)].map((_, i) => {
              return <option key={i + 1}>{i + 1}</option>;
            })}
          </select>
        )}
        <div className="flex flex-1 items-center justify-end gap-6">
          <LiaShoppingBagSolid
            className="text-xl hover:text-gray hover:cursor-pointer"
            onClick={() => addToCartHandler(product, cnt)}
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
