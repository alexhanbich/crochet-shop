import React from "react";
import { Link } from "react-router-dom";

const CheckoutSteps = (s1, s2, s3, s4) => {
  return (
    <nav className="flex justify-between">
      <div>{s1 ? <Link>Sign In</Link> : <p>Sign In</p>}</div>
      <div>{s1 ? <Link>Shipping</Link> : <p>Shipping</p>}</div>
      <div>{s1 ? <Link>Payment</Link> : <p>Payment</p>}</div>
      <div>{s1 ? <Link>Sign In</Link> : <p>Sign In</p>}</div>
    </nav>
  );
};

export default CheckoutSteps;
