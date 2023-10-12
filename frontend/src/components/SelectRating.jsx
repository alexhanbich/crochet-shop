import { FaStar, FaRegStar } from "react-icons/fa";
import { useState } from "react";

const SelectRating = ({value, setValue}) => {
  return (
    <div className="flex text-xl items-center">
      {value > 0 ? (
        <FaStar onClick={() => setValue(1)} className="text-yellow-400" />
      ) : (
        <FaRegStar onClick={() => setValue(1)} className="text-yellow-400" />
      )}
      {value > 1 ? (
        <FaStar onClick={() => setValue(2)} className="text-yellow-400" />
      ) : (
        <FaRegStar onClick={() => setValue(2)} className="text-yellow-400" />
      )}
      {value > 2 ? (
        <FaStar onClick={() => setValue(3)} className="text-yellow-400" />
      ) : (
        <FaRegStar onClick={() => setValue(3)} className="text-yellow-400" />
      )}
      {value > 3 ? (
        <FaStar onClick={() => setValue(4)} className="text-yellow-400" />
      ) : (
        <FaRegStar onClick={() => setValue(4)} className="text-yellow-400" />
      )}
      {value > 4 ? (
        <FaStar onClick={() => setValue(5)} className="text-yellow-400" />
      ) : (
        <FaRegStar onClick={() => setValue(5)} className="text-yellow-400" />
      )}
    </div>
  );
};

export default SelectRating;
