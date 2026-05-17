const { expect } = require("@playwright/test");

const loginWith = async (page, username, password) => {
  await page.getByLabel("username").fill(username);
  await page.getByLabel("password").fill(password);
  await page.getByRole("button", { name: "login" }).click();
};

const createBlog = async (page, title, author, url) => {
  await page.getByRole("button", { name: "create new blog" }).click();
  await page.getByLabel("title").fill(title);
  await page.getByLabel("author").fill(author);
  await page.getByLabel("url").fill(url);
  await page.getByRole("button", { name: "create" }).click();
  await page.getByText(`${title} ${author}`).waitFor();
};

const likeBlog = async (page, title, times) => {
  const blog = page.locator(".blog").filter({ hasText: title });

  await blog.getByRole("button", { name: "show" }).click();

  for (let i = 1; i <= times; i++) {
    await blog.getByRole("button", { name: "like" }).click();
    await expect(blog).toContainText(`${i} like`);
  }
};

module.exports = { loginWith, createBlog, likeBlog };
