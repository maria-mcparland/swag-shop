import { Swag } from "./App";
import React from "react";
type SwagTableProps = {
  swagData: Swag[];
};

const addToCardClicked = (id: number) => {
  console.log(id);
  fetch(`/api/accept/createAPayment`)
    .then((response) => response.json())
    .then((data) => {
      // Handle the response data here
      console.log(data);
    })
    .catch((error) => {
      // Handle any errors here
      console.error(error);
    });
};

const SwagCard = ({ name, price, description, stock, id }: Swag) => (
  <div className="swag-card">
    <h2>{name}</h2>
    <p>Price: ${price}</p>
    <p>{description}</p>
    <p>{stock > 0 ? "In Stock" : "Out of Stock"}</p>
    <button disabled={stock == 0} onClick={() => addToCardClicked(id)}>
      Buy now
    </button>
  </div>
);

export const SwagTable = ({ swagData }: SwagTableProps) => {
  return (
    <div>
      {swagData &&
        swagData.length > 0 &&
        swagData.map((swag) => <SwagCard key={swag.id} {...swag} />)}
    </div>
  );
};
