import { useState, useEffect } from "react";
import { Link, Route, Routes, useMatch, useNavigate } from "react-router-dom";
import blogService from "./services/blogs";
import loginService from "./services/login";
import BlogList from "./components/BlogList";
import Login from "./components/Login";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);

  const navigate = useNavigate();

  const match = useMatch("/blogs/:id");
  const blog = match ? blogs.find((b) => b.id === match.params.id) : null;

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) =>
        setBlogs(blogs.sort((blog1, blog2) => blog2.likes - blog1.likes)),
      );
  }, []);

  const handleLogin = async ({ username, password }) => {
    const user = await loginService.login({ username, password });
    window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
    blogService.setToken(user.token);
    setUser(user);
    navigate("/");
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
    blogService.setToken(null);
    navigate("/login");
  };

  const handleLikeChange = async (id, blogObject) => {
    try {
      const updateBlog = await blogService.update(id, blogObject);
      setBlogs(
        blogs
          .map((blog) => (blog.id !== id ? blog : updateBlog))
          .sort((blog1, blog2) => blog2.likes - blog1.likes),
      );
      setMessage(
        `a new blog ${blogObject.title} by ${blogObject.author} was liked`,
      );
      setMessageType("success");
      setTimeout(() => {
        setMessage(null);
        setMessageType(null);
      }, 5000);
    } catch {
      setMessageType("Error");
      setMessage("Failed to update the like amount of the blog");
      setTimeout(() => {
        setMessage(null);
        setMessageType(null);
      }, 5000);
    }
  };

  const handleAddBlog = async (blogObject) => {
    try {
      const newBlog = await blogService.create(blogObject);
      setBlogs(
        [...blogs, newBlog].sort((blog1, blog2) => blog2.likes - blog1.likes),
      );
      navigate("/");

      setMessage(
        `a new blog ${blogObject.title} by ${blogObject.author} added`,
      );
      setMessageType("success");
    } catch {
      setMessage("Failed to add blog");
      setMessageType("error");
    }
  };

  const handleRemoveBlog = async (id) => {
    try {
      const blogToRemove = blogs.find((blog) => blog.id === id);
      await blogService.remove(id);
      setBlogs(blogs.filter((blog) => blog.id !== id));
      navigate("/");
      setMessageType("success");
      setMessage(
        `a blog ${blogToRemove.title} by ${blogToRemove.author} was removed`,
      );
    } catch {
      setMessageType("error");
      setMessage("Failed to remove blog");
    }
  };

  return (
    <div>
      <div className="nav">
        <Link to={"/"}>blogs</Link>
        {user && <Link to={"/create"}>new blogs</Link>}
        {user ? (
          <div>
            <button type="button" onClick={handleLogout}>
              logout
            </button>
          </div>
        ) : (
          <Link to={"/login"}>login</Link>
        )}
      </div>

      <div className={`notification ${messageType === 'success' ? 'success' : 'error'}`}>
      {message || null}
    </div>

      <Routes>
        <Route
          path="/create"
          element={<BlogForm handleAddBlog={handleAddBlog} />}
        />
        <Route
          path="/blogs/:id"
          element={
            <Blog
              blog={blog}
              user={user}
              handleLikeChange={handleLikeChange}
              handleRemoveBlog={handleRemoveBlog}
            />
          }
        />
        <Route path="/" element={<BlogList blogs={blogs} />} />
        <Route
          path="/login"
          element={<Login user={user} handleLogin={handleLogin} />}
        />
      </Routes>
    </div>
  );
};

export default App;
