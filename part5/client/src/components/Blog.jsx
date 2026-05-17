import { useState } from "react";

const Blog = ({ blog, user, handleLikeChange, handleRemoveChange }) => {
  const [show, setShow] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const label = show ? "hide" : "show";

  const showDetailsBlog = () => {
    setShow(!show);
  };

  const handleLikeClick = () => {
    handleLikeChange(blog.id, {
      ...blog,
      user: user.id,
      likes: blog.likes + 1,
    });
  };

  const handleRemoveClick = () => {
    if (!window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) return;

    handleRemoveChange(blog.id);
  };

  const showRemoveButton = blog.user?.username === user?.username;

  return (
    <div style={blogStyle} className="blog">
      <span>
        {blog.title} {blog.author}
      </span>
      <button onClick={showDetailsBlog}>{label}</button>
      {show && (
        <div>
          <p>{blog.url}</p>
          <div>
            <span>{blog.likes}</span>{" "}
            <button onClick={handleLikeClick}>like</button>
          </div>
          <p>{user.username}</p>

          {showRemoveButton && (
            <button onClick={handleRemoveClick}>remove</button>
          )}
        </div>
      )}
    </div>
  );
};

export default Blog;
