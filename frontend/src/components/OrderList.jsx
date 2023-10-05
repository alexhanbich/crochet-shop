import React from "react";
import OrderItem from "./OrderItem";
import { useGetOrdersQuery } from "../slices/ordersApiSlice";

const OrderList = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();
  console.log(orders)
  return isLoading ? (
    <p>loading</p>
  ) : (
    <div className="space-y-4 w-full mt-12 ml-16">
      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900">
        Past Orders
      </h1>
      {orders?.map((order) => {
        return <OrderItem key={order._id} order={order} />;
      })}
    </div>
  );
};

export default OrderList;
