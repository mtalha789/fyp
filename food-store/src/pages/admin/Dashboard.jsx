import React, { useState } from 'react';
import { Card, Button, Table, TableHeader, TableBody, TableRow, TableCell, TableColumn } from "@nextui-org/react";
import { CheckCircle2, XCircle, MoreVertical } from 'lucide-react';
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { useAuthStore } from '../../store/Auth';
import { useRestaurantOrders, useRestaurantSalesReport } from '../../queries/queries';
import LoaderComponent from '../../components/Loader';



const stats = {
  totalOrders: 50,
  totalRevenue: 5000,
  pendingOrders: 10,
};

export default function RestaurantDashboard() {
  const { id } = useParams();
  const { accessToken } = useAuthStore();
  const { data: orders, isLoading, isError, error } = useRestaurantOrders(id, accessToken);
  const { data: sales, isLoading: salesLoading, isError: salesIsError, error: salesError } = useRestaurantSalesReport(id, accessToken);
 
  if (isLoading || salesLoading) return <div className="h-screen"><LoaderComponent /></div>;
  if (isError || salesIsError) return <p>Error: {error.message}</p>;
  return (
    <div className="flex flex-col container">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Restaurant Dashboard</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-4 gap-4">
        <Card className='p-3'>
          <h1 className="text-xl font-semibold mb-4">Total Orders</h1>
          <h1 className="text-3xl font-bold">{sales.totalOrders}</h1>
        </Card>
        <Card className='p-3'>
          <h1 className="text-xl font-semibold mb-4">Total Revenue</h1>
          <h1 className="text-3xl font-bold">PKR {sales.totalRevenue ? sales.totalRevenue : 0}</h1>
        </Card>
        {/* <Card className='p-3'>
          <h1 className="text-xl font-semibold mb-4">Pending Orders</h1>
          <h1 className="text-3xl font-bold">{sales.pendingOrders}</h1>
        </Card> */}
      </div>
      <div className="col-span-full p-4">
        <h1 className="text-2xl font-bold mb-4">Recent Orders</h1>
        <OrderTable orders={orders} />
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


