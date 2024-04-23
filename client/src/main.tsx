import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Checkout from "./Checkout.tsx";

const fetchData = async () => {
  try {
    const response = await fetch("/swag.json");
    return await response.json();
  } catch (error) {
    console.error("Error fetching swag data:", error);
  }
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: () => fetchData(),
  },
  {
    path: "/checkout",
    element: <Checkout />,
  },
]);

export async function loader() {
  const swagData = await fetchData();
  return swagData;
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
