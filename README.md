# 東京農工大学アメリカンフットボール部 BLASTERS 公式サイト

東京農工大学アメリカンフットボール部 **BLASTERS**（TUAT American Football）の公式 Web サイトです。
ファン・応援者・新入生・OB/OG 向けに、試合情報、ニュース、選手紹介、観戦ガイド、グッズ、協賛店情報などを発信します。

- 現行シーズン表記: **2026 SEASON**
- 配信: [GitHub Pages](https://pages.github.com/)

---

## 開発時の最重要ルール

- 編集対象は **このフォルダ（`kotetu1124.github.io` 直下）** のみです
- Cursor で開くワークスペースも `kotetu1124.github.io` 直下にしてください
- 静的サイト（GitHub Pages）前提のため、サーバーサイド処理は行いません
- 大量変更を一度に行わず、ページ単位・セクション単位の差分で進めてください

---

## 技術スタック

- HTML5 / CSS3 / JavaScript（バニラ）
- アイコン: Font Awesome 4.7.0（CDN）
- Web フォント（Google Fonts）:
  - 見出し系: `Anton` / `Bebas Neue` / `Barlow Condensed`
  - 本文系: `Zen Kaku Gothic New` / `Noto Serif JP`
  - 等幅: `JetBrains Mono`
- ホスティング: [GitHub Pages](https://pages.github.com/)
- CI: GitHub Actions（JSON 検証）

---

## ディレクトリ構成

```
kotetu1124.github.io/
├── index.html                  … トップページ
├── favicon.ico
├── pages/                      … サブページ群（後述）
├── data/                       … サイトで読み込む JSON データ
│   ├── matches.json
│   └── shinnyusei-feed.json
├── js/
│   ├── match.js                … pages/match.html の試合一覧描画
│   └── shinnyusei-feed.js      … pages/new_student.html の新着フィード描画
├── css/
│   ├── stylesheet.css          … 共通スタイル（主）
│   ├── stylesheet-new.css      … リニューアル作業用
│   └── design-preview.css      … デザイン検証用
├── image/                      … 主にトップ・GOODS・ギャラリー・ロゴ等
├── images/                     … 選手・スタッフ写真など（運用上 image/ と二系統）
├── scripts/
│   └── validate-shinnyusei-feed.mjs   … JSON 検証スクリプト
├── docs/                       … 要件・運用設計ドキュメント
└── .github/workflows/
    └── validate-shinnyusei-feed.yml   … JSON 検証 CI
```

> **メモ:** `image/` と `images/` は現状二系統存在します。当面はそのままの方針です（将来統一は TODO 参照）。

---

## 主なページ一覧

### トップ
- `index.html` … トップページ（部紹介、最新試合結果、次試合、監督メッセージ など）

### ニュース
- `pages/news.html` … ニュース一覧
- `pages/news/articles/*.html` … 個別記事（例: `2024-season-opener.html`）
- `pages/news/archive/*.html` … 年度別アーカイブ（`2022`〜`2025`）
- `pages/news/category/*.html` … カテゴリ別（`match-result`, `event`, `oshirase`, `other`）
- `pages/news/page/*.html` … ページネーション用（`2`〜`10`）

### 試合・リーグ
- `pages/match.html` … 試合状況一覧（`data/matches.json` + `js/match.js`）
- `pages/league.html` … 関東学生連盟リーグ表・年度別シーズン記録

### チーム
- `pages/team.html` … チームトップ（2026 シーズン ロースター）
- `pages/team/player/*.html` … 選手・コーチ・スタッフ個別プロフィール（41 ページ）
- `pages/team/player/team.html` … チーム一覧（個別ページ群と同階層）

### グッズ（Shop）
- `pages/shop.html` … グッズ情報トップ
- `pages/shop/category/*.html` … カテゴリ別一覧（`cap`, `towel`, `accessory`, `ouen-goods`）
- `pages/shop/items/*.html` … 商品個別ページ（`cap`, `cushion`, `megaphone`, `mini-helmet-keyholder`, `muffler-towel`, `stadium-jacket`, `sticker`, `big-sticker`）
- `pages/shop/info/*.html` … 案内ページ（`postage`, `shipping`）

### 観戦・イベント
- `pages/FanGuide.html` … 観戦ガイド（チケット購入方法、持ち物、ルール解説 など）
- `pages/event.html` … イベント情報（新歓試合、練習見学、OB 会 など）
- `pages/gallery.html` … 試合写真ギャラリー（年度別アルバム一覧）
- `pages/gallery/2026-asia.html` … 個別アルバム

### 協賛・連絡・新入生
- `pages/sponsors.html` … 協賛店一覧
- `pages/contact.html` … お問い合わせ（本番運用ページ）
- `pages/contact-new_1.html` … contact 系の別バリアント（用途は要整理／TODO 参照）
- `pages/new_student.html` … 新入生向けページ（Instagram 導線 + お知らせ一覧）

### その他
- `pages/subpage.html` … サブページの雛形・テンプレートとして同居（運用方針は要整理／TODO 参照）
- `pages/ticket.html` … 現状は `pages/news.html` への meta refresh リダイレクト（再公開時に切替予定／TODO 参照）

---

## 共通ナビゲーション仕様

サイト共通ヘッダーは以下 7 項目で構成されています。新規ページ作成時もこの順序・文言に揃えてください。

| 順 | 表示名 | リンク先 |
| -- | --- | --- |
| 01 | News | `pages/news.html` |
| 02 | Match | `pages/match.html` |
| 03 | Event | `pages/event.html` |
| 04 | Fan Guide | `pages/FanGuide.html` |
| 05 | Sponsors | `pages/sponsors.html` |
| 06 | Gallery | `pages/gallery.html` |
| 07 | Contact | `pages/contact.html` |

ナビ右側の CTA には `2026 SEASON · LIVE` を表示しています。シーズン更新時は全ページ一括更新が必要です。

---

## デザイン規約（カラー / フォント）

主要ページで使用しているデザイントークン（CSS カスタムプロパティ）の基本形:

```css
:root {
  --abyss: #06100a;        /* 最深部の黒緑 */
  --ink:   #0a1812;        /* 深緑黒 */
  --forest:#12241a;        /* 主緑 */
  --moss:  #1c3527;        /* サブ緑 */
  --sage:  #2d5043;        /* アクセント緑 */
  --gold:        #c9a747;  /* プライムゴールド */
  --gold-bright: #e8c76a;  /* ハイライト */
  --gold-deep:   #8a6f1f;  /* ディープ */
  --bone:  #ede4d0;        /* 骨色（ペーパー代替） */
  --ash:   #8d8676;        /* グレージュ */
  --blood: #8b1a1a;        /* 敗戦色 */
  --win:   #3a7a4a;        /* 勝利色 */
}
```

- 配色: **緑 × ゴールド**（背景は深緑系、強調は金）
- 勝敗表示は `--win` / `--blood` を使用
- 新規ページは `pages/subpage.html` をベースに、上記トークンと共通ナビを踏襲して作成してください

---

## データ運用

### 試合データ
- ファイル: `data/matches.json`
- 描画: `pages/match.html` ＋ `js/match.js`
- 更新方法: 手動編集（コミット後に GitHub Pages へ反映）

### 新入生向けフィード
- ファイル: `data/shinnyusei-feed.json`
- 描画: `pages/new_student.html` ＋ `js/shinnyusei-feed.js`
- 運用方針:
  - Instagram は個人アカウント運用のため API 自動取得は行いません
  - 新着投稿に合わせて JSON を手動更新します
  - 表示順は `date` 降順（新しい情報が上）

---

## JSON 検証

- ローカル検証コマンド: `node scripts/validate-shinnyusei-feed.mjs`
- CI: `.github/workflows/validate-shinnyusei-feed.yml`
- 検証内容:
  - JSON 構文
  - 必須フィールド（`date`, `url`, `title` or `caption`）の存在と形式

---

## ローカル確認手順（最低限）

1. `index.html` をブラウザで開き、ヘッダー/フッターのナビリンク（News / Match / Event / Fan Guide / Sponsors / Gallery / Contact）がすべて意図どおりに遷移することを確認
2. `pages/match.html` を開き、`data/matches.json` の試合一覧が表示されることを確認
3. `pages/team.html` および `pages/team/player/*.html` の任意ページを開き、レイアウト崩れがないことを確認
4. `pages/shop.html` → `pages/shop/category/*` → `pages/shop/items/*` の導線がつながっていることを確認
5. `pages/new_student.html` を開き、`data/shinnyusei-feed.json` の内容が新しい順で表示されることを確認
6. `node scripts/validate-shinnyusei-feed.mjs` を実行し、JSON 検証が通ることを確認

---

## セキュリティ・パフォーマンス運用メモ

- `target="_blank"` を使うリンクには `rel="noopener noreferrer"` を付与してください
- 外部リソース（CSS/JS の CDN）を読み込む際は **SRI（Subresource Integrity）** の適用を優先してください
- 画像最適化（WebP 化、適切なサイズ）と `loading="lazy"` の適用を推奨します
- 共通ナビは全ページで同一構造・同一順序を保ってください（一部ページだけリンクが欠ける事故を防ぐため）

---

## 未整備項目・TODO

### ページ運用
- [ ] `pages/ticket.html` のリダイレクト解消（コメントに「再公開時: `shop.html`」の記載あり。本番ページ復旧 or 削除を判断）
- [ ] `pages/contact-new_1.html` の取り扱いを確定（本採用・差分マージ・削除のいずれか）
- [ ] `pages/subpage.html` の位置付けをドキュメント化（雛形として残すなら `docs/` に明記）
- [ ] `pages/news/page/2.html`〜`10.html` のページネーション中身が実データに対応しているかを点検
- [ ] `pages/team/player/team.html` の役割整理（チーム一覧ページが `pages/team.html` と重複していないか）

### リンク・プレースホルダ
- [ ] ヘッダー・フッターの SNS リンクを公式 URL に置換
- [ ] `pages/shop.html` 内の「詳細を見る」リンク方針を決定（外部 EC / 個別ページ）
- [ ] 未作成ページへの仮リンクを、作成完了後に実リンクへ置換
- [ ] `href="#"` を残す必要がある箇所は、理由をコメントで明示

### アセット整理
- [ ] `image/` と `images/` の二系統運用を将来的に統一（参照箇所の棚卸しが必要）
- [ ] CSS 3 系統（`stylesheet.css` / `stylesheet-new.css` / `design-preview.css`）の役割を明文化、または統合
- [ ] `image/` 配下の日本語ファイル名アセットを ASCII 名へリネーム検討（URL エンコード事故防止）

---

## 参考ドキュメント（`docs/`）

- `docs/requirements.md` … 要件定義
- `docs/webapp-requirements.md` / `docs/webapp-requirements-google-doc.md` / `docs/webapp-requirements-google-doc-plain.txt` … Web アプリ要件（複数版）
- `docs/shinnyusei-instagram-github-pages-plan.md` … 新入生ページ運用計画
- `docs/href-placeholder-patch-plan.md` … `href="#"` 解消計画
