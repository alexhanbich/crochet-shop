import { useParams, useNavigate } from "react-router-dom";
import { useGetProductDetailsQuery } from "../slices/productsApiSlice";
import { useUpdateFavoritesMutation } from "../slices/usersApiSlice";
import { addToCart } from "../slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import Rating from "../components/Rating";
import { useState } from "react";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [cnt, setCnt] = useState(1);
  const { data: product, isLoading, error } = useGetProductDetailsQuery(id);

  const { userInfo } = useSelector((state) => state.auth);

  const [updateFavorites, { isLoading: loadingUpdateFavorites }] =
    useUpdateFavoritesMutation();

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, cnt }));
  };

  const addToFavoritesHandler = async () => {
    try {
      const res = await updateFavorites({
        userId: userInfo._id,
        favorites: id,
      }).unwrap();
      console.log(res);
      if (res.didUpdate) {
        toast.success("Added to Favorites.");
      }
      else {
        toast.warning("Already in Favorites.");
      }
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  
  return (
    <>
      {isLoading ? (
        <p>Loading... </p>
      ) : error ? (
        <p>{error?.data?.message || error.error}</p>
      ) : (
        <>
          <div className="flex bg-white p-4 pt-16">
            <img className="w-1/2 p-8" src={product.image} />
            <div className="w-1/2 p-8 pl-0">
              <h1 className="text-2xl pb-4">{product.name}</h1>
              {product.numStock > 0 ? (
                <p className="pb-4 text-gray-500">In Stock</p>
              ) : (
                <p className="pb-4 text-gray-500">Out of Stock</p>
              )}
              <div className="flex text-lg items-center pb-4">
                <h5 className="font-bold text-gray-900 mr-4">
                  ${product.price.toFixed(2)}
                </h5>
                <Rating value={product.rating} />
              </div>
              <p className="pb-8">{product.description}</p>
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
              <div className="flex text-gray-500 items-center mt-4">
                <button
                  onClick={addToCartHandler}
                  disabled={product.numStock < 1}
                  className="w-1/3 bg-gray-900 text-white border rounded-2xl p-2 hover:bg-gray-700 disabled:bg-gray-500"
                >
                  Add To Bag
                </button>
                <p className="mx-6"> or </p>
                <button
                  className="w-1/3 bg-white text-black border rounded-2xl p-2 hover:bg-gray-200"
                  onClick={addToFavoritesHandler}
                >
                  Favorite
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default ProductDetails;
