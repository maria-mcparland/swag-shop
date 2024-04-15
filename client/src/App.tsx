import { useSearchParams } from "react-router-dom";
import "./App.css";
import { SwagTable } from "./swagTable";
import { useEffect, useState } from "react";

import React from "react";
import { decryptData } from "./utils/encryption";
export type Swag = {
  id: number;
  name: string;
  price: number;
  description: string;
  stock: number;
};

function App() {
  const [swagData, setSwagData] = useState<Swag[]>([]);
  const [searchParams] = useSearchParams();
  const encryptedPoints = searchParams.get("points");
  let points = 0;
  if (encryptedPoints) {
    points = parseInt(decryptData(encryptedPoints));
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/swag.json");
        const data = await response.json();
        const newSwag: Swag[] = [];
        newSwag.push(data);
        setSwagData(newSwag);
      } catch (error) {
        console.error("Error fetching swag data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <main>
      <h1> J.P. Morgan Payments Swag</h1>
      <p>Current Balance: {points}</p>
      <SwagTable swagData={swagData} />
    </main>
  );
}

export default App;
