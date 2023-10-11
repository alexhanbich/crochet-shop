import { useParams } from "react-router-dom";
import {
  useGetOrderDetailsQuery,
  useDeliverOrderMutation,
} from "../slices/ordersApiSlice";
import CartItem from "../components/CartItem";
import { date } from "../utils/utils";
import { useSelector } from "react-redux";

import React from "react";

const OrderDetails = () => {
  const { id: orderId } = useParams();
  const { userInfo } = useSelector((state) => state.auth);
  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();

  const deliverHandler = async () => {
    await deliverOrder(orderId);
    refetch();
  };

  const orderItems = order?.orderItems;
  return isLoading ? (
    <p>loading</p>
  ) : (
    <div className="mx-auto px-4 py-8">
      <div className="flex space-x-8">
        <h1 className="text-3xl font-bold text-black mb-8">
          Order #{order._id}
        </h1>
        {userInfo.isAdmin ? (
          <button
            className="bg-black px-2 text-white border rounded-xl mb-8 disabled:bg-gray hover:bg-gray"
            onClick={deliverHandler}
            disabled={order.isDelivered}
          >
            Mark as Delivered
          </button>
        ) : (
          <div></div>
        )}
      </div>

      <div className="flex mb-8 space-x-12">
        <div className="text-lg">Order Date: {date(order.createdAt)}</div>
        {order.isDelivered ? (
          <button
            disabled
            className="bg-white px-2 text-green border rounded-xl"
          >
            Delivered
          </button>
        ) : (
          <button disabled className="bg-white px-2 text-red border rounded-xl">
            Not Delivered
          </button>
        )}
      </div>

      <div className="text-2xl pb-4">Your Items</div>
      <div className="flex justify-between">
        <div className="w-3/5 space-y-4 gap-x-8">
          <hr className="text-lightgray" />
          {orderItems.map((product) => {
            return (
              <CartItem key={product._id} product={product} canEdit={false} />
            );
          })}
        </div>
        <div className="w-2/5 flex flex-col">
          <div className="border flex justify-end mx-8 p-8 bg-secondary h-fit mb-4">
            <div className="w-full">
              <dl className="space-y-3 text-md text-black">
                <div className="text-xl font-bold mb-4">Delivery Address</div>
                <div className="flex flex-col text-md">
                  <div>
                    {order.shippingAddress.firstName}{" "}
                    {order.shippingAddress.lastName}
                  </div>
                  <div>
                    {order.shippingAddress.address},{" "}
                    {order.shippingAddress.addressDetails}
                  </div>
                  <div>
                    {order.shippingAddress.city}, {order.shippingAddress.state},{" "}
                    {order.shippingAddress.zipCode}
                  </div>
                  <div>{order.shippingAddress.country}</div>
                  <div>{order.shippingAddress.phone}</div>
                </div>
              </dl>
            </div>
          </div>
          <div className="border flex justify-end mx-8 px-8 py-6 bg-secondary h-fit">
            <div className="w-full">
              <dl className="space-y-3 text-md text-black">
                <div className="text-xl pb-2">Payment Summary</div>
                <div className="flex justify-between">
                  <dt className="text-gray">
                    Subtotal (
                    {orderItems.reduce((acc, item) => acc + item.cnt, 0)})
                  </dt>
                  <dd>
                    $
                    {orderItems
                      .reduce((acc, item) => acc + item.cnt * item.price, 0)
                      .toFixed(2)}
                  </dd>
                </div>
                <hr className="text-lightgray" />
                <div className="flex justify-between">
                  <dt className="text-gray">Shipping</dt>
                  <dd className="text-sm text-gray">
                    ${order.shippingPrice.toFixed(2)}
                  </dd>
                </div>
                <hr className="text-lightgray" />
                <div className="flex justify-between">
                  <dt className="text-gray">Tax</dt>
                  <dd className="text-sm text-gray">
                    ${order.taxPrice.toFixed(2)}
                  </dd>
                </div>
                <hr className="text-lightgray" />
                <div className="flex justify-between text-black text-lg">
                  <dt className="">Total</dt>
                  <dd>${order.totalPrice.toFixed(2)}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
