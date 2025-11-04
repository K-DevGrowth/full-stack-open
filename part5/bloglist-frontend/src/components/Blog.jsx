import { useState } from "react";

<<<<<<< HEAD
const Blog = ({ blog }) => {
=======
const Blog = ({ blog, handleLikeChange, handleRemoveChange }) => {
>>>>>>> new-feature
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

<<<<<<< HEAD
=======
  const handleLikeClick = () => {
    handleLikeChange(blog.id, {
      ...blog,
      likes: blog.likes + 1,
    });
  };

  const handleRemoveClick = () => {
    if (!window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) return;

    handleRemoveChange(blog.id);
  };

>>>>>>> new-feature
  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={showDetailsBlog}>{label}</button>
      {show && (
        <div>
          <p>{blog.url}</p>
          <div>
<<<<<<< HEAD
            {blog.likes} <button>like</button>
          </div>
          <p>{blog.user?.username}</p>
=======
            {blog.likes} <button onClick={handleLikeClick}>like</button>
          </div>
          <p>{blog.user?.username}</p>
          <button onClick={handleRemoveClick}>remove</button>
>>>>>>> new-feature
        </div>
      )}
    </div>
  );
};

export default Blog;
