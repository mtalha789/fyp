import React from 'react'
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from "@nextui-org/react";

const Sales = () => {
  const [lastMonthSales, setlastMonthSales] = React.useState(null);
  const [thisMonthSales, setthisMonthSales] = React.useState(null);
  const [orders, setOrders] = React.useState([
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
  ]);

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
  return (
    <div className="flex flex-col">
      <h1 className="text-3xl font-bold mb-4">Sales</h1>
      <Card className="w-full">
        <CardHeader>
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
        <CardFooter>
          <div className="flex justify-end">
            <Button color="secondary" auto>
              Download
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
  return (
    <div className="flex flex-col">
      <h1 className="text-3xl font-bold mb-4">Sales</h1>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold">February 2023</h2>
            <p className="text-sm text-slate-500">Total Sales</p>
          </div>
          <p className="text-xl font-semibold">$1000</p>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-lg font-semibold mb-2">January</p>
            <p className="text-xl font-semibold">$500</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-lg font-semibold mb-2">February</p>
            <p className="text-xl font-semibold">$500</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-lg font-semibold mb-2">March</p>
            <p className="text-xl font-semibold">$0</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sales