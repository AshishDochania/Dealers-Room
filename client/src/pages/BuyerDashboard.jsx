import CreateDealForm from '../components/CreateDealForm';
import DealList from '../components/DealList';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const BuyerDashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = () => {
      dispatch(logout());
      navigate('/');
    };

  const { user } = useSelector((state) => state.auth);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">👤 Buyer Dashboard</h1>
      <p className="text-gray-600 mt-2">Welcome, {user?.name}</p>
        <CreateDealForm />
        <DealList />
    </div>
  );
};

export default BuyerDashboard;
