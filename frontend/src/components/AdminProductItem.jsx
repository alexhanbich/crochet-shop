import React from "react";
import { LiaTrashAlt, LiaEdit } from "react-icons/lia";
import { useNavigate } from "react-router-dom";

const AdminProductItem = (props) => {
  const { product } = props;
  const navigate = useNavigate();
  const deleteProductHandler = () => {

  };

  
  return (
    <tr className="border">
      <td className="pl-1">{ product?._id }</td>
      <td>{ product?.name }</td>
      <td>${ product?.price.toFixed(2) }</td>
      <td>
        <LiaTrashAlt
          className="text-red-500 text-xl hover:cursor-pointer"
          onClick={ deleteProductHandler }
        />
      </td>
      <td>
        <LiaEdit
          className="text-black text-xl hover:cursor-pointer"
          onClick={ deleteProductHandler }
        />
      </td>
    </tr>
  );
};

export default AdminProductItem;
