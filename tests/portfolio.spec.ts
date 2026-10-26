import { test, expect } from "@playwright/test";

test("portfolio renders the hero and curated projects", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("apps people love");
  await expect(page.locator(".card")).toHaveCount(13);
  for (const removed of [
    "Crest",
    "EDUCENTRA",
    "Adaptive Station",
    "AdaptiveHub AI",
  ])
    await expect(
      page.getByRole("heading", { name: removed, exact: true }),
    ).toHaveCount(0);
  await page.getByRole("button", { name: "Open AdaptiveHub LMS" }).click();
  await expect(page.getByRole("link", { name: /Google Play/ })).toBeVisible();
  expect(errors).toEqual([]);
});
