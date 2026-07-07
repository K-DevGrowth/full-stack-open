import { Box, Button, Card } from "@mui/material";
import useBlogs from "../hooks/useBlogs";
import { useMatch, useNavigate } from "react-router-dom";

const Blog = ({ user }) => {
  const { blogs, removeBlog, likeBlog } = useBlogs();

  const navigate = useNavigate();

  const match = useMatch("/blogs/:id");
  const blog = match ? blogs.find((b) => b.id === match.params.id) : null;

  if (!blog) {
    return null;
  }

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
      </Card>
    </div>
  );
};

export default Blog;
