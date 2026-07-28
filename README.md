# Miyagi Portfolio

个人作品集网站，基于 React、vinext 和 Cloudflare Workers 构建。

## 环境要求

- Node.js 22.13 或更高版本
- pnpm 11

## 本地运行

```bash
pnpm install
pnpm dev
```

打开终端中显示的本地地址即可预览。

## 正式构建

```bash
pnpm install --frozen-lockfile
pnpm build
```

构建产物会生成在 `dist/`，该目录由部署平台在构建时生成，不需要提交到
GitHub。

## 部署

项目使用 Cloudflare Worker 兼容的 ESM 输出，并保留
`.openai/hosting.json` 作为 Sites 部署配置。将代码推送到 GitHub 后，可将
仓库连接到支持 Node.js 22 和 Cloudflare Workers 的部署服务。

推荐构建设置：

- 安装命令：`pnpm install --frozen-lockfile`
- 构建命令：`pnpm build`
- Node.js 版本：`22`

GitHub Actions 会在每次推送和 Pull Request 时自动执行正式构建，确认提交
仍然可以部署。
