import { Link, useNavigate, Outlet, NavLink } from 'react-router-dom'
import React from 'react'
import { useRestaurantStore } from '../../store/Restaurant'
import SideMenu from '../../components/SideMenu'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import LoaderComponent from '../../components/Loader'

export default function RestaurantPortal() {
    return (
        <QueryClientProvider client={new QueryClient()}>
            <RestaurantPortalLayout>
                <Outlet />
            </RestaurantPortalLayout>
        </QueryClientProvider>
    )
}

export const RestaurantPortalLayout = ({ children, restaurantStatus = true }) => {
    const status = true
    const [loader, setLoader] = React.useState(true)
    const navigate = useNavigate()
    const  navList = [
        {
            name: 'Dashboard',
            path: '/corporate'
        },
        {
            name: 'Orders',
            path: '/corporate/orders'
        },
        {
            name: 'Sales',
            path: '/corporate/sales'
        },
        {
            name: 'Menu',
            path: '/corporate/menu'
        }
    ]

    React.useEffect(() => {
        console.log(restaurantStatus, status);
        if (restaurantStatus && status !== restaurantStatus) {
            navigate('/')
        }
        else if (!restaurantStatus && status !== restaurantStatus) {
            navigate('/dashboard')
        }
        setLoader(false)
    }, [status, navigate, restaurantStatus])

    return (
        <>
            {loader ? <div className="w-full h-screen flex items-center justify-center">
                <LoaderComponent />
            </div> :
                <div className="flex text-black flex-col md:flex-row h-screen">
                    <div className="w-full md:w-1/6 bg-gray-100 h-full">
                        <SideMenu navList={navList} />
                    </div>
                    <div className="w-full md:w-5/6  md:mt-0 mt-3">
                        {children}
                    </div>
                </div>
            }
        </>
    )
}