import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

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

  const handleAddBlog = async (e) => {
    e.preventDefault();

    try {
      const newBlog = await blogService.create({ title, author, url });
      setBlogs([...blogs, newBlog]);
      setMessage(`a new blog ${title} by ${author} added`);
      setMessageType("success");

      setTitle("");
      setAuthor("");
      setUrl("");
    } catch {
      setMessage("failed to add blog");
      setMessageType("error");
    }

    setTimeout(() => {
      setMessage(null);
      setMessageType(null);
    }, 5000);
  };

  const blogFrom = () => {
    return (
      <form onSubmit={handleAddBlog}>
        <div>
          <label htmlFor="title">title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="author">author</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="url">url</label>
          <input
            type="text"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    );
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
