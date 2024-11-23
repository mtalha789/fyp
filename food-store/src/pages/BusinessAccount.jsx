import React, { useState, useEffect } from 'react';
import { Button, Avatar } from '@nextui-org/react';
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { PlusIcon, EditIcon, DeleteIcon } from 'lucide-react';
import EditRestuarant from '../components/forms/EditRestuarant';

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
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        const loadRestaurants = async () => {
            const data = await fetchRestaurants();
            setRestaurants(data);
        };
        loadRestaurants();
    }, []);

    const handleAddRestaurant = () => {
        // Logic for adding a new restaurant
    };

    const handleEditRestaurant = (id) => {
        // Logic for editing restaurant details
    };

    const handleDeleteRestaurant = (id) => {
        // Logic for deleting restaurant
    };

    // return (
    //     <div className="p-4 sm:p-6">
    //         <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4 sm:gap-0">
    //             <h2 className="text-2xl font-semibold">Business Partner - Restaurants</h2>
    //             <Button 
    //                 icon={<PlusIcon className="h-5 w-5" />} 
    //                 onClick={handleAddRestaurant} 
    //                 className="bg-blue-500 text-white w-full sm:w-auto"
    //             >
    //                 Add New Restaurant
    //             </Button>
    //         </div>

    //         <div className="flex flex-col gap-6">
    //             {restaurants.map((restaurant) => (
    //                 <Card key={restaurant.id} className="shadow-lg w-[100%]">
    //                     <CardHeader className="flex items-center">
    //                         <Avatar
    //                             src={restaurant.imageUrl}
    //                             alt={`${restaurant.name} logo`}
    //                             size="lg"
    //                             className="mr-4"
    //                         />
    //                         <div>
    //                             <h3 className="text-lg font-bold">{restaurant.name}</h3>
    //                             <p className="text-sm text-gray-500">{restaurant.corporateEmail}</p>
    //                         </div>
    //                     </CardHeader>
    //                     <CardBody className="py-2">
    //                         <p>Phone: {restaurant.phone}</p>
    //                         <p>Minimum Order: ${restaurant.minimumOrderPrice}</p>
    //                         <p>Status: {restaurant.closed ? "Closed" : "Open"}</p>
    //                         <p>Approved: {restaurant.approved ? "Yes" : "Pending"}</p>
    //                     </CardBody>
    //                     <CardFooter className="flex justify-end gap-2">
    //                         <Button 
    //                             icon={<EditIcon className="h-5 w-5" />} 
    //                             onClick={() => handleEditRestaurant(restaurant.id)} 
    //                             color="primary" 
    //                             size="sm"
    //                         >
    //                             Edit
    //                         </Button>
    //                         <Button 
    //                             icon={<DeleteIcon className="h-5 w-5" />} 
    //                             onClick={() => handleDeleteRestaurant(restaurant.id)} 
    //                             color="error" 
    //                             size="sm"
    //                         >
    //                             Delete
    //                         </Button>
    //                     </CardFooter>
    //                 </Card>
    //             ))}
    //         </div>
    //     </div>
    // );
    return (
        <EditRestuarant />
    )
};

export default BusinessPartner;
