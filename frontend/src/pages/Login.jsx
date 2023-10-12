import React from "react";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

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
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));

      navigate(redirect);
    } catch (err) {
        console.log(err)
      toast.error(err?.data?.message || err.error);
    }
  };
  return (
    <div className="flex flex-col items-center px-6 py-8 mx-auto mt-24 text-black">
      <div className="w-[480px] bg-secondary rounded-lg shadow">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold">
            Sign In
          </h1>
          <form className="space-y-4" noValidate onSubmit={submitHandler}>
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
            {/* <div className="flex items-center justify-between">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    type="checkbox"
                    className="w-4 h-4 border border-lightgray rounded focus:ring-2"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label className="text-gray">Remember me</label>
                </div>
              </div>
              <a href="#" className="text-sm hover:underline">
                Forgot password?
              </a>
            </div> */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary hover:bg-accent rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Sign in
            </button>
            <div className="my-1"></div>
            <Link to={redirect ? `/register?redirect=${redirect}` : '/register'} className="text-sm text-primary-600 hover:underline">
              Don’t have an account yet? Sign up
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
