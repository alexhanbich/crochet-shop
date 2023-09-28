import { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { saveShippingAddress } from "../slices/cartSlice";

const ShippingModal = ({ openModal, closeModal }) => {
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const ref = useRef();
  useEffect(() => {
    if (openModal) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [openModal]);
  return (
    <dialog ref={ref} onCancel={closeModal} className="">
      <form className="space-y-4" noValidate>
        <div className="flex">
          <div>
            <input
              type="email"
              className="border outline-blue-400 rounded-lg block w-full p-2.5"
              placeholder="First Name"
            />
          </div>
          <div>
            <input
              type="email"
              className="border outline-blue-400 rounded-lg block w-full p-2.5"
              placeholder="Last Name"
            />
          </div>
        </div>
        <div>
          <input
            type="password"
            placeholder="••••••••"
            className="=border outline-blue-400 rounded-lg block w-full p-2.5"
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="••••••••"
            className="=border outline-blue-400 rounded-lg block w-full p-2.5"
          />
        </div>
        <div className="flex">
          <div>
            <input
              type="email"
              className="border outline-blue-400 rounded-lg block w-full p-2.5"
              placeholder="First Name"
            />
          </div>
          <div>
            <input
              type="email"
              className="border outline-blue-400 rounded-lg block w-full p-2.5"
              placeholder="Last Name"
            />
          </div>
        </div>
        <div className="flex">
          <div>
            <input
              type="email"
              className="border outline-blue-400 rounded-lg block w-full p-2.5"
              placeholder="First Name"
            />
          </div>
          <div>
            <input
              type="email"
              className="border outline-blue-400 rounded-lg block w-full p-2.5"
              placeholder="Last Name"
            />
          </div>
        </div>
        <div>
          <input
            type="password"
            placeholder="••••••••"
            className="=border outline-blue-400 rounded-lg block w-full p-2.5"
          />
        </div>
      </form>
    </dialog>
  );
};

export default ShippingModal;
