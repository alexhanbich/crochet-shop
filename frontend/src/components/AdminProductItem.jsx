import { useState } from "react";
import { LiaTrashAlt, LiaEdit } from "react-icons/lia";
import { useDeleteProductMutation } from "../slices/productsApiSlice";
import { toast } from "react-toastify";
import ProductModal from "./ProductModal";

const AdminProductItem = ({ product, refetch }) => {
  const [openModal, setOpenModal] = useState(false);

  const editProductHandler = () => {
    setOpenModal(true);
  };

  const [deleteProduct, { isLoading: loadingDelete }] =
    useDeleteProductMutation();

  const deleteProductHandler = async (id) => {
    if (window.confirm("Are you sure")) {
      try {
        await deleteProduct(id);
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <tr className="border">
      <td className="pl-1">{product?._id}</td>
      <td>{product?.name}</td>
      <td className="font-body2 font-medium">${product?.price.toFixed(2)}</td>
      <td>
        <LiaEdit
          className="text-black text-xl hover:cursor-pointer"
          onClick={editProductHandler}
        />
        <div className="m-auto">
          <ProductModal
            product={product}
            openModal={openModal}
            closeModal={() => setOpenModal(false)}
            isCreate={false}
            refetch={refetch}
          />
        </div>
      </td>
      <td>
        <LiaTrashAlt
          className="text-red text-xl hover:cursor-pointer"
          onClick={() => deleteProductHandler(product._id)}
        />
      </td>
    </tr>
  );
};

export default AdminProductItem;
