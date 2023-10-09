import React from "react";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../slices/cartSlice";
import { LiaTrashAlt, LiaShoppingBagSolid } from "react-icons/lia";
import Rating from "./Rating";

const FavoriteItem = (props) => {
  const product = props.product;
  const dispatch = useDispatch();
  const addToCartHandler = async (item, cnt) => {
    dispatch(addToCart({ ...item, cnt }));
  };
  const removeFromFavorites = async (id) => {
    dispatch(removeFromCart(id));
  };
  return (
    <div className="w-4/5 mx-auto">
      <div className="grid grid-cols-5 items-center justify-center gap-8">
        <img
          src={product.image}
          alt="image"
          className="h-32 w-32 rounded object-cover"
        />
        <div>
          <h3 className="text-lg text-gray-700">{product.name}</h3>
        </div>
        <h5 className="text-lg text-center font-bold text-gray-900">
          ${product.price.toFixed(2)}
        </h5>
        <Rating value={product.rating} />
        <div className="flex flex-1 items-center justify-end gap-6">
          <LiaShoppingBagSolid
            className="text-xl hover:text-red-600"
            onClick={() => addToCartHandler(product, Number(1))}
          />
          <LiaTrashAlt
            className="text-xl hover:text-red-600"
            onClick={() => removeFromFavorites(product._id)}
          />
        </div>
      </div>
      <hr />
    </div>
  );
};

export default FavoriteItem;
