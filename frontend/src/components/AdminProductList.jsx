import { useState } from "react";
import AdminProductItem from "./AdminProductItem";
import { toast } from "react-toastify";

import {
  useGetProductsQuery,
  useDeleteProductMutation,
  useCreateProductMutation,
} from "../slices/productsApiSlice";

import { LiaPlusCircleSolid } from "react-icons/lia";
import ProductModal from "./ProductModal";

const AdminProductList = () => {
  const { data: products, isLoading, error, refetch } = useGetProductsQuery();

  const [openModal, setOpenModal] = useState(false);

  const [createProduct, { isLoading: loadingCreate }] =
    useCreateProductMutation();

  const createProductHandler = async () => {
    setOpenModal(true);
    // try {
    //   await createProduct();
    //   refetch();
    // } catch (err) {
    //   toast.error(err?.data?.message || err.error);
    // }
  };

  return isLoading ? (
    <p>loading</p>
  ) : (
    <div className="space-y-4 w-full pt-12 pl-16">
      <h1 className="text-xl font-bold text-gray-900">All Products</h1>
      <div className="flex justify-end">
        <LiaPlusCircleSolid
          className="text-2xl hover:cursor-pointer hover:text-gray-500"
          onClick={createProductHandler}
        />
      </div>
      <div className="m-auto">
        <ProductModal
          openModal={openModal}
          closeModal={() => setOpenModal(false)}
        />
      </div>
      
      <table className="table-auto w-full text-left border">
        <thead className="border">
          <tr>
            <th className="pl-1">Product #</th>
            <th>Name</th>
            <th className="col-span-2">Price</th>
          </tr>
        </thead>
        <tbody className="border">
          {products?.map((product) => {
            return <AdminProductItem key={product._id} product={product} />;
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProductList;
