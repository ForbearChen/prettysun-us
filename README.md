# � PrettySun (PrettySun-US)

> 为最爱的人打造的专属浪漫纪念网站 💕
> A romantic anniversary website crafted for your loved one.

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

## ✨ 项目简介

这不仅是一个网站，更是一份凝聚了时光与爱意的礼物。这个项目专为记录情侣间的甜蜜时光而设计，采用最新的 Web 技术，打造出极致流畅、视觉惊艳的交互体验。

项目的核心围绕"陪伴"与"记忆"，通过现代化的设计语言（Glassmorphism 玻璃态、流体渐变、微交互）呈现出温暖而高级的视觉效果。

## 🎨 核心特性

### 1. 极致视觉体验

- **玻璃态设计 (Glassmorphism)**: 全局采用高斯模糊与半透明层叠，营造通透的高级感。
- **现代化配色**: 精心调配的暖粉紫渐变色系 (#FF6B9D → #A66BFF)，摒弃了传统的冷色调，充满浪漫气息。
- **流体动效背景**: 动态流转的色彩球体，为页面增添梦幻氛围。

### 2. 沉浸式交互

- **21+ 微交互动画**: 包括磁性按钮、3D 卡片倾斜、数字滚动、心跳特效等。
- **iPhone 14 Pro 适配**: 针对移动端进行了像素级优化，支持触觉反馈 (Haptic Feedback) 和流体排版。
- **彩蛋系统**:
  - PC端：双击屏幕触发"爱心雨"与"彩虹特效"。
  - 移动端：双指长按屏幕触发相同的惊喜。
- **平滑滚动与视差效果**: 浏览体验如丝般顺滑。

### 3. 数据可视化记忆

- **恋爱日历热力图**: 仿 GitHub 提交记录的风格，记录从 **2018年** 至今的每一个甜蜜日子。
  - *智能逻辑*：2018年自动隐藏前6个月（恋爱开始前），只展示属于我们的真正时光。
- **时光计数器**: 实时计算"我们已经在一起"的日夜，秒级更新。
- **倒计时**: 自动计算下一个生日或纪念日的剩余时间。

## 🛠️ 技术栈

本项目坚持使用**原生技术**以保证最佳性能和可定制性，无需繁重的构建工具即可运行。

- **HTML5**: 语义化标签，SEO 友好。
- **CSS3 (Vanilla)**:
  - 大量使用 CSS Variables 实现动态主题。
  - `backdrop-filter` 实现真实的毛玻璃效果。
  - 关键帧动画 (`@keyframes`) 实现复杂动效。
- **JavaScript (Vanilla)**:
  - ES6+ 语法。
  - `Intersection Observer` 实现高性能滚动侦测。
  - 模块化封装 `modernEffects` 库。

## 🚀 快速开始

### 本地运行

由于使用了 ES Modules 和一些现代浏览器特性，建议通过本地服务器运行以获得最佳体验（直接打开 html 文件可能会受到浏览器安全策略限制）。

1. **克隆项目**

   ```bash
   git clone https://github.com/your-username/prettysun-us.git
   ```

2. **启动服务**
   如果你安装了 Node.js / Python / VS Code:

   - **VS Code**: 安装 "Live Server" 插件 -> 在 `index.html` 上右键 -> "Open with Live Server"。
   - **Python**:

     ```bash
     python -m http.server 8000
     ```

   - **Node.js (http-server)**:

     ```bash
     npx http-server
     ```

3. **访问**: 打开浏览器访问 `http://localhost:8000` (或对应端口)。

## ⚙️ 个性化配置

所有的关键数据和配置都已提取，您可以轻松修改：

### 修改日期与文案

- **恋爱起始日**: 搜索 `LOVE_START_DATE` 修改日期。
- **生日倒计时**: 搜索 `targetDate` 或在 JS 中找到倒计时逻辑进行调整。
- **日历数据**: 热力图数据目前是模拟生成的，您可以对接真实数据源。

### 修改样式

- **主题色**: 打开 `css/modern-enhancements.css`，修改 `:root` 下的 `--primary-gradient` 等变量。
- **动画速度**: 在 `css/animations.css` 中调整动画机制。

## 📱 移动端优化

- 支持 PWA (做好 meta 标签适配)。
- 针对 iOS Safari 做了安全区域 (`safe-area-inset`) 适配。
- 触摸反馈 (`touch-action`, 振动 API) 已启用。

---

> "爱是漫长的旅程，每一天都值得被记录。"
> Made with ❤️ for You.
