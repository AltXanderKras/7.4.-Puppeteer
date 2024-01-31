const puppeteer = require("puppeteer");

let browser;
let page;
let currentTestUrl;

beforeAll(async () => {
  browser = await puppeteer.launch({ headless: "new" });
});

beforeEach(async () => {
  page = await browser.newPage();
  await page.goto(currentTestUrl);
});

afterEach(async () => {
  await page.close();
});

afterAll(async () => {
  await browser.close();
});

describe("Github Page Tests for 'https://github.com/team'", () => {
  beforeAll(() => {
    currentTestUrl = "https://github.com/team";
  });

  test("The h1 header content", async () => {
    await page.waitForSelector("h1.h1-mktg.col-md-10.mx-auto.mb-3", {
      timeout: 7000,
    });
    const h1Content = await page.$eval(
      "h1.h1-mktg.col-md-10.mx-auto.mb-3",
      (el) => el.textContent.trim()
    );
    expect(h1Content).toEqual("Build like the best teams on the planet");
  }, 10000);

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", (link) => link.getAttribute("href"));
    expect(actual).toEqual("#start-of-content");
  });

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-mktg.btn-large-mktg.btn-muted-mktg";
    await page.waitForSelector(btnSelector, { timeout: 7000 });
    const buttonText = await page.$eval(btnSelector, (el) =>
      el.textContent.trim()
    );
    expect(buttonText).toContain("Sign up for free");
  }, 10000);
});

describe("Github Page Tests for 'https://github.com/features'", () => {
  beforeAll(() => {
    currentTestUrl = "https://github.com/features";
  });

  test("The h1 header content", async () => {
    await page.waitForSelector("h1.h1-mktg.col-7-max.mx-auto", {
      timeout: 7000,
    });
    const h1Content = await page.$eval("h1.h1-mktg.col-7-max.mx-auto", (el) =>
      el.textContent.trim()
    );
    expect(h1Content).toEqual("The tools you need to build what you want.");
  }, 10000);

  test("The page contains Introduction button on https://skills.github.com/", async () => {
    await page.goto("https://skills.github.com/");
    await page.waitForSelector("em", { timeout: 7000 });
    const emContent = await page.$eval("em", (el) => el.textContent.trim());
    expect(emContent).toEqual("Introduction to GitHub");
  }, 10000);
});

describe("Github Page Tests for 'https://github.com/solutions/ci-cd/'", () => {
  beforeAll(() => {
    currentTestUrl = "https://github.com/solutions/ci-cd/";
  });

  test("The h1 header content", async () => {
    await page.waitForSelector(
      "h1.col-10-max.color-fg-default.mx-auto.h1-mktg",
      {
        timeout: 7000,
      }
    );
    const h1Content = await page.$eval(
      "h1.col-10-max.color-fg-default.mx-auto.h1-mktg",
      (el) => el.textContent.trim()
    );
    expect(h1Content).toEqual("The completeCI/CD solution");
  }, 10000);
});
