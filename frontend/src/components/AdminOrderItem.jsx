import React from "react";
import { LiaEdit } from "react-icons/lia";
import { useNavigate } from "react-router-dom";
import { date } from "../utils/utils";

const AdminOrderItem = (props) => {
  const { order } = props;
  const navigate = useNavigate();
  const viewOrderHandler = () => {
    const id = order._id;
    navigate("/order/" + id);
  };
  return (
    <tr className="border">
      <td className="px-2">{order._id}</td>
      <td className="px-2">{order.user.name}</td>
      <td className="px-2 whitespace-nowrap">{date(order.createdAt)}</td>
      {order.isDelivered ? (
        <td className="px-2 text-green">Delivered</td>
      ) : (
        <td className="px-2 text-red">In Progress</td>
      )}
      <td>
        <LiaEdit
          className="mx-2 text-black text-xl hover:text-gray hover:cursor-pointer"
          onClick={viewOrderHandler}
        />
      </td>
    </tr>
  );
};

export default AdminOrderItem;
