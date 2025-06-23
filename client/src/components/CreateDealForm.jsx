import React, { useState } from 'react';
import { useCreateDealMutation } from '../features/deal/dealApi';
import { useGetSellersQuery } from '../features/user/userApi';
import { useSelector } from 'react-redux';

const CreateDealForm = () => {
  const [form, setForm] = useState({ title: '', description: '', price: '', sellerId: '' });
  const { user } = useSelector((state) => state.auth);
  const [createDeal] = useCreateDealMutation();
  const { data: sellers = [], isLoading } = useGetSellersQuery();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createDeal(form).unwrap();
      alert('✅ Deal created!');
      setForm({ title: '', description: '', price: '', sellerId: '' });
    } catch (err) {
      console.error('❌ Deal creation failed:', err);
      alert('Failed to create deal.');
    }
  };

  if (user?.role !== 'buyer') return null;

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-6 border rounded bg-white shadow-sm mt-6"
    >
      <h3 className="text-xl font-semibold text-gray-800 mb-2">📝 Create a New Deal</h3>

      <div className="space-y-1">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
        <input
          id="title"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Enter deal title"
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
        <input
          id="description"
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Brief about the deal"
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price (₹)</label>
        <input
          id="price"
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="e.g. 5000"
          type="number"
          min="0"
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="sellerId" className="block text-sm font-medium text-gray-700">Select Seller</label>
        <select
          id="sellerId"
          name="sellerId"
          value={form.sellerId}
          onChange={handleChange}
          className="w-full p-2 border rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        >
          <option value="" disabled>Select a seller</option>
          {isLoading ? (
            <option>Loading sellers...</option>
          ) : (
            sellers.map((seller) => (
              <option key={seller._id} value={seller._id}>
                {seller.name} ({seller.email})
              </option>
            ))
          )}
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded"
      >
        ➕ Create Deal
      </button>
    </form>
  );
};

export default CreateDealForm;
