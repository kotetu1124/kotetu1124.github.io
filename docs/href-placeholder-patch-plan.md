# `href="#"` 解消パッチ計画（用途別・ファイル群別）

## 1) 進め方（段階的）

- Step 1: 共通パーツ（`to-top` / `sns-icon` / `footer-link`）を全ページで統一置換
- Step 2: `pages/news.html` の記事・ページネーション・カテゴリ・アーカイブの仮リンク方針を適用
- Step 3: `pages/shop.html` の「詳細を見る」「カテゴリ」「ご利用案内」の仮リンク方針を適用
- Step 4: 例示/検証用ページ（`pages/subpage.html`, `design-preview.html`）を本番対象から分離または無効化
- Step 5: `README.md` / `docs/requirements.md` のサンプル `href="#"` はコード例として明示

## 2) 用途別の置換方針

### A. ページトップ導線（`a.to-top`）

- 置換: `href="#"` -> `href="#top"`
- 追加: 各HTMLの先頭に `id="top"` を1箇所付与（例: `<body id="top">`）
- 理由: `#` のみだと意図が曖昧。`#top` に統一すると意味が明確で保守しやすい

### B. SNS（`.sns-icon.instagram` / `.sns-icon.x` / `.sns-icon.youtube`）

- 置換先は公式URLに統一
- URL未確定の間は `href` を変えず、暫定で `aria-disabled="true"` + コメントで理由を残す
- 外部リンク化する場合は `target="_blank" rel="noopener noreferrer"` を付与

### C. フッター導線（`.footer-link`）

- 「寄付はこちら」: 決定済みURLがあれば即置換
- 「よくある質問」: `pages/faq.html` 作成までは `pages/contact.html` へ暫定誘導、またはリンク無効化
- 無効化時は `href` を残さず、`<span class="footer-link is-disabled">` への変更を優先

### D. ニュース一覧（`pages/news.html`）

- 記事タイトル: `pages/news/slug.html` 形式へ（未作成なら `#` 維持禁止、`span` 化）
- ページネーション: `news.html?page=2` などのクエリ方式か、`news/page/2.html` の静的分割かを選択
- カテゴリ/アーカイブ: フィルタ機能未実装なら `href` ではなくボタン化し、JSで段階実装

### E. ショップ（`pages/shop.html`）

- 「詳細を見る」: 外部EC or 商品詳細ページのどちらかに統一
- 未決定の場合: クリック可能リンクを廃止し `button` + `disabled` 表現へ
- カテゴリ/ご利用案内: 実体ページが無い間は遷移リンクを置かない

## 3) ファイル群ごとの一括置換案（Applyしやすい単位）

## Group-1: 共通パーツ（最優先）

対象:

- `index.html`
- `pages/match.html`
- `pages/new_student.html`
- `pages/news.html`
- `pages/shop.html`
- `pages/team/player/team.html`
- `pages/team/player/*.html`（個別プロフィール群）

機械置換候補（安全性高）:

1. `a.to-top` の `href="#"` -> `href="#top"`
2. `.sns-icon.instagram` の `href="#"` -> `href="__INSTAGRAM_URL__"`
3. `.sns-icon.x` の `href="#"` -> `href="__X_URL__"`
4. `.sns-icon.youtube` の `href="#"` -> `href="__YOUTUBE_URL__"`

注意:

- 相対パスではなく外部URL前提
- 置換時に `target="_blank" rel="noopener noreferrer"` を同時付与

## Group-2: `pages/news.html`（機能方針確定後）

対象要素:

- `.news-title a`
- `.pagination .page-link`
- `.category-list a`
- `.archive-list a`

候補:

- 記事リンク: `pages/news/2024-season-opener.html` のような実ページへ
- ページネーション: 方式決定まで `a` -> `button` へ置換
- カテゴリ/アーカイブ: 実装まで `a` -> `button` へ置換

## Group-3: `pages/shop.html`（機能方針確定後）

対象要素:

- `.shop-card-button`
- `.sidebar-list a`

候補:

- 商品詳細未作成の場合はリンク撤去（`button` + 非活性）
- 「お問い合わせ」は `pages/contact.html` への誘導を優先

## Group-4: サンプル/検証用（本番分離）

対象:

- `pages/subpage.html`
- `design-preview.html`

対応:

- 本番公開対象外なら `href="#"` 置換の優先度を下げる
- 公開するなら Group-1 と同じ規約へ寄せる

## 4) 具体パッチ例（最初の1ステップ）

以下は「共通パーツのみ先行反映」の最小パッチ方針:

1. 全対象ファイルで `to-top` を `#top` へ統一
2. 各ファイルの先頭要素に `id="top"` を追加
3. SNS 3リンクに外部URLと `rel` を付与

プレースホルダー:

- `__INSTAGRAM_URL__`
- `__X_URL__`
- `__YOUTUBE_URL__`

## 5) セキュリティ・パフォーマンス観点

- `href="#"` の残置は誤操作・不要リロード・アクセシビリティ低下の要因
- 外部リンクは `rel="noopener noreferrer"` を必須化（`target="_blank"` 併用時）
- 将来の置換漏れ防止として、CIに `href="#"` 検出（許可ファイルのみ除外）を追加推奨

## 6) 合意が必要な未確定事項

- SNSの公式URL（Instagram / X / YouTube）
- 寄付導線の最終URL
- FAQの実体（`pages/faq.html` 新規作成 or `contact.html` 誘導）
- ニュースのページネーション方式（クエリ or 静的分割）
- ショップ詳細の遷移先（外部EC or 静的詳細ページ）
