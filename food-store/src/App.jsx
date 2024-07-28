import {  MyNavbar } from './pages'
import Hero from './components/Hero/Hero'
import ProductCard from './components/ProductCard'
import BrandContainer from './components/BrandContainer/BrandContainer'
import Footer from './components/Footer'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import SignupForm from './components/Signup/SignupForm'
import RestaurantPortal from './pages/restaurant/RestaurantPortal'


export default function App() {
 
  return (
    <QueryClientProvider client={new QueryClient()}>
    <>
      <RestaurantPortal/>
      {/* <MyNavbar/> */}
      {/* <Hero />
      <BrandContainer />
      <ProductCard /> */}
      {/* <SignupForm /> */}
      {/* <Footer /> */}
      </>
    </QueryClientProvider>

  )
}
