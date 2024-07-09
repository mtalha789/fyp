import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {NextUIProvider} from '@nextui-org/react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import PartnerWithUs from './pages/PartnerWithUs.jsx'
import ProductDetail from './pages/ProductDetail.jsx'
// import ProductForm from './pages/ProductForm.jsx' 

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
    path: "/product/:id",
    element:<ProductDetail /> ,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NextUIProvider>
       <RouterProvider router={router} />
    </NextUIProvider>
  </React.StrictMode>,
)
