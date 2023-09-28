import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../components/CartItem";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { clearCartItems } from "../slices/cartSlice";
import { useCreateOrderMutation } from "../slices/ordersApiSlice";
import ShippingModal from "./ShippingModal";

const ShoppingCart = () => {
  const [createOrder, { isLoading, error }] = useCreateOrderMutation();
  const [openModal, setOpenModal] = useState(false);
  const [hasShipping, setHasShipping] = useState(false);

  const cart = useSelector((state) => state.cart);
  const cartItems = cart.cartItems;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const checkoutHandler = async () => {
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
      console.log(res);
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <div className="mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-black">Your Cart</h1>
      <div className="flex mt-8">
        <div className="w-3/5 space-y-4 gap-x-8">
          {cartItems.map((product) => {
            return <CartItem key={product._id} product={product} />;
          })}
        </div>
        <div className="w-2/5 flex flex-col">
          <div className="border flex justify-end mx-8 p-8 bg-secondary h-fit mb-4">
            <div className="w-full">
              <dl className="space-y-3 text-md text-black">
                <div className="flex justify-between">
                  <div className="text-xl pb-2">Shipping</div>
                  <div
                    onClick={() => {
                      console.log('closing')
                      setOpenModal(true)
                    } }
                    className="text-sm underline"
                  >
                    Edit
                  </div>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Shipping Address</dt>
                  <dd className="text-sm text-gray-500">??</dd>
                </div>
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
                <hr />
                <div className="flex justify-between">
                  <dt className="text-gray-500">Shipping</dt>
                  <dd className="text-sm text-gray-500">??</dd>
                </div>
                <hr />
                <div className="flex justify-between">
                  <dt className="text-gray-500">Tax</dt>
                  <dd className="text-sm text-gray-500">??</dd>
                </div>
                <hr />
                <div className="flex justify-between text-black text-lg">
                  <dt className="">Total</dt>
                  <dd>£200</dd>
                </div>
              </dl>
              <button
                onClick={checkoutHandler}
                disabled={!hasShipping || cartItems.length === 0}
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
