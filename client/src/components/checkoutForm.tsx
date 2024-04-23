import React, { useState } from "react";
import { UserDetails } from "../Checkout";

export default function CheckoutForm({
  onConfirmPurchase,
}: {
  onConfirmPurchase: (details: UserDetails) => void;
}) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onConfirmPurchase({ firstName, lastName, email });
  };
  return (
    <form id="checkout-form" className="grow basis-1/2" onSubmit={handleSubmit}>
      <div className="space-y-12">
        <div className=" pb-12">
          <h2 className="text-xl leading-7 text-gray-900 w-fit">
            Contact Information
          </h2>

          <div className="mt-6 sm:grid grid-cols gap-x-6 gap-y-8 sm:grid-cols-6 block">
            <div className="sm:col-span-3">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium leading-6 text-gray-900 float-left"
              >
                First name
              </label>
              <div className="mt-4 pt-4">
                <input
                  type="text"
                  name="first-name"
                  onChange={(e) => setFirstName(e.target.value)}
                  id="first-name"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="last-name"
                className="block text-sm font-medium leading-6 text-gray-900 float-left"
              >
                Last name
              </label>
              <div className="mt-4 pt-4">
                <input
                  type="text"
                  name="last-name"
                  id="last-name"
                  onChange={(e) => setLastName(e.target.value)}
                  autoComplete="family-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-6 col-span-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900 float-left"
              >
                Email address
              </label>
              <div className="mt-4 pt-4">
                <input
                  id="email"
                  name="email"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
