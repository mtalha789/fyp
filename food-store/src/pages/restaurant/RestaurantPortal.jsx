import { Link, useNavigate, Outlet } from 'react-router-dom'
import React from 'react'
import { useRestaurantStore } from '../../store/Restaurant'
import { MenuIcon } from 'lucide-react'
import { Button } from '@nextui-org/react'

export default function RestaurantPortal() {
    return (
        <RestaurantPortalLayout>
            <Outlet />
        </RestaurantPortalLayout>
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
            {loader ? <div className="w-full h-screen flex items-center justify-center">Loading...</div> :
                <div className="flex flex-col md:flex-row h-screen">
                    <div className="w-full md:w-1/6 bg-gray-200 h-full">
                        <SideMenu />
                    </div>
                    <div className="w-full md:w-5/6 bg-gray-100 md:mt-0 mt-3">
                        {children}
                    </div>
                </div>
            }
        </>
    )
}


const SideMenu = () => {
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
            <div className={`sticky md:block ${menuHidden ? 'hidden' : ''} top-0 pt-4 h-screen transition-all duration-300 ease-in-out bg-gray-200`}>
                <div className="flex flex-row md:flex-col justify-between md:items-center">
                    <h1 className="text-4xl font-bold">Logo</h1>
                    <nav className="mt-10 w-full space-y-4">
                        <ul className="space-y-2">
                            <li>
                                <Link to="/corporate" className="text-blue-500 flex items-center px-4 py-2 rounded-lg hover:bg-blue-100">
                                    Dashboard
                                </Link>
                            </li>
                            {/* <li>
                            <Link to="/rating" className="text-blue-500 flex items-center px-4 py-2 rounded-lg hover:bg-blue-100">
                                Rating and Reviews
                            </Link>
                        </li> */}
                            <li>
                                <Link to="/corporate/menu" className="text-blue-500 flex items-center px-4 py-2 rounded-lg hover:bg-blue-100">
                                    Menu Management
                                </Link>
                            </li>
                            <li>
                                <Link to="/corporate/orders" className="text-blue-500 flex items-center px-4 py-2 rounded-lg hover:bg-blue-100">
                                    Orders
                                </Link>
                            </li>
                            <li>
                                <Link to="/corporate/sales" className="text-blue-500 flex items-center px-4 py-2 rounded-lg hover:bg-blue-100">
                                    Sale Reports
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    )
}
