import { useParams, useNavigate } from "react-router-dom";
import { useGetProductDetailsQuery } from "../slices/productsApiSlice";
import { useUpdateFavoritesMutation } from "../slices/usersApiSlice";
import { addToCart, addToFavorites } from "../slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import Rating from "../components/Rating";
import { useState } from "react";
import { toast } from "react-toastify";
import { date } from "../utils/utils";
import RatingExtended from "../components/RatingExtended";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [cnt, setCnt] = useState(1);
  const {
    data: product,
    isLoading,
    error,
    refetch,
  } = useGetProductDetailsQuery(id);
  const { userInfo } = useSelector((state) => state.auth);

  const { favoriteItems } = useSelector((state) => state.cart);
  const [updateFavorites, { isLoading: loadingUpdateFavorites }] =
    useUpdateFavoritesMutation();

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, cnt }));
  };

  const addToFavoritesHandler = async () => {
    dispatch(addToFavorites({ ...product }));
    if (userInfo) {
      try {
        let newFavoriteItems = [...favoriteItems];
        if (!favoriteItems.includes(product)) {
          newFavoriteItems = [...favoriteItems, product];
        }
        await updateFavorites({
          userId: userInfo._id,
          favoriteItems: newFavoriteItems,
        });
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
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
            <img className="w-1/2 h-1/2" src={product.image} />
            <div className="w-1/2 pt-8">
              <h1 className="text-2xl pb-4">{product.name}</h1>
              {product.numStock > 0 ? (
                <p className="pb-4 text-gray">In Stock</p>
              ) : (
                <p className="pb-4 text-gray">Out of Stock</p>
              )}
              <div className="flex text-lg items-center pb-4">
                <h5 className="font-body2 font-medium mr-4">
                  ${product.price.toFixed(2)}
                </h5>
                <Rating value={product.rating.toFixed(2)} />
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
              <div className="flex text-gray items-center mt-4">
                <button
                  onClick={addToCartHandler}
                  disabled={product.numStock < 1}
                  className="w-1/3 bg-black text-white border rounded-2xl p-2 hover:bg-gray"
                >
                  Add To Bag
                </button>
                <p className="mx-6"> or </p>
                <button
                  className="w-1/3 bg-white text-black border rounded-2xl p-2 hover:bg-lightgray"
                  onClick={addToFavoritesHandler}
                >
                  Favorite
                </button>
              </div>
              <div className="flex pt-8 pb-4 items-center space-x-6">
                <h1 className="text-2xl ">Reviews</h1>
                {product.reviews.length > 0 && (
                  <div className="text-sm hover:cursor-pointer hover:underline">
                    View All{"->"}
                  </div>
                )}
              </div>

              <hr className="text-lightgray px-2" />
              {product.reviews.length > 0 ? (
                product.reviews.slice(0,2).map((review) => {
                  return (
                    <div className="w-full">
                      <div>{review.name}</div>
                      <div className="flex space-x-6">
                        <RatingExtended value={review.rating} />
                        <div>{date(review.updatedAt)}</div>
                      </div>
                      <div className="py-2">{review.comment}</div>
                      <div className="py-1"></div>
                      <hr className="text-lightgray px-2" />
                      <div className="py-1"></div>
                    </div>
                  );
                })
              ) : (
                <div className="text-lg py-2">No Reviews.</div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default ProductDetails;
