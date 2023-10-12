import { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { saveShippingAddress } from "../slices/cartSlice";
import { GrFormClose } from "react-icons/gr";

import {
  useGetAddressQuery,
  useUpdateAddressMutation,
} from "../slices/usersApiSlice";
import { toast } from "react-toastify";

const ShippingModal = ({ openModal, closeModal }) => {
  const cart = useSelector((state) => state.cart);
  const shippingAddress = cart.shippingAddress;

  const { userInfo } = useSelector((state) => state.auth);
  const userId = userInfo?._id;
  const { data: userAddress, isLoading, error, refetch } = useGetAddressQuery(userId);
  const [updateAddress, { isLoading: loadingUpdateAddress }] =
    useUpdateAddressMutation();

  const [firstName, setFirstName] = useState(shippingAddress.firstName || "");
  const [lastName, setLastName] = useState(shippingAddress.lastName || "");
  const [address, setAddress] = useState(shippingAddress.address || "");
  const [addressDetails, setAddressDetails] = useState(
    shippingAddress.addressDetails || ""
  );
  const [city, setCity] = useState(shippingAddress.city || "");
  const [state, setState] = useState(shippingAddress.state || "");
  const [country, setCountry] = useState(shippingAddress.country || "");
  const [zipCode, setZipCode] = useState(shippingAddress.zipCode || "");
  const [phone, setPhone] = useState(shippingAddress.phone || "");

  const [isUseDefaultAddress, setIsUseDefaultAddress] = useState(false);
  const [isSetDefaultAddress, setIsSetDefaultAddress] = useState(false);
  
  const dispatch = useDispatch();
  const ref = useRef();
  useEffect(() => {
    if (openModal) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [openModal]);

  const useDefaultAddressHandler = () => {
    setIsUseDefaultAddress(!isUseDefaultAddress);
    if (!userAddress || JSON.stringify(userAddress) === "{}") {
      if (!isUseDefaultAddress) {
        toast.warning("No default address.");
      }
    } else {
      if (!isUseDefaultAddress) {
        setFirstName(userAddress.firstName);
        setLastName(userAddress.lastName);
        setAddress(userAddress.address);
        setAddressDetails(userAddress.addressDetails);
        setCity(userAddress.city);
        setState(userAddress.state);
        setCountry(userAddress.country);
        setZipCode(userAddress.zipCode);
        setPhone(userAddress.phone);
      }
    }
  };

  const setDefaultAddressHandler = async () => {
    setIsSetDefaultAddress(!isSetDefaultAddress);
  };

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

  const submitHandler = async (e) => {
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
    if (userInfo && isSetDefaultAddress) {
      try {
        await updateAddress({
          userId: userInfo._id,
          firstName: firstName,
          lastName: lastName,
          address: address,
          addressDetails: addressDetails,
          city: city,
          state: state,
          country: country,
          zipCode: zipCode,
          phone: phone,
        });
        toast.success("Default address updated.");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
    refetch();
    setIsUseDefaultAddress(false);
    setIsSetDefaultAddress(false);
    closeModal();
  };

  return (
    <dialog ref={ref} onCancel={closeModal} className="p-4">
      <div className="flex justify-between">
        <h1 className="pb-4">Shipping Address</h1>
        <GrFormClose onClick={closeModal} />
      </div>
      <form className="space-y-4">
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              checked={isUseDefaultAddress}
              onClick={useDefaultAddressHandler}
              type="checkbox"
              className="w-4 h-4 border border-lightgray rounded focus:ring-2"
            />
          </div>
          <div className="ml-3 text-sm">
            <label className="text-gray">Use default address</label>
          </div>
        </div>
        <div className="flex space-x-3">
          <div>
            <input
              type="text"
              className="border outline-blue-400 rounded-lg block w-full p-2.5"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="text"
              className="border outline-blue-400 rounded-lg block w-full p-2.5"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
        </div>
        <div>
          <input
            type="text"
            placeholder="Address"
            value={address}
            className="border outline-blue-400 rounded-lg block w-full p-2.5"
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Appartment, suite, etc (optional)"
            value={addressDetails}
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
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="text"
              className="border outline-blue-400 rounded-lg block w-full p-2.5"
              placeholder="State"
              value={state}
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
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="text"
              className="border outline-blue-400 rounded-lg block w-full p-2.5"
              placeholder="Zip Code"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              required
            />
          </div>
        </div>
        <div>
          <input
            type="text"
            placeholder="Phone"
            value={phone}
            className="border outline-blue-400 rounded-lg block w-full p-2.5"
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              checked={isSetDefaultAddress}
              onClick={setDefaultAddressHandler}
              type="checkbox"
              className="w-4 h-4 border border-lightgray rounded focus:ring-2"
            />
          </div>
          <div className="ml-3 text-sm">
            <label className="text-gray">Set as default address</label>
          </div>
        </div>
        <button
          onClick={submitHandler}
          disabled={!isFormValid()}
          className="w-full rounded-full bg-black mt-5 p-3 text-sm text-white transition hover:bg-gray disabled:bg-gray"
        >
          Save Address
        </button>
      </form>
    </dialog>
  );
};

export default ShippingModal;
