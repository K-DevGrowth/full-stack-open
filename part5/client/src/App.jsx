import { useState, useEffect } from "react";
import { Link, Route, Routes, useMatch, useNavigate } from "react-router-dom";
import blogService from "./services/blogs";
import loginService from "./services/login";
import BlogList from "./components/BlogList";
import Login from "./components/Login";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import {
  AppBar,
  Button,
  Container,
  Toolbar,
  Typography,
  Box,
  Alert,
} from "@mui/material";

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
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      navigate("/");
      setMessageType("success");
      setMessage("logged in successfully");
      setTimeout(() => {
        setMessage(null);
        setMessageType(null);
      }, 5000);
    } catch {
      setMessageType("error");
      setMessage("wrong username or password");
      setTimeout(() => {
        setMessage(null);
        setMessageType(null);
      }, 5000);
    }
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
      setMessageType("error");
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

      const blogWithUser = {
        ...newBlog,
        user: newBlog.user || user,
      };

      setBlogs(
        [...blogs, blogWithUser].sort(
          (blog1, blog2) => blog2.likes - blog1.likes,
        ),
      );

      setMessage(
        `a new blog ${blogObject.title} by ${blogObject.author} added`,
      );
      setMessageType("success");
      navigate("/");

      setTimeout(() => {
        setMessage(null);
        setMessageType(null);
      }, 5000);
    } catch (error) {
      console.error("ADD BLOG ERROR:", error.response?.data || error.message);

      setMessage("Failed to add blog");
      setMessageType("error");

      setTimeout(() => {
        setMessage(null);
        setMessageType(null);
      }, 5000);
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
      setTimeout(() => {
        setMessage(null);
        setMessageType(null);
      }, 5000);
    } catch {
      setMessageType("error");
      setMessage("Failed to remove blog");
      setTimeout(() => {
        setMessage(null);
        setMessageType(null);
      }, 5000);
    }
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography>Blog App</Typography>
          <Box>
            <Button color="inherit" component={Link} to={"/"}>
              blogs
            </Button>
            <Button color="inherit" component={Link} to="/create">
              new blogs
            </Button>

            {!user ? (
              <Button color="inherit" component={Link} to="/login">
                login
              </Button>
            ) : (
              <Button color="inherit" onClick={handleLogout}>
                logout
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {message && (
        <Alert
          sx={{ margin: "10px 0" }}
          severity={`${messageType === "success" ? "success" : "error"}`}
        >
          {message || null}
        </Alert>
      )}

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
