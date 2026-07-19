# 🌈 可爱性格测试

一个简单有趣的性格测试网页应用，通过10个问题帮你发现自己的MBTI性格类型！

## ✨ 特色功能

- 🎨 **可爱设计**: 彩色渐变背景，浮动动画元素，现代圆角卡片设计
- 🎯 **互动体验**: 丰富的按钮动画，点击波纹效果，平滑页面切换
- 📱 **响应式**: 完美适配手机、平板和桌面设备
- 🧠 **科学测试**: 基于MBTI理论的16种性格类型测试
- ⚡ **流畅动画**: 打字机效果，弹跳动画，渐入效果
- 📤 **分享功能**: 支持分享测试结果到社交媒体

## 🚀 如何使用

### 静态预览

1. 直接在浏览器中打开 `index.html` 文件
2. 点击"开始测试"按钮
3. 回答10个问题（分两页，每页5个问题）
4. 查看你的性格类型结果
5. 可以分享结果或重新测试

### Cloudflare Worker 部署

生产环境由 `worker.js` 作为 Cloudflare Worker 入口提供。安装 Wrangler 后运行：

```bash
npx wrangler deploy
```

静态 `index.html` 仅用于本地预览；Worker 部署使用 `worker.js` 中嵌入的应用内容。

## 📁 文件结构

```
personalityQuiz/
├── index.html      # 主页面文件
├── styles.css      # 样式和动画
├── script.js       # 测试逻辑和交互
├── public/         # Cloudflare Worker 之外的静态资源副本
├── worker.js       # Cloudflare Worker 部署入口
├── wrangler.toml   # Cloudflare Worker 配置
├── deploy.md       # 部署说明
├── package-lock.json
└── README.md       # 说明文档
```

## 🎭 性格类型

测试基于MBTI理论，包含16种性格类型：

- **分析家**: 建筑师(INTJ)、逻辑学家(INTP)、指挥官(ENTJ)、辩论家(ENTP)
- **外交家**: 提倡者(INFJ)、调解者(INFP)、主人公(ENFJ)、竞选者(ENFP)
- **守护者**: 物流师(ISTJ)、守护者(ISFJ)、总经理(ESTJ)、执政官(ESFJ)
- **探险家**: 鉴赏家(ISTP)、探险家(ISFP)、企业家(ESTP)、娱乐家(ESFP)

## 🛠 技术特点

- 纯前端页面可直接在浏览器打开；线上部署版通过 `worker.js` 托管在 Cloudflare Workers
- 使用现代CSS3动画和渐变
- 响应式设计，移动设备友好
- 应用运行时无第三方依赖；部署工具使用 Wrangler（见 `deploy.md`）
- 支持键盘导航和无障碍访问

## 🎨 设计亮点

- 彩虹渐变配色方案
- 可爱的emoji图标
- 流畅的页面切换动画
- 互动性强的按钮效果
- 温馨的卡片式布局

享受你的性格探索之旅！🌟
