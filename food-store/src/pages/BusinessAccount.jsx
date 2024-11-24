import React, { useState, useEffect } from 'react';
import { Button, Avatar } from '@nextui-org/react';
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { PlusIcon, EditIcon, DeleteIcon, Verified } from 'lucide-react';
import EditRestuarant from '../components/forms/EditRestuarant';
import { useNavigate } from 'react-router-dom';

// Sample data fetching function (replace with actual API call if needed)
const fetchRestaurants = async () => {
    return [
        {
            id: '1',
            name: 'Pasta Palace',
            imageUrl: 'https://example.com/pasta.jpg',
            corporateEmail: 'contact@pastapalace.com',
            phone: '123-456-7890',
            minimumOrderPrice: 20,
            approved: true,
            closed: false,
        },
        // Additional restaurants...
    ];
};

const BusinessPartner = () => {
    const navigate = useNavigate();
    const [restaurants, setRestaurants] = useState([
        {
            id: "1",
            name: "Gourmet Bistro",
            imageUrl: "https://example.com/images/gourmet-bistro.jpg",
            corporateEmail: "info@gourmetbistro.com",
            phone: "+123456789",
            minimumOrderPrice: 20.5,
            closed: false,
            address: [
                {
                    id: "a1",
                    street: "123 Flavor St",
                    city: "Tastetown",
                    state: "CA",
                    zipCode: "90001",
                    restaurantId: "1",
                    deleted: false
                },
                {
                    id: "a2",
                    street: null,
                    city: "Tastetown",
                    state: "CA",
                    zipCode: "90001",
                    restaurantId: "1",
                    deleted: true
                }
            ]
        },
        {
            id: "2",
            name: "Pizza Palace",
            imageUrl: "https://example.com/images/pizza-palace.jpg",
            corporateEmail: "contact@pizzapalace.com",
            phone: "+987654321",
            minimumOrderPrice: 15.0,
            closed: true,
            address: [
                {
                    id: "b1",
                    street: "456 Dough Lane",
                    city: "Crust City",
                    state: "NY",
                    zipCode: "10001",
                    restaurantId: "2",
                    deleted: false
                }
            ]
        }]);

    // useEffect(() => {
    //     const loadRestaurants = async () => {
    //         const data = await fetchRestaurants();
    //         setRestaurants(data);
    //     };
    //     loadRestaurants();
    // }, []);

    const handleAddRestaurant = () => navigate('/business/register');


    const handleDeleteRestaurant = (id) => {
        // Logic for deleting restaurant
    };

    return (
        <div className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4 sm:gap-0">
                <h2 className="text-2xl font-semibold">Business Account - Restaurants</h2>
                <Button  
                    onClick={handleAddRestaurant} 
                    className="bg-blue-500 text-white w-full sm:w-auto"
                >
                    Add New Restaurant <PlusIcon className="h-5 w-5" />
                </Button>
            </div>
    
            <div className="flex flex-col gap-6">
                {restaurants.map((restaurant) => (
                    <Card key={restaurant.id} className="shadow-lg w-[100%]">
                        <CardHeader className="flex items-center">
                            <Avatar
                                src={restaurant.imageUrl}
                                alt={`${restaurant.name} logo`}
                                size="lg"
                                className="mr-4"
                            />
                            <div>
                                <span>
                                <h3 className="text-lg font-bold">{restaurant.name}</h3>
                                {restaurant?.approved && <Verified fill='blue' />}    
                                </span>
                                <p className="text-xs text-gray-500">{restaurant.corporateEmail}</p>
                                {restaurant.address[0].deleted === false && (
                                    <p className='text-xs '>{restaurant.address[0].street}-{restaurant.address[0].city}</p>
                                )}
                            </div>
                            
                        </CardHeader>
                        <CardBody className="py-4">
                            <p className="mb-2"><strong>Phone:</strong> {restaurant.phone}</p>
                            <p className="mb-2">
                                <strong>Minimum Order:</strong> PKR {restaurant.minimumOrderPrice.toFixed(2)}
                            </p>
                            <p className="mb-2"><strong>Status:</strong> {restaurant.closed ? "Closed" : "Open"}</p>
                            {/* <p className="mb-4"><strong>Approved:</strong> {restaurant.approved ? "Yes" : "Pending"}</p>*/}
                        </CardBody>
                        <CardFooter className="flex justify-end gap-2">
                            <Button 
                                onClick={() => navigate(`/business/restaurant/${restaurant.id}/edit`)} 
                                color="primary" 
                                size="sm"
                            >
                                Edit <EditIcon className="h-5 w-5" />
                            </Button>
                            <Button 
                                onClick={() => handleDeleteRestaurant(restaurant.id)} 
                                color="danger" 
                                size="sm"
                            >
                                Delete <DeleteIcon className="h-5 w-5" />
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
    
    
    // return (
    //     <EditRestuarant />
    // )
};

export default BusinessPartner;
