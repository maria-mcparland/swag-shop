import { Outlet, useSearchParams } from "react-router-dom";
import "./App.css";

import React, { useState } from "react";
import { Header } from "./components/header";
import { decryptData } from "./utils/encryption";
export type Swag = {
  id: number;
  name: string;
  price: number;
  description: string;
  stock: number;
  image: string;
};

function App() {
  const [searchParams] = useSearchParams();
  const encryptedBalance = searchParams.get("points");
  let unencryptedBalance = 10;
  if (encryptedBalance) {
    unencryptedBalance = parseInt(decryptData(encryptedBalance));
  }
  const [balance, setBalance] = useState<number>(unencryptedBalance);

  return (
    <main className="bg-white">
      <Header balance={balance} />
      <Outlet context={[balance, setBalance]} />
    </main>
  );
}

export default App;
