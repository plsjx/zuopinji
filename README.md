# Miyagi Portfolio

基于 React 和 Vite 构建的静态个人作品集网站，可直接部署到 Cloudflare
Pages、Netlify、Vercel 或其他静态托管平台。

## 本地运行

环境要求：Node.js 22.13 或更高版本、pnpm 11。

```bash
pnpm install
pnpm dev
```

## 正式构建

```bash
pnpm install --frozen-lockfile
pnpm build
```

构建后的静态文件位于 `dist/`。

## Cloudflare Pages

连接 GitHub 仓库后使用以下设置：

- 框架预设：`React (Vite)`
- 构建命令：`pnpm build`
- 构建输出目录：`dist`
- 根目录：留空

每次推送到 `main` 分支后，Cloudflare Pages 会自动重新构建并发布。
