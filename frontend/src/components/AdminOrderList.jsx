import React from "react";
import OrderItem from "./OrderItem";
import { useGetAllUserOrdersQuery } from "../slices/ordersApiSlice";

const OrderList = () => {
  const { data: orders, isLoading, error } = useGetAllUserOrdersQuery();
  return isLoading ? (
    <p>loading</p>
  ) : (
    <div className="space-y-4 w-full mt-12 ml-16">
      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900">
        All Orders
      </h1>
      {orders?.map((order) => {
        return <OrderItem key={order._id} order={order} isAdmin={true} />;
      })}
    </div>
  );
};

export default OrderList;
