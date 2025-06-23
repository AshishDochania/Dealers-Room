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
      alert('Deal created!');
      setForm({ title: '', description: '', price: '', sellerId: '' });
    } catch (err) {
      console.error(err);
    }
  };

  if (user?.role !== 'buyer') return null;

  return (
    <form onSubmit={handleSubmit} className="space-y-3 p-4 border rounded">
      <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="w-full p-2 border rounded" />
      <input name="description" value={form.description} onChange={handleChange} placeholder="Description" className="w-full p-2 border rounded" />
      <input name="price" value={form.price} onChange={handleChange} placeholder="Price" type="number" className="w-full p-2 border rounded" />
      <select name="sellerId" onChange={handleChange} value={form.sellerId} className="w-full p-2 border rounded" required>
        <option value="">Select Seller</option>
        {sellers.map(seller => (
          <option key={seller._id} value={seller._id}>
            {seller.name} ({seller.email})
          </option>
        ))}
      </select>
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Create Deal</button>
    </form>
  );
};

export default CreateDealForm;
