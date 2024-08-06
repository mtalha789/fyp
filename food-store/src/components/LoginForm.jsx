import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import { Link } from "react-router-dom";


export default function LoginForm() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
    <Link to="/login">
      <Button onPress={onOpen} color="primary" variant="solid">
        Login
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <p className="font-extrabold text-3xl text-inherit m-4 justify-center flex">
                Mealo
              </p>
              <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
              <ModalBody>
                <Input
                  label="Number"
                  placeholder="Phone"
                  type="number"
                  variant="bordered"
                  min={0}
                  max={9}
                />
                <span className="flex justify-center">OR</span>
                <Button color="primary" variant="shadow">
                  Sign in With Google
                </Button>
                <Button color="danger" variant="shadow">
                  Continue with Email
                </Button>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="default" variant="flat" onPress={onClose}>
                  Submit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      </Link>
    </>
  );
}
