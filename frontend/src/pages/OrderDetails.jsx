import { Link, useParams } from "react-router-dom";
import { useGetOrderDetailsQuery } from "../slices/ordersApiSlice";

import React from "react";

const OrderDetails = () => {
  const { id: orderId } = useParams();
  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);
  return (
    isLoading ? (<p>loading</p>) : <div>OrderDetails</div>
  )
};

export default OrderDetails;
