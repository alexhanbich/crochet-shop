import { FaStar, FaStarHalfAlt, FaRegStar} from 'react-icons/fa';

const Rating = ({ value }) => {
  return (
    <div className='flex items-center justify-center'>
        <FaStar className='text-yellow-400 pr-1' />
        <p className='text-sm text-lightgray'>{value}</p>
    </div>
  )
};

export default Rating;