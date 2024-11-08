import { useState, useEffect } from 'react'
import { useAuthStore } from '../store/Auth'
import { useNavigate } from 'react-router-dom'
import MyNavbar from './MyNavbar'
import LoaderComponent from './Loader'
import Footer from './Footer'


export default function AuthLayout({ children, authenticated = true }) {
    const [loader, setLoader] = useState(true)
    const navigate = useNavigate()
    const status = useAuthStore.getState().status

    console.log(status);
    useEffect(() => {
        if (authenticated && status !== authenticated) {
            navigate('/login')
        }
        else if (!authenticated && status !== authenticated) {
            navigate('/')
        }
        setLoader(false)
    }, [status, navigate, authenticated])
    
    return (
        <div>
            {loader ? <LoaderComponent/> : <>{children}</>}
        </div>
    )
}
