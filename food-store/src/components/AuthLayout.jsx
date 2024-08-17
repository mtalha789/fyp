import { useState, useEffect } from 'react'
import { useAuthStore } from '../store/Auth'
import { useNavigate } from 'react-router-dom'
import MyNavbar from './MyNavbar'


export default function AuthLayout({ children, authenicated = true }) {
    const [loader, setLoader] = useState(true)
    const navigate = useNavigate()
    const status = useAuthStore.getState().status

    useEffect(() => {
        if (authenicated && status !== authenicated) {
            navigate('/login')
        }
        else if (!authenicated && status !== authenicated) {
            navigate('/')
        }
        setLoader(false)
    }, [status, navigate, authenicated])
    
    return (
        <div>
            {loader ? <div>Loading...</div> : 
            <>
            <MyNavbar/>
            {children}
            </>
            }
        </div>
    )
}
