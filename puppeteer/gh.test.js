const puppeteer = require("puppeteer");

let browser;
let page;

beforeAll(async () => {
  browser = await puppeteer.launch({ headless: "new" });
});

describe("Github Page Tests", () => {
  beforeEach(async () => {
    page = await browser.newPage();
  });

  afterEach(async () => {
    await page.close();
  });

  afterAll(async () => {
    await browser.close();
  });
  //задача 1

  test("The h1 header content on 'https://github.com/team'", async () => {
    await page.goto("https://github.com/team");
    await page.waitForSelector("h1.h1-mktg.col-md-10.mx-auto.mb-3", {
      timeout: 7000,
    });
    const h1Content = await page.$eval(
      "h1.h1-mktg.col-md-10.mx-auto.mb-3",
      (el) => el.textContent.trim()
    );
    expect(h1Content).toEqual("Build like the best teams on the planet");
  }, 10000);

  test("The first link attribute on 'https://github.com/team'", async () => {
    await page.goto("https://github.com/team");
    const actual = await page.$eval("a", (link) => link.getAttribute("href"));
    expect(actual).toEqual("#start-of-content");
  });

  test("The page contains Sign in button on 'https://github.com/team'", async () => {
    await page.goto("https://github.com/team");
    const btnSelector = ".btn-mktg.btn-large-mktg.btn-muted-mktg";
    await page.waitForSelector(btnSelector, { timeout: 7000 });
    const buttonText = await page.$eval(btnSelector, (el) =>
      el.textContent.trim()
    );
    expect(buttonText).toContain("Sign up for free");
  }, 10000);

  //задача 2
  test("The h1 header content on 'https://github.com/features'", async () => {
    await page.goto("https://github.com/features");
    await page.waitForSelector("h1.h1-mktg.col-7-max.mx-auto", {
      timeout: 7000,
    });
    const h1Content = await page.$eval("h1.h1-mktg.col-7-max.mx-auto", (el) =>
      el.textContent.trim()
    );
    expect(h1Content).toEqual("The tools you need to build what you want.");
  }, 10000);

  test("The page contains Introduction button on https://skills.github.com/ ", async () => {
    await page.goto("https://skills.github.com/");
    await page.waitForSelector("em", { timeout: 7000 });
    const emContent = await page.$eval("em", (el) => el.textContent.trim());
    expect(emContent).toEqual("Introduction to GitHub");
  }, 10000);

  test("The h1 header content on 'https://github.com/solutions/ci-cd/'", async () => {
    await page.goto("https://github.com/solutions/ci-cd/");
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
