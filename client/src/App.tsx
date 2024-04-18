import { useLoaderData, useSearchParams } from "react-router-dom";
import "./App.css";
import { SwagCard } from "./components/swagCard";

import React from "react";
import { decryptData } from "./utils/encryption";
import { Header } from "./components/header";
import Basket from "./components/basket";
export type Swag = {
  id: number;
  name: string;
  price: number;
  description: string;
  stock: number;
  image: string;
};

function App() {
  const swagData = useLoaderData() as Swag[];
  const [searchParams] = useSearchParams();
  const encryptedPoints = searchParams.get("points");
  const [cartProducts, setCartProducts] = React.useState([] as Swag[]);
  const [basketOpen, setOpen] = React.useState(false);

  let points = 0;
  if (encryptedPoints) {
    points = parseInt(decryptData(decodeURIComponent(encryptedPoints)));
  }
  const removeFromBasket = (id: number) => {
    const removedProduct = cartProducts.find((swag) => swag.id === id);
    const array = [...cartProducts];
    if (removedProduct) {
      const index = array.indexOf(removedProduct);
      if (index !== -1) {
        array.splice(index, 1);
        setCartProducts(array);
      }
    } else {
      //TODO error handling
    }
  };
  const addToBasketClicked = (id: number) => {
    const insertedProduct = swagData.find((swag) => swag.id === id);
    if (insertedProduct) {
      const nextProducts = [...cartProducts, insertedProduct];
      setCartProducts(nextProducts);
    } else {
      //todo error handling
    }

    // fetch(`/api/accept/createAPayment`)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     // Handle the response data here
    //     console.log(data.response.responseStatus);
    //     if (data.response.responseStatus == "SUCCESS") {
    //       alert("Payment successful");
    //     }
    //   })
    //   .catch((error) => {
    //     // Handle any errors here
    //     console.error(error);
    //   });
  };

  return (
    <main className="bg-white">
      <Header
        balance={points}
        itemsInBasket={cartProducts.length}
        openBasket={setOpen}
      />
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 px-4 py-16 ">
        {swagData &&
          swagData.length > 0 &&
          swagData.map((swag) => (
            <SwagCard
              key={swag.id}
              item={swag}
              onClickFunction={addToBasketClicked}
            />
          ))}
      </div>
      <Basket
        basketOpen={basketOpen}
        setOpen={setOpen}
        products={cartProducts}
        removeFromBasket={removeFromBasket}
      />
    </main>
  );
}

export default App;
