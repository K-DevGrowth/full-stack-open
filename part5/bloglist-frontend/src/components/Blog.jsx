import { useState } from "react";

const Blog = ({ blog }) => {
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

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={showDetailsBlog}>{label}</button>
      {show && (
        <div>
          <p>{blog.url}</p>
          <div>
            {blog.likes} <button>like</button>
          </div>
          <p>{blog.user?.username}</p>
        </div>
      )}
    </div>
  );
};

export default Blog;
