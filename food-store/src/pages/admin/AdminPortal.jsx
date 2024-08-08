import React from 'react'
import SideMenu from '../../components/SideMenu'
import { Outlet, useNavigate } from 'react-router-dom'
import LoaderComponent from '../../components/Loader'

const AdminPortal = () => {
    const status = true
    const [loader, setLoader] = React.useState(false)
    const navigate = useNavigate()
    
    const navList = [
        { name: 'Dashboard', path: '/admin' },
        { name: 'Riders', path: '/admin/riders' },
        { name: 'Products', path: '/admin/products' },
        { name: 'Customers', path: '/admin/customers' },
        { name: 'Restaurants', path: '/admin/restaurants' }
    ]

    // React.useEffect(() => {
    //     console.log(restaurantStatus, status);
    //     if (restaurantStatus && status !== restaurantStatus) {
    //         navigate('/')
    //     }
    //     else if (!restaurantStatus && status !== restaurantStatus) {
    //         navigate('/dashboard')
    //     }
    //     setLoader(false)
    // }, [status, navigate, restaurantStatus])

    return (
        <>
            {loader ? <div className="w-full h-screen flex items-center justify-center">
                <LoaderComponent />
            </div> :
                <div className="flex text-blue-500 flex-col md:flex-row h-screen">
                    <div className="w-full md:w-1/6 bg-green-900 h-full">
                        <SideMenu navList={navList} />
                    </div>
                    <div className="w-full md:w-5/6 bg-green-800 md:mt-0 mt-3">
                        <Outlet />
                    </div>
                </div>
            }
        </>
    )
}



export default AdminPortal