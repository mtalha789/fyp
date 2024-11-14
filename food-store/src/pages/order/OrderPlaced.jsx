import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useOrder } from '../../queries/queries';
import { Loader } from '../../components';


export default function OrderPlaced() {
    const { id } = useParams();

    const { data:orderDetails, isLoading, isError, refetch } = useOrder(id)


    // const orderDetails =
    //     {
    //         "id": "86f61cbb-5850-4609-b267-befb67c473b4",
    //         "userId": "4b33a66c-a92f-4689-80ce-6a6a28dac840",
    //         "orderStatus": "PENDING",
    //         "totalPrice": 21.49,
    //         "products": [
    //             {
    //                 "productId": "e52e3451-ca4a-47e3-ab34-b93987c5e3f3",
    //                 "quantity": 1,
    //                 "price": 8.99
    //             },
    //             {
    //                 "productId": "f39b1f1b-eb80-4ba8-a142-76d731a3b636",
    //                 "quantity": 3,
    //                 "price": 12.5
    //             }
    //         ],
    //         "createdAt": "2024-10-27T08:20:15.755097",
    //         "updatedAt": "2024-11-14T08:20:15.755106"
    //     }

    if(isLoading) {
        <Loader />
    }

    if(orderDetails.products.length !== 0){

    return (
        <div>
            <h1></h1>
            <h2>Order Details</h2>
            <div className="flex flex-col">

            {
                orderDetails.products.map(product => (
                    <div key={product.productId}>
                        <p>{product.quantity}</p>
                        <p>{product.price}</p>
                    </div>
                ))
            }
            </div>
            <p>you can track your order</p>
            <Link to={`/order/${orderDetails.id}/track`}>Track Now</Link>

        </div>
    )
}
}
