import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useProfileMutation } from "../slices/usersApiSlice";
import { toast } from "react-toastify";
import { setCredentials } from "../slices/authSlice";
import { useDispatch } from "react-redux";

const EditProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
  }, [userInfo.email, userInfo.name]);
  
  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();
  
  const dispatch = useDispatch();
  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          name,
          email,
          password,
        }).unwrap();
        console.log(res)
        dispatch(setCredentials({ ...res }));
        toast.success('Profile updated successfully');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  }
  return (
    <div className="space-y-4 w-[480px] mt-12 ml-16">
      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900">
        Edit Profile
      </h1>
      <form className="space-y-4" noValidate onSubmit="">
        <div>
          <label className="block mb-2 text-sm">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border outline-blue-400 rounded-lg block w-full p-2.5"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border outline-blue-400 rounded-lg block w-full p-2.5"
            placeholder="username@email.com"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="=border outline-blue-400 rounded-lg block w-full p-2.5"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm">Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
            className="=border outline-blue-400 rounded-lg block w-full p-2.5"
          />
        </div>
        <button
          type="submit"
          onClick={submitHandler}
          className="w-full bg-accent hover:outline outline-blue-400 rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
