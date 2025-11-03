import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";

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

  const hanldeLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch {
      setMessage("wrong username or password");
      setMessageType("error");
      setTimeout(() => {
        setMessage(null);
      }, 5000);
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

  const handleAddBlog = async (blogObject) => {
    try {
      const newBlog = await blogService.create(blogObject);
      setBlogs([...blogs, newBlog]);

      setMessage(
        `a new blog ${blogObject.title} by ${blogObject.author} added`
      );
      setMessageType("success");
      setTimeout(() => {
        setMessage(null);
        setMessageType(null);
      }, 5000);
    } catch {
      setMessage("Failed to add blog");
      setMessageType("error");
      setTimeout(() => {
        setMessage(null);
        setMessageType(null);
      }, 5000);
    }
  };

  const blogFrom = () => {
    return <BlogForm createBlog={handleAddBlog} />;
  };

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
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
      {user && blogs.map((blog) => <Blog key={blog.id} blog={blog} />)}
    </div>
  );
};

export default App;
