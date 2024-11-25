import { Outlet } from 'react-router-dom'
import { useCallback, useEffect } from 'react'


import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {
  Navbar,
  Footer
} from './components'
import { useAuthStore } from './store/Auth'


export default function App() {
  const { accessToken, getCurrentUser, logout } = useAuthStore()

  // const fetchUser = useCallback(async () => {
  //   if (!accessToken) return; // Skip if no token
  //   const response = await getCurrentUser(accessToken);
  //   if (!response.success) {
  //     await logout();
  //   }
  // }, [accessToken, getCurrentUser, logout]);

  // useEffect(() => {
  //   fetchUser();
  // }, [fetchUser]);
  return (
    <QueryClientProvider client={new QueryClient()}>
      <>
        <Navbar />
        <Outlet />
        <Footer />
      </>
    </QueryClientProvider>

  )
}
