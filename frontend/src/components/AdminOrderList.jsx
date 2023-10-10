import React from "react";
import AdminOrderItem from "./AdminOrderItem";
import { useGetAllUserOrdersQuery } from "../slices/ordersApiSlice";

const AdminOrderList = () => {
  const { data: orders, isLoading, error } = useGetAllUserOrdersQuery();
  return isLoading ? (
    <p>loading</p>
  ) : (
    <div className="space-y-4 w-full pt-12 pl-16">
      <h1 className="text-xl font-bold text-gray-900">
        All Orders
      </h1>
      <table className="table-auto w-full text-left border">
        <thead className="border">
          <tr>
            <th className="px-2">Order #</th>
            <th className="px-2">Name</th>
            <th className="px-2">Date</th>
            <th className="px-2">Status</th>
          </tr>
        </thead>
        <tbody className="border">
          {orders?.map((order) => {
            return (
              <AdminOrderItem key={order._id} order={order} isAdmin={true} />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AdminOrderList;
