const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs);
});

blogsRouter.post("/", async (req, res) => {
  const body = req.body;

  if (!body.title || !body.url) {
    return res.status(400).json({ error: "missing content" });
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  });

  const savedBlog = await blog.save();
  res.status(201).json(savedBlog);
});

blogsRouter.delete("/:id", async (req, res) => {
  const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
  res.status(204).json(deletedBlog);
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
