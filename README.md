# 我的技术Wiki 📚

一个基于 Next.js 的个人技术知识库，用于记录和分享技术笔记。

## ✨ 特性

- 📝 **Markdown支持** - 使用Markdown编写技术文章
- 🔍 **全文搜索** - 快速找到需要的内容
- 🏷️ **标签系统** - 按技术栈分类管理文章
- 📱 **响应式设计** - 完美适配各种设备
- ⚡ **静态生成** - 快速加载，SEO友好
- 🎨 **现代UI** - 基于Tailwind CSS的美观界面

## 🚀 快速开始

### 安装依赖
```bash
npm install
```

### 开发模式
```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看你的Wiki。

### 构建生产版本
```bash
npm run build
npm start
```

## 📝 添加文章

1. 在 `content/` 目录下创建 `.md` 文件
2. 添加Front Matter元数据：

```markdown
---
title: "文章标题"
date: "2024-01-01"
excerpt: "文章摘要"
tags: ["JavaScript", "React"]
---

# 文章内容

这里是你的Markdown内容...
```

3. 保存文件，文章会自动出现在首页

## 📁 项目结构

```
├── src/
│   ├── app/                 # Next.js App Router
│   ├── components/          # React组件
│   └── lib/                 # 工具函数
├── content/                 # Markdown文章
├── public/                  # 静态资源
└── package.json
```

## 🛠️ 技术栈

- **框架**: Next.js 14
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **内容**: Markdown + Gray Matter
- **部署**: Vercel (推荐)

## 🚢 部署

### Vercel (推荐)
1. 将代码推送到GitHub
2. 在 [Vercel](https://vercel.com) 导入项目
3. 自动部署完成

### 其他平台
- **Netlify**: 支持静态站点部署
- **GitHub Pages**: 需要配置GitHub Actions
- **自托管**: 使用Docker或PM2

## 📚 示例文章

项目包含了几篇示例文章：
- JavaScript基础知识总结
- React Hooks完全指南  
- TypeScript实用技巧集合

你可以参考这些文章的格式来编写自己的技术笔记。

## 🎨 自定义

### 修改主题
编辑 `src/app/globals.css` 和 `tailwind.config.js` 来自定义样式。

### 添加功能
- 评论系统 (Giscus, Disqus)
- 文章阅读统计
- RSS订阅
- 深色模式

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件。

## 🤝 贡献

欢迎提交Issue和Pull Request！

---

**开始记录你的技术成长之路吧！** 🚀