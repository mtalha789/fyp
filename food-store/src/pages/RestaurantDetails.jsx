import React from 'react'
import { useRestaurant, useRestaurantMenu } from '../queries/queries'
import {
    Loader,
    Rating,
    Review
} from '../components/index'
import {
    Card,
    CardBody,
    CardHeader,
    CardFooter,
    Image,
    Button,
    useDisclosure,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Progress,
    Divider,
    Badge,
} from '@nextui-org/react'
import { BadgeAlert, MinusCircleIcon, PlusCircleIcon, ShoppingBasket, StarIcon } from 'lucide-react'
import { MarkedRatingStar } from '../components/icons'
import { useParams } from 'react-router-dom'
import { useCart } from '../state/Cart'

const RestaurantDetails = () => {
    const [isOpen, setIsOpen] = React.useState({ open: false, openingTime: null, closingTime: null });

    const restaurant = {
        name: 'Dumplings',
        phone: '123-456-7890',
        imageUrl: 'https://picsum.photos/200',
        minimumOrderPrice: 200,
        id: '1',
        timeSlots: [
            {
                dayOfWeek: '1',
                startTime: '19:00',
                endTime: '22:00'
            },
            {
                dayOfWeek: '2',
                startTime: '10:00',
                endTime: '22:00'
            },
            {
                dayOfWeek: '3',
                startTime: '10:00',
                endTime: '22:00'
            },
            {
                dayOfWeek: '4',
                startTime: '10:00',
                endTime: '22:00'
            },
            {
                dayOfWeek: '5',
                startTime: '10:00',
                endTime: '22:00'
            },
            {
                dayOfWeek: '6',
                startTime: '10:00',
                endTime: '12:00'
            },
            {
                dayOfWeek: '7',
                startTime: '10:00',
                endTime: '22:00'
            }
        ],
        reviews: [
            {
                user: {
                    id: '1',
                    username: 'John Doe',
                    fullname: 'John Doe',
                    avatar: 'https://picsum.photos/200'
                },
                rating: 4,
                comment: 'Great food, great service!',
                createdAt: '2022-01-01T00:00:00.000Z'
            },
            {
                user: {
                    id: '2',
                    username: 'Jane Doe',
                    fullname: 'Jane Doe',
                    avatar: 'https://picsum.photos/201'
                },
                rating: 3,
                comment: 'Good food, but service could be better.',
                createdAt: '2022-01-02T00:00:00.000Z'
            },
            {
                user: {
                    id: '3',
                    username: 'Bob Johnson',
                    fullname: 'Bob Johnson',
                    avatar: 'https://picsum.photos/202'
                },
                rating: 5,
                comment: 'Best dumplings in town!',
                createdAt: '2022-01-03T00:00:00.000Z'
            },
            {
                user: {
                    id: '4',
                    username: 'Alice Smith',
                    fullname: 'Alice Smith',
                    avatar: 'https://picsum.photos/203'
                },
                rating: 4,
                comment: 'Delicious food, great prices!',
                createdAt: '2022-01-04T00:00:00.000Z'
            }
        ],
        corporateEmail: 'hello@dumplings.com',
        products: [
            {
                name: 'Veggie Dumplings',
                id: '1',
                _count: { orders: 100 },
                description: 'Our signature veggie dumplings, made with love and care.',
                imagePath: 'https://picsum.photos/200',
                price: 10
            },
            {
                name: 'Meat Dumplings',
                id: '2',
                _count: { orders: 50 },
                description: 'Juicy meat dumplings, made fresh in-house.',
                imagePath: 'https://picsum.photos/201',
                price: 12
            },
            {
                name: 'Soup Dumplings',
                id: '3',
                _count: { orders: 25 },
                description: 'Our take on the classic soup dumplings.',
                imagePath: 'https://picsum.photos/202',
                price: 15
            },
            {
                name: 'Rice Dumplings',
                id: '4',
                _count: { orders: 20 },
                description: 'Warm dumplings made with love and care.',
                imagePath: 'https://picsum.photos/203',
                price: 8
            },
            {
                name: 'Fried Dumplings',
                id: '5',
                _count: { orders: 15 },
                description: 'Our classic dumplings, made with love and care.',
                imagePath: 'https://picsum.photos/204',
                price: 9
            }
        ]
    };
    const { id } = useParams()

    React.useEffect(() => {
        if (restaurant.timeSlots && restaurant.timeSlots.length > 0) {
            const now = new Date();
            const dayOfWeek = now.getDay();
            const startTime = restaurant.timeSlots[(dayOfWeek - 1) % 7]?.startTime;
            const endTime = restaurant.timeSlots[(dayOfWeek - 1) % 7]?.endTime;
            const currentTime = now.toTimeString();
            if (startTime && endTime) {
                if (currentTime > startTime && currentTime < endTime) {
                    setIsOpen({ open: true, closingTime: endTime });
                } else {
                    if (currentTime < startTime) {
                        setIsOpen({ open: false, openingTime: restaurant.timeSlots[(dayOfWeek - 1) % 7].startTime });
                    } else {
                        setIsOpen({ open: false, openingTime: restaurant.timeSlots[dayOfWeek % 7].startTime });
                    }
                }
            }
        }
    }, [])
    // const { data: restaurant, isLoading, isError, error } = useRestaurant(id)

    // if (isLoading) {
    //     return (
    //         <div>
    //             <div className='flex gap-x-4 py-4 md:px-10'>
    //                 <div className='relative'>
    //                     <div className="w-40 h-40 bg-gray-200 animate-pulse rounded"></div>
    //                 </div>
    //                 <div className="flex flex-col gap-2">
    //                     <div className="w-40 h-4 bg-gray-200 animate-pulse rounded"></div>
    //                     <div className='w-40 h-4 bg-gray-200 animate-pulse rounded'></div>
    //                     <div className='w-40 h-4 bg-gray-200 animate-pulse rounded'></div>
    //                     <div className='w-40 h-4 bg-gray-200 animate-pulse rounded'></div>
    //                 </div>
    //             </div>
    //             <Divider className="my-4" />
    //         </div>
    //     )
    // }

    // if (isError) {
    //     return <p>{JSON.stringify(error.message)}</p>
    // }

    if (!restaurant) {
        return <p>No restaurant found</p>
    }

    return (
        <>
            <div className='flex gap-x-4 py-4 md:px-10'>
                <div className='relative'>
                    <Image
                        src={restaurant.imageUrl || 'food-store/src/assets/cafe.png'}
                        width={150}
                        height={150}
                    />
                    {isOpen.open == false &&
                        <div className="flex w-[150px] h-[150px] justify-center items-center bg-white bg-opacity-50 absolute z-10 top-0 left-0 right-0 bottom-0">
                            <p className="text-xl text-center font-medium">Close till {isOpen.openingTime}</p>
                        </div>}
                </div>
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-extrabold">{restaurant.name}</h1>
                    <p className="text-lg font-thin">{restaurant.description}</p>
                    <div>
                        {!isOpen.open &&
                            <div className='flex gap-1 bg-red-300 px-2 py-1 rounded-md'>
                                <Badge className=''><BadgeAlert fill='green' size={18} /></Badge>
                                <p className="text-sm font-medium text-green-800">Closed</p>
                            </div>
                        }
                        <div className='flex gap-1 text-sm flex-row items-center'>
                            <ShoppingBasket size={18} />
                            <p>Min. Order Rs. {restaurant.minimumOrderPrice}</p>
                        </div>
                    </div>
                    <div className="flex items-center text-xs">
                        <StarIcon size={18} fill='orange' className='me-1 pb-1 text-green-600' />
                        <p className='flex items-center'>{restaurant.reviews.reduce((acc, review) => acc + review.rating, 0) / restaurant.reviews.length}/5<span className="text-sm font-thin text-gray-400 pl-[2px]">({restaurant.reviews.length})</span></p>
                        <RestaurantReviewsModal reviews={restaurant.reviews} />
                    </div>
                </div>
            </div>
            <Divider className="my-4" />
            <div className="m-3">
                <RestaurantMenu restaurantMenu={restaurant.products} disabled={!isOpen.open} />
            </div>
        </>
    )
}

const RestaurantReviewsModal = ({ reviews }) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <Button onPress={onOpen} className='text-sm font-sans bg-transparent text-gray-500 pb-1 px-1'>See reviews</Button>
            <Modal scrollBehavior='inside' isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Reviews</ModalHeader>
                            <ModalBody>
                                {reviews.length === 0 ?
                                    <p>No reviews found</p>
                                    :
                                    <div className='flex flex-col gap-4'>
                                        <Card className="flex justify-between">
                                            <CardHeader className="flex justify-between flex-col">
                                                <p>{reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length}</p>
                                                <Rating rating={reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length} />
                                                <p>All Ratings({reviews.length})</p>
                                            </CardHeader>
                                            <CardBody>
                                                {[5, 4, 3, 2, 1].map(e => (
                                                    <div className="flex gap-1 items-center">
                                                        <span className='flex items-center'>{e}<MarkedRatingStar /></span>
                                                        <Progress
                                                            value={reviews.filter(review => review.rating === e).length / reviews.length * 100} color="warning"
                                                            size="sm"
                                                        />
                                                        <p>{reviews.filter(review => review.rating === e).length / reviews.length * 100}%</p>
                                                    </div>
                                                ))}
                                            </CardBody>
                                        </Card>
                                        <div className="flex flex-col gap-4">
                                            {reviews.map((review) => (
                                                <Review
                                                    key={review.id}
                                                    user={review.user}
                                                    rating={review.rating}
                                                    comment={review.comment}
                                                    createdAt={review.createdAt}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                }
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}

const RestaurantMenu = ({ restaurantMenu, disabled }) => {
    const { cart, addToCart, removeFromCart } = useCart()

    // const { data: restaurantMenu, isLoading, isError, error } = useRestaurantMenu(id)

    // if (isLoading) {
    //     return (
    //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
    //             {Array(3).fill(0).map((_, i) => (
    //                 <div key={i} className="bg-gray-200 flex flex-row gap-2 rounded-lg p-4">
    //                     <div className="flex flex-col gap-3 w-[60%]">
    //                         <div className="animate-pulse h-6 bg-gray-300 rounded-lg"></div>
    //                         <div className="animate-pulse h-6 bg-gray-300 rounded-lg"></div>
    //                         <div className="animate-pulse h-6  bg-gray-300 rounded-lg"></div>
    //                     </div>
    //                     <div className="animate-pulse w-[150px] h-40 bg-gray-300 rounded-lg"></div>
    //                 </div>
    //             ))}
    //         </div>
    //     )
    // }

    // if (isError) {
    //     return <p>{JSON.stringify(error.message)}</p>
    // }

    if (!restaurantMenu || restaurantMenu.length === 0) {
        return <p>No menu items found</p>
    }

    return (
        <div className={`font-sans ${disabled ? 'opacity-50' : ''} grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 items-center`} style={{ gridTemplateRows: 'masonry', gridTemplateColumns: 'masonry' }}>
            {restaurantMenu.map((item) => (
                <RestaurantItemModal item={item} key={item.id} disabled={disabled} />
            ))}
        </div>
    )
}

const RestaurantItemModal = ({ item, disabled }) => {
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure()
    const [quantity, setQuantity] = React.useState(1)

    const { cart, addToCart, removeFromCart } = useCart()

    return (
        <>
            <button onClick={onOpen} className='bg-transparent'>
                <Card key={item.id} className="py-2 cursor-pointer hover:shadow-2xl">
                    <CardBody className="overflow-visible gap-2 py-2 flex flex-row">
                        <div className="flex flex-col gap-1">
                            <p className="text-xl font-bold">{item.name}</p>
                            <p className="text-md font-light">Rs. {item.price}</p>
                            <p className="text-sm font-thin text-wrap">{item.description}</p>
                        </div>
                        <div className='flex items-center relative shadow-black/5 shadow-none rounded-lg'>
                            <img
                                alt={item.name}
                                className="object-cover rounded-xl opacity-0 shadow-sm data-[loaded=true]:opacity-100 motion-reduce:transition-none !duration-300 "
                                src={item.imagePath}
                                width={150}
                                height={150}
                                data-loaded={true}
                            />
                            {
                                !disabled &&
                                <Button
                                    className='absolute bottom-2 right-0 bg-transparent z-10 max-w-fit'
                                    disabled={disabled}
                                    onPress={() => cart.some(cartItem => cartItem.id === item.id) ? removeFromCart(item.id) : addToCart({ ...item, quantity: 1 })}
                                >
                                    {
                                        !cart.some(cartItem => cartItem.id === item.id) ?
                                            <PlusCircleIcon size={32} fill='white' className=' text-gray-500' />
                                            :
                                            <MinusCircleIcon size={32} fill='white' className=' text-gray-500' />
                                    }
                                </Button>
                            }
                        </div>
                    </CardBody>
                </Card>
            </button>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                scrollBehavior='inside'
            >
                <ModalContent>
                    {
                        (onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-2 items-center justify-center">
                                    <Image
                                        src={item.imagePath}
                                        alt={item.name}
                                        className=' rounded-lg w-full md:w-[250px]'
                                        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                                    />
                                </ModalHeader>
                                <ModalBody>
                                    <div className='flex flex-col gap-4'>
                                        <h1 className="text-xl font-bold">{item.name}</h1>
                                        <p>Rs. {item.price}</p>
                                    </div>
                                    <Divider />
                                </ModalBody>
                                <ModalFooter className='flex flex-row gap-2'>
                                    <div className='flex flex-row gap-1 items-center'>
                                        <button
                                            disabled={quantity === 1}
                                            onClick={() => setQuantity((prev) => prev - 1)}
                                        >
                                            <MinusCircleIcon size={32} fill='white' className=' text-gray-500' />
                                        </button>
                                        <p>{quantity}</p>
                                        <button
                                            onClick={() => setQuantity((prev) => prev + 1)}
                                        >
                                            <PlusCircleIcon size={32} fill='white' className=' text-gray-500' />
                                        </button>
                                    </div>
                                    <Button
                                        className='bg-black text-white w-[80%]'
                                        onPress={() => {
                                            onClose()
                                            addToCart({ ...item, quantity })
                                        }}
                                    >
                                        Add to Cart
                                    </Button>
                                </ModalFooter>
                            </>
                        )
                    }
                </ModalContent>
            </Modal>
        </>
    )
}


export default RestaurantDetails
