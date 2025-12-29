# 🌻 PrettySun - 致我最爱的人

一个温暖浪漫的生日纪念网站，记录美好回忆，隐藏着多个惊喜彩蛋。

## ✨ 在线演示

🔗 **访问地址**: [https://forbearchen.github.io/prettysun-us/](https://forbearchen.github.io/prettysun-us/)

## 📋 功能特性

### 核心功能
- 🎂 **生日倒计时**: 实时显示到 2025年1月12日 的倒计时
- 📸 **瀑布流照片墙**: 响应式瀑布流布局展示美好回忆
- 🎨 **主题详情页**: 美食、旅行、对话、开心时刻、数字统计
- 💌 **秘密花园**: 私密的情书空间和专属相册
- 📱 **PWA 支持**: 可添加到手机主屏幕，支持离线访问

### 五个隐藏彩蛋 🎁

1. **🎵 音乐播放器**: 右下角音符图标，点击播放背景音乐
2. **🔐 秘密入口**: 页脚小点点击3次，输入密码 `sun3469220` 进入秘密花园
3. **🎂 生日特效**: 2025年1月12日访问自动触发烟花和特殊效果
4. **🎮 Konami 密码**: 键盘输入 `↑ ↑ ↓ ↓ ← → ← → B A` 触发爱心雨
5. **💌 随机情话**: 每次刷新首页显示不同的温暖情话

## 🎨 设计特色

- **暖色系配色**: 温暖橙 + 柔和黄 + 米白色的舒适配色
- **优雅字体**: 结合衬线字体和无衬线字体
- **流畅动画**: 平滑过渡、悬停效果、渐入动画
- **响应式设计**: 完美适配手机、平板和桌面设备

## 🛠️ 技术栈

- 纯原生 HTML5 + CSS3 + JavaScript
- PWA（Progressive Web App）
- Service Worker 离线缓存
- CSS Grid 瀑布流布局
- Intersection Observer 图片懒加载

## 📝 如何自定义内容

### 1. 替换照片

所有照片都使用了占位图片，你可以轻松替换：

```bash
images/
├── gallery/     # 主页瀑布流照片（12张）
├── food/        # 美食主题照片（6张）
├── travel/      # 旅行主题照片（6张）
└── daily/       # 日常照片（6张）
```

**替换步骤**：
1. 准备你的照片，建议尺寸：400-800px 宽
2. 将照片命名为 `01.jpg`, `02.jpg` ... 或使用描述性名称
3. 放入对应文件夹
4. 修改 HTML 文件中的图片路径

**示例**：
```html
<!-- 修改前 -->
<img src="https://picsum.photos/400/500?random=1" alt="美好瞬间">

<!-- 修改后 -->
<img src="images/gallery/01.jpg" alt="美好瞬间">
```

### 2. 添加背景音乐

1. 准备一个音乐文件（MP3 格式）
2. 重命名为 `song.mp3`
3. 放到 `music/` 文件夹中
4. 刷新网站，点击右下角音符图标播放

详见 [music/README.md](music/README.md)

### 3. 修改文字内容

#### 修改情话
在 `js/main.js` 中找到 `loveQuotes` 数组：
```javascript
const loveQuotes = [
    "遇见你是最美的意外 ✨",
    "余生很长，我只想和你一起走 💕",
    // ... 添加或修改你的情话
];
```

#### 修改秘密花园情书
编辑 `secret.html`，找到 `.letter-body` 部分，修改段落内容。

#### 修改统计数字
在 `detail.html` 中找到统计卡片部分：
```html
<div class="stat-number">328</div>
<div class="stat-label">一起拍的照片</div>
```

修改 `calculateDaysTogether()` 函数中的起始日期：
```javascript
const startDate = new Date('2024-01-01'); // 改为你们在一起的日期
```

### 4. 修改密码

默认密码是 `sun3469220`，如需修改：

在 `js/easter-eggs.js` 中找到：
```javascript
const SECRET_PASSWORD = 'sun3469220'; // 修改为你的密码
```

### 5. 修改生日日期

在 `js/countdown.js` 中找到：
```javascript
const TARGET_DATE = new Date('2025-01-12T00:00:00'); // 修改日期
```

## 🚀 部署指南

### 部署到 GitHub Pages

1. **Fork 或克隆此仓库**
2. **启用 GitHub Pages**：
   - 进入仓库 Settings > Pages
   - Source 选择 "GitHub Actions"
3. **自动部署**：
   - 每次推送到 `main` 分支会自动部署
   - 访问 `https://你的用户名.github.io/prettysun-us/`

### 部署到其他平台

#### Vercel
1. 导入 GitHub 仓库
2. 无需配置，直接部署
3. 自动生成域名

#### Netlify
1. 拖拽整个文件夹到 Netlify
2. 或连接 GitHub 仓库自动部署

#### 本地预览
```bash
# 使用 Python
python -m http.server 8000

# 使用 Node.js
npx http-server

# 访问 http://localhost:8000
```

## 🎁 彩蛋提示

有些彩蛋需要一点点发现的乐趣，这里给一些小提示（不完全剧透）：

1. ✅ 右下角有个小东西可以点击
2. ✅ 页脚有个小点点，多点几次试试
3. ✅ 在生日当天访问会有惊喜
4. ❓ 如果你玩过经典游戏，可能知道一个特殊的键盘操作序列...
5. ✅ 每次刷新页面都会看到不同的话

## 📱 PWA 功能

本网站支持 PWA，可以：
- 📲 添加到手机主屏幕（像 App 一样）
- 🔌 离线访问（访问过一次后）
- 🚀 快速加载
- 📱 全屏体验

**如何添加到主屏幕**：
- **iOS**: Safari 浏览器 > 分享 > 添加到主屏幕
- **Android**: Chrome 浏览器 > 菜单 > 添加到主屏幕

## 📂 项目结构

```
prettysun-us/
├── index.html              # 主页（瀑布流）
├── detail.html             # 主题详情页
├── secret.html             # 秘密花园
├── manifest.json           # PWA 配置
├── service-worker.js       # Service Worker
├── css/
│   └── style.css          # 主样式文件
├── js/
│   ├── main.js            # 主逻辑
│   ├── countdown.js       # 倒计时功能
│   └── easter-eggs.js     # 彩蛋功能
├── images/                # 照片文件夹
│   ├── gallery/           # 主页照片
│   ├── food/              # 美食主题
│   ├── travel/            # 旅行主题
│   └── daily/             # 日常照片
├── music/                 # 音乐文件夹
│   └── README.md          # 音乐添加说明
└── .github/
    └── workflows/
        └── pages.yml      # GitHub Pages 部署配置
```

## 🎯 代码说明

### 主要文件说明

- **index.html**: 首页，包含倒计时、随机情话和瀑布流照片墙
- **detail.html**: 详情页，使用 URL 参数 `?theme=xxx` 切换不同主题
- **secret.html**: 秘密花园页面，需要输入密码访问
- **style.css**: 所有样式，包含响应式设计和动画效果
- **countdown.js**: 倒计时逻辑和生日检测
- **main.js**: 瀑布流、灯箱、主题切换、随机情话
- **easter-eggs.js**: 5个彩蛋的实现代码

### 关键技术点

- 使用 CSS Grid 实现瀑布流布局
- Intersection Observer API 实现图片懒加载
- Service Worker 实现离线缓存
- 键盘事件监听实现 Konami 密码
- 触摸事件监听实现移动端手势

## 🔧 常见问题

### Q: 图片不显示？
A: 默认使用了 picsum.photos 占位图服务，需要网络连接。建议替换为本地图片。

### Q: 音乐无法播放？
A: 浏览器通常要求用户交互后才能播放音乐。确保点击了播放按钮，且音乐文件路径正确。

### Q: PWA 无法添加到主屏幕？
A: 确保使用 HTTPS 访问（GitHub Pages 自动 HTTPS），且 manifest.json 和 service-worker.js 路径正确。

### Q: 生日特效不触发？
A: 需要在 2025年1月12日 当天访问才会触发。可以临时修改系统日期测试。

### Q: 如何修改配色？
A: 在 `css/style.css` 开头的 `:root` 中修改 CSS 变量值。

## 💝 使用建议

1. **尽早准备照片**: 照片是网站的灵魂，选择有纪念意义的照片
2. **个性化文字**: 修改情书和情话为你自己的表达
3. **测试彩蛋**: 确保所有彩蛋都能正常触发
4. **提前部署**: 在生日前几天部署好，避免临时出问题
5. **分享链接**: 可以制作二维码，更方便分享

## 📄 许可证

MIT License - 可以自由使用、修改和分享

## 💌 最后的话

这个项目是用爱制作的礼物模板，希望它能帮助你为心爱的人创造一个特别的惊喜。

记住，最重要的不是技术有多炫酷，而是你的心意。真诚的情感和用心的准备才是最好的礼物。

祝你们幸福快乐！💕

---

**如果觉得这个项目有帮助，欢迎 Star ⭐**

有问题或建议？欢迎提 Issue 或 Pull Request！
