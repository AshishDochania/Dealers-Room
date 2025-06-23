import CreateDealForm from '../components/CreateDealForm';
import DealList from '../components/DealList';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const BuyerDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6 relative max-w-4xl mx-auto space-y-6">
    <Header />
      {/* Logout Button
      <button
        onClick={handleLogout}
        className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Logout
      </button> */}

      {/* Header */}
      <h1 className="text-3xl font-bold mb-2">👤 Buyer Dashboard</h1>
      <p className="text-gray-600 mb-6">Welcome, {user?.name}</p>

      {/* Create Deal Section */}
      <div className="bg-white p-6 rounded-xl shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Create New Deal</h2>
        <CreateDealForm />
      </div>

      {/* List of Deals */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Your Deals</h2>
        <DealList />
      </div>
    </div>
  );
};

export default BuyerDashboard;
