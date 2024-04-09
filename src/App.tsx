import "./App.css";
import { SwagTable } from "./swagTable";
import { useEffect, useState } from "react";
export type Swag = {
  id: number;
  name: string;
  price: number;
  description: string;
  stock: number;
};

function App() {
  const [swagData, setSwagData] = useState<Swag[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/swag.json");
        const data = await response.json();
        const newSwag = [];
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
      <SwagTable swagData={swagData} />
    </main>
  );
}

export default App;
