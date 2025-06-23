import DealList from '../components/DealList';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const SellerDashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
      dispatch(logout());
      navigate('/');
    };
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">👤 Seller Dashboard</h1>
      <p className="text-gray-600 mt-2">Welcome, {user?.name}</p>
        <button
          onClick={handleLogout}
          className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded"
        >
          Logout
        </button>
        <DealList />
    </div>
  );
};

export default SellerDashboard;
