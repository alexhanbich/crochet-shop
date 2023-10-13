import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { ToastContainer, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./components/CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51O0ae6A654jd0kXKIAiOhx4IKBc5Iwabd9zsFHukkdlFzJIPYKvqmjx37d9PXymtagAc4gmQFrYJcRcoOkQtuHmy00aVaBw5V7"
);

const App = () => {
  const options = {
    clientSecret: "{{CLIENT_SECRET}}",
  };
  return (
    <>
      <div className="max-w-screen-lg mx-auto font-body">
        <Navbar />
        <main>
          <Outlet />
        </main>
        <ToastContainer
          className="text-sm"
          transition={Flip}
          style={{ width: "200px" }}
        />
        <Footer />
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm />
        </Elements>
      </div>
    </>
  );
};

export default App;
