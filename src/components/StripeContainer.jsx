// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
// import React from "react";
// import PaymentForm from "./PaymentForm";

// const PUBLIC_KEY =
//   "pk_test_51MVcrmSFMRurGeBZ16JSn5mu4j4k7kUgoBqjHx1UkL5fnBqKvDEXpQupB7pDs9jgvi4n7YVaS5kDQA3U7MoUwzSa001LWih2Yz";

// const stripeTestPromise = loadStripe(PUBLIC_KEY);

// export default function StripeContainer() {
//   return (
//     <Elements stripe={stripeTestPromise}>
//       <PaymentForm />
//     </Elements>
//   );
// }

import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Loader from './Loader';
// import CheckoutForm from "./CheckoutForm";
import "./App.css";
import PaymentForm from "./PaymentForm";
import { useStateValue } from "../context/StateProvider";
// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(
  "pk_test_51MVcrmSFMRurGeBZ16JSn5mu4j4k7kUgoBqjHx1UkL5fnBqKvDEXpQupB7pDs9jgvi4n7YVaS5kDQA3U7MoUwzSa001LWih2Yz"
);

export default function StripeContainer() {
  const [clientSecret, setClientSecret] = useState("");
  const [{ total }] = useStateValue();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    function makePayment() {
      fetch("https://stripe-paymet.onrender.com/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: [{ id: `${Date.now()}` }], total }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setClientSecret(data.clientSecret);
        });
    }

    
    makePayment();
   
    
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };
  
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="App w-full h-[87vh] flex justify-center items-center p-4">
          {clientSecret && (
            <Elements options={options} stripe={stripePromise}>
              <PaymentForm />
            </Elements>
          )}
        </div>
      )}
    </>
  );
}
