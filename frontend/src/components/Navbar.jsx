import {
  LiaHomeSolid,
  LiaHeart,
  LiaShoppingBagSolid,
  LiaUserCircleSolid,
} from "react-icons/lia";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <nav className="grid grid-cols-3 w-full text-xl pt-4 pb-4 full-bleed-accent bg-accent">
      <Link to="/">
        <div className="group">
          <LiaHomeSolid className="mt-4 ml-4" />
          <hr className="border-transparent mt-1 ml-4 w-5 group-hover:border-black" />
        </div>
      </Link>
      <Link to="/" className="mt-4 justify-self-center align-self-center">
        <h1 className="font-logo align-self-center">HANGY SHOP</h1>
      </Link>
      <div className="flex justify-self-end mt-4">
        <div className="group">
          <Link to="/">
            <LiaHeart className="mr-4 text-red-800" />
          </Link>
          <hr className="border-transparent mt-1 mr-4 w-5 group-hover:border-black" />
        </div>
        <div className="group relative">
          <Link to="/cart">
            <LiaShoppingBagSolid className="mr-4" />
          </Link>
          {cartItems.length > 0 && (
            <div className="absolute -mt-6 ml-3 w-3 h-3 rounded-full bg-red-600 flex justify-center items-center">
              <p className="text-xxs text-white">
                {cartItems.reduce((i, acc) => i + acc.cnt, 0)}
              </p>
            </div>
          )}
          <hr className="border-transparent mt-1 mr-4 w-5 group-hover:border-black" />
        </div>
        {userInfo ? (
          <div className="group">
            <Link to="/cart">
              <LiaUserCircleSolid className="mr-4" />
            </Link>
            <hr className="border-transparent mt-1 mr-4 w-5 group-hover:border-black" />
          </div>
        ) : (
          <div className="group">
            <Link to="/login">
              <LiaUserCircleSolid className="mr-4" />
            </Link>
            <hr className="border-transparent mt-1 mr-4 w-5 group-hover:border-black" />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
