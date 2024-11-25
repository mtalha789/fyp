import React from 'react'
import { useAdminStore } from '../../store/Admin';
import { useNavigate } from 'react-router-dom';

export default function AdminForm() {
    const [error, setError] = React.useState(null);
    const navigate = useNavigate()
    const [loading, setLoading] = React.useState(false);
    const { authenticateAdmin } = useAdminStore()

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        //data collection
        const data = new FormData(e.target);

        //validation
        const result = signupSchema.safeParse(Object.fromEntries(data.entries()));
        if(!result.success) {
            setError(result.error.formErrors.fieldErrors);
            setLoading(false);
            console.log(result.error);
            return;
        }

        const response = await authenticateAdmin(data);

        if(response.error) {
            setError(response.error);
            setLoading(false);
            return;
        }

        console.log(response);
        setLoading(false);
        navigate('/admin')
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <h1 className="font-extrabold text-3xl text-inherit m-4 justify-center flex">
                Admin Authentication
            </h1>
            {error?.message && <p className="text-red-500">{error?.message}</p>}
            <div className="flex flex-col gap-2 container mx-auto max-w-[80%]">
                <div className="space-y-2">    
                    <Input
                        type="text"
                        placeholder="Username"
                        label="Enter Username"
                        name='username'
                        className="border border-gray-300 rounded-md px-3 py-2"
                    />
                    {error?.username && <p className="text-red-500">{error?.username}</p>}
                </div>
                <div className="space-y-2">    
                    <Input
                        type="password"
                        label="Enter Password"
                        placeholder="Password"
                        name='password'
                        className="border border-gray-300 rounded-md px-3 py-2"
                    />
                    {error?.password && <p className="text-red-500">{error?.password}</p>}
                </div>
                <Button
                    type="submit"
                    className="bg-blue-500 w-[50%] mx-auto hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    disabled={loading}
                    variant='shadow'
                >
                    { loading ? "Registering..." :'Submit'}
                </Button>
            </div>
        </form>
    )
}
