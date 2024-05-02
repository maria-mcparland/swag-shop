import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Checkout from "./Checkout.tsx";
import ErrorPage from "./Error.tsx";
import Home from "./Home.tsx";

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
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
        errorElement: <ErrorPage />,
        loader: () => fetchData(),
      },
      {
        path: "/checkout",
        errorElement: <ErrorPage />,
        element: <Checkout />,
      },
    ],
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
