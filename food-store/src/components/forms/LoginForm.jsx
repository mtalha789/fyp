import React from "react";
import {
  Button,
  Input,
} from "@nextui-org/react";
import { Link } from "react-router-dom";

import { useAuthStore } from "../../store/Auth";
import { loginSchema } from "../../schemas/signupSchema";
import { EyeFilledIcon, EyeSlashFilledIcon } from "../icons";

export default function LoginForm() {
  const [error, setError] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [isVisible, setIsVisible] = React.useState(false);

    const { login } = useAuthStore();

    const toggleVisibility = () => setIsVisible(!isVisible);

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
        
        const response = await login(username, password);

        if (response.error) {
            setError(response.error);
            setLoading(false);
            return;
        }

        setLoading(false);
    }

  return (
    <div className='text-primary-500 h-screen flex flex-col justify-center gap-6 items-center'>
            <p className="font-thin text-3xl text-center text-inherit my-4">
                SignIn
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
                        <button className="focus:outline-none" type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
                            {isVisible ? (
                                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                            ) : (
                                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                            )}
                        </button>
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
            <p className="text-gray-500 text-center my-2">Don't have an account? <Link to='/signup' className="text-blue-500">Create Account</Link> </p>
        </div>
  );
}
