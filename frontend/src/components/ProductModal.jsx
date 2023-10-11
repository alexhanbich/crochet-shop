import { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import { GrFormClose } from "react-icons/gr";

import {
  useCreateProductMutation,
  useUpdateProductMutation,
  useUploadProductImageMutation,
} from "../slices/productsApiSlice";

const ProductModal = ({
  product,
  openModal,
  closeModal,
  isCreate,
  refetch,
}) => {
  const productId = product?._id;
  const [name, setName] = useState(product?.name || "");
  const [image, setImage] = useState(product?.image || "");
  const [description, setDescription] = useState(product?.description || "");
  const [price, setPrice] = useState(product?.price || "");
  const [numStock, setNumStock] = useState(product?.numStock || "");

  const [createProduct, { isLoading: loadingCreate }] =
    useCreateProductMutation();

  const [updateProduct, { isLoading: loadingUpdate }] =
    useUpdateProductMutation();

  const [uploadProductImage, { isLoading: loadingUpload }] =
    useUploadProductImageMutation();

  const uploadHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const updateHandler = async(e) => {
    e.preventDefault();
    try {
      await updateProduct({
        productId,
        name,
        price,
        image,
        description,
        numStock,
      }).unwrap();
      toast.success("Product updated.");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  }

  const resetStates = () => {
    setName("");
    setImage("");
    setDescription("");
    setPrice("");
    setNumStock("");
  }

  const createHandler = async(e) => {
    e.preventDefault();
    try {
      await createProduct({
        name,
        price,
        image,
        description,
        numStock,
      }).unwrap();
      toast.success("Product created.");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  }

  const submitHandler = async(e) => {
    if (isCreate) {
      createHandler(e);
    }
    else {
      updateHandler(e);
    }
    refetch();
    resetStates();
    closeModal();
  };

  const ref = useRef();
  useEffect(() => {
    if (openModal) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [openModal]);

  const isFormValid = () => {
    return name && image && description && price && numStock;
  };

  return (
    <dialog ref={ref} onCancel={closeModal} className="p-4 w-[480px]">
      <div className="flex justify-between">
        {isCreate ? (
          <h1 className="pb-4">Create Product</h1>
        ) : (
          <h1 className="pb-4">Edit Product</h1>
        )}
        <GrFormClose className="hover:cursor-pointer" onClick={closeModal} />
      </div>
      <form className="space-y-4">
        <div>
          <label>Product Name:</label>
          <input
            type="text"
            value={name}
            className="border outline-blue-400 rounded-lg block w-full p-2.5"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Product Image:</label>
          <input
            type="text"
            value={image}
            className="border outline-blue-400 rounded-lg block w-full p-1 mb-2"
            onChange={(e) => setImage(e.target.value)}
            readOnly
          />
          <input type="file" key={Date.now()} onChange={uploadHandler} required />
        </div>
        <div>
          <label>Product Description:</label>
          <textarea
            value={description}
            className="border outline-blue-400 rounded-lg block w-full p-2.5"
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Product Price:</label>
          <input
            type="number"
            min="0"
            value={price}
            className="border outline-blue-400 rounded-lg block w-full p-2.5"
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Number In Stock:</label>
          <input
            type="number"
            min="0"
            value={numStock}
            className="border outline-blue-400 rounded-lg block w-full p-2.5"
            onChange={(e) => setNumStock(e.target.value)}
            required
          />
        </div>
        <button
          onClick={submitHandler}
          disabled={!isFormValid()}
          className="w-full rounded-full bg-black mt-5 p-3 text-sm text-white transition hover:bg-gray disabled:bg-gray"
        >
          Save Product
        </button>
      </form>
    </dialog>
  );
};

export default ProductModal;
