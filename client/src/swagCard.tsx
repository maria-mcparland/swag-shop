import { Swag } from "./App";
import React from "react";
type SwagCardProps = {
  item: Swag;
  onClickFunction: (id: number) => void;
};

export const SwagCard = ({ item, onClickFunction }: SwagCardProps) => (
  <a href="#" className="group">
    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
      <img
        src={item.image}
        alt={item.name}
        className="h-full w-full object-cover object-center group-hover:opacity-75"
      />
    </div>
    <div className="mt-4 flex justify-between">
      <div>
        <h3 className="text-lg text-gray-700">{item.name}</h3>
        <p className="mt-1 text-sm text-gray-500">{item.description}</p>
      </div>
      <p className="text-sm font-medium text-gray-900">${item.price}</p>
    </div>
    <button
      type="submit"
      className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      onClick={() => onClickFunction(item.id)}
    >
      Add to bag
    </button>
  </a>
);
