const { test, expect, beforeEach, describe } = require("@playwright/test");
const { loginWith } = require("./helper");

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("/api/testing/reset");
    await request.post("/api/user", {
      data: {
        username: "kdev",
        name: "khoi",
        password: "123",
      },
    });

    await page.goto("/");
  });

  test("Login form is shown", async ({ page }) => {
    await expect(page.getByText("log in to application"));
  });

  describe("Login", () => {
    test("succeeds with correct credentials", async ({ page }) => {
      loginWith(page, "kdev", "123");

      await expect(page.getByText("Khoi logged in")).toBeVisible();
    });

    test("fails with wrong credentials", async ({ page }) => {
      loginWith(page, "kdev", "wrong passw");

      await expect(page.getByText("wrong username or password")).toBeVisible();
    });

    describe("When logged in", () => {
      beforeEach(async ({ page }) => {
        loginWith(page, "kdev", "123");
      });

      test("a new blog can be created", async ({ page }) => {
        await page.getByRole("button", { name: "create new blog" }).click();
        await page.getByLabel("title").fill("title 1");
        await page.getByLabel("author").fill("author 1");
        await page.getByLabel("url").fill("url 1");
        await page.getByRole("button", { name: "create" }).click();

        await expect(page.getByText(`a new blog title 1 by author 1 added`));
        await expect(page.getByText("title 1 author 1")).toBeVisible();
      });
    });
  });
});
