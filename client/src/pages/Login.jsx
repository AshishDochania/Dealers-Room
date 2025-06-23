import React, { useState } from 'react';
import { useLoginMutation } from '../features/auth/authApi';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { initSocket } from '../socket';
import { Link } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [login] = useLoginMutation();
  const dispatch = useDispatch();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(formData).unwrap();
      dispatch(setCredentials(res));
      initSocket(res.user.id);
      navigate('/dashboard');
      
    } catch (err) {
      alert(err.data?.msg || 'Login failed');
    }
  };

  return (
    <>
    <form onSubmit={handleSubmit}>
      <input name="email" type="email" placeholder="Email" onChange={handleChange} />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} />
      <button type="submit">Login</button>
    </form>
    <p className="mt-4 text-sm text-center">
      Don’t have an account?{' '}
      <Link to="/register" className="text-blue-600 hover:underline">
        Register here
      </Link>
    </p>
    </>
  );
};

export default Login;
