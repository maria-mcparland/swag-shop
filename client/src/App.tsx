import { useLoaderData, useSearchParams } from "react-router-dom";
import "./App.css";
import { SwagCard } from "./components/swagCard";

import React from "react";
import { decryptData } from "./utils/encryption";
import { Header } from "./components/header";
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
  let points = 0;
  if (encryptedPoints) {
    points = parseInt(decryptData(encryptedPoints));
  }

  const addToCardClicked = (id: number) => {
    console.log(id);
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
      <Header balance={points} />
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 px-4 py-16 ">
        {swagData &&
          swagData.length > 0 &&
          swagData.map((swag) => (
            <SwagCard
              key={swag.id}
              item={swag}
              onClickFunction={addToCardClicked}
            />
          ))}
      </div>
    </main>
  );
}

export default App;
