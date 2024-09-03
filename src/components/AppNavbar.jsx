import { Link, useNavigate } from 'react-router-dom'
import { getJWT } from '../services/auth';
import { useEffect, useState } from 'react';

export default function AppNavbar() {
  const [isLoging, setIsLogin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = getJWT();
    if (token) setIsLogin(true)
  }, []);

  const logOut = () => {
    localStorage.clear()
    navigate('/login');
  }

  return (
    <div className='bg-gray-800'>
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <Link to="/">
                <img
                  alt="Your Company"
                  src="/logo.jpg"
                  className="h-12 w-auto"
                />
              </Link>
            </div>

          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="flex justify-center space-x-4">
              {isLoging ?

                <div>
                  <button
                    onClick={logOut}
                    className="px-4 py-2 ms-3 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    Log Out
                  </button>
                </div>
                :
                <div>
                  <Link to="/login">
                    <button onClick={logOut} className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                      Login
                    </button>
                  </Link>

                  <Link to="/register">
                    <button className="px-4 py-2 ms-3 text-indigo-600 bg-white rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                      Register
                    </button>
                  </Link>
                </div>
              }


            </div>
          </div>
        </div>
      </div>
    </div>
  )
}