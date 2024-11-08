import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PartnerWithUs from "./pages/PartnerWithUs.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import LoginForm from "./components/LoginForm.jsx";
import CheckoutPage from "./components/CheckoutForm.jsx";
import Hero from "./components/Hero/Hero.jsx";
import BrandContainer from "./components/BrandContainer/BrandContainer.jsx";
import ProductCard from "./components/ProductCard.jsx";
import Menu from "./components/Menu.jsx";





const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      
      {
        path: "/",
        element: <>
        <Hero/>
        <BrandContainer/>
        <ProductCard />
        </>,
      },
      {
        path:"/checkout",
        element: <CheckoutPage />
      },
      {
        path: "/partner-with-us",
        element: <PartnerWithUs />,
      },
      {
        path: "/product/:id",
        element: <ProductDetail />,
      },
      {
        path: "/menu",
        element: <Menu />,
      }

    ]
  },
  
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <NextUIProvider>
      <RouterProvider router={router} />
    </NextUIProvider>
  </React.StrictMode>
);
