import {  MyNavbar } from './pages'

import Footer from './components/Footer'
import { Outlet } from 'react-router-dom'




export default function App() {
 
  return (
    <>
      <MyNavbar/>
      <Outlet/>
      <Footer />

      </>

  )
}
