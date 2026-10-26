import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

let errors: string[];

test.beforeEach(async ({ page }) => {
  errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.route("https://w.soundcloud.com/**", (route) =>
    route.fulfill({ contentType: "text/html", body: "<p>Music player</p>" }),
  );
  await page.route("https://lh3.googleusercontent.com/**", (route) =>
    route.fulfill({
      contentType: "image/svg+xml",
      body: '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><path fill="#aaa" d="M0 0h100v100H0z"/></svg>',
    }),
  );
});

test.afterEach(() => expect(errors).toEqual([]));

test("moodboard collections and archive views expose the same project catalog", async ({
  page,
}) => {
  await page.goto("/");
  const collection = page.getByRole("group", { name: "Moodboard collection" });
  await collection.getByRole("button", { name: "Work", exact: true }).click();
  await expect(
    page.getByRole("button", {
      name: "Explore Adaptive Library from the moodboard",
    }),
  ).toBeVisible();
  await expect(page.locator(".mood-photo")).toHaveCount(0);
  await collection.getByRole("button", { name: "Play", exact: true }).click();
  await expect(page.locator(".mood-type")).toBeVisible();
  await expect(page.locator(".mood-library")).toHaveCount(0);
  await collection.getByRole("button", { name: "Mix", exact: true }).click();
  await expect(page.locator(".mood-photo")).toBeVisible();
  await page
    .getByRole("group", { name: "Project view" })
    .getByRole("button", { name: "Grid", exact: true })
    .click();
  await expect(page.locator(".project-card")).toHaveCount(19);
  await expect(
    page.locator(".project-card").first().locator(".project-cover"),
  ).toBeVisible();
  await page
    .getByRole("group", { name: "Project view" })
    .getByRole("button", { name: "Index", exact: true })
    .click();
  await expect(page.locator(".project-card")).toHaveCount(19);
  await expect(
    page.locator(".project-card").first().locator(".project-cover"),
  ).not.toBeVisible();
});

test("mobile menu navigates and returns to native scrolling with reduced motion", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Open navigation" }).click();
  await expect(
    page.getByRole("dialog", { name: "Navigation", exact: true }),
  ).toBeVisible();
  await page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("link", { name: "Work", exact: true })
    .click();
  await expect(page.locator("#work")).toBeFocused();
  await expect(page.locator("html")).not.toHaveClass(/lenis-stopped/);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("link", { name: "Contact", exact: true })
    .click();
  await expect(page.locator("#contact")).toBeFocused();
  await expect(page.locator("html")).not.toHaveClass(/lenis/);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth > innerWidth,
    ),
  ).toBe(false);
});

test("smooth wheel and anchor navigation preserve destination focus", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator("html")).toHaveClass(/lenis/);
  await page.mouse.move(600, 500);
  await page.mouse.wheel(0, 650);
  await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(0);
  await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(600);
  await page.getByRole("link", { name: "Get in touch", exact: true }).click();
  await expect(page).toHaveURL(/#contact$/);
  await expect(page.locator("#contact")).toBeFocused();
  await page.getByRole("link", { name: "Back to top", exact: true }).click();
  await expect(page.locator("#home")).toBeFocused();
  await expect.poll(() => page.evaluate(() => scrollY)).toBeLessThan(2);
  await page.getByRole("button", { name: "Pause animations" }).click();
  await expect(page.locator("html")).not.toHaveClass(/lenis/);
  await page.mouse.move(600, 500);
  await page.mouse.wheel(0, 500);
  await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(400);
});

test("filter reflow and rapid searches leave a usable grid", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator(".project-card")).toHaveCount(19);
  await page.getByRole("button", { name: "Mobile", exact: true }).click();
  await expect(page.locator(".project-card")).toHaveCount(11);
  await expect
    .poll(() =>
      page.locator(".project-grid").evaluate((element) => element.style.height),
    )
    .toBe("");
  for (const filter of [
    "Web",
    "All work",
    "Mobile",
    "AI & systems",
    "All work",
  ]) {
    await page.getByRole("button", { name: filter, exact: true }).click();
  }
  const search = page.getByRole("searchbox", { name: "Search projects" });
  await search.pressSequentially("Crest", { delay: 25 });
  await expect(page.locator(".project-card")).toHaveCount(1);
  await expect(page.locator(".project-card h3")).toContainText("Crest");
  await search.fill("no project matches this");
  await expect(
    page.getByRole("heading", { name: "No projects found." }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Reset filters" }).click();
  await expect(page.locator(".project-card")).toHaveCount(19);
  await expect
    .poll(() =>
      page.locator(".project-grid").evaluate((element) => element.style.height),
    )
    .toBe("");
  const overlaps = await page.locator(".project-card").evaluateAll((cards) => {
    const boxes = cards.map((card) => card.getBoundingClientRect());
    return boxes.some((a, index) =>
      boxes
        .slice(index + 1)
        .some(
          (b) =>
            Math.min(a.right, b.right) - Math.max(a.left, b.left) > 1 &&
            Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top) > 1,
        ),
    );
  });
  expect(overlaps).toBe(false);
});

test("dialogs keep native scrolling, close during entry, and restore focus", async ({
  page,
}) => {
  await page.setViewportSize({ width: 900, height: 600 });
  await page.goto("/");
  const opener = page.getByRole("button", {
    name: "Explore Crest",
    exact: true,
  });
  await opener.click();
  const dialog = page.getByRole("dialog", { name: "Crest", exact: true });
  await expect(dialog).toBeVisible();
  await expect(page.locator("html")).toHaveClass(/lenis-stopped/);
  const position = await page.evaluate(() => scrollY);
  await dialog.hover();
  await page.mouse.wheel(0, 300);
  await expect
    .poll(() => dialog.evaluate((element) => element.scrollTop))
    .toBeGreaterThan(0);
  expect(await page.evaluate(() => scrollY)).toBe(position);
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(opener).toBeFocused();
  await expect(page.locator("html")).not.toHaveClass(/lenis-stopped/);
  await opener.click();
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(opener).toBeFocused();
  await opener.click();
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator("html")).not.toHaveClass(/lenis/);
  await expect(dialog).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(opener).toBeFocused();
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await expect(page.locator("html")).toHaveClass(/lenis/);
});

test("gallery and experience transitions can be interrupted safely", async ({
  page,
}) => {
  await page.goto("/");
  const entry = page.locator(".experience-entry").nth(1);
  const summary = entry.locator("summary");
  await summary.click();
  await expect(entry).toHaveAttribute("open", "");
  await summary.click();
  await expect(entry).not.toHaveAttribute("open");
  await summary.focus();
  await page.keyboard.press("Enter");
  await expect(entry).toHaveAttribute("open", "");
  await page.getByRole("button", { name: "Pause animations" }).click();
  await expect
    .poll(() =>
      entry
        .locator(".detail-content")
        .evaluate((element) => element.style.height),
    )
    .toBe("");
  await expect(entry.locator(".detail-content")).toBeVisible();
  await page.getByRole("button", { name: "Enable animations" }).click();
  await page.getByRole("button", { name: "More from the sketchbook" }).click();
  await expect(page.locator(".art-grid > button")).toHaveCount(12);
  await expect
    .poll(() =>
      page
        .locator(".creative-content")
        .evaluate((element) => element.style.height),
    )
    .toBe("");
  await page.getByRole("button", { name: "Music", exact: true }).click();
  await expect(page.locator(".playlist iframe")).toHaveCount(4);
  await page.getByRole("button", { name: "Art", exact: true }).click();
  await expect(page.locator(".art-grid > button")).toHaveCount(12);
  await page
    .getByRole("button", { name: "View artwork 1", exact: true })
    .click();
  await page.keyboard.press("ArrowRight");
  await expect(page.locator(".art-dialog-controls")).toContainText("2 /");
  await page.keyboard.press("Escape");
  await expect(
    page.getByRole("dialog", { name: "Artwork viewer" }),
  ).not.toBeVisible();
});

test("reduced motion, responsive layout, and accessibility remain intact", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(
    page.getByRole("button", {
      name: "Animations disabled by system preference",
    }),
  ).toBeDisabled();
  await expect(page.locator("html")).not.toHaveClass(/lenis/);
  for (const width of [320, 390, 650, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      ),
    ).toBe(false);
  }
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(results.violations).toEqual([]);
  await page
    .getByRole("button", { name: "Explore Crest", exact: true })
    .click();
  const modalResults = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(modalResults.violations).toEqual([]);
});
