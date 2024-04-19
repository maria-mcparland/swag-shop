import { Swag } from "../App";
import React from "react";
type SwagCardProps = {
  item: Swag;
  onClickFunction: (id: number) => void;
  balance: number;
};

export const SwagCard = ({ item, onClickFunction, balance }: SwagCardProps) => {
  return (
    <div className="flex flex-grow flex-col justify-around">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover object-center group-hover:opacity-75"
        />
      </div>
      <div className="mt-4 flex justify-between mb-2">
        <div>
          <h3 className="text-lg text-gray-800">{item.name}</h3>
          <p className="mt-1 text-sm text-gray-500">{item.description}</p>
        </div>
        <p className="text-sm font-medium text-gray-900">${item.price}</p>
      </div>

      <button
        type="submit"
        disabled={item.stock < 1 || balance < item.price}
        title={
          item.stock < 1 || balance < item.price
            ? "Out of stock or insufficient funds"
            : "Buy Now"
        }
        className={`w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-75 disabled:pointer-events-auto`}
        onClick={() => onClickFunction(item.id)}
      >
        Buy Now
      </button>
    </div>
  );
};
