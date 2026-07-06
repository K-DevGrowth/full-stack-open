import { useState, useEffect } from "react";
import { Link, Route, Routes, useMatch, useNavigate } from "react-router-dom";
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
import { ErrorBoundary } from "react-error-boundary";
import NotFound from "./components/NotFound";
import { useNotify } from "./hooks/useNotify";
import useBlogs from "./hooks/useBlogs";
import { setToken } from "./services/blogs";

const App = () => {
  const {
    message,
    messageType,
    handleLikeNotify,
    handleAddNotify,
    handleRemoveNotify,
  } = useNotify();

  const { blogs, createBlogMutation } = useBlogs();
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      setToken(user.token);
    }
  }, []);

  const handleLogin = async ({ username, password }) => {
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      setToken(user.token);
      setUser(user);
      navigate("/");
      // setMessageType("success");
      // setMessage("logged in successfully");
      // setTimeout(() => {
      //   setMessage(null);
      //   setMessageType(null);
      // }, 5000);
    } catch {
      // setMessageType("error");
      // setMessage("wrong username or password");
      // setTimeout(() => {
      //   setMessage(null);
      //   setMessageType(null);
      // }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
    setToken(null);
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
      handleLikeNotify(blogObject);
    } catch {
      // setMessageType("error");
      // setMessage("Failed to update the like amount of the blog");
      // setTimeout(() => {
      //   setMessage(null);
      //   setMessageType(null);
      // }, 5000);
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
          element={
            <ErrorBoundary>
              <BlogForm />
            </ErrorBoundary>
          }
        />
        <Route
          path="/blogs/:id"
          element={
            <ErrorBoundary>
              <Blog user={user} />
            </ErrorBoundary>
          }
        />
        <Route
          path="/"
          element={
            <ErrorBoundary
              fallback={
                <div>
                  <h1>Something went wrong :(</h1>
                  <p>Please make a bug report to mluukkai in Discord</p>
                </div>
              }
            >
              <BlogList />
            </ErrorBoundary>
          }
        />
        <Route
          path="/login"
          element={
            <ErrorBoundary>
              <Login user={user} handleLogin={handleLogin} />
            </ErrorBoundary>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
