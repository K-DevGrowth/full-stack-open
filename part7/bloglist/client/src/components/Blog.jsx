import { Box, Button, Card } from "@mui/material";

const Blog = ({ blog, user, handleLikeChange, handleRemoveBlog }) => {
  if (!blog) {
    return null;
  }

  const isCreator = user && blog.user.username === user.username;

  const onLike = () => {
    handleLikeChange(blog.id, {
      likes: blog.likes + 1,
    });
  };

  const onRemove = () => {
    if (!window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) return;

    handleRemoveBlog(blog.id);
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
