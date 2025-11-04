import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
  };

  const handleLikeChange = async (id, blogObject) => {
    try {
      const updateBlog = await blogService.update(id, blogObject);
      setBlogs(blogs.map((blog) => (blog.id !== id ? blog : updateBlog)));
      setMessage(
        `a new blog ${blogObject.title} by ${blogObject.author} was liked`
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

  const hanldeLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
      setTimeout(() => {
        setMessage(null);
        setMessageType(null);
      }, 5000);
    } catch {
      setMessage("wrong username or password");
      setMessageType("error");
      setTimeout(() => {
        setMessage(null);
        setMessageType(null);
      }, 5000);
    }
  };

  const handleAddBlog = async (blogObject) => {
    try {
      const newBlog = await blogService.create(blogObject);
      setBlogs([...blogs, newBlog]);

      setMessage(
        `a new blog ${blogObject.title} by ${blogObject.author} added`
      );
      setMessageType("success");
    } catch {
      setMessage("Failed to add blog");
      setMessageType("error");
    }
  };

  const handleRemoveBlog = async (id) => {
    try {
      await blogService.remove(id);
      setBlogs(blogs.filter((blog) => blog.id !== id));
      setMessageType("success");
      setMessage(
        `a blog ${blogs.find((blog) => blog.id === id).title} by ${
          blogs.find((blog) => blog.id === id).author
        } was removed`
      );
    } catch {
      setMessageType("error");
      setMessage("Failed to remove blog");
    }
  };

  const loginFrom = () => {
    return (
      <div>
        <h2>log in to application</h2>
        <form onSubmit={hanldeLogin}>
          <div>
            <label htmlFor="username">username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    );
  };

  const blogFrom = () => (
    <Togglable buttonLabel="create new blog">
      <BlogForm createBlog={handleAddBlog} />
    </Togglable>
  );

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) =>
        setBlogs(blogs.sort((blog1, blog2) => blog2.likes - blog1.likes))
      );
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} type={messageType} />

      {!user && loginFrom()}

      {user && (
        <div>
          {user.name} logged in{" "}
          <button type="button" onClick={handleLogout}>
            logout
          </button>
        </div>
      )}

      {user && (
        <div>
          <h2>create new</h2>
          {blogFrom()}
        </div>
      )}
      {user &&
        blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            handleRemoveChange={handleRemoveBlog}
            handleLikeChange={handleLikeChange}
          />
        ))}
    </div>
  );
};

export default App;
