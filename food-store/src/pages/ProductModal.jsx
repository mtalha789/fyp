import React, { useEffect, useState } from "react";
import {
  Modal,
  Button,
  Input,
  Image,
  Dropdown,
  ModalBody,
  ModalFooter,
  ModalHeader,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { useNavigate, useParams } from "react-router-dom";

const productList = [
  {
    id: 1,
    title: "Krunch Combo",
    price: " Rs. 550",
    description: "Enjoy a crispy crunchy chicken",
    img: "https://images.deliveryhero.io/image/fd-pk/Products/1165006.png??width=400",
  },
  { id: 2, name: "Product 2", price: 200 },
  { id: 3, name: "Product 3", price: 300 },
  { id: 4, name: "Product 4", price: 400 },
];

const ProductModal = ({ itemName, isOpen, onClose }) => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const navigate=useNavigate()

  useEffect(() => {
    const filterProduct = productList.find((item) => item.id === parseInt(id));
    setProduct(filterProduct);
    console.log(filterProduct.id);
  }, [id]);

  const [specialInstructions, setSpecialInstructions] = useState("");
  const [unavailableOption, setUnavailableOption] = useState("Remove it from my order");

  const unavailableOptions = [
    "Remove it from my order",
    "Replace with similar item",
    "Contact me",
  ];
  

  return (
    <Modal closeButton open={isOpen} onClose={onClose} >
      <ModalHeader>
        <Image src={product.image} alt={product.name} />
      </ModalHeader>
      <ModalBody>
        <h3>{product.name}</h3>
        <p>Rs. {product.price}</p>
        <Input
          label="Special instructions"
          placeholder="e.g. No mayo"
          fullWidth
          value={specialInstructions}
          onChange={(e) => setSpecialInstructions(e.target.value)}
        />
        <Dropdown>
          <Button>{unavailableOption}</Button>
          <DropdownMenu
            aria-label="Unavailable options"
            onAction={(key) => setUnavailableOption(key)}
          >
            {unavailableOptions.map((option, index) => (
              <DropdownItem key={option}>{option}</DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </ModalBody>
      <ModalFooter>
        <Button auto flat color="error" onClick={onClose}>
          Close
        </Button>
        <Button auto onClick={() => console.log("Add to cart")}>
          Add to cart
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ProductModal;

// PUt it in Main app
// import React, { useState } from 'react';
// import { Button } from '@nextui-org/react';
// import FoodOrderModal from './FoodOrderModal';

// const App = () => {
//   const [isModalOpen, setModalOpen] = useState(false);

//   const item = {
//     name: 'Chicken Breast Tikka',
//     price: 645,
//     image: '/path/to/chicken-breast-tikka.jpg'  // replace with actual image path
//   };

//   return (
// <div>
//   <Button onClick={() => setModalOpen(true)}>Order Chicken Breast Tikka</Button>
//   <FoodOrderModal
//     item={product}
//     isOpen={isModalOpen}
//     onClose={() => setModalOpen(false)}
//   />
// </div>
//   );
// };

// export default App;
