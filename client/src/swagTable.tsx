import { Swag } from "./App";
import React from "react";
type SwagTableProps = {
  swagData: Swag[];
};

const addToCardClicked = (id: number) => {
  console.log(id);
};

const SwagCard = ({ name, price, description, stock, id }: Swag) => (
  <div className="swag-card">
    <h2>{name}</h2>
    <p>Price: ${price}</p>
    <p>{description}</p>
    <p>{stock > 0 ? "In Stock" : "Out of Stock"}</p>
    <button disabled={stock === 0} onClick={() => addToCardClicked(id)}>
      Add to Cart
    </button>
  </div>
);

export const SwagTable = ({ swagData }: SwagTableProps) => {
  console.log(swagData);

  return (
    <div>
      {swagData &&
        swagData.length > 0 &&
        swagData.map((swag) => <SwagCard key={swag.id} {...swag} />)}
    </div>
  );
};
