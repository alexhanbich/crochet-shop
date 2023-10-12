import { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import { GrFormClose } from "react-icons/gr";
import { useUpdateUserMutation } from "../slices/usersApiSlice";

const UserModal = ({ user, openModal, closeModal, isCreate, refetch }) => {
  const userId = user?._id;
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [isAdmin, setIsAdmin] = useState(user?.isAdmin || false);

  const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateUser({ userId, name, email, isAdmin });
      toast.success("User updated successfully.");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
    refetch();
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
    return name && email;
  };

  return (
    <dialog ref={ref} onCancel={closeModal} className="rounded rounded-lg p-4 w-[480px]">
      <div className="flex justify-between">
        {isCreate ? (
          <h1 className="pb-4">Create User</h1>
        ) : (
          <h1 className="pb-4">Edit User</h1>
        )}
        <GrFormClose className="hover:cursor-pointer" onClick={closeModal} />
      </div>
      <form className="space-y-4">
        <div>
          <label>User Name:</label>
          <input
            type="text"
            value={name}
            className="border outline-blue-400 rounded-lg block w-full p-2.5"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>User Email:</label>
          <input
            type="text"
            value={email}
            className="border outline-blue-400 rounded-lg block w-full p-1 mb-2"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Admin:</label>
          <input
            type="checkbox"
            checked={isAdmin}
            className="border outline-blue-400 rounded-lg block p-1 mb-2"
            onChange={(e) => {
              if (e.target.checked) {
                setIsAdmin(true);
              } else {
                setIsAdmin(false);
              }
            }}
          />
        </div>
        <button
          onClick={submitHandler}
          disabled={!isFormValid()}
          className="w-full rounded-full bg-black mt-5 p-3 text-sm text-white transition hover:bg-gray disabled:bg-gray"
        >
          Save user
        </button>
      </form>
    </dialog>
  );
};

export default UserModal;
