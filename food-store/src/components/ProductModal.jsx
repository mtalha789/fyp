import React, { useState } from 'react';
import { Modal, Button, Input, Image, Dropdown, ModalBody, ModalFooter,ModalHeader, DropdownMenu, DropdownItem, } from '@nextui-org/react';

const FoodOrderModal = ({ itemName, isOpen, onClose }) => {
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [unavailableOption, setUnavailableOption] = useState('Remove it from my order');
  
  const unavailableOptions = [
    'Remove it from my order',
    'Replace with similar item',
    'Contact me'
  ];


  return (
    <Modal closeButton open={isOpen} onClose={onClose}>
      <ModalHeader>
        <Image src={item.image} alt={item.name} />
      </ModalHeader>
      <ModalBody>
        <h3>{item.name}</h3>
        <p>Rs. {item.price}</p>
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
        <Button auto onClick={() => console.log('Add to cart')}>
          Add to cart
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default FoodOrderModal;

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
    <div>
      <Button onClick={() => setModalOpen(true)}>Order Chicken Breast Tikka</Button>
      <FoodOrderModal 
        item={item}
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
//   );
// };

// export default App;
