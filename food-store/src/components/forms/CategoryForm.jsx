import React from "react";
import { addCategory } from "../../queries/mutations";
import toast, { Toaster } from "react-hot-toast";
import { z } from "zod";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link } from "@nextui-org/react";


export default function CategoryForm() {
  const [name, setName] = React.useState("");
  const [display, setDisplay] = React.useState(false);
  const { mutate, data, isLoading, isError, error } = addCategory();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const nameSchema = z
    .string()
    .trim()
    .min(3, "Category name must be at least 3 characters long")
    .max(20, "Category name must be at most 20 characters long");
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nameSchema.safeParse(name).success) {
      toast.error("Category name must be at least 3 characters long");
      return;
    }
    const response = await mutate({ name });
    // console.log( "respomse",response);

    if (response.success) {
      toast.success("Category added successfully");
    } else toast.error('Error adding category');
    setName('')
    onclose();
  };
  return (
    <>
      <Button onPress={onOpen} color="primary">Add Category</Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="max-h-[80%] p-4"
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>

                <div className="max-w-lg mx-auto my-4 p-8 rounded-lg shadow-lg bg-white relative">
                  <div className="absolute top-0 left-0 right-0 h-2 bg-black rounded-t-lg"></div>
                  <Toaster />
                  <div>
                    <h2 className="text-2xl font-bold mb-2">
                      Let's start by creating the categories of your menu
                    </h2>
                  </div>
                  <div>
                    <p className="text-gray-500 mb-6">
                      Categories allow customers to navigate your menu in the app
                    </p>
                  </div>
                  <div className="flex justify-between items-center flex-col  p-4 rounded-md shadow-xl ">
                    <div className="w-full flex justify-between">
                      <div className="items-center">
                        <p className="font-bold">Add new categories</p>
                      </div>
                      <div>
                        <button
                          className="text-black rounded-3xl hover:bg-gray-200 p-1 px-3"
                          onClick={() => setDisplay(!display)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    {display && (
                      <>
                        <div className="flex w-full flex-wrap md:flex-nowrap my-6 md:mb-0 gap-4">
                          <Input
                            onSubmit={() => { handleSubmit() }}
                            name="name"
                            variant="flat"
                            size="md"
                            label="Category Name"
                            type="text"
                            value={name}
                            onChange={handleNameChange}
                          />
                        </div>
                        <div className="flex justify-end  w-full mt-2">
                          <Button color="primary" variant="flat" type="submit" disabled={isLoading} onClick={handleSubmit}>
                            Add Category
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
