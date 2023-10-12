import { FaStar, FaRegStar } from "react-icons/fa";

const RatingExtended = ({ value }) => {
  return (
    <div className="flex items-center justify-center">
      {value >= 1 ? (
        <FaStar className="text-yellow-400" />
      ) : (
        <FaRegStar className="text-yellow-400" />
      )}
      {value >= 2 ? (
        <FaStar className="text-yellow-400" />
      ) : (
        <FaRegStar className="text-yellow-400" />
      )}
      {value >= 3 ? (
        <FaStar className="text-yellow-400" />
      ) : (
        <FaRegStar className="text-yellow-400" />
      )}
      {value >= 4 ? (
        <FaStar className="text-yellow-400" />
      ) : (
        <FaRegStar className="text-yellow-400" />
      )}
      {value === 5 ? (
        <FaStar className="text-yellow-400" />
      ) : (
        <FaRegStar className="text-yellow-400" />
      )}
    </div>
  );
};

export default RatingExtended;
