import {  MyNavbar } from './pages'
import Hero from './components/Hero/Hero'
import ProductCard from './components/ProductCard'
import BrandContainer from './components/BrandContainer/BrandContainer'
import Footer from './components/Footer'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import SignupForm from './components/Signup/SignupForm'
import RestaurantPortal from './pages/restaurant/RestaurantPortal'
import MenuPage from './pages/restaurant/Menu'
import Dashboard from './pages/restaurant/Dashboard'
import OrdersPage from './pages/restaurant/Orders'
import Sales from './pages/restaurant/Sales'


export default function App() {
 
  return (
    <QueryClientProvider client={new QueryClient()}>
    <>
      {/* <RestaurantPortal/>
      {/* <MyNavbar/> */}
      {/* <Hero />
      <BrandContainer />
      <ProductCard /> */}
      {/* <SignupForm /> */}
      {/* <Footer /> */}
      {/* <MenuPage/> */}
      {/* <Dashboard/> */}
      <Sales/>
      <OrdersPage/>
    </>
    </QueryClientProvider> 

  )
}
