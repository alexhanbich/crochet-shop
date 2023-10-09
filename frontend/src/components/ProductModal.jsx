import { useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { saveShippingAddress } from "../slices/cartSlice";
import { GrFormClose } from "react-icons/gr";

const ProductModal = ({ openModal, closeModal }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [addressDetails, setAddressDetails] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [phone, setPhone] = useState("");

  const dispatch = useDispatch();
  const ref = useRef();
  useEffect(() => {
    if (openModal) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [openModal]);

  const isFormValid = () => {
    return (
      firstName &&
      lastName &&
      address &&
      city &&
      state &&
      country &&
      zipCode &&
      phone
    );
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({
        firstName,
        lastName,
        address,
        addressDetails,
        city,
        state,
        country,
        zipCode,
        phone,
      })
    );
    closeModal();
  };

  return (
    <dialog ref={ref} onCancel={closeModal} className="p-4">
      <div className="flex justify-between">
        <h1 className="pb-4">Shipping Address</h1>
        <GrFormClose onClick={closeModal} />
      </div>
      <form className="space-y-4">
        <div className="flex space-x-3">
          <div>
            <input
              type="text"
              className="border outline-blue-400 rounded-lg block w-full p-2.5"
              placeholder="First Name"
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="text"
              className="border outline-blue-400 rounded-lg block w-full p-2.5"
              placeholder="Last Name"
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
        </div>
        <div>
          <input
            type="text"
            placeholder="Address"
            className="border outline-blue-400 rounded-lg block w-full p-2.5"
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Appartment, suite, etc (optional)"
            className="border outline-blue-400 rounded-lg block w-full p-2.5"
            onChange={(e) => setAddressDetails(e.target.value)}
          />
        </div>
        <div className="flex space-x-3">
          <div>
            <input
              type="text"
              className="border outline-blue-400 rounded-lg block w-full p-2.5"
              placeholder="City"
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="text"
              className="border outline-blue-400 rounded-lg block w-full p-2.5"
              placeholder="State"
              onChange={(e) => setState(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="flex space-x-3">
          <div>
            <input
              type="text"
              className="border outline-blue-400 rounded-lg block w-full p-2.5"
              placeholder="Country"
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="text"
              className="border outline-blue-400 rounded-lg block w-full p-2.5"
              placeholder="Zip Code"
              onChange={(e) => setZipCode(e.target.value)}
              required
            />
          </div>
        </div>
        <div>
          <input
            type="text"
            placeholder="Phone"
            className="border outline-blue-400 rounded-lg block w-full p-2.5"
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="remember"
              aria-describedby="remember"
              type="checkbox"
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-2"
            />
          </div>
          <div className="ml-3 text-sm">
            <label className="text-gray-500">Default Address</label>
          </div>
        </div>
        <button
          onClick={submitHandler}
          disabled={!isFormValid()}
          className="w-full rounded-full bg-black mt-5 p-3 text-sm text-white transition hover:bg-gray-600 disabled:bg-gray-400"
        >
          Save Address
        </button>
      </form>
    </dialog>
  );
};

export default ProductModal;
