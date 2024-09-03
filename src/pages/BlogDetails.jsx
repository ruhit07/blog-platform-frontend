import { useEffect, useState } from "react";
import Applayout from "../components/AppLayout"
import { useNavigate, useParams } from "react-router-dom"
import { deleteBlog, getBlog, saveBlog } from "../services/blog";
import { Avatar } from "@material-tailwind/react";
import { getJWT } from "../services/auth";
import UpdateBlog from "./UpdateBlog";

const BlogDetails = () => {
  const [formData, setFormData] = useState({});
  const [blog, setBlog] = useState({});
  const [loading, setLoading] = useState(false);
  const [isLoging, setIsLogin] = useState(false);
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const params = useParams()

  useEffect(() => {
    const token = getJWT();
    if (token) setIsLogin(true)
  }, []);

  useEffect(() => {
    (async () => {
      setLoading(true)
      const { data: { data: blog } } = await getBlog(params.id);

      setBlog(blog);
      setLoading(false)
    })()
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data: { data: newBlog } } = await saveBlog(formData);
      setBlog({ ...blog, ...newBlog })
      setOpen(false)
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.errors);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteBlog(id);
      navigate('/')
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.errors);
      }
    }
  };

  const handleEdit = () => {
    setOpen(true)
    setFormData(blog);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (loading) {
    return <div>Loading ........</div>
  }

  return (
    <Applayout>

      <div className="container mx-auto md:w-3/5">
        <div className="shadow-sm border rounded my-3 p-3 relative">
          {isLoging ?
            <div className="absolute top-2 right-2 ">
              <span onClick={handleEdit} className="border px-2 text-sm hover:shadow-sm py-1 rounded-md cursor-pointer hover:bg-gray-100">Edit</span>
              <span
                onClick={() => handleDelete(params.id)}
                className="border px-2 text-sm hover:shadow-sm py-1 ms-2 rounded-md cursor-pointer text-red-600 hover:bg-gray-100">Delete</span>
            </div>
            : null
          }
          <h1 className="text-2xl font-extrabold">{blog.title}</h1>
          <p>{blog.content}</p>
          <div className="flex justify-start items-center gap-2 text-gray-700 mt-4">
            <Avatar
              alt=""
              src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
            />
            <div>
              <span className="block text-[14px]">{blog.author?.username}</span>
              <span className="block text-[14px]">{blog.author?.email}</span>
            </div>
          </div>
        </div>
      </div>

      {error && <p className="text-red-500 text-center">{error}</p>}

      <UpdateBlog
        open={open}
        setOpen={setOpen}
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </Applayout>
  )
}

export default BlogDetails