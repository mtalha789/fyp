import React, { useState } from 'react';
import { Card, Button, Table, TableHeader, TableBody, TableRow, TableCell, TableColumn } from "@nextui-org/react";
import { CheckCircle2, XCircle, MoreVertical } from 'lucide-react';
import { Link } from "react-router-dom";

const orders = [
  { id: 1, customer: 'John Doe', total: 50, status: 'Completed' },
  { id: 2, customer: 'Jane Smith', total: 75, status: 'Pending' },
  { id: 3, customer: 'Bob Johnson', total: 30, status: 'Cancelled' },
];

const menu = [
  { id: 1, name: 'Pizza', price: 12, isAvailableForPurchase: true },
  { id: 2, name: 'Burger', price: 8, isAvailableForPurchase: false },
  { id: 3, name: 'Pasta', price: 10, isAvailableForPurchase: true },
];

const stats = {
  totalOrders: 50,
  totalRevenue: 5000,
  pendingOrders: 10,
};

export default function RestaurantDashboard() {
  const [menuItems, setMenuItems] = useState(menu);

  return (
    <div className="flex flex-col container">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Restaurant Dashboard</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-4 gap-4">
        <Card className='p-3'>
          <h1 className="text-xl font-semibold mb-4">Total Orders</h1>
          <h1 className="text-3xl font-bold">{stats.totalOrders}</h1>
        </Card>
        <Card className='p-3'>
          <h1 className="text-xl font-semibold mb-4">Total Revenue</h1>
          <h1 className="text-3xl font-bold">${stats.totalRevenue}</h1>
        </Card>
        <Card className='p-3'>
          <h1 className="text-xl font-semibold mb-4">Pending Orders</h1>
          <h1 className="text-3xl font-bold">{stats.pendingOrders}</h1>
        </Card>
      </div>
      <div className="col-span-full p-4">
        <h1 className="text-2xl font-bold mb-4">Recent Orders</h1>
        <OrderTable orders={orders} />
      </div>
      <div className="col-span-full p-4">
        <h1 className="text-2xl font-bold mb-4">Menu Items</h1>
        <Button asChild variant="shadow" className='mb-4'>
          <Link to="/corporate/menu/add-item" className="">Add New Item</Link>
        </Button>
        <ProductTable products={menuItems} />
      </div>
    </div>
  );
}

function OrderTable({ orders }) {
  if (!orders || orders.length === 0) {
    return <h1>No orders found.</h1>;
  }
  return (
    <Table>
      <TableHeader>
        <TableColumn>Customer</TableColumn>
        <TableColumn>Total</TableColumn>
        <TableColumn>Status</TableColumn>
      </TableHeader>
      <TableBody>
        {orders.map(order => (
          <TableRow key={order.id}>
            <TableCell>{order.customer}</TableCell>
            <TableCell>${order.total}</TableCell>
            <TableCell>{order.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function ProductTable({ products }) {
  if (!products || products.length === 0) {
    return <h1>No products found.</h1>;
  }
  return (
    <Table >
      <TableHeader>
        <TableColumn>Available</TableColumn>
        <TableColumn>Name</TableColumn>
        <TableColumn>Price</TableColumn>
        <TableColumn>Actions</TableColumn>
      </TableHeader>
      <TableBody>
        {products.map(product => (
          <TableRow key={product.id}>
            <TableCell>
              {product.isAvailableForPurchase ? (
                <CheckCircle2 className="mr-2" size={16} />
              ) : (
                <XCircle className="mr-2 stroke-destructive" size={16} />
              )}
            </TableCell>
            <TableCell>{product.name}</TableCell>
            <TableCell>${product.price}</TableCell>
            <TableCell>
              <MoreVertical className="cursor-pointer" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}


