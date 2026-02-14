const express = require("express");
const app = express();

const { PORT } = require("./utils/config");
const { connectToDatabase } = require("./utils/db");

const blogsRouter = require("./controllers/blogs");

app.use(express.json());

app.use("/api/blogs", blogsRouter);

// const printBlog = async () => {
//   const blogs = await Blog.findAll();

//   blogs.forEach((blog) => {
//     console.log(`${blog.author}: ${blog.title}, ${blog.likes} likes`);
//   });
// };

// printBlog();

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();
