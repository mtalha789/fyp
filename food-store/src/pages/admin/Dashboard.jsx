import React from "react";
import { useAdminStore } from "../../store/Admin"
import { useOrders } from '../../queries/queries'

export default function Dashboard() {
  const { adminToken } = useAdminStore()
  const { data: orders, isLoading, isError, error } = useOrders(adminToken);

  const [lastMonthSales, setlastMonthSales] = React.useState(null);
  const [thisMonthSales, setthisMonthSales] = React.useState(null);
 
  const setLastMonthSales = () => {
    if (orders.length === 0) {
      return;
    }

    const lastMonthOrders = orders.filter((order) => {
      const orderDate = new Date(order.createdAt);
      const lastMonth = new Date();
      lastMonth.setMonth(lastMonth.getMonth() - 1);
      return orderDate >= lastMonth;
    });

    setlastMonthSales({
      amount: lastMonthOrders.length === 0 ? 0 : lastMonthOrders.reduce((total, order) => total + order.amount, 0),
      orders: lastMonthOrders.length,
    });
  }

  const setThisMonthSales = () => {
    if (orders.length === 0) {
      return;
    }

    const thisMonthOrders = orders.filter((order) => {
      const orderDate = new Date(order.createdAt);
      const thisMonth = new Date();
      return orderDate >= thisMonth;
    });

    setthisMonthSales({
      amount: thisMonthOrders.length === 0 ? 0 : thisMonthOrders.reduce((total, order) => total + order.amount, 0),
      orders: thisMonthOrders.length,
    });
  }

  React.useEffect(() => {
    setLastMonthSales();
    setThisMonthSales();
  }, [orders]);

  if (isLoading || updateIsLoading) return <LoaderComponent />

  if (isError) return <p>Error: {error.message}</p>

  if (updateIsError) return <p>Error: {updateError.message}</p>

  return (
    <div className="flex flex-col">
      <h1 className="text-3xl font-bold mb-4">Sales</h1>
      <Card className="w-full">
        <CardHeader>
          <h1 className="font-bold text-3xl">Sales</h1>
          
          <div className="">
            <div>
              <h2 className="text-xl font-semibold">Last Month</h2>

              {
                lastMonthSales == null ? (<h1>No Sales</h1>) : (
                  <pre className="text-xl font-semibold">
                    Orders: {lastMonthSales?.orders}
                    Total Sales: ${lastMonthSales?.amount}
                  </pre>
                )
              }
            </div>
            <div>
              <h2 className="text-xl font-semibold">This Month</h2>
              {
                thisMonthSales == null ? (<h1>No Sales</h1>) : (
                  <pre className="text-xl font-semibold">
                    Orders: {thisMonthSales?.orders}
                    Total Sales: ${thisMonthSales?.amount}
                  </pre>
                )
              }
            </div>
          </div>
        </CardHeader>
        <CardBody>
          <Table>
            <TableHeader>
              <TableColumn>Name</TableColumn>
              <TableColumn>Date</TableColumn>
              <TableColumn>Amount</TableColumn>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="text-left">{order.order.user.name}</TableCell>
                  <TableCell className="text-left">
                    {new Date(order.createdAt).toLocaleString()}
                  </TableCell>
                  <TableCell className="text-left">$ {order.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
        {/* <CardFooter>
          <div className="flex justify-end">
            <Button color="success" variant='flat' auto>
              Download
            </Button>
          </div>
        </CardFooter> */}
      </Card>
    </div>
  );
}
