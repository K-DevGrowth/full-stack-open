const assert = require("node:assert");
const { test, after, beforeEach, describe } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./test_helper");
const app = require("../app");
const Blog = require("../models/blog");

const api = supertest(app);

describe("When there is initially some blogs saved", () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(helper.initialBlogs);
  });

  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("all blogs are returned", async () => {
    const blogsAtEnd = await helper.blogsInDB();
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length);
  });

  describe("addition of a blog", () => {
    test("succeeds with a valid data", async () => {
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

    test("unique identifier property of blog posts is named id", async () => {
      const blogsAtEnd = await helper.blogsInDB();
      const allHaveId = blogsAtEnd.every((blog) => blog.id !== undefined);
      const nonHave_Id = blogsAtEnd.every((blog) => blog._id === undefined);

      assert.strictEqual(allHaveId, true);
      assert.strictEqual(nonHave_Id, true);
    });

    test("succeeds with the likes property is missing", async () => {
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

    test("fails with status code 400 if title or author is missing", async () => {
      const newBlog = {
        author: "Khoi",
        likes: 100,
      };

      const blogsAtStart = await helper.blogsInDB();

      await api.post("/api/blogs").send(newBlog).expect(400);

      const blogsAtEnd = await helper.blogsInDB();

      assert.strictEqual(blogsAtEnd.length, blogsAtStart.length);
    });
  });

  describe("deletion of a blog", () => {
    test("succeeds with status code 204 if id is valid", async () => {
      const blogsAtStart = await helper.blogsInDB();
      const deletedBlog = blogsAtStart[0];

      await api.delete(`/api/blogs/${deletedBlog.id}`).expect(204);

      const blogsAtEnd = await helper.blogsInDB();

      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1);
    });
  });

  describe("updation of a blog", () => {
    test("succeeds with valid id", async () => {
      const newBlog = {
        title: "Willchangelater",
        author: "A",
        url: "https://nothing.com",
        likes: 1,
      };
      const blogsAtStart = await helper.blogsInDB();
      const updatedBlog = blogsAtStart[0];

      await api.put(`/api/blogs/${updatedBlog.id}`).send(newBlog).expect(200);

      const blogsAtEnd = await helper.blogsInDB();
      const contents = blogsAtEnd.map((blog) => blog.title);

      assert.strictEqual(blogsAtStart.length, helper.initialBlogs.length);
      assert(contents.includes("Willchangelater"));
    });
  });
});

after(async () => {
  await mongoose.connection.close();
});
