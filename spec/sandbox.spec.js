const { chromium } = require("playwright");
const { expect } = require("chai");

let page;
let browser;

describe("Sandbox", () => {
  before(async function fn() {
    this.timeout(20000);
    browser = process.env.GITHUB_ACTIONS
      ? await chromium.launch()
      : await chromium.launch({ headless: false });

    const context = await browser.newContext();
    page = await context.newPage();

    await page
      .goto("https://e2e-boilerplate.github.io/sandbox/", {
        waitUntil: "networkidle0",
      })
      .catch(() => {});
  });

  after(() => {
    if (!page.isClosed()) {
      browser.close();
    }
  });

  it("should be on the sandbox", async () => {
    await page.waitForSelector("h1");
    const title = await page.$eval("h1", (el) => el.textContent);

    expect(await page.title()).to.equal("Sandbox");
    expect(title).to.equal("Sandbox");
  });
});
