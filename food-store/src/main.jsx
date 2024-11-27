import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import PartnerWithUs from "./pages/PartnerWithUs.jsx";
// import ProductDetail from "./pages/ProductDetail.jsx";
// import LoginForm from "./components/LoginForm.jsx";
// import CheckoutPage from "./components/CheckoutForm.jsx";
// import Hero from "./components/Hero/Hero.jsx";
// import BrandContainer from "./components/BrandContainer/BrandContainer.jsx";
// import ProductCard from "./components/ProductCard.jsx";
import Menu from "./components/Menu.jsx";


import {
  RestaurantDetails,
  ProductDetail,
  ProductCard,
  PartnerWithUs,
  RegisterRestaurant,
  Careers,
  RiderRegistration,
  AddressPage,
  AddTimeSlots,
  UserFacingRestaurantPage
} from "./pages/index.js";

import {
  Hero,
  BrandContainer,
  AuthLayout,
} from "./components/index.js"

//forms
import {
  LoginForm,
  CheckoutPage,
  SignupForm,
  EditRestuarant,
  AdminForm,
} from './components/forms/index.js';


import {
  RestaurantPortal,
  Dashboard,
  MenuPage,
  OrdersPage,
  SalesPage,
  AddItemPage,
  EditItemPage,
} from "./pages/restaurant/index.js";

import {
  AdminPortal,
  
  Customers,
  Dashboard as AdminDashboard,
  Restaurants,
  Riders,
  BusinessPartner
} from "./pages/admin/index.js";
// import RiderRegistration from "./pages/careers/RiderRegistration.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/admin-auth",
        element: <AdminForm />
      },
      {
        path: "/",
        element: <>
        <Hero/>
        <BrandContainer/>
        {/* <BusinessPartner /> */}
        <ProductCard />
        </>,
      },
      {
        path: "/business/register",
        element: (
          <AuthLayout>
            <RegisterRestaurant />
          </AuthLayout>
        )
      },
      {
        path: "/business/restaurant/:id/edit",
        element: (
          <AuthLayout>
            <EditRestuarant />
          </AuthLayout>
        )
      },
      {
        path: '/restaurants',
        element: <UserFacingRestaurantPage />
      },
      {
        path: "/restaurant/:id",
        element: <RestaurantDetails />
      },
      {
        path:"/checkout",
        element: <CheckoutPage />
      },
      {
        path:"/menu",
        element: <Menu />
      },
      {
        path: "/partner-with-us",
        element: (
          <AuthLayout>
            <PartnerWithUs />
          </AuthLayout>
        ),
      },
      {
        path: "/product/:id",
        element: <ProductDetail />,
      },
      {
        path: "/careers",
        element: <Careers />,
      },
      {
        path: "/careers/register",
        element: (
        <AuthLayout authenticated={false}>
          <RiderRegistration />
        </AuthLayout>
        )
      },
      {
        path: "/business-portal",
        element: (
          <AuthLayout>
            <BusinessPartner />
          </AuthLayout>
        )
      },
      {
        path: "/business/restaurant/:id/address",
        element: (
          <AuthLayout>
            <AddressPage />
          </AuthLayout>
        )
      },
      {
        path: "/business/restaurant/:id/timeslots",
        element: (
          <AuthLayout>
            <AddTimeSlots />
          </AuthLayout>
        )
      },
      {
        path: "/login",
        element: (
        <AuthLayout authenticated={false}>
          <LoginForm />
        </AuthLayout>
        )
      },
      {
        path: "/signup",
        element: (
          <AuthLayout authenticated={false}>
            <SignupForm />
          </AuthLayout>
        )
      }
    ]
  },
  {
    path: "/corporate/:id",
    element: <RestaurantPortal />,
    children: [
      {
        path: "/corporate/:id",
        element: <Dashboard />,
      },
      {
        path: "/corporate/:id/menu",
        element: <MenuPage />,
      },
      {
        path: "/corporate/:id/menu/add-item",
        element: <AddItemPage />,
      },
      {
        path: "/corporate/:id/orders",
        element: <OrdersPage />,
      },
      {
        path: "/corporate/:id/sales",
        element: <SalesPage />,
      },
      {
        path: "/corporate/:id/menu/:productId",
        element: <EditItemPage />,
      }
    ]
  },
  {
    path: "/admin",
    element: <AdminPortal />,
    children: [
      {
        path: "/admin/",
        element: <AdminDashboard />,
      },
      {
        path: "/admin/customers",
        element: <Customers />,
      },
      {
        path: "/admin/restaurants",
        element: <Restaurants />,
      },
      {
        path: "/admin/riders",
        element: <Riders />,
      },
    ]
  },
  
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <NextUIProvider>
      <RouterProvider  router={router} />
    </NextUIProvider>
);
