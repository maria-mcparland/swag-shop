import { useLoaderData, useNavigate, useOutletContext } from "react-router-dom";
import "./App.css";
import { SwagCard } from "./components/swagCard";

import React from "react";
export type Swag = {
  id: number;
  name: string;
  price: number;
  description: string;
  stock: number;
  image: string;
};

function Home() {
  const swagData = useLoaderData() as Swag[];
  const navigate = useNavigate();
  const [balance]: [balance: number] = useOutletContext();

  const buyNowClicked = (id: number) => {
    const boughtProduct = swagData.find((swag) => swag.id === id);
    if (boughtProduct && boughtProduct?.price <= balance) {
      navigate("/checkout", {
        state: { product: boughtProduct },
      });
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 px-4 py-16 ">
      {swagData &&
        swagData.length > 0 &&
        swagData.map((swag) => (
          <SwagCard key={swag.id} item={swag} onClickFunction={buyNowClicked} />
        ))}
    </div>
  );
}

export default Home;
//U2FsdGVkX1/zZ0lesVM2Szb/xbWArAvhuCb6kNn+25Q=
//U2FsdGVkX18gsP5lkO+9sZ7h3XkmHaQMYrQWbuRjV28=
