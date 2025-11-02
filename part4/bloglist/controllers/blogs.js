const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

blogsRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
  });
  res.json(blogs);
});

blogsRouter.post("/", async (req, res) => {
  const body = req.body;
  const user = req.user;

  if (!user) {
    return res.status(400).json({
      error: "userId missing or not valid",
    });
  }

  if (!body.title || !body.url) {
    return res.status(400).json({ error: "missing content" });
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id,
  });

  const savedBlog = await blog.save();

  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  res.status(201).json(savedBlog);
});

blogsRouter.delete("/:id", async (req, res) => {
  const user = req.user;
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    return res.status(404).json({
      error: "blog not found",
    });
  }

  if (blog.user.toString() !== user._id.toString()) {
    return res.status(403).json({ error: "only creater can delete this blog" });
  }

  await Blog.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

blogsRouter.put("/:id", async (req, res) => {
  const { title, author, url, likes } = req.body;
  const blog = await Blog.findByIdAndUpdate(req.params.id);

  if (blog) {
    blog.title = title;
    blog.author = author;
    blog.url = url;
    blog.likes = likes;
  }

  const savedBlog = await blog.save();
  res.status(200).json(savedBlog);
});

module.exports = blogsRouter;
