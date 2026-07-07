import { useState } from "react";
import useBlogs from "../hooks/useBlogs";
import { useNavigate } from "react-router-dom";

const BlogForm = () => {
  const { createBlog, disableButton } = useBlogs();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const navigate = useNavigate();

  const onCreate = async (e) => {
    e.preventDefault();
    try {
      await createBlog({
        title: title,
        author: author,
        url: url,
      });

      setTitle("");
      setAuthor("");
      setUrl("");

      navigate("/");
    } catch (error) {}
  };

  return (
    <form onSubmit={onCreate}>
      <h2>Create new</h2>
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
      <button type="submit" disabled={disableButton}>
        create
      </button>
    </form>
  );
};

export default BlogForm;
