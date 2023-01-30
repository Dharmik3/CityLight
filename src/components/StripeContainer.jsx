import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import PaymentForm from "./PaymentForm";

const PUBLIC_KEY =
  "pk_test_51MVcrmSFMRurGeBZ16JSn5mu4j4k7kUgoBqjHx1UkL5fnBqKvDEXpQupB7pDs9jgvi4n7YVaS5kDQA3U7MoUwzSa001LWih2Yz";

const stripeTestPromise = loadStripe(PUBLIC_KEY);

export default function StripeContainer() {
  return (
    <Elements stripe={stripeTestPromise}>
      <PaymentForm />
    </Elements>
  );
}
