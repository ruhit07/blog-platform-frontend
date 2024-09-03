import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AppLayout from '../components/AppLayout';
import { getBlogs, saveBlog } from '../services/blog';
import { getJWT } from '../services/auth';
import AddBlog from './AddBlog';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const [isLoging, setIsLogin] = useState(false);
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const token = getJWT();
    if (token) setIsLogin(true)
  }, []);

  useEffect(() => {
    (async () => {
      setLoading(true)
      const { data: { data: blogs } } = await getBlogs();

      setBlogs(blogs);
      setLoading(false)
    })()
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data: { data: newBlog } } = await saveBlog(formData);
      setBlogs([...blogs, newBlog])
      setOpen(false)
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.errors);
      }
    }
  };

  const handleEdit = () => {
    setOpen(true)
    setFormData({})
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (loading) {
    return <div>Loading ........</div>
  }

  return (
    <AppLayout>

      <div className='container mx-auto md:w-2/5'>

        {isLoging ?
          <div className='mt-3 text-end'>
            <button onClick={handleEdit} className="px-4 py-2 text-white bg-blue-700 rounded-md hover:bg-gray-100 hover:text-blue-700 hover:outline-none hover:ring-2 hover:ring-indigo-500">
              Create New Post
            </button>
          </div>
          : null
        }

        {blogs.length > 0 ? blogs.map((post, idx) => (
          <div key={post.id} className="p-5 border my-3 rounded-md shadow hover:shadow-lg cursor-pointer">
            <Link to={`/posts/${post.id}`}>
              <h2 className='font-bold text-[24px]'>{idx + 1}. {post.title}</h2>
              <p>{post.content}</p>
            </Link>
          </div>
        )) : (
          <div>No blogs available.</div>
        )}
      </div>

      {error && <p className="text-red-500 text-center">{error}</p>}

      <AddBlog
        open={open}
        setOpen={setOpen}
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />

    </AppLayout>
  );
};

export default BlogList;
