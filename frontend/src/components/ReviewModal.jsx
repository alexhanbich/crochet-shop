import { useState, useRef, useEffect } from "react";
import SelectRating from "../components/SelectRating";
import { toast } from "react-toastify";
import { useCreateReviewMutation } from "../slices/ordersApiSlice";
import { GrFormClose } from "react-icons/gr";

const ReviewModal = ({ productId, openModal, closeModal }) => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  const resetStates = () => {
    setComment("");
    setRating(0);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      if (res.message === "Review updated.") {
        toast.success("Review updated.");
      } else {
        toast.success("Review added.");
      }
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
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
    return rating !== 0;
  };

  return (
    <dialog
      ref={ref}
      onCancel={closeModal}
      className="p-4 rounded rounded-lg w-[480px]"
    >
      <div className="flex justify-between">
        <div className="text-2xl pt-4">Write a review</div>
        <GrFormClose onClick={closeModal} />
      </div>

      <hr className="text-lightgray" />
      <form className="space-y-4">
        <div>
          <label>Select Rating:</label>
          <SelectRating value={rating} setValue={setRating} />
        </div>
        <div>
          <label>Comment:</label>
          <textarea
            value={comment}
            className="border outline-blue-400 rounded-lg block w-full p-2.5"
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <button
          onClick={submitHandler}
          disabled={!isFormValid()}
          className="w-full rounded-full bg-black mt-5 p-3 text-sm text-white transition hover:bg-gray disabled:bg-gray"
        >
          Submit
        </button>
      </form>
    </dialog>
  );
};

export default ReviewModal;
