import React from 'react';
import { useRiders } from '../../queries/queries';
import { useAdminStore } from "../../store/Admin";
import LoaderComponent from "../components/LoaderComponent";

export default function Riders() {
  const { adminToken } = useAdminStore();
  const { data: riders, isLoading, isError } = useRiders(adminToken);

  if (isLoading) return <div className="h-screen"><LoaderComponent /></div>;

  if (isError) return <div className="h-screen text-red-500">Error loading riders.</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Riders</h1>
      {riders && riders.length > 0 ? (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Rider ID</th>
              <th className="border border-gray-300 px-4 py-2">Total Reviews</th>
              <th className="border border-gray-300 px-4 py-2">Average Rating</th>
              <th className="border border-gray-300 px-4 py-2">Total Orders</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {riders.map((rider, index) => {
              const totalReviews = rider.reviews.length;
              const averageRating = totalReviews > 0
                ? (rider.reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews).toFixed(1)
                : "N/A";
              const totalOrders = rider.orders.length;

              return (
                <tr key={index} className="odd:bg-white even:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">{rider.id}</td>
                  <td className="border border-gray-300 px-4 py-2">{totalReviews}</td>
                  <td className="border border-gray-300 px-4 py-2">{averageRating}</td>
                  <td className="border border-gray-300 px-4 py-2">{totalOrders}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button className="text-blue-500 hover:underline">View</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div>No riders available.</div>
      )}
    </div>
  );
}
