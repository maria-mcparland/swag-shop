import React, { useState } from "react";
import { useLocation, useOutletContext } from "react-router-dom";
import CheckoutForm from "./components/checkoutForm";
import { OrderSummary } from "./components/orderSummary";

export type UserDetails = {
  firstName?: string;
  lastName?: string;
  email?: string;
};

enum CheckoutStatus {
  IDLE = "IDLE",
  SUBMITTING = "SUBMITTING",
  COMPLETED = "COMPLETED",
  ERROR = "ERROR",
}

export default function Checkout() {
  const location = useLocation();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [balance, setBalance]: [balance: number, (balance: number) => void] =
    useOutletContext();
  const [checkoutStatus, updateCheckoutStatus] = useState(CheckoutStatus.IDLE);

  const onConfirmPurchase = (details: UserDetails) => {
    updateCheckoutStatus(CheckoutStatus.SUBMITTING);
    const newBalance = balance - location.state.product.price;

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
              setBalance(newBalance);
              updateCheckoutStatus(CheckoutStatus.COMPLETED);
            })
            .catch((error) => {
              // Handle any errors here
              console.error(error);
              updateCheckoutStatus(CheckoutStatus.ERROR);
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
      <div className="flex sm:gap-8 bg-gray-100 p-6 rounded border flex-wrap sm:flex-nowrap">
        {checkoutStatus === CheckoutStatus.IDLE && (
          <>
            <CheckoutForm onConfirmPurchase={onConfirmPurchase} />
            <OrderSummary product={location.state.product} />
          </>
        )}
        {checkoutStatus === CheckoutStatus.SUBMITTING && (
          <div>Submitting...</div>
        )}
        {checkoutStatus === CheckoutStatus.COMPLETED && (
          <div>Thank you for your purchase! You should have an email....</div>
        )}
      </div>
    </main>
  );
}
