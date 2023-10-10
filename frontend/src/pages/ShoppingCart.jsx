import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../components/CartItem";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { clearCartItems } from "../slices/cartSlice";
import { useCreateOrderMutation } from "../slices/ordersApiSlice";
import ShippingModal from "./ShippingModal";
import { BsPlusSquareDotted } from "react-icons/bs";

const ShoppingCart = () => {
  const [createOrder, { isLoading, error }] = useCreateOrderMutation();
  const [openModal, setOpenModal] = useState(false);

  const cart = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const cartItems = cart.cartItems;
  const shippingAddress = cart.shippingAddress;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const hasShipping = () => {
    return JSON.stringify(shippingAddress) !== "{}";
  };

  const checkoutHandler = async () => {
    navigate("/login?redirect=cart");
    console.log(userInfo);
    if (userInfo) {
      try {
        const res = await createOrder({
          orderItems: cart.cartItems,
          shippingAddress: cart.shippingAddress,
          paymentMethod: cart.paymentMethod,
          itemsPrice: cart.itemsPrice,
          shippingPrice: cart.shippingPrice,
          taxPrice: cart.taxPrice,
          totalPrice: cart.totalPrice,
        }).unwrap();
        dispatch(clearCartItems());
        navigate(`/order/${res._id}`);
      } catch (err) {
        toast.error(err);
      }
    }
  };

  return (
    <div className="mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-black">Your Cart</h1>
      <div className="flex mt-8">
        {cartItems.length === 0 ? (
          <div className="text-xl w-3/5 space-y-4 gap-x-8">
            No items in cart.
          </div>
        ) : (
          <div className="w-3/5 space-y-4 gap-x-8">
            <hr className="text-lightgray"  />
            {cartItems.map((product) => {
              return (
                <CartItem key={product._id} product={product} canEdit={true} />
              );
            })}
          </div>
        )}
        <div className="w-2/5 flex flex-col">
          <div className="border flex justify-end mx-8 p-8 bg-secondary h-fit mb-4">
            <div className="w-full">
              <dl className="space-y-3 text-md text-black">
                <div className="flex justify-between">
                  <div className="text-xl pb-2">Shipping Address</div>
                  <div
                    onClick={() => {
                      setOpenModal(true);
                    }}
                    className="text-sm underline hover:cursor-pointer"
                  >
                    Edit
                  </div>
                </div>
                {hasShipping() ? (
                  <div className="flex flex-col text-sm">
                    <div>
                      {shippingAddress.firstName} {shippingAddress.lastName}
                    </div>
                    <div>
                      {shippingAddress.address},{" "}
                      {shippingAddress.addressDetails}
                    </div>
                    <div>
                      {shippingAddress.city}, {shippingAddress.state},{" "}
                      {shippingAddress.zipCode}
                    </div>
                    <div>{shippingAddress.country}</div>
                    <div>{shippingAddress.phone}</div>
                  </div>
                ) : (
                  <div
                    onClick={() => {
                      setOpenModal(true);
                    }}
                    className="flex justify-center space-x-2 items-center hover:underline hover:cursor-pointer"
                  >
                    <BsPlusSquareDotted />
                    <div className="text-gray-500">Add Address</div>
                  </div>
                )}
              </dl>
              <ShippingModal
                openModal={openModal}
                closeModal={() => setOpenModal(false)}
              />
            </div>
          </div>
          <div className="border flex justify-end mx-8 px-8 py-6 bg-secondary h-fit">
            <div className="w-full">
              <dl className="space-y-3 text-md text-black">
                <div className="text-xl pb-2">Order Summary</div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">
                    Subtotal (
                    {cartItems.reduce((acc, item) => acc + item.cnt, 0)})
                  </dt>
                  <dd>
                    $
                    {cartItems
                      .reduce((acc, item) => acc + item.cnt * item.price, 0)
                      .toFixed(2)}
                  </dd>
                </div>
                <hr className="text-lightgray"  />
                <div className="flex justify-between">
                  <dt className="text-gray-500">Shipping</dt>
                  {!hasShipping() ? (
                    <dd className="text-sm text-gray-500">-</dd>
                  ) : (
                    <dd className="text-sm text-gray-500">
                      ${cart.shippingPrice}
                    </dd>
                  )}
                </div>
                <hr className="text-lightgray"  />
                <div className="flex justify-between">
                  <dt className="text-gray-500">Tax</dt>
                  {!hasShipping() ? (
                    <dd className="text-sm text-gray-500">-</dd>
                  ) : (
                    <dd className="text-sm text-gray-500">${cart.taxPrice}</dd>
                  )}
                </div>
                <hr className="text-lightgray"  />
                <div className="flex justify-between text-black text-lg">
                  <dt className="">Total</dt>
                  {!hasShipping() ? <dd>-</dd> : <dd>${cart.totalPrice}</dd>}
                </div>
              </dl>
              <button
                onClick={checkoutHandler}
                disabled={!hasShipping() || cartItems.length === 0}
                className="w-full rounded-full bg-black mt-5 p-3 text-sm text-white transition hover:bg-gray-600 disabled:bg-gray-400"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
