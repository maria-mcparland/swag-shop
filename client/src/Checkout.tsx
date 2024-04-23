import React from "react";
import { useLocation } from "react-router-dom";

import { Header } from "./components/header";
import CheckoutForm from "./components/checkoutForm";
import { OrderSummary } from "./components/orderSummary";

export default function Checkout() {
  const location = useLocation();
  console.log(location.state.product);

  return (
    <main>
      <Header balance={location.state.balance} />
      <div className="flex gap-8 bg-gray-100 p-6 rounded border">
        <CheckoutForm product={location.state.product} />
        <OrderSummary product={location.state.product} />
      </div>
    </main>
  );
}
