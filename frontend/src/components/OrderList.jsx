import React from "react";
import OrderItem from "./OrderItem";
import { useGetOrdersQuery } from "../slices/ordersApiSlice";

const OrderList = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();
  return isLoading ? (
    <p>loading</p>
  ) : (
    <div className="space-y-4 w-full pt-12 pl-16">
      <h1 className="text-xl font-bold">
        Past Orders
      </h1>
      {orders?.map((order) => {
        return <OrderItem key={order._id} order={order}/>;
      })}
    </div>
  );
};

export default OrderList;
