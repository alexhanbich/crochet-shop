import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";
import { resetCart } from "../slices/cartSlice";
import EditProfile from "../components/EditProfile";
import OrderList from "../components/OrderList";

const Profile = () => {
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
  let [currentComponent, setCurrentComponent] = useState(<OrderList />);
  let [currentString, setCurrentString] = useState("orders");
  let bgProfileAccent = currentString === "edit" ? "bg-primary" : "bg-secondary";
  let bgOrdersAccent =
    currentString === "orders" ? "bg-primary" : "bg-secondary";

  return (
    <div className="flex">
      <ul className="list-none w-1/5 h-fit bg-secondary mt-12 ml-4">
        <li>
          <button
            className={`w-full p-2 pl-4 text-left ${bgOrdersAccent}`}
            onClick={() => {
              setCurrentString("orders");
              setCurrentComponent(<OrderList />);
            }}
          >
            Past Orders
          </button>
        </li>
        <li>
          <button
            className={`w-full p-2 pl-4 text-left ${bgProfileAccent}`}
            onClick={() => {
              setCurrentString("edit");
              setCurrentComponent(<EditProfile />);
            }}
          >
            Edit Profile
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

export default Profile;
