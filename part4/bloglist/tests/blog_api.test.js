const assert = require("node:assert");
const { test, after, beforeEach } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./test_helper");
const app = require("../app");
const Blog = require("../models/blog");
const { url } = require("node:inspector");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
});

test("blog are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("all blogs are returned", async () => {
  const blogsAtEnd = await helper.blogsInDB();
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length);
});

test("unique identifier property of blog posts is named id", async () => {
  const blogsAtEnd = await helper.blogsInDB();
  const allHaveId = blogsAtEnd.every((blog) => blog.id !== undefined);
  const nonHave_Id = blogsAtEnd.every((blog) => blog._id === undefined);

  assert.strictEqual(allHaveId, true);
  assert.strictEqual(nonHave_Id, true);
});

test("a sepecific blog is post", async () => {
  const newBlog = {
    title: "testing",
    author: "Khoi",
    url: "https://testing",
    likes: 10,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await helper.blogsInDB();
  const contents = blogsAtEnd.map((blog) => blog.title);

  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1);
  assert(contents.includes("testing"));
});

test("the likes property of blog is missing from the request data", async () => {
  const newBlog = {
    title: "testing",
    author: "Khoi",
    url: "https://testing",
  };

  const response = await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  assert.strictEqual(response.body.likes, 0);
});

test("the title or url properties are missing from the request data", async () => {
  const newBlog = {
    author: "Khoi",
    likes: 100,
  };

  const blogsAtStart = await helper.blogsInDB();

  await api.post("/api/blogs").send(newBlog).expect(400);

  const blogsAtEnd = await helper.blogsInDB();

  assert.strictEqual(blogsAtEnd.length, blogsAtStart.length);
});

after(async () => {
  await mongoose.connection.close();
});
