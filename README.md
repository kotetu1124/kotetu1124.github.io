# 東京農工大学アメリカンフットボール部 BLASTERS 公式サイト

東京農工大学アメリカンフットボール部 BLASTERS の公式 Web サイトです。  
ファン・応援者・新入生向けに、試合情報、ニュース、チーム紹介などを発信します。

## 開発時の最重要ルール

- 編集対象は **このフォルダ（`kotetu1124.github.io` 直下）** のみです
- Cursor で開くワークスペースも `kotetu1124.github.io` 直下にしてください
- 静的サイト（GitHub Pages）前提のため、サーバーサイド処理は行いません

## 技術スタック

- HTML5 / CSS3 / JavaScript（バニラ）
- Font Awesome 4.7.0（CDN）
- ホスティング: [GitHub Pages](https://pages.github.com/)

## 主なページ

- `index.html`: トップページ（部紹介、最新試合結果、次試合、監督メッセージ）
- `pages/news.html`: ニュース一覧
- `pages/match.html`: 試合状況（`data/matches.json` を読み込み）
- `pages/shop.html`: グッズ情報（チケット販売案内を含む）
- `pages/team/player/team.html`: チーム一覧
- `pages/team/player/*.html`: 選手・スタッフ個別プロフィール
- `pages/new_student.html`: 新入生向けページ（Instagram 導線 + お知らせ一覧）

## データ運用

### 試合データ

- ファイル: `data/matches.json`
- 用途: `pages/match.html` の一覧表示
- 更新方法: 手動編集（コミット後に GitHub Pages へ反映）

### 新入生向けフィード

- ファイル: `data/shinnyusei-feed.json`
- 用途: `pages/new_student.html` で読み込み
- 運用方針:
  - Instagram は個人アカウント運用のため API 自動取得は行いません
  - 新着投稿に合わせて JSON を手動更新します
  - 表示順は `date` 降順です（新しい情報が上に表示されます）

## JSON 検証

- ローカル検証コマンド: `node scripts/validate-shinnyusei-feed.mjs`
- CI: `.github/workflows/validate-shinnyusei-feed.yml`
- 検証内容:
  - JSON 構文
  - 必須フィールド（`date`, `url`, `title` or `caption`）の存在と形式

## ローカル確認手順（最低限）

1. `index.html` をブラウザで開き、ヘッダー/フッターのナビリンクが意図どおりに遷移することを確認
2. `pages/match.html` を開き、試合一覧が表示されることを確認
3. `pages/new_student.html` を開き、`data/shinnyusei-feed.json` の内容が新しい順で表示されることを確認
4. `node scripts/validate-shinnyusei-feed.mjs` を実行し、JSON 検証が通ることを確認

## セキュリティ・パフォーマンス運用メモ

- `target="_blank"` を使うリンクには `rel="noopener noreferrer"` を付与してください
- 外部リソース利用時は SRI（Subresource Integrity）の適用を優先してください
- 画像最適化（WebP, 適切なサイズ）と `loading="lazy"` の適用を推奨します

## 未実装ページの優先順位

- 高: `event.html`, `contact.html` の新規作成
- 中: 各ページ共通パーツ（ヘッダー/フッター）のリンク整合と文言統一
- 低: デザイン微調整（余白、文字サイズ、カード見た目）

## TODO（`href="#"` のプレースホルダー解消）

- [ ] ヘッダー・フッターの SNS リンクを公式 URL に置換
- [ ] `pages/shop.html` の「詳細を見る」リンク方針を決定（外部EC / 詳細ページ）
- [ ] 未作成ページへの仮リンクを、作成完了後に実リンクへ置換
- [ ] `href="#"` を残す必要がある箇所は、理由をコメントで明示

## 参考ドキュメント

- `docs/requirements.md`: 要件定義
- `docs/shinnyusei-instagram-github-pages-plan.md`: 新入生ページ運用計画
