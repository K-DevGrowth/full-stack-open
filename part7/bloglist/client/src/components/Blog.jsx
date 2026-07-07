import { Box, Button, Card, TextField } from "@mui/material";
import useBlogs from "../hooks/useBlogs";
import { useMatch, useNavigate } from "react-router-dom";
import { useState } from "react";

const Blog = ({ user }) => {
  const [comment, setComment] = useState("");

  const { blogs, isPending, isError, removeBlog, likeBlog, postCommentToBlog } =
    useBlogs();

  const navigate = useNavigate();

  const match = useMatch("/blogs/:id");

  if (isPending) return "loading...";

  if (isError) return "error";

  const blog = match ? blogs.find((b) => b.id === match.params.id) : null;

  const isCreator = user && blog.user.username === user.username;

  const onLike = async () => {
    try {
      await likeBlog({
        id: blog.id,
        blogObject: {
          likes: blog.likes + 1,
        },
      });
    } catch (error) {}
  };

  const onRemove = async () => {
    if (!window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) return;

    try {
      await removeBlog(blog.id);
      navigate("/");
    } catch (error) {}
  };

  const onComment = async () => {
    try {
      await postCommentToBlog({ id: blog.id, comment: comment });
      setComment("");
    } catch (error) {}
  };

  return (
    <div className="blog">
      <Card sx={{ margin: "10px 0", padding: "10px" }}>
        <h3>{blog.title}</h3>
        <p>by {blog.author}</p>
        <a href={blog.url}>{blog.url}</a>
        <p>Added by {blog.user.username}</p>
        <Box sx={{ gap: "5px", display: "flex", alignItems: "center" }}>
          <span>{blog.likes} likes</span>
          {user && (
            <Button variant="outlined" onClick={onLike}>
              like
            </Button>
          )}
          {isCreator && (
            <Button
              sx={{ color: "red", borderColor: "red" }}
              variant="outlined"
              onClick={onRemove}
            >
              remove
            </Button>
          )}
        </Box>
        <h4>comments</h4>
        <TextField
          id="outlined-basic"
          size="small"
          placeholder="add a comment"
          required
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          sx={{ paddingRight: "10px" }}
        />
        <Button type="button" variant="contained" onClick={onComment}>
          ADD COMMENT
        </Button>
        <ul>
          {blog.comments.map((comment) => (
            <li key={comment}>{comment}</li>
          ))}
        </ul>
      </Card>
    </div>
  );
};

export default Blog;
