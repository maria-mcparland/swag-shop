import React, { useState } from "react";
import { useLocation, useOutletContext, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const [balance, setBalance]: [balance: number, (balance: number) => void] =
    useOutletContext();

  const [checkoutStatus, updateCheckoutStatus] = useState(CheckoutStatus.IDLE);

  const product = location.state.product;

  AbortSignal.timeout ??= function timeout(ms) {
    const ctrl = new AbortController();
    setTimeout(() => ctrl.abort(), ms);
    return ctrl.signal;
  };

  const onConfirmPurchase = (details: UserDetails) => {
    updateCheckoutStatus(CheckoutStatus.SUBMITTING);
    const newBalance = balance - location.state.product.price;

    fetch(`/api/accept/createAPayment`, { signal: AbortSignal.timeout(5000) })
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
        updateCheckoutStatus(CheckoutStatus.ERROR);
      });
  };

  return (
    <main>
      <div className="flex sm:gap-8 bg-gray-100 p-6 rounded border flex-wrap sm:flex-nowrap">
        {checkoutStatus === CheckoutStatus.IDLE && (
          <>
            <CheckoutForm onConfirmPurchase={onConfirmPurchase} />
            <OrderSummary product={product} />
          </>
        )}
        {checkoutStatus === CheckoutStatus.SUBMITTING && (
          <div className="bg-white  border border-gray-200 my-4 p-8 rounded-md min-w-full">
            <h2 className="text-xl leading-7 text-gray-900"></h2>
            <button
              type="button"
              disabled
              className={`items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-75 disabled:pointer-events-auto`}
            >
              <svg
                aria-hidden="true"
                className="inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600 mr-2 -mt-1"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              Submitting...
            </button>
          </div>
        )}
        {checkoutStatus === CheckoutStatus.COMPLETED && (
          <div className="bg-white  border border-gray-200 my-4 p-8 rounded-md min-w-full">
            <h2 className="text-xl leading-7 text-gray-900">
              Thank you for your purchase. Head to our swag stand with this page
              to get your item.
            </h2>
            <div className="flex mt-10 gap-10">
              <div className="h-40 w-40 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <h3 className="text-base text-gray-900">{product.name} x1</h3>
            </div>
          </div>
        )}
        {checkoutStatus === CheckoutStatus.ERROR && (
          <div className="bg-white  border border-gray-200 my-4 p-8 rounded-md min-w-full">
            <h2 className="text-xl leading-7 text-gray-900">
              Oh no! Something went wrong! Head to our swag stand for help
            </h2>
            <button
              type="button"
              className="font-medium text-indigo-600 hover:text-indigo-500 pl-2 mt-10"
              onClick={() => navigate("/")}
            >
              Continue Shopping
              <span aria-hidden="true"> &rarr;</span>
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
