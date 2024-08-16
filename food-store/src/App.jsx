import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Customers from './pages/admin/Customers'


export default function App() {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <>
        <Customers />
      </>
    </QueryClientProvider>

  )
}
