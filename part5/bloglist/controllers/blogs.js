const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const { userExtractor } = require("../utils/middleware");

blogsRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
  });
  res.json(blogs);
});

blogsRouter.post("/", userExtractor, async (req, res) => {
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

blogsRouter.delete("/:id", userExtractor, async (req, res) => {
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

blogsRouter.put("/:id", userExtractor, async (req, res) => {
  const { title, author, url, likes } = req.body;
  const user = req.user;

  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    return res.status(404).json({
      error: "blog not found",
    });
  }

  if (blog.user.toString() !== user._id.toString()) {
    return res.status(403).json({
      error: "only creater can update this blog",
    });
  }

  const updatedblog = await Blog.findByIdAndUpdate(
    req.params.id,
    { title, author, url, likes },
    { new: true, runValidators: true }
  ).populate("user", { username: 1, name: 1 });
  res.status(200).json(updatedblog);
});

module.exports = blogsRouter;
