import { chromium } from "playwright";
const browser = await chromium.launch({ channel: "chrome" });
const ctx = await browser.newContext({ viewport: { width: 1080, height: 1920 }, recordVideo: { dir: "smoke/pw", size: { width: 1080, height: 1920 } } });
const page = await ctx.newPage();
await page.setContent(`<body style="font:48px sans-serif;padding:60px;background:#0D1030;color:#fff"><h1>Playwright demo</h1><input id=q style="font-size:48px;width:900px" placeholder="Ask anything"></body>`);
await page.click("#q"); await page.keyboard.type("Plan my week", { delay: 80 }); await page.waitForTimeout(800);
await ctx.close(); await browser.close();
console.log("playwright recorded");
