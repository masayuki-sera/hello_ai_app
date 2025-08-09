# SvelteKit プロジェクト（hello_ai_app）を GitHub Pages にデプロイする手順

## 1. プロジェクト作成

```bash
npm create svelte@latest hello_ai_app
cd hello_ai_app
npm install
```

---

## 2. `adapter-static` の導入

> GitHub Pages は静的サイト配信のため、SvelteKit を静的出力に設定する。

```bash
npm i -D @sveltejs/adapter-static
```

**`svelte.config.js` を編集：**

```js
import adapter from '@sveltejs/adapter-static';

const dev = process.env.NODE_ENV === 'development';

export default {
  kit: {
    adapter: adapter({ fallback: '404.html' }),
    paths: {
      base: dev ? '' : '/hello_ai_app' // リポジトリ名
    }
  }
};
```

---

## 3. 全ページを静的化（prerender）

**`src/routes/+layout.ts` を作成：**

```ts
export const prerender = true;
```

---

## 4. 画像やリンクのパス修正

> `static/` 内のファイルを参照する場合は `$app/paths` の `base` を使用する。

```svelte
<script lang="ts">
  import { base } from '$app/paths';
</script>

<img src={`${base}/members/akiho.avif`} alt="Akiho" />
```

- **注意**：先頭 `/` の絶対パスは使用しない（ビルド時にエラー）。
- `${base}` を先頭に付けることで本番URLに対応可能。

---

## 5. ローカルでビルド確認

```bash
npm run build
```

- `build/` フォルダが生成されればOK。

---

## 6. GitHub リポジトリへ初回 push

```bash
git init
git add .
git commit -m "init"
git branch -M main
git remote add origin https://github.com/<user>/hello_ai_app.git
git push -u origin main
```

---

## 7. GitHub Actions の設定

**フォルダ作成：**

```bash
mkdir -p .github/workflows
```

**`.github/workflows/deploy.yml` を作成：**

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ "main" ]
  workflow_dispatch:

jobs:
  build_site:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Install deps
        run: npm install

      - name: Build
        run: npm run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: build/

  deploy:
    needs: build_site
    runs-on: ubuntu-latest
    permissions:
      pages: write
      id-token: write
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy
        id: deployment
        uses: actions/deploy-pages@v4
```

---

## 8. GitHub Pages を有効化

1. GitHub のリポジトリ画面へ移動  
2. **Settings → Pages**  
3. **Source** を「GitHub Actions」に設定して保存

---

## 9. デプロイ実行

変更を push すると自動でデプロイが実行される。

```bash
git add .
git commit -m "Add GitHub Actions deploy workflow"
git push origin main
```

---

## 10. 公開URL

```
https://<user>.github.io/hello_ai_app/
```

---

## 更新時の流れ

1. ローカルでコード修正
2. 動作確認

```bash
npm run dev
```

3. コミット & push（自動デプロイ）

```bash
git add .
git commit -m "update: 内容"
git push origin main
```
