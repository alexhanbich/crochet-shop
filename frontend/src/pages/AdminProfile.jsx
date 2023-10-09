import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";
import { resetCart } from "../slices/cartSlice";
import EditProfile from "../components/EditProfile";
import AdminOrderList from "../components/AdminOrderList";
import AdminProductList from "../components/AdminProductList";
import AdminUserList from "../components/AdminUserList";

const AdminProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      dispatch(resetCart());
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };
  let [currentComponent, setCurrentComponent] = useState(<AdminOrderList />);
  let [currentString, setCurrentString] = useState("orders");
  let bgOrdersAccent =
    currentString === "orders" ? "bg-accent" : "bg-secondary";
    let bgProductAccent = currentString === "products" ? "bg-accent" : "bg-secondary";
    let bgUserAccent = currentString === "users" ? "bg-accent" : "bg-secondary";

  return (
    <div className="flex">
      <ul className="list-none w-1/5 h-fit bg-secondary mt-12 ml-4">
        <li>
          <button
            className={`w-full p-2 pl-4 text-left ${bgOrdersAccent}`}
            onClick={() => {
              setCurrentString("orders");
              setCurrentComponent(<AdminOrderList />);
            }}
          >
            Orders
          </button>
        </li>
        <li>
          <button
            className={`w-full p-2 pl-4 text-left ${bgProductAccent}`}
            onClick={() => {
              setCurrentString("products");
              setCurrentComponent(<AdminProductList />);
            }}
          >
            Products
          </button>
        </li>
        <li>
          <button
            className={`w-full p-2 pl-4 text-left ${bgUserAccent}`}
            onClick={() => {
              setCurrentString("users");
              setCurrentComponent(<AdminUserList />);
            }}
          >
            Users
          </button>
        </li>
        <li>
          <button className="w-full p-2 pl-4 text-left" onClick={logoutHandler}>
            Logout
          </button>
        </li>
      </ul>
      <div className="w-4/5">{currentComponent}</div>
    </div>
  );
};

export default AdminProfile;
