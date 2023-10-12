import React from "react";
import { useNavigate } from "react-router-dom";
import { date } from "../utils/utils";

const OrderItem = (props) => {
  const { order } = props;
  const orderItems =
    order.orderItems.length > 3
      ? order.orderItems.slice(0, 2)
      : order.orderItems;
  const navigate = useNavigate();
  const viewOrderHandler = () => {
    const id = order._id;
    navigate("/order/" + id);
  };
  return (
    <div>
      <div className="flex items-center justify-between gap-4 text-sm">
        <div className="flex space-x-8">
          <div className="flex flex-col space-y-1">
            <h1>Order #{order._id}</h1>
            <div className="text-gray">{ date(order.createdAt) }</div>
            <a
              className="text-green hover:cursor-pointer"
              onClick={viewOrderHandler}
            >
              View Order {"->"}
            </a>
          </div>
          {order.isDelivered ? (
            <div className="flex items-center space-x-2">
              <span className="h-2 w-2 rounded-full bg-green inline-block"></span>
              <div className="text-gray">Delivered</div>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <span className="h-2 w-2 rounded-full bg-lightgray inline-block"></span>
              <div className="text-gray">In Progress</div>
            </div>
          )}
          
        </div>
        <div className="flex">
          {orderItems.map((item) => {
            return (
              <img
                key={item.image}
                src={item.image}
                alt="image"
                className="h-32 w-32 rounded object-cover"
              />
            );
          })}
        </div>
      </div>
      <hr className="text-lightgray" />
    </div>
  );
};

export default OrderItem;
