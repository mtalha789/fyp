import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Button } from "@nextui-org/react";
import { useParams } from "react-router-dom";
import { useAuthStore } from "../../store/Auth";
import { useRestaurantOrders } from "../../queries/queries";
import LoaderComponent from "../../components/Loader";
import { updateOrder } from "../../queries/mutations";
const OrdersPage = () => {
  const { id } = useParams();
  const { accessToken } = useAuthStore();
  const { data: orders, isLoading, isError, error } = useRestaurantOrders(id, accessToken)

  const {error: updateError, isError: updateIsError, isLoading: updateIsLoading, mutate: updateOrder} = updateOrder(id)

  if (isLoading) return <div className="h-screen"><LoaderComponent /></div>
  if (isError) return <p>Error: {error.message}</p>

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold mb-4">New Orders</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {orders.map((order, index) => (
          order.order.orderStatus === "PENDING" && (
            <Card key={order.id} className={`w-full mb-4` }>
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
                <div className="flex gap-2">
                  <Button disabled={updateIsLoading} onClick={() => updateOrder(order.id, "ACCEPTED", accessToken)} color="default" auto>
                    {updateIsLoading ? "Accepting..." : "Accept"}
                  </Button>
                  <Button disabled={updateIsLoading} onClick={() => updateOrder(order.id, "REJECTED", accessToken)} color="danger" variant="flat" auto>
                    {updateIsLoading ? "Rejecting..." : "Reject"}
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
