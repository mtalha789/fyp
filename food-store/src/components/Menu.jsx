import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Card,
  Image,
} from "@nextui-org/react";
import React, { useState } from "react";
// import { useForm, submitHandler } from 'react-hook-form'

const steps = [
  {
    id: "Step 1",
    name: "catagory type",
    fields: ["selectMasterCatagory", "CatagoryName"],
  },
  {
    id: "Step 2",
    name: "Add Dish",
    fields: ["item Name*", "Description", "Price"],
  },
  { id: "Step 3", name: "Add Photo", fields: ["addPhoto"] },
];

const Step1 = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [display, setDisplay] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [CategoryName, setCategoryName] = useState("");
  const [dishDisplay, setDishDisplay] = useState(false);
  const [itemName, setItemName] = useState(""); // For Step 2 - Item Name
  const [itemPrice, setItemPrice] = useState(""); // For Step 2 - Item Price
  const [itemImage, setItemImage] = useState(null); // For Step 3 - Item Image

  const handleImageChange = (e) => {
    setItemImage(URL.createObjectURL(e.target.files[0]));
  };
  const handleDelete = (id) => {
    setCategories(categories.filter((category) => category.id !== id));
  };

  const handleEdit = (id) => {
    const editCategory = categories.find((catagory) => catagory.id === id);
    setSelectedCategory(editCategory.masterCatagory);
    setCategoryName(editCategory.name);
    setCategories(categories.filter((catagory) => catagory.id !== id));
    setDisplay(true);
  };
  const handleSave = () => {
    if (selectedCategory && CategoryName) {
      const newCategory = {
        id: Date.now(),
        masterCategory: selectedCategory,
        name: CategoryName,
        items: [], // Empty array to hold items
      };
      setCategories([...categories, newCategory]);
      setSelectedCategory("");
      setCategoryName("");
      setDisplay(false);
      setCurrentStep(1); // Move to Step 1 after saving category
    }
  };
  const handleSaveItem = () => {
    const updatedCategories = categories.map((category, index) => {
      // Only modify the last category in the array
      if (index === categories.length - 1) {
        return {
          ...category,
          items: [
            ...category.items,
            {
              name: itemName,
              price: itemPrice,
              image: itemImage,
            },
          ],
        };
      }
      return category;
    });

    setCategories(updatedCategories);
    setItemName("");
    setItemPrice("");
    setItemImage(null); // Reset image after saving
    setDishDisplay(false);
  };

  const next = () => {
    console.log(currentStep);
    if (currentStep < steps.length - 1) {
      setCurrentStep((step) => step + 1);
    }
  };

  const prev = () => {
    if (currentStep > 0) {
      setCurrentStep((step) => step - 1);
    }
  };

  return (
    <>
      <div className="max-w-lg mx-auto mt-20 p-8 rounded-lg shadow-lg bg-white relative">
        <div className="absolute top-0 left-0 right-0 h-2 bg-black rounded-t-lg"></div>
        {currentStep === 0 && (
          <>
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
          </>
        )}
        {currentStep === 1 && (
          <>
            <div>
              <h2 className="text-2xl font-bold mb-2">
                Now Let's Add Dishes to Your catagories
              </h2>
            </div>
            <div>
              <p className="text-gray-500 mb-6">
                please add the main dishes for your menu. you would be able to
                add different versions or topping later on as well
              </p>
            </div>
          </>
        )}
        {currentStep === 2 && (
          <>
            <div>
              <h2 className="text-2xl font-bold mb-2">
                Let's add some picture to make your guests hungry
              </h2>
            </div>
            <div>
              <p className="text-gray-500 mb-6">
                A good dish photo is one of the most important reasons for
                customers to place an order.
              </p>
            </div>
          </>
        )}

        <div className=" border-1 border-gray-100 w-[28rem] rounded-lg shadow-md flex flex-col  items-start justify-between p-2">
          {currentStep === 0 && (
            <div className="flex justify-between items-center gap-56">
              <div className="items-center">
                <p className="font-bold">Add menu categories</p>
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
          )}

          <div className="w-full">
            {categories.map((category) => (
              <div
                key={category.id}
                className="p-4 border rounded-lg shadow-md mb-4 bg-gray-100"
              >
                {/* Flex container for masterCategory and dropdown button */}
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold">
                    {category.masterCategory}
                  </h3>
                  <Dropdown>
                    <DropdownTrigger>
                      <Button isIconOnly variant="light">
                        ⋮
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Static Actions">
                      <DropdownItem
                        key="edit"
                        onClick={() => handleEdit(category.id)}
                      >
                        Edit file
                      </DropdownItem>
                      <DropdownItem
                        key="delete"
                        className="text-danger"
                        color="danger"
                        onClick={() => handleDelete(category.id)}
                      >
                        Delete file
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>

                <p>{category.name}</p>

                {/* Display items within the category */}
                {category.items.length > 0 ? (
                  <ul className="mt-2">
                    {category.items.map((item, index) => (
                      <li key={index} className="flex justify-between">
                        <span>{item.name}</span>
                        <span>${item.price}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">No items added yet.</p>
                )}
              </div>
            ))}
          </div>
          {currentStep === 1 && (
            <>
              <div className="flex justify-between items-center gap-56 border-b">
                <div className="items-center">
                  <p className="font-bold">
                    <button
                      className="text-black rounded-3xl hover:bg-gray-200 p-1 px-3"
                      onClick={() => setDishDisplay(!dishDisplay)}
                    >
                      +
                    </button>
                    Add Dish
                  </p>
                </div>
                <div></div>
              </div>
            </>
          )}
          <div className="w-full">
            <form>
              {display && (
                <>
                  <label htmlFor="Select-Master-Category" className="font-bold">
                    Select Master Category
                  </label>
                  <select
                    name="selectMasterCategory"
                    id="selectMasterCategory"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="border-none p-3 w-[27rem] rounded-lg shadow-md mb-3 bg-gray-200 "
                  >
                    <option value="">Select Master Category</option>
                    <option value="Drinks">Drinks</option>
                    <option value="Breakfast">Breakfast</option>
                    <option value="Lunch">Lunch</option>
                    <option value="Dinner">Dinner</option>
                    <option value="Dessert">Dessert</option>
                    <option value="Kids menu">Kids menu</option>
                    <option value="Grocery">Grocery</option>
                  </select>

                  <input
                    type="text"
                    placeholder="Category Name*"
                    className="mb-3 w-[27rem] p-2 border rounded-lg bg-gray-200 "
                    value={CategoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                  />

                  <div className="flex justify-end gap-2">
                    <button
                      className="text-black p-3 rounded-lg shadow-lg bg-danger-50"
                      onClick={() => setDisplay(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="text-black p-3 rounded-lg shadow-lg bg-success-50"
                      onClick={() => handleSave()}
                    >
                      Save
                    </button>
                  </div>
                </>
              )}

              {dishDisplay && currentStep === 1 && (
                <>
                  <div className="flex flex-col gap-3">
                    <input
                      type="text"
                      placeholder="Item Name"
                      value={itemName}
                      onChange={(e) => setItemName(e.target.value)}
                      className="mb-3 w-full p-2 border rounded-lg"
                    />
                    <input
                      type="text"
                      name={steps[1].name}
                      id={steps[1].id}
                      placeholder={steps[1].fields[1]}
                      className="mb-3 w-[27rem] p-2 border rounded-lg bg-gray-200"
                    />
                    <label htmlFor="price-validation">
                      {steps[1].fields[2]}
                    </label>
                    <input
                      type="text"
                      placeholder="Item Price"
                      value={itemPrice}
                      onChange={(e) => setItemPrice(e.target.value)}
                      className="mb-3 w-full p-2 border rounded-lg"
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <button
                      className="text-black p-3 rounded-lg shadow-lg bg-success-50"
                      onClick={() => handleSaveItem()}
                    >
                      Save
                    </button>
                  </div>
                </>
              )}

              {currentStep === 2 && (
                <>
                  <div className="flex flex-col gap-2 ">
                    <label htmlFor="item-photo" className="font-bold text-lg">
                      Add Photo
                    </label>
                    <input
                      type="file"
                      onChange={handleImageChange}
                      className="mb-3 w-full p-2 border rounded-lg"
                    />
                  </div>
                  {itemImage && (
                    <>
                      <div className="flex items-center justify-center">
                        <Card
                          radius="lg"
                          className="border-none w-52 items-center justify-center "
                        >
                          <Image
                            alt="Woman listing to music"
                            className="object-cover"
                            height={200}
                            src={itemImage}
                            width={200}
                          />
                        </Card>
                      </div>
                    </>
                  )}
                </>
              )}
            </form>
          </div>
        </div>

        <div className="flex justify-between items-center mt-8">
          <button
            className="hover:text-black font-semibold text-black"
            onClick={() => prev()}
          >
            Back
          </button>
          <p className="text-gray-600">
            {currentStep + 1} of 3 steps to complete
          </p>
          <button
            className="bg-gray-100 text-black px-6 py-2 rounded-lg hover:bg-black hover:text-white"
            onClick={() => next()}
          >
            Continue
          </button>
        </div>
      </div>
    </>
  );
};

export default function Menu() {
  const [state, resetState] = useState({
    // import { useState } from "react"
    catagorysubmission: false,
  });

  if (state.catagorysubmission === true) return <item />;

  return <Step1 state={state} setState={resetState} />;
}
