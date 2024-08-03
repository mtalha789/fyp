import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Button } from "@nextui-org/react";
const OrdersPage = () => {
  const orders = [
    {
      id: "1",
      amount: 120,
      createdAt: new Date(),
      orderItems: [
        {
          id: "1",
          subOrderId: "1",
          productId: "1",
          quantity: 2,
          totalAmount: 60,
          priceAtOrder: 30,
          createdAt: new Date(),
          updatedAt: new Date(),
          deleted: false,
        },
        {
          id: "2",
          subOrderId: "1",
          productId: "2",
          quantity: 1,
          totalAmount: 30,
          priceAtOrder: 30,
          createdAt: new Date(),
          updatedAt: new Date(),
          deleted: false,
        },
      ],
      order: {
        userId: "1",
        totalAmount: 150,
        orderStatus: "PENDING",
        deleted: false,
        user: {
          id: "1",
          name: "John Doe",
          createdAt: new Date(),
          updatedAt: new Date(),
          deleted: false,
        }
      },
    },
    {
      id: "2",
      amount: 120,
      createdAt: new Date(),
      orderItems: [
        {
          id: "1",
          subOrderId: "1",
          productId: "1",
          quantity: 2,
          totalAmount: 60,
          priceAtOrder: 30,
          createdAt: new Date(),
          updatedAt: new Date(),
          deleted: false,
        },
        {
          id: "2",
          subOrderId: "1",
          productId: "2",
          quantity: 1,
          totalAmount: 30,
          priceAtOrder: 30,
          createdAt: new Date(),
          updatedAt: new Date(),
          deleted: false,
        },
      ],
      order: {
        userId: "1",
        totalAmount: 150,
        orderStatus: "PENDING",
        deleted: false,
        user: {
          id: "1",
          name: "John Doe",
          createdAt: new Date(),
          updatedAt: new Date(),
          deleted: false,
        }
      },
    },
  ];
  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold mb-4">New Orders</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {orders.map((order, index) => (
          order.order.orderStatus === "PENDING" && (
            <Card key={order.id} className="w-full mb-4">
              <CardHeader>
                <h3 className="text-lg font-medium">Order {index + 1}</h3>
              </CardHeader>
              <CardBody>
                {order.orderItems.map((item) => (
                  <div key={item.id} className="mb-4">
                    <h4 className="text-lg font-medium">{item.productId}</h4>
                    <p className="text-sm">Quantity: {item.quantity}</p>
                    <p className="text-sm">Price: {item.priceAtOrder}</p>
                    <p className="text-sm">Total Amount: {item.totalAmount}</p>
                  </div>
                ))}
              </CardBody>
              <CardFooter>
                <div className="flex justify-between">
                  <Button color="secondary" auto>
                    Accept
                  </Button>
                  <Button color="error" auto>
                    Reject
                  </Button>
                </div>
              </CardFooter>
            </Card>
          )
        ))}
      </div>
      <h1 className="text-2xl font-bold mt-8 sm:mt-12">Delivered Orders</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {orders.map((order, index) => (
          order.order.orderStatus === "DELIVERED" && (
            <Card key={order.id} className="w-full mb-4">
              <CardHeader>
                <h3 className="text-lg font-medium">Order {index + 1}</h3>
              </CardHeader>
              <CardBody>
                {order.orderItems.map((item) => (
                  <div key={item.id} className="mb-4">
                    <h4 className="text-lg font-medium">{item.productId}</h4>
                    <p className="text-sm">Quantity: {item.quantity}</p>
                    <p className="text-sm">Price: {item.priceAtOrder}</p>
                    <p className="text-sm">Total Amount: {item.totalAmount}</p>
                  </div>
                ))}
              </CardBody>
            </Card>
          )
        ))}
      </div>
    </div>
  )
};

export default OrdersPage;
