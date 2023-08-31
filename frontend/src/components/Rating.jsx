import { FaStar, FaStarHalfAlt, FaRegStar} from 'react-icons/fa';

const Rating = ({ value }) => {
  return (
    <div className='flex items-center justify-center text-yellow-400'>
        <span className='drop-shadow'>
            { value >= 1 ? <FaStar /> : value<= 0.5 ? <FaStarHalfAlt /> : <FaRegStar /> }
        </span>
        <span>
            { value >= 2 ? <FaStar /> : value<= 1.5 ? <FaStarHalfAlt /> : <FaRegStar /> }
        </span>
        <span>
            { value >= 3 ? <FaStar /> : value<= 2.5 ? <FaStarHalfAlt /> : <FaRegStar /> }
        </span>
        <span>
            { value >= 4 ? <FaStar /> : value<= 3.5 ? <FaStarHalfAlt /> : <FaRegStar /> }
        </span>
        <span>
            { value == 5 ? <FaStar /> : value<= 4.5 ? <FaStarHalfAlt /> : <FaRegStar /> }
        </span>
    </div>
  )
};

export default Rating;