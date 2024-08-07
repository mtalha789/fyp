import { Link, useNavigate, Outlet, NavLink } from 'react-router-dom'
import React from 'react'
import { useRestaurantStore } from '../../store/Restaurant'
import { MenuIcon } from 'lucide-react'
import { Button } from '@nextui-org/react'
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
                <div className="flex text-blue-500 flex-col md:flex-row h-screen">
                    <div className="w-full md:w-1/6 bg-green-900 h-full">
                        <SideMenu />
                    </div>
                    <div className="w-full md:w-5/6 bg-green-800 md:mt-0 mt-3">
                        {children}
                    </div>
                </div>
            }
        </>
    )
}


const SideMenu = () => {
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

    const [menuHidden, setMenuHidden] = React.useState(true)
    const toggleMenuHidden = () => {
        setMenuHidden(menuHidden => !menuHidden)
    }

    return (
        <>
            <div className="md:hidden p-2 flex items-center justify-between">
                <h1 className={`${!menuHidden && 'hidden'} text-2xl font-bold`}>Logo</h1>
                <Button onClick={toggleMenuHidden} className={`z-10 ${!menuHidden && 'absolute top-3 right-3'}`}>
                    <MenuIcon />
                </Button>

            </div>
            <div className={`sticky md:block ${menuHidden ? 'hidden' : ''} top-0 pt-4 h-screen transition-all duration-300 ease-in-out pl-4`}>
                <div className="flex flex-row md:flex-col justify-between md:items-center">
                    <nav className="mt-10 w-full space-y-4">
                        <ul className="space-y-2">
                            {navList.map((item, index) => (
                                <li key={index}>
                                    <NavLink
                                        to={item.path}
                                        end
                                        className={({ isActive }) => `flex items-center p-2 hover:bg-transparent text-lg font-medium rounded-l-lg ${isActive ? 'bg-blue-500 text-white' : 'text-blue-500'}`}
                                    >
                                        <span className="ml-3">{item.name}</span>
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    )
}
