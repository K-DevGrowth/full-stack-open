const { test, expect, beforeEach, describe } = require("@playwright/test");
const { loginWith, createBlog, likeBlog } = require("./helper");

const user = {
  username: "kdev",
  name: "Khoi",
  password: "123",
};

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("/api/testing/reset");
    await request.post("/api/users", {
      data: user,
    });

    await page.goto("/");
  });

  test("Login form is shown", async ({ page }) => {
    await expect(page.getByText("log in to application")).toBeVisible();
    await expect(page.getByLabel("username")).toBeVisible();
    await expect(page.getByLabel("password")).toBeVisible();
    await expect(page.getByRole("button", { name: "login" })).toBeVisible();
  });

  describe("Login", () => {
    test("succeeds with correct credentials", async ({ page }) => {
      await loginWith(page, user.username, user.password);
      await expect(page.getByText(`${user.name} logged in`)).toBeVisible();
    });

    test("fails with wrong credentials", async ({ page }) => {
      await loginWith(page, user.username, "wrong password");
      await expect(page.getByText("wrong username or password")).toBeVisible();
    });

    describe("When logged in", () => {
      beforeEach(async ({ page }) => {
        await loginWith(page, user.username, user.password);
      });

      test("a new blog can be created", async ({ page }) => {
        await createBlog(page, "title 1", "author 1", "one.com");

        await expect(
          page
            .locator(".blog")
            .filter({ hasText: "title 1" })
            .filter({ hasText: "author 1" }),
        ).toBeVisible();
      });

      describe("blog oprations", () => {
        beforeEach(async ({ page }) => {
          await createBlog(page, "title 1", "author 1", "one.com");
          await createBlog(page, "title 2", "author 2", "one.com");
          await createBlog(page, "title 3", "author 3", "one.com");
        });

        test("a blog can be liked", async ({ page }) => {
          const blogElement = page
            .locator(".blog")
            .filter({ hasText: "title 1 author 1" });

          await blogElement.getByRole("button", { name: "show" }).click();
          await blogElement.getByRole("button", { name: "like" }).click();

          await expect(blogElement.getByText("1 like")).toBeVisible();
        });

        test("user who added the blog can delete the blog", async ({
          page,
        }) => {
          const blogElement = page.getByText("title 1 author 1").locator("..");

          await blogElement.getByRole("button", { name: "show" }).click();

          page.on("dialog", (dialog) => dialog.accept());
          await blogElement.getByRole("button", { name: "remove" }).click();

          await expect(page.getByText("title 1 author 1")).not.toBeVisible();
        });

        test("only the creater can see the delete btn", async ({
          page,
          request,
        }) => {
          await request.post("/api/users", {
            data: {
              username: "otherUsername",
              name: "otherName",
              password: "otherPassword",
            },
          });

          await page.getByRole("button", { name: "logout" }).click();

          await loginWith(page, "otherUsername", "otherPassword");

          const blogElement = page.getByText("title 1 author 1").locator("..");
          await blogElement.getByRole("button", { name: "show" }).click();

          await expect(
            blogElement.getByRole("button", { name: "remove" }),
          ).not.toBeVisible();
        });

        test("blogs are arranged in the order according to the likes, the blog with the most likes first", async ({
          page,
        }) => {
          await likeBlog(page, "title 1", 1);
          await likeBlog(page, "title 2", 4);
          await likeBlog(page, "title 3", 2);

          await expect(page.locator(".blog").nth(0)).toContainText("title 2");
          await expect(page.locator(".blog").nth(1)).toContainText("title 3");
          await expect(page.locator(".blog").nth(2)).toContainText("title 1");
        });
      });
    });
  });
});
