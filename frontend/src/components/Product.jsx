import { Link } from "react-router-dom";
import { LiaShoppingBagSolid, LiaHeart } from "react-icons/lia";
import Rating from "./Rating";

const Product = ({ product }) => {
  return (
    <div>
      <div className="flex flex-col border w-64 group overflow-hidden">
        <div className="relative flex h-64 w-64">
          <Link to={`/product/${product._id}`}>
            <img
              className="absolute top-0 right-0 h-full w-full object-cover"
              src={product.image}
              alt="img"
            />
          </Link>
          <div className="absolute -right-11 bottom-3 space-y-3 transition-all duration-500 group-hover:right-3">
            <button className="flex h-8 w-8 items-center justify-center bg-transparent text-red-800 transition hover:bg-gray-200">
              <LiaHeart />
            </button>
            <button className="flex h-8 w-8 items-center justify-center bg-transparent text-black transition hover:bg-gray-200">
              <LiaShoppingBagSolid />
            </button>
          </div>
        </div>

        <div className="mx-5 my-3">
          <Link to={`/product/${product._id}`}>
            <div className="flex justify-between">
              <h5 className="w-3/4 truncate text-gray-700 mt-1">
                {product.name}
              </h5>
              <Rating value={product.rating} />
            </div>
            <h5 className="text-lg text-center font-bold text-gray-900 mt-1">
              ${product.price.toFixed(2)}
            </h5>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Product;
