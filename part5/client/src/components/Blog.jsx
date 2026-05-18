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
      <h3>{blog.title}</h3>

      <div>
        <a href={blog.url}>{blog.url}</a>

        <div>
          <span>likes {blog.likes}</span>{" "}
          {user && <button onClick={onLike}>like</button>}
        </div>

        <p>Added by {blog.user.username}</p>

        {isCreator && <button onClick={onRemove}>remove</button>}
      </div>
    </div>
  );
};

export default Blog;