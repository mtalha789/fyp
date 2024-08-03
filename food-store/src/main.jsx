import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PartnerWithUs from "./pages/PartnerWithUs.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import ProductModal from "./pages/ProductModal.jsx";
import AuthLayout from './components/AuthLayout.jsx'
import { 
  RestaurantPortal, 
  Dashboard, 
  MenuPage,
  OrdersPage,
  SalesPage,
  AddItemPage  
} from "./pages/restaurant/index.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/corporate",
    element: <RestaurantPortal />,
    children: [
      {
        path: "/corporate/",
        element: <Dashboard />,
      },
      {
        path: "/corporate/menu",
        element: <MenuPage />,
      },
      {
        path: "/corporate/menu/add-item",
        element: <AddItemPage />,
      },
      {
        path: "/corporate/orders",
        element: <OrdersPage />,
      },
      {
        path: "/corporate/sales",
        element: <SalesPage />,
      },
    ]
  },
  {
    path: "PartnerWithUs",
    element: <PartnerWithUs />,
  },
  // {
  //   path: "/restaurant/:restaurantId",
  //   element: <AuthLayout><ProductDetail /></AuthLayout>,
  // },
  // {
  //   path: "/restaurant/:restaurantId/cart",
  //   element: <AuthLayout><ProductModal /></AuthLayout>,
  // },
  // // {
  // //   path: "/about",
  // //   element: <AuthLayout><About /></AuthLayout>,
  // // },
  // // {
  // //   path: "/contact",
  // //   element: <AuthLayout><Contact /></AuthLayout>,
  // // },
  // {
  //   path: "/login",
  //   element: <AuthLayout><Login /></AuthLayout>,
  // },
  // {
  //   path: "/register",
  //   element: <AuthLayout><Register /></AuthLayout>,
  // },
  // {
  //   path: "/profile",
  //   element: <AuthLayout><Profile /></AuthLayout>,
  // },
  // {
  //   path: "/order",
  //   element: <AuthLayout><Order /></AuthLayout>,
  // },
  
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <NextUIProvider>
      <RouterProvider router={router} />
    </NextUIProvider>
  </React.StrictMode>
);
