const { test, expect, beforeEach, describe } = require("@playwright/test");
const { loginWith, createBlog, likeBlog } = require("./helper");

const user = {
  username: "khoi",
  name: "Khoi",
  password: "khoi",
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
    await page.goto("/login");
    await expect(page.getByText("log in to application")).toBeVisible();
    await expect(page.getByLabel("username")).toBeVisible();
    await expect(page.getByLabel("password")).toBeVisible();
    await expect(page.getByRole("button", { name: "login" })).toBeVisible();
  });

  describe("Login", () => {
    test("succeeds with the correct username/password combination", async ({
      page,
    }) => {
      await page.goto("/login");
      await loginWith(page, user.username, user.password);
      await expect(page.getByRole("button", { name: "logout" })).toBeVisible();
    });

    test("fails if the username/password is incorrect", async ({ page }) => {
      await page.goto("/login");
      await loginWith(page, user.username, "wrong password");
      await expect(page.getByText("wrong username or password")).toBeVisible();
    });

    describe("When logged in", () => {
      beforeEach(async ({ page }) => {
        await page.goto("/login");
        await loginWith(page, user.username, user.password);
        await expect(
          page.getByRole("button", { name: "logout" }),
        ).toBeVisible();
      });

      test("a new blog can be created", async ({ page }) => {
        await page.goto("/create");
        await createBlog(page, "title 1", "author 1", "one.com");
        await page.goto("/");
        await expect(page.getByText("title 1")).toBeVisible();
      });

      describe("blog oprations", () => {
        beforeEach(async ({ page }) => {
          await page.goto("/create");
          await createBlog(page, "title 1", "author 1", "one.com");
          await page.goto("/");
          await expect(page.getByText("title 1")).toBeVisible();
        });

        test("a blog can be liked", async ({ page }) => {
          await page.getByRole("link", { name: "title 1" }).click();
          await page.getByRole("button", { name: "like" }).click();

          await expect(page.getByText("likes 1")).toBeVisible();
        });

        test("user who added the blog can delete the blog", async ({
          page,
        }) => {
          await expect(page.getByText("title 1")).toBeVisible();

          await page.getByRole("link", { name: "title 1" }).click();

          page.on("dialog", (dialog) => dialog.accept());
          await page.getByRole("button", { name: "remove" }).click();

          await page.goto("/");

          await expect(page.getByText("title 1")).not.toBeVisible();
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

          await page.goto("/login");
          await loginWith(page, "otherUsername", "otherPassword");

          await page.goto("/");
          await expect(page.getByText("title 1")).toBeVisible();

          await page.getByRole("link", { name: "title 1" }).click();

          await expect(
            page.getByRole("button", { name: "remove" }),
          ).not.toBeVisible();
        });

        // test("blogs are arranged in the order according to the likes, the blog with the most likes first", async ({
        //   page,
        // }) => {
        //   await likeBlog(page, "title 1", 1);
        //   await likeBlog(page, "title 2", 4);
        //   await likeBlog(page, "title 3", 2);

        //   await expect(page.locator(".blog").nth(0)).toContainText("title 2");
        //   await expect(page.locator(".blog").nth(1)).toContainText("title 3");
        //   await expect(page.locator(".blog").nth(2)).toContainText("title 1");
        // });
      });
    });
  });
});
