import React from "react";
import {
  Button,
  Input,
} from "@nextui-org/react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import { useAuthStore } from "../../store/Auth";
import { loginSchema } from "../../schemas/signupSchema";
import { EyeFilledIcon, EyeSlashFilledIcon } from "../icons";
import { useRestaurantStore } from "../../store/Restaurant";
import toast from "react-hot-toast";

export default function LoginForm() {
  const [error, setError] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [isVisible, setIsVisible] = React.useState(false);
    const navigate = useNavigate()

    const { login } = useAuthStore();
    const { getUserRestaurants } = useRestaurantStore();

    const toggleVisibility = () => setIsVisible(!isVisible);
    const {pathName}= useLocation

    React.useEffect(()=>{
        window.scrollTo(0,0)
      },[pathName])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        //data collection
        const { username, password } = Object.fromEntries(new FormData(e.target));

        //validation
        const result = loginSchema.safeParse({ username, password });
        if (!result.success) {
            setError(result.error.formErrors.fieldErrors);
            setLoading(false);
            return;
        }
        
        //reset form
        e.target.reset();
        
        const response = await login(username, password, getUserRestaurants);

        if (response.error) {
            setError(response.error);
            setLoading(false);
            return;
        }

        toast.success('Logged in successfully')

        navigate('/')

        setLoading(false);
    }

  return (
    <div className='h-screen flex flex-col justify-center items-center'>
            <p className=" font-bold text-3xl text-center text-inherit my-4">
               Log In
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-y-4 justify-center items-center mx-auto w-[90%]">
                {error?.message && <p className="text-red-500">{error?.message}</p>}
                
                <Input
                    type="text"
                    label="Enter Username"
                    isInvalid={error?.username}
                    errorMessage={error?.username} name='username'
                    color='primary'
                    variant='underlined'
                    className="border border-gray-300 max-w-sm sm:min-w-lg rounded-md px-3 py-2"
                />
                <Input
                
                    label="Password"
                    color='primary'
                    variant='underlined'
                    className="border border-gray-300 max-w-sm sm:min-w-lg rounded-md px-3 py-2"
                    endContent={
                        <Button 
                        isIconOnly
                        className="focus:outline-none rounded-full" 
                        variant="light"type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
                            {isVisible ? (
                                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                            ) : (
                                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                            )}
                        </Button>
                    }
                    type={isVisible ? "text" : "password"}
                    isInvalid={error?.password}
                    errorMessage={error?.password}
                    name="password"
                />
                <Button
                    type="submit"
                    className="bg-blue-500 max-w-xl mx-auto hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    disabled={loading}
                    variant='shadow'
                >
                    {loading ? "Signing In..." : 'Login'}
                </Button>
            </form>
            <p className="text-gray-500 text-center my-2">Don't have an account? <Link to='/signup' className="text-blue-500 underline">Create Account</Link> </p>
        </div>
  );
}
