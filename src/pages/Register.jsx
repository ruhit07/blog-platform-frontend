import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../services/auth';

function RegisterPage() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const result = await register(formData);
      if (result) navigate('/');
    } catch (err) {
      setError('Registration failed');
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
          Register
        </h1>
        <form onSubmit={handleRegister} className="space-y-6">

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
          <div>
            <label className="block mb-1 text-sm text-start">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
            />
          </div>
          <div className="flex justify-center space-x-4 mt-4">
            <button
              type="submit"
              className="w-full py-2 text-white bg-indigo-500 rounded-md hover:bg-indigo-600"
            >
              Register
            </button>
          </div>

          {error && <p className="text-red-500 text-center">{error}</p>}

          <div className='text-center hover:text-blue-600 hover:underline'>
            <Link to="/login">Already have a account!</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
