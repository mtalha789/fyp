import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Image,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Input,
  DropdownTrigger,
} from "@nextui-org/react";
// import { useNavigate, useParams } from "react-router-dom";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import { useCart } from "../state/Cart";

const productList = [
  {
    id: 1,
    title: "Krunch Combo1",
    price: " 950",
    description: "Enjoy a crispy crunchy chicken",
    img: "https://images.deliveryhero.io/image/fd-pk/Products/1165006.png??width=400",
  },
  {
    id: 2,
    title: "Krunch Combo",
    price: " 550",
    description: "Enjoy a crispy crunchy chicken",
    img: "https://images.deliveryhero.io/image/fd-pk/Products/1165006.png??width=400",
  },
  {
    id: 3,
    title: "Krunch Combo",
    price: " 550",
    description: "Enjoy a crispy crunchy chicken",
    img: "https://images.deliveryhero.io/image/fd-pk/Products/1165006.png??width=400",
  },
  {
    id: 4,
    title: "Krunch Combo",
    price: " 550",
    description: "Enjoy a crispy crunchy chicken",
    img: "https://images.deliveryhero.io/image/fd-pk/Products/1165006.png??width=400",
  },
  {
    id: 5,
    title: "Krunch Combo",
    price: " 550",
    description: "Enjoy a crispy crunchy chicken",
    img: "https://images.deliveryhero.io/image/fd-pk/Products/1165006.png??width=400",
  },
  {
    id: 6,
    title: "Krunch Combo",
    price: " 550",
    description: "Enjoy a crispy crunchy chicken",
    img: "https://images.deliveryhero.io/image/fd-pk/Products/1165006.png??width=400",
  },
];

export default function ItemCard() {
  const [selectedKeys, setSelectedKeys] = React.useState(
    new Set(["Remove it from my order"])
  );

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );

  // const navigate = useNavigate();
  // const { id } = useParams();
  const [specialInstructions, setSpecialInstructions] = useState("");

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedItem, setSelectedItem] = useState(null);

  const handleClick = (item) => {
    // navigate(`/product/${id}`)
    console.log(item);
    setSelectedItem(item);
    onOpen();
  };

  // const handleAddtoCart = () => {
  //   alert(`Added to Cart${selectedItem.title}`);
  // };
  const { addToCart } = useCart();

  return (
    <>
      <div className="grid grid-cols-3 px-72 py-10 gap-7">
        {productList.map((item) => (
          <Card
            className="py-4"
            key={item.id}
            isPressable
            isHoverable
            onPress={() => handleClick(item)}
          >
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
              <h4 className="font-bold text-large">{item.title}</h4>
              <small className="text-default-500">{item.description}</small>
              <p className="text-tiny uppercase font-bold overflow-hidden">
                {item.pr}
              </p>
            </CardHeader>
            <CardBody className="overflow-visible py-2 relative">
              <Image
                alt="Card background"
                className="object-cover rounded-xl "
                src={item.img}
              />
              <Button
                onClick={() => {
                  console.log("added to cart", item);
                  addToCart({...item,quantity:1});
                }}
                isHoverable
                variant="solid"
                className=" absolute bottom-3 right-4 bg-white rounded-xl p-2 z-10"
              >
                Add to Cart
              </Button>
            </CardBody>
          </Card>
        ))}
      </div>
      <Modal
        className="pt-9"
        backdrop={"blur"}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className=" p-0 ">
                <Image src={selectedItem.img} alt={selectedItem.name} />
              </ModalHeader>
              <ModalBody>
                <h3 className="text-2xl font-bold pt-3">
                  {selectedItem.title}
                </h3>
                <p className="text-xl font-medium">Rs. {selectedItem.price}</p>
                <p>{selectedItem.description}</p>
                <h1 className="text-xl font-bold">Special instructions</h1>
                <p>
                  Special requests are subject to the restaurant's approval.
                  Tell us here!
                </p>
                <Input
                  placeholder="e.g. No mayo"
                  fullWidth
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                />
                <h1 className="text-xl font-bold">
                  If this item is not available
                </h1>
                <Dropdown>
                  <DropdownTrigger>
                    <Button variant="bordered" className="capitalize">
                      {selectedValue}
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    aria-label="Single selection example"
                    variant="flat"
                    disallowEmptySelection
                    selectionMode="single"
                    selectedKeys={selectedKeys}
                    onSelectionChange={setSelectedKeys}
                  >
                    <DropdownItem key="Remove it from my order">
                      Remove it from my order
                    </DropdownItem>
                    <DropdownItem key="Replace with similar item">
                      Replace with similar item
                    </DropdownItem>
                    <DropdownItem key="Contact me">Contact me</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </ModalBody>
              <ModalFooter>
                <Button
                  auto
                  flat
                  color="danger"
                  variant="flat"
                  colo
                  onClick={onClose}
                >
                  Close
                </Button>
                <Button onClick={() => addToCart(selectedItem.id)}>
                  Add to cart
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
