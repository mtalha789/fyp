import React from 'react'
import SideMenu from '../../components/SideMenu'
import { Outlet, useNavigate } from 'react-router-dom'
import LoaderComponent from '../../components/Loader'
import { useAdminStore } from '../../store/Admin'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RestaurantPortalLayout } from '../restaurant'

const AdminPortal = () => {
    const { adminStatus } = useAdminStore()
    const [loader, setLoader] = React.useState(false)
    const navigate = useNavigate()

    const navList = [
        { name: 'Dashboard', path: '/admin' },
        { name: 'Riders', path: '/admin/riders' },
        // { name: 'Products', path: '/admin/products' },
        { name: 'Customers', path: '/admin/customers' },
        { name: 'Restaurants', path: '/admin/restaurants' }
    ]

    React.useEffect(() => {
        if (!adminStatus) {
            navigate('/admin-auth')
            setLoader(false)
        }
        else {
            setLoader(false)
        }
    }, [adminStatus])
    return (
        <>
            {loader ? <div className="w-full h-screen flex items-center justify-center">
                <LoaderComponent />
            </div> :
                <div className="flex  flex-col md:flex-row h-screen">
                    <div className="w-full md:w-1/6 bg-gray-200 h-full">
                        <SideMenu textColor={'text-emerald-300'} bgColor={'blue-500'} navList={navList} />
                    </div>
                    <div className="w-full md:w-5/6  md:mt-0 mt-3">

                        <QueryClientProvider client={new QueryClient()}>
                            <Outlet />
                        </QueryClientProvider>

                    </div>
                </div>
            }
        </>
    )
}



export default AdminPortal