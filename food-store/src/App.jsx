import { Outlet } from 'react-router-dom'
import { useEffect } from 'react'


import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {
  Navbar,
  Footer
} from './components'


export default function App() {
  return (
    <QueryClientProvider  client={new QueryClient()}>
      <>
        <Navbar />
        <Outlet />
        <Footer />
      </>
    </QueryClientProvider>

  )
}
