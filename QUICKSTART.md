# Quickstart

30 秒跑起来。

## 仅前端（mock 数据）

```bash
npm install
npm run dev
```

打开 http://localhost:3000，导航栏边框为黄色表示使用 mock 数据。

## 前端 + 后端（真实数据）

```bash
# 终端 1 — 启动后端

# 终端 2 — 启动前端
npm install
npm run dev
```

打开 http://localhost:3000，导航栏边框恢复默认色表示已接入真实数据。

## 连接远程后端

```bash
cp .env.example .env.local
```

编辑 `.env.local`：

```
NEXT_PUBLIC_API_URL=https://your-api-host.com
```

然后 `npm run dev` 或 `npm run build && npm run start`。
