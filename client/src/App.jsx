import { BrowserRouter as Router, Routes, Route,Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import PrivateRoute from './routes/PrivateRoute';
import BuyerDashboard from './pages/BuyerDashboard';
import SellerDashboard from './pages/SellerDashboard';
import DealDetails from './pages/DealDetails';
import { useSelector } from 'react-redux';

function App() {
  const { user } = useSelector((state) => state.auth);
  return (
    <Router>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/deals/:id" element={<DealDetails />} />

        {/* Protected */}
        <Route element={<PrivateRoute />}>
      {user?.role === 'buyer' && (
        <>
          <Route path="/dashboard" element={<BuyerDashboard />} />
          <Route path="/deals/:id" element={<DealDetails />} />
        </>
      )}

      {user?.role === 'seller' && (
        <>
          <Route path="/dashboard" element={<SellerDashboard />} />
          <Route path="/deals/:id" element={<DealDetails />} />
        </>
      )}
    </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </Router>
  );
}

export default App;
