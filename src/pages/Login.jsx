import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCurrentUser, login } from '../services/auth';

function LoginPage() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const user = getCurrentUser();
    if (user) navigate('/');
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const result = await login(formData);
      if (result) navigate('/');
    } catch (err) {
      setError('Invalid username or password');
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-3 rounded-xl bg-white shadow-md">
        <Link
          to="/"
          className="text-indigo-600 hover:text-indigo-800 font-medium"
        >
          {"< Back Home"}
        </Link>
        <h1 className="text-2xl font-bold ">
          Login
        </h1>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block mb-1 text-sm text-start">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm text-start">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 text-white bg-indigo-500 rounded-md hover:bg-indigo-600"
          >
            Login
          </button>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <div className='text-center hover:text-blue-600 hover:underline'>
            <Link to="/register">Create a new account!</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
