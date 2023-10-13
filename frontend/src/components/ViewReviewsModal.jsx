import { useRef, useEffect } from "react";
import RatingExtended from "./RatingExtended";
import { date } from "../utils/utils";
import { GrFormClose } from "react-icons/gr";

const ViewReviewsModal = ({ product, openModal, closeModal }) => {
  const ref = useRef();
  useEffect(() => {
    if (openModal) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [openModal]);

  return (
    <dialog
      ref={ref}
      onCancel={closeModal}
      className="p-4 rounded rounded-lg w-[480px] h-full outline-none"
    >
      <div className="flex justify-between">
        <div className="text-2xl py-4">All Reviews</div>
        <GrFormClose onClick={closeModal} />
      </div>

      <hr className="text-lightgray" />
      {product.reviews.map((review, idx) => {
        return (
          <div className="w-full" key={idx}>
            <div>{review.name}</div>
            <div className="flex space-x-6">
              <RatingExtended value={review.rating} />
              <div>{date(review.updatedAt)}</div>
            </div>
            <div className="py-2">{review.comment}</div>
            <div className="py-1"></div>
            <hr className="text-lightgray px-2" />
            <div className="py-1"></div>
          </div>
        );
      })}
    </dialog>
  );
};

export default ViewReviewsModal;
