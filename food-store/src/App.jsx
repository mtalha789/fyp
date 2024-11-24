import { Outlet } from 'react-router-dom'
import { useEffect } from 'react'


import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {
  Navbar,
  Footer
} from './components'
import { useAuthStore } from './store/Auth'


export default function App() {
  const { accessToken, getCurrentUser, logout } = useAuthStore()

  useEffect(async () => {
    const response = await getCurrentUser(accessToken)
    if (!response.success) {
      await logout()        
    }
  }, [accessToken])
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
