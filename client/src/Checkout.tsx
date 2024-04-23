import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Header } from "./components/header";
import CheckoutForm from "./components/checkoutForm";
import { OrderSummary } from "./components/orderSummary";

export type UserDetails = {
  firstName?: string;
  lastName?: string;
  email?: string;
};
export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();

  const [submitting, isSubmitting] = useState(false);

  const onConfirmPurchase = (details: UserDetails) => {
    isSubmitting(true);
    fetch(`/api/accept/createAPayment`)
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data here
        console.log(data.response.responseStatus);
        if (data.response.responseStatus == "SUCCESS") {
          // reduce the balance
          // send email
          console.log(details);
          const postData = {
            userDetails: details,
            product: location.state.product,
          };
          fetch("/api/email/send", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(postData),
          })
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
              isSubmitting(false);
              navigate("/");
            })
            .catch((error) => {
              // Handle any errors here
              console.error(error);
            });
        }
      })
      .catch((error) => {
        // Handle any errors here
        console.error(error);
      });
  };

  return (
    <main>
      <Header balance={location.state.balance} />
      <div className="flex sm:gap-8 bg-gray-100 p-6 rounded border flex-wrap sm:flex-nowrap">
        {!submitting ? (
          <>
            <CheckoutForm onConfirmPurchase={onConfirmPurchase} />
            <OrderSummary product={location.state.product} />
          </>
        ) : (
          <div>Submitting...</div>
        )}
      </div>
    </main>
  );
}
