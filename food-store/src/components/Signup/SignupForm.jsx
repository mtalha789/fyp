import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link } from '@nextui-org/react';
import React from 'react';
import { coverImageSchema, signupSchema } from '../../schemas/signupSchema';
import { useAuthStore } from '../../store/Auth';

function SignupForm() {
    const [error, setError] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const { register, login } = useAuthStore()

    // const { isOpen, onOpen, onOpenChange } = useDisclosure();
    // return (
    //     <>
    //         <Button onPress={onOpen} color="default" variant="solid">Sign Up</Button>

    //         <Modal
    //             isOpen={isOpen}
    //             onOpenChange={onOpenChange}
    //             placement='top-center'
    //         >
    //             <ModalContent>
    //                 {(onClose) => (
    //                     <>
    //                         <p className="font-extrabold text-3xl text-inherit m-4 justify-center flex">
    //                             Mealo
    //                         </p>
    //                         <ModalHeader className="flex flex-col gap-1">
    //                             SignUp
    //                         </ModalHeader>
    //                         <ModalBody>
    //                             <Input
    //                                 label="Text"
    //                                 placeholder="Full Name"
    //                                 type="Text"
    //                                 variant="bordered"
    //                             />
    //                             <Input
    //                                 label="Email"
    //                                 placeholder="Enter your Email"
    //                                 type="Email"
    //                                 variant="bordered"
    //                             />
    //                             <div className="flex py-2 px-1 justify-between">
    //                                 <Checkbox
    //                                     classNames={{
    //                                         label: "text-small",
    //                                     }}
    //                                 >
    //                                     Remember me
    //                                 </Checkbox>
    //                                 <Link color="primary" href="#" size="sm">
    //                                     Forgot password?
    //                                 </Link>
    //                             </div>

    //                         </ModalBody>
    //                         <ModalFooter>
    //                             <Button color="success" variant="flat" onPress={onClose}>
    //                                 Create Account
    //                             </Button>
    //                         </ModalFooter>
    //                     </>
    //                 )}
    //             </ModalContent>
    //         </Modal>
    //     </>
    // );
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        //data collection
        const data = new FormData(e.target);

        const coverImage = data.get('coverImage');

        //validation
        const result = signupSchema.safeParse(Object.fromEntries(data.entries()));
        if(!result.success) {
            setError(result.error.formErrors.fieldErrors);
            setLoading(false);
            console.log(result.error);
            return;
        }
        if(coverImage && !coverImageSchema.safeParse(coverImage).success) {
            setError({coverImage: 'Cover Image is must be less than 5MB'});
            setLoading(false);
            return;
        }

        const response = await register(data);

        if(response.error) {
            setError(response.error);
            setLoading(false);
            return;
        }

        const logedin = await login(data.get('username'), data.get('password'));
        if(logedin.error) {
            setError(logedin.error);
            setLoading(false);
            return;
        }
        setLoading(false);
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <p className="font-extrabold text-3xl text-inherit m-4 justify-center flex">
                SignUp
            </p>
            {error?.message && <p className="text-red-500">{error?.message}</p>}
            <div className="flex flex-col gap-2 container mx-auto max-w-[80%]">
                <div className="space-y-2">
                    <Input
                    type="text"
                    placeholder="Full Name"
                    name='fullname'
                    label="Enter Full Name"
                    className="border border-gray-300 rounded-md px-3 py-2"
                    />
                    {error?.fullname && <p className="text-red-500">{error?.fullname}</p>}
                </div>
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
                        type="email"
                        label="Enter Email"
                        placeholder="Email"
                        name='email'
                        className="border border-gray-300 rounded-md px-3 py-2"
                    />
                    {error?.email && <p className="text-red-500">{error?.email}</p>}
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
                <div className="space-y-2">    
                    <label htmlFor="avatar">Avatar</label>
                    <Input
                        type="file"
                        name='avatar'
                        id='avatar'
                        className="border border-gray-300 rounded-md px-3 py-2"
                    />
                    
                    {error?.avatar && <p className="text-red-500">{error?.avatar}</p>}
                </div>
                <div className="space-y-2">
                    <label htmlFor="coverImage">Cover Image</label>
                    <Input
                    type='file'
                    name='coverImage'
                    id="Cover Image"
                    className="border border-gray-300 rounded-md px-3 py-2"
                    />

                </div>
                <Button
                    type="submit"
                    className="bg-blue-500 w-[50%] mx-auto hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    disabled={loading}
                    variant='shadow'
                >
                    { loading ? "Registering..." :'Sign Up'}
                </Button>
            </div>
        </form>
    )
}

export default SignupForm;