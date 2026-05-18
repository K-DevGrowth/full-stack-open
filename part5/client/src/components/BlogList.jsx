import { useState, useEffect, useRef } from "react";
import Blog from "./Blog";
import blogService from "../services/blogs";
import loginService from "../services/login";
import BlogForm from "./BlogForm";
import { Link } from "react-router-dom";

const BlogList = ({ blogs }) => {
  return (
    <div>
      <h2>blogs</h2>

      <ul>
        {blogs
          .toSorted((a, b) => b.likes - a.likes)
          .map((blog) => (
            <li key={blog.id}>
              <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default BlogList;
