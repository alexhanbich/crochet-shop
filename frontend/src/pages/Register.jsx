import React from "react";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await register({ name, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
      } catch (err) {
        console.log(err);
        toast.error(err?.data?.message || err.error);
      }
    }
  };
  return (
    <div className="flex flex-col items-center px-6 py-8 mx-auto mt-6 text-black">
      <div className="w-[480px] bg-secondary rounded-lg shadow">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold text-gray-900">
            Create your account
          </h1>
          <form className="space-y-4" noValidate onSubmit={submitHandler}>
            <div>
              <label className="block mb-2 text-sm">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border outline-blue-400 rounded-lg block w-full p-2.5"
                placeholder="Enter your name"
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
            <div className="my-2"></div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary hover:outline outline-blue-400 rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Sign up
            </button>
            <div className="my-1">{isLoading && <p>loading</p>}</div>
            <Link
              to='/login'
              className="text-sm text-primary-600 hover:underline"
            >
              Already have an account? Log in
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
