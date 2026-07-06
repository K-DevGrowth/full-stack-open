import { useState, useEffect, useRef } from "react";
import Blog from "./Blog";
import BlogForm from "./BlogForm";
import { Link } from "react-router-dom";
import useBlogs from "../hooks/useBlogs";

const BlogList = () => {
  const { blogs, isPending, isError } = useBlogs();

  if (isPending) return "loading...";

  if (isError) return "error";

  return (
    <div>
      <h2>blogs</h2>

      <ul>
        {blogs
          .toSorted((a, b) => b.likes - a.likes)
          .map((blog) => (
            <li key={blog.id}>
              <Link to={`/blogs/${blog.id}`} className="linkBlog">
                {blog.title}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default BlogList;
