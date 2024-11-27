import React, { useState, useEffect } from 'react';
import { Button, Avatar, Spinner } from '@nextui-org/react';
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { PlusIcon, EditIcon, DeleteIcon, Verified, LoaderIcon, TrashIcon } from 'lucide-react';
import EditRestuarant from '../components/forms/EditRestuarant';
import { useNavigate } from 'react-router-dom';
import { useRestaurantStore } from '../store/Restaurant';
import { useAuthStore } from '../store/Auth';
import { Toaster, toast } from 'react-hot-toast'

const BusinessPartner = () => {
    const [ actionLoading, setActionLoading ] = useState(false);
    const navigate = useNavigate();
    const { accessToken } = useAuthStore();
    const { restaurants, deleteRestaurant, getRestaurants } = useRestaurantStore();
    

    const handleAddRestaurant = () => navigate('/business/register');


    const handleDeleteRestaurant = async (id) => {
        setActionLoading(true)
        toast.success('Restaurant deleted successfully')
        const response = deleteRestaurant(id, accessToken);
        if(response?.success) {
            setActionLoading(false);
            toast.success('Restaurant deleted successfully')
            return
        }
        toast.error(`Error deleting Restaurant`)
        setTimeout(() => {
            setActionLoading(false);
        },4000)
    };

    return (
        <div className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4 sm:gap-0">
                <h2 className="text-2xl font-semibold">Your Restaurants</h2>
                <Button  
                    onClick={handleAddRestaurant} 
                    className="bg-blue-500 text-white w-full sm:w-auto"
                >
                    Add New Restaurant <PlusIcon className="h-5 w-5" />
                </Button>
            </div>
    
            <div className="flex flex-col gap-6">
                {restaurants.map((restaurant) => (
                    <Card key={restaurant.id} className="shadow-lg w-full sm:w-[100%] p-4 sm:p-6">
                        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center">
                            <Avatar
                                src={restaurant.imageUrl}
                                alt={`${restaurant.name} logo`}
                                size="lg"
                                className="mr-0 sm:mr-4 mb-4 sm:mb-0"
                            />
                            <div className="flex flex-col">
                                <div className="flex items-center">
                                    <h3 className="text-lg font-bold">{restaurant.name}</h3>
                                    {restaurant?.approved && <Verified fill='green' size={16} />}    
                                </div>
                                <p className="text-xs text-gray-500">{restaurant.corporateEmail}</p>
                                {restaurant.address?.[0]?.deleted === false ? (
                                    <p className='text-xs'>{restaurant.address[0].street}-{restaurant.address[0].city}</p>
                                ) : (
                                    <Button
                                        onClick={() => navigate(`/business/restaurant/${restaurant.id}/address`)}
                                        className="bg-yellow-500 text-white mt-2"
                                        size="sm"
                                    >
                                        Add Address
                                    </Button>
                                )}
                            </div>
                        </CardHeader>
                        <CardBody className="py-4">
                            <p className="mb-2"><strong>Phone:</strong> {restaurant.phone}</p>
                            <p className="mb-2"><strong>Minimum Order:</strong> PKR {restaurant.minimumOrderPrice}</p>
                            {restaurant.approved && <p className="mb-2"><strong>Status:</strong> {restaurant.closed ? "Closed" : "Open"}</p>}
                            {restaurant.approved && (
                                <div className="mt-4">
                                    <Button
                                        onClick={() => navigate(`/corporate/${restaurant.id}`)}
                                        className="bg-green-500 text-white mr-2"
                                        size="sm"
                                    >
                                        Go to Dashboard
                                    </Button>
                                    <Button
                                        onClick={() => navigate(`/business/restaurant/${restaurant.id}/timeslots`)}
                                        className="bg-blue-500 text-white"
                                        size="sm"
                                    >
                                        Manage Time Slots
                                    </Button>
                                </div>
                            )}
                        </CardBody>
                        <CardFooter className="flex flex-wrap gap-2 justify-end mt-4">
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
                                disabled={actionLoading}
                            >
                                {actionLoading ? `Deleting` : `Delete`} 
                                {actionLoading ? <LoaderIcon className='h-5 w-5 rotate-0' size="xs" color="white"/> : <TrashIcon className="h-5 w-5" />}
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
                    
            </div>
            <Toaster />
        </div>
    );
    
    
    // return (
    //     <EditRestuarant />
    // )
};

export default BusinessPartner;