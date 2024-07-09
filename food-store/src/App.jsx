import {  MyNavbar } from './pages'
import Hero from './components/Hero/Hero'
import ProductCard from './components/ProductCard'
import BrandContainer from './components/BrandContainer/BrandContainer'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <MyNavbar/>
      <Hero />
      <BrandContainer />
      <ProductCard />
      <Footer />
      {/* <ProductForm/> */}      

      </>

  )
}
