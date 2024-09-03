import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import BlogList from './pages/BlogList';
import Login from './pages/Login';
import Register from './pages/Register';
import BlogDetails from './pages/BlogDetails';
// import AddBlog from './pages/AddBlog';
// import UpdateBlog from './pages/UpdateBlog';

// import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <BlogList />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    }, 
    {
      path: "/posts/:id",
      element: <BlogDetails />,
    },
  ]);

  return (
    <RouterProvider router={router} />

  )
}

export default App
