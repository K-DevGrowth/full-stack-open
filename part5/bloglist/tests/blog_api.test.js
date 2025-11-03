const assert = require("node:assert");
const { test, after, beforeEach, describe } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./test_helper");
const app = require("../app");
const Blog = require("../models/blog");
const bcrypt = require("bcrypt");
const User = require("../models/user");

const api = supertest(app);

let token = "";

describe("When there is initially some blogs saved", () => {
  beforeEach(async () => {
    await User.deleteMany({});
    const passwordHash = await bcrypt.hash("secret", 10);
    const user = new User({ username: "root", passwordHash });
    await user.save();

    const res = await api
      .post("/api/login")
      .send({ username: "root", password: "secret" });

    token = res.body.token;
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
    test("succeeds with a valid data and token", async () => {
      const newBlog = {
        title: "testing",
        author: "Khoi",
        url: "https://testing",
        likes: 10,
      };

      await api
        .post("/api/blogs")
        .set("Authorization", `Bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const blogsAtEnd = await helper.blogsInDB();
      const contents = blogsAtEnd.map((blog) => blog.title);

      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1);
      assert(contents.includes("testing"));
    });

    test("fails with 401 if token is not provided", async () => {
      const newBlog = {
        title: "No token blog",
        author: "Someone",
        url: "https://testing-no-token",
        likes: 1,
      };

      await api.post("/api/login").expect(401).send(newBlog);
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

  describe("updating of a blog", () => {
    test("succeeds with valid id", async () => {
      const newBlog = {
        title: "Will change later",
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
      assert(contents.includes("Will change later"));
    });
  });
});

describe("When there is initially one user in db", () => {
  beforeEach(async () => {
    await User.deleteMany({});
    const passwordHash = await bcrypt.hash("secret", 10);
    const user = new User({ username: "root", passwordHash });
    await user.save();
  });

  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.usersInDB();

    const newUser = {
      username: "Kdev",
      name: "Khoi",
      password: "abcd",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDB();
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    assert(usernames.includes(newUser.username));
  });

  test("creation fails with a proper statuscode and message if username already taken", async () => {
    const usersAtStart = await helper.usersInDB();

    const newUser = {
      username: "Kdev",
      name: "Khoi",
      password: "abcd",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDB();
    assert(result.body.error.includes("expected `username` to be unique"));

    assert.strictEqual(usersAtEnd.length, usersAtStart.length);
  });
});

after(async () => {
  await mongoose.connection.close();
});
