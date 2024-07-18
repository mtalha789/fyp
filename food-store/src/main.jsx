import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PartnerWithUs from "./pages/PartnerWithUs.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import ProductModal from "./pages/ProductModal.jsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "PartnerWithUs",
    element: <PartnerWithUs />,
  },
  {
    path: "/catagory/:id",
    element: <ProductDetail />,
  },
  {
    path: "/product/:id",
    element: <ProductModal />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <NextUIProvider>
      <RouterProvider router={router} />
    </NextUIProvider>
  </React.StrictMode>
);
