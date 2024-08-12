import {  MyNavbar } from './pages'
import Footer from './components/Footer'
import { Outlet } from 'react-router-dom'
import { useEffect } from 'react'




export default function App() {

  useEffect(() => {
    console.log(import.meta.env.VITE_API_URL);
    
    fetch(`${import.meta.env.VITE_API_URL}/categories`).then(res => res.json()).then(data => console.log(data))
  
    return () => {}
  })
  
 
  return (
    <>
      <MyNavbar/>
      <Outlet/>
      <Footer />

      </>

  )
}
