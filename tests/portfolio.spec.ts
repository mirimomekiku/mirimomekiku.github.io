import { test, expect } from "@playwright/test";

test("animated layout keeps fixed controls inside a touch viewport", async ({ browser }) => {
  const page = await browser.newPage({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  });
  await page.goto("/");
  await expect(page.locator(".chat-input")).toBeInViewport({ ratio: 1 });
  await expect(page.locator(".theme-toggle")).toBeInViewport({ ratio: 1 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(390);
  await page.getByLabel("Ask a question").fill("where are you based");
  await page.getByRole("button", { name: "Send", exact: true }).tap();
  await expect(page.locator(".msg.bot").last()).toContainText("Cagayan de Oro", { timeout: 8000 });
  await expect(page.locator(".chat-input")).toBeInViewport({ ratio: 1 });
  await page.close();
});

for (const width of [320, 390, 540, 768, 860]) {
  test(`hero and bottom bar fit a ${width}px mobile viewport`, async ({ page }) => {
    await page.setViewportSize({ width, height: 800 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    const cards = await page.locator(".widget-park").evaluateAll((elements) =>
      elements.map((element) => {
        const { x, y, width, height } = element.getBoundingClientRect();
        return { x, y, width, height };
      }),
    );
    for (const [index, card] of cards.entries()) {
      expect(card.x).toBeGreaterThanOrEqual(0);
      expect(card.x + card.width).toBeLessThanOrEqual(width);
      for (const other of cards.slice(index + 1)) {
        expect(
          card.x + card.width <= other.x || other.x + other.width <= card.x ||
          card.y + card.height <= other.y || other.y + other.height <= card.y,
        ).toBe(true);
      }
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
    const chips = page.locator(".chat-chips");
    await chips.evaluate((element) => { element.scrollLeft = element.scrollWidth; });
    await expect(chips.getByRole("link", { name: /github/ })).toBeInViewport();
    await page.getByLabel("Ask a question").fill("where are you based");
    await page.getByRole("button", { name: "Send", exact: true }).click();
    await expect(page.locator(".msg.bot").last()).toContainText("Cagayan de Oro");
    const dock = await page.locator(".chatdock").boundingBox();
    expect(dock!.x).toBeGreaterThanOrEqual(0);
    expect(dock!.y).toBeGreaterThanOrEqual(0);
    expect(dock!.x + dock!.width).toBeLessThanOrEqual(width);
    expect(dock!.y + dock!.height).toBeLessThanOrEqual(800);
    await page.locator("#contact").scrollIntoViewIfNeeded();
    await expect(page.locator(".chatdock")).toHaveClass(/is-hidden/);
  });
}

test("portfolio renders the hero and curated projects", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("apps people love");
  await expect(page.locator(".card")).toHaveCount(12);
  for (const removed of [
    "Crest Document Control",
    "EDUCENTRA",
    "SwitchDeals",
    "PSDrops",
    "TheoryPocket",
    "Zync",
    "AdaptiveHub AI",
  ])
    await expect(
      page.getByRole("heading", { name: removed, exact: true }),
    ).toHaveCount(0);
  await expect(page.getByRole("heading", { name: "educentra.ai", exact: true })).toHaveCount(1);
  await expect(page.getByRole("heading", { name: "Adaptive Station", exact: true })).toHaveCount(1);
  await page.getByRole("button", { name: "Open AdaptiveHub LMS" }).click();
  await expect(page.getByRole("link", { name: /Google Play/ })).toBeVisible();
  expect(errors).toEqual([]);
});

test("chat dock answers from page content and slides away at contact", async ({
  page,
}) => {
  await page.goto("/");
  const dock = page.getByRole("region", { name: "Ask mirimomekiku" });
  await expect(dock).toBeVisible();
  await page.getByLabel("Ask a question").fill("where are you based");
  await page.keyboard.press("Enter");
  await expect(page.locator(".msg.bot").last()).toContainText("Cagayan de Oro", {
    timeout: 8000,
  });
  await page.locator("#contact").scrollIntoViewIfNeeded();
  await expect(page.locator(".chatdock")).toHaveClass(/is-hidden/);
});
