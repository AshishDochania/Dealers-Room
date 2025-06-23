import React, { useEffect } from 'react';
import { useGetMyDealsQuery, useUpdateDealStatusMutation } from '../features/deal/dealApi';
import { useSelector } from 'react-redux';
import { getSocket } from '../socket';
import { Link } from 'react-router-dom';

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
    <div className="space-y-4 mt-4">
      <h2 className="text-xl font-bold">Your Deals</h2>
      {deals.map(deal => (
        <Link to={`/deals/${deal._id}`}>
        <div key={deal._id} className="p-4 border rounded shadow">
          <h3 className="text-lg font-semibold">{deal.title}</h3>
          <p>{deal.description}</p>
          <p>💰 {deal.price} | 📌 Status: {deal.status}</p>
          {user.role === 'seller' && deal.status === 'Pending' && (
            <div className="space-x-2 mt-2">
              <button className="px-3 py-1 bg-green-500 text-white rounded" onClick={() => handleStatus(deal._id, 'In Progress')}>Accept</button>
              <button className="px-3 py-1 bg-red-500 text-white rounded" onClick={() => handleStatus(deal._id, 'Cancelled')}>Reject</button>
            </div>
          )}
        </div>
        </Link>
      ))}
    </div>
  );
};

export default DealList;
