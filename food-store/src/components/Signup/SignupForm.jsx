import { Modal, ModalContent ,ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link} from '@nextui-org/react';
import React from 'react';

function SignupForm() {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    return (
<>
    <Button onPress={onOpen} color="default" variant="flat">Sign Up</Button>
               
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement='top-center'
        >
            <ModalContent>
                {(onClose) => (
                    <>
                     <p className="font-extrabold text-3xl text-inherit m-4 justify-center flex">
                         Mealo
                     </p>
                    <ModalHeader className="flex flex-col gap-1">
                        SignUp
                    </ModalHeader>
                    <ModalBody>
                        <Input
                        label="Text"
                        placeholder="Full Name"
                        type="Text"
                        variant="bordered"
                        />
                        <Input 
                        label="Email"
                        placeholder="Enter your Email"
                        type="Email"
                        variant="bordered"
                        />
                 <div className="flex py-2 px-1 justify-between">
                  <Checkbox
                    classNames={{
                      label: "text-small",
                    }}
                  >
                    Remember me
                  </Checkbox>
                  <Link color="primary" href="#" size="sm">
                    Forgot password?
                  </Link>
                </div>
              
                    </ModalBody>
                    <ModalFooter>
                <Button color="success" variant="flat" onPress={onClose}>
                 Create Account
                </Button>
              </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
        </>
    );
}

export default SignupForm;