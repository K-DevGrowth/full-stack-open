import { useState } from "react";
import useBlogs from "../hooks/useBlogs";
import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";

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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "300px",
          gap: "10px",
          paddingBottom: "10px",
        }}
      >
        <TextField
          placeholder="title"
          size="small"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          placeholder="author"
          size="small"
          id="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <TextField
          placeholder="url"
          size="small"
          id="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </div>
      <Button type="submit" disabled={disableButton} variant="contained">
        create
      </Button>
    </form>
  );
};

export default BlogForm;
