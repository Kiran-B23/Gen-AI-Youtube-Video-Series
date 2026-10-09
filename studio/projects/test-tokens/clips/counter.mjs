// Illustrative page: typing a prompt while an approximate token counter (chars / 4) updates.
import { chromium } from "playwright";
const W = +(process.env.VIEW_W || 820), H = +(process.env.VIEW_H || 780);
const browser = await chromium.launch({ channel: "chrome" });
const ctx = await browser.newContext({ viewport: { width: W, height: H }, recordVideo: { dir: process.env.OUT_DIR, size: { width: W, height: H } } });
const page = await ctx.newPage();
await page.setContent(`<body style="margin:0;background:#11163a;color:#fff;font:600 52px Inter,sans-serif;padding:36px">
<div style="font:700 34px monospace;letter-spacing:.15em;color:#FFC145">PROMPT</div>
<textarea id=t style="width:100%;height:360px;margin-top:16px;font:48px/1.25 Inter,sans-serif;border-radius:20px;padding:20px;background:#0B1020;color:#fff;border:2px solid #444"></textarea>
<div style="margin-top:30px">≈ <span id=n style="color:#FFC145;font-size:120px">0</span> tokens</div>
<div style="margin-top:10px;color:#aaa;font-size:30px">illustrative · about 4 characters per token</div>
<script>t.oninput=()=>n.textContent=Math.ceil(t.value.length/4)</script></body>`);
await page.click("#t");
await page.keyboard.type("Summarise this 40-page report and list every risk, every date, and every number in a table, please.", { delay: 35 });
await page.waitForTimeout(1500);
await ctx.close(); await browser.close();
