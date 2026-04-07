/**
 * data/shinnyusei-feed.json の構造チェック（Instagram API は使用しない・手動メンテ想定）
 * Usage: node scripts/validate-shinnyusei-feed.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.join(__dirname, "..", "data", "shinnyusei-feed.json");

const raw = fs.readFileSync(filePath, "utf8");
let data;
try {
  data = JSON.parse(raw);
} catch (e) {
  console.error("shinnyusei-feed.json: JSON のパースに失敗しました。", e.message);
  process.exit(1);
}

if (!Array.isArray(data)) {
  console.error("shinnyusei-feed.json: ルートは配列である必要があります。");
  process.exit(1);
}

for (let i = 0; i < data.length; i++) {
  const item = data[i];
  if (!item || typeof item !== "object") {
    console.error(`shinnyusei-feed.json: items[${i}] がオブジェクトではありません。`);
    process.exit(1);
  }
  const { date, url, title, caption, type } = item;
  if (typeof date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(date.trim())) {
    console.error(`shinnyusei-feed.json: items[${i}].date は YYYY-MM-DD 形式の文字列にしてください。`);
    process.exit(1);
  }
  if (typeof url !== "string" || url.trim() === "") {
    console.error(`shinnyusei-feed.json: items[${i}].url は空でない文字列にしてください。`);
    process.exit(1);
  }
  const hasTitle = typeof title === "string" && title.trim() !== "";
  const hasCaption = typeof caption === "string" && caption.trim() !== "";
  if (!hasTitle && !hasCaption) {
    console.error(`shinnyusei-feed.json: items[${i}] には title または caption のどちらかが必要です。`);
    process.exit(1);
  }
  if (type !== undefined && typeof type !== "string") {
    console.error(`shinnyusei-feed.json: items[${i}].type は文字列にしてください。`);
    process.exit(1);
  }
}

console.log(`shinnyusei-feed.json: OK（${data.length} 件）`);
