import { Link, useNavigate } from 'react-router-dom'
import React from 'react'
import { useRestaurantStore } from '../../store/Restaurant'

export default function RestaurantPortal() {
    return (
        <RestaurantPortalLayout>
            <h1>l</h1>
        </RestaurantPortalLayout>
    )
}

export const RestaurantPortalLayout = ({ children, restaurantStatus = true }) => {
    const status = useRestaurantStore.getState().restaurantStatus
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
            {loader ? <div>Loading...</div> :
                <div className="flex h-screen">
                    <div className="w-1/6 bg-gray-200">
                        <SideMenu />
                    </div>
                    <div className="w-5/6 bg-gray-100">
                        {children}
                    </div>
                </div>
            }
        </>
    )
}


const SideMenu = () => {
    return (
        <div className="sticky top-0">
            <h1>Logo</h1>
            <nav className="bg-gray-200 p-4">
                <ul className="flex flex-col space-y-2">
                    <li>
                        <Link to="/dashboard" className="text-blue-500">
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link to="/rating" className="text-blue-500">
                            Rating and Reviews
                        </Link>
                    </li>
                    <li>
                        <Link to="/menu-management" className="text-blue-500">
                            Menu Management
                        </Link>
                    </li>
                    <li>
                        <Link to="/orders" className="text-blue-500">
                            Orders
                        </Link>
                    </li>
                    <li>
                        <Link to="/sale-reports" className="text-blue-500">
                            Sale Reports
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}
