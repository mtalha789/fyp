import { Button, Input } from '@nextui-org/react';
import React from 'react';
import { coverImageSchema, signupSchema } from '../../../schemas/signupSchema';
import { useAuthStore } from '../../../store/Auth';
import { EyeFilledIcon, EyeSlashFilledIcon } from '../../icons';
import { Link, useNavigate } from 'react-router-dom';

function SignupForm() {
    const [error, setError] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [isVisible, setIsVisible] = React.useState(false);
    const navigate = useNavigate()

    const { register, login } = useAuthStore();

    const toggleVisibility = () => setIsVisible(!isVisible);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        //data collection
        const data = new FormData(e.target);

        const coverImage = data.get('coverImage');

        //validation
        const result = signupSchema.safeParse(Object.fromEntries(data.entries()));
        if (!result.success) {
            setError(result.error.formErrors.fieldErrors);
            setLoading(false);
            console.log(result.error);
            return;
        }
        if (coverImage && !coverImageSchema.safeParse(coverImage).success) {
            setError({ coverImage: 'Cover Image is must be less than 5MB' });
            setLoading(false);
            return;
        }

        const response = await register(data);

        if (!response.success) {
            setError(response.error);
            setLoading(false);
            return;
        }

        const logedin = await login(data.get('username'), data.get('password'));
        if (logedin.error) {
            setError(logedin.error);
            setLoading(false);
            return;
        }
        setLoading(false);
        navigate('/')
    }

    return (
        <div className='h-screen flex flex-col justify-center items-center'>
            <p className="font-bold text-4xl text-center text-inherit pb-12">
               Create an account
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-y-4 justify-center items-center mx-auto w-[90%]">
                {error?.message && <p className="text-red-500">{error?.message}</p>}
                <Input
                isRequired
                isClearable
                    type="text"
                    name='fullname'
                    label="Enter Full Name"
                    isInvalid={error?.fullname}
                    errorMessage={error?.fullname}
                    variant='flat'
                    className=" max-w-sm sm:min-w-lg rounded-md px-3 py-2"
                />
                <Input
                    type="text"
                    label="Enter Username"
                    isInvalid={error?.username}
                    errorMessage={error?.username} name='username'
                    
                    variant='flat'
                    className="max-w-sm sm:min-w-lg rounded-md px-3 py-2"
                />
                <Input
                    type="email"
                    label="Enter Email"
                    isInvalid={error?.email}
                    errorMessage={error?.email}
                    isRequired
                    name='email'
                    
                    variant='flat'
                    className="max-w-sm sm:min-w-lg rounded-md px-3 py-2"
                />
                <Input
                    label="Password"
                    
                    name='password'
                    variant='flat'
                    className="max-w-sm sm:min-w-lg rounded-md px-3 py-2"
                    endContent={
                        <Button isIconOnly variant='light' className="focus:outline-none rounded-full" type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
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
                />
                <Input
                    type="file"
                    label="Avatar"
                    labelPlacement='outside-left'
                    name='avatar'
                    id='avatar'
                    accept='image/*'
                    isRequired
                    
                    variant='flat'
                    className="max-w-sm sm:min-w-lg rounded-md px-3 py-2"
                    isInvalid={error?.avatar}
                    errorMessage={error?.avatar}
                />
                <Input
                    type='file'
                    label="Cover Image"
                    labelPlacement='outside-left'
                    name='coverImage'
                    id="Cover Image"
                    accept='image/*'
                    
                    variant='flat'
                    isInvalid={error?.coverImage}
                    errorMessage={error?.coverImage}
                    className="max-w-sm sm:min-w-lg rounded-md px-3 py-2"
                />
                <Button
                    type="submit"
                    className="w-full sm:max-w-[20rem] mx-auto bg-black text-white font-bold py-2 px-4 rounded-lg"
                    disabled={loading}
                    variant='flat'
                >
                    {loading ? "Registering..." : 'Sign Up'}
                </Button>
            </form>
            <p className="text-gray-500 text-center my-2">Already have an account? <Link to="/login" className="text-black underline">Login</Link></p>
        </div>
    )
}

export default SignupForm;