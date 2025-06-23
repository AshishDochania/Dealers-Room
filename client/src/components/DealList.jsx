import React, { useEffect } from 'react';
import { useGetMyDealsQuery, useUpdateDealStatusMutation } from '../features/deal/dealApi';
import { useSelector } from 'react-redux';
import { getSocket } from '../socket';
import { Link } from 'react-router-dom';

const statusColors = {
  Pending: 'bg-yellow-100 text-yellow-800',
  'In Progress': 'bg-blue-100 text-blue-800',
  Completed: 'bg-green-100 text-green-800',
  Cancelled: 'bg-red-100 text-red-800',
};

const DealList = () => {
  const { data: deals = [], refetch } = useGetMyDealsQuery();
  const { user } = useSelector((state) => state.auth);
  const [updateStatus] = useUpdateDealStatusMutation();

  useEffect(() => {
    const socket = getSocket();
    if (socket) {
      socket.on('new-deal', () => refetch());
      socket.on('deal-updated', () => refetch());
    }
  }, []);

  const handleStatus = (id, status) => updateStatus({ id, status });

  return (
    <div className="space-y-4 mt-6">
      <h2 className="text-xl font-bold text-gray-800">📋 Your Deals</h2>

      {deals.length === 0 && (
        <p className="text-gray-500 italic">No deals available.</p>
      )}

      {deals.map((deal) => (
        <div
          key={deal._id}
          className="p-4 border rounded shadow bg-white hover:shadow-md transition"
        >
          <div className="flex justify-between items-start">
            <div>
              <Link
                to={`/deals/${deal._id}`}
                className="text-lg font-semibold text-blue-600 hover:underline"
              >
                {deal.title}
              </Link>
              <p className="text-gray-700 text-sm mt-1">{deal.description}</p>
              <p className="text-sm mt-1">
                💰 <span className="font-medium">₹{deal.price}</span>
              </p>
            </div>

            <span
              className={`px-2 py-1 text-xs font-medium rounded ${statusColors[deal.status] || 'bg-gray-100 text-gray-800'}`}
            >
              {deal.status}
            </span>
          </div>

          {user.role === 'seller' && deal.status === 'Pending' && (
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => handleStatus(deal._id, 'In Progress')}
                className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700"
              >
                Accept
              </button>
              <button
                onClick={() => handleStatus(deal._id, 'Cancelled')}
                className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
              >
                Reject
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default DealList;
