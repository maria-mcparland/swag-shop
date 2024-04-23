import React from "react";
import { Swag } from "../App";

export const OrderSummary = ({ product }: { product: Swag }) => {
  return (
    <div className="grow basis-1/2 border-gray-200 border-l pl-6">
      <h2 className="text-xl leading-7 text-gray-900 w-fit">Order Summary</h2>
      <div className="bg-white  border border-gray-200 my-4 p-8 rounded-md">
        <div className="flow-root mb-6">
          <ul role="list" className="-my-6 divide-y divide-gray-200">
            <li className="flex py-6 ">
              <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover object-center"
                />
              </div>

              <div className="ml-4 flex flex-1 flex-col">
                <div>
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <h3>
                      <a href="#">{product.name}</a>
                    </h3>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div className="border-t border-gray-200 p-4 sm:px-6">
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Total</p>
            <p>${product.price}</p>
          </div>
          <div className="mt-6">
            <a
              href="#"
              className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              Confirm purchase
            </a>
          </div>
          <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
            <p>
              or
              <button
                type="button"
                className="font-medium text-indigo-600 hover:text-indigo-500 pl-2"
              >
                Continue Shopping
                <span aria-hidden="true"> &rarr;</span>
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
