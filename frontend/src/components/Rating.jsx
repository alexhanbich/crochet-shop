import { FaStar } from "react-icons/fa";

const Rating = ({ value }) => {
  return (
    <div className="flex items-center justify-center">
      <FaStar className="text-yellow-400" />
      <p className="text-md text-gray pl-2">{value}</p>
    </div>
  );
};

export default Rating;
