import { useSelector, useDispatch } from "react-redux";
import FavoriteItem from "../components/FavoriteItem";
import { updateLocalFavorites } from "../slices/cartSlice";
import { useGetFavoritesQuery } from "../slices/usersApiSlice";
import { useState } from "react";

const Favorites = () => {
  const { favoriteItems } = useSelector((state) => state.cart);

  return (
    <div>
      <div className="mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-black">Your Favorites</h1>
        {favoriteItems.length === 0 && (
          <div className="text-xl mt-8">No items in favorites.</div>
        )}
        {favoriteItems.length > 0 && (
          <hr className="mt-8 text-lightgray mx-auto" />
        )}
        {favoriteItems.length > 0 &&
          favoriteItems.map((product) => (
            <FavoriteItem key={product._id} product={product} />
          ))}
      </div>
    </div>
  );
};

export default Favorites;
