/**
 * 主要逻辑文件
 * 处理瀑布流、图片灯箱、主题跳转、爱心粒子动画等功能
 */

// 等待 DOM 加载完成
document.addEventListener('DOMContentLoaded', function() {
    initLightbox();
    initThemeCards();
    initPhotoItems();
    initHeartParticles();
});

/**
 * 初始化爱心粒子动画
 */
function initHeartParticles() {
    const container = document.getElementById('heartParticles');
    if (!container) return;
    
    // 创建单个爱心粒子
    function createHeartParticle() {
        const heart = document.createElement('div');
        heart.className = 'heart-particle';
        
        // 随机选择爱心样式（不同颜色和大小）
        const hearts = ['❤️', '💕', '💗', '💖', '💝'];
        const colors = ['#FF6B6B', '#FF8C8C', '#FFB5B5', '#FFA0A0', '#FF9999'];
        
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        
        // 随机位置和大小
        heart.style.left = Math.random() * 100 + '%';
        heart.style.fontSize = (Math.random() * 15 + 10) + 'px'; // 10-25px
        heart.style.opacity = Math.random() * 0.5 + 0.3; // 0.3-0.8
        
        // 随机漂移距离
        const drift = (Math.random() - 0.5) * 100; // -50 to 50
        heart.style.setProperty('--drift', drift + 'px');
        
        // 随机动画持续时间
        const duration = Math.random() * 4 + 5; // 5-9秒
        heart.style.animationDuration = duration + 's';
        
        container.appendChild(heart);
        
        // 动画结束后移除元素
        setTimeout(() => {
            heart.remove();
        }, duration * 1000);
    }
    
    // 持续创建爱心粒子
    setInterval(createHeartParticle, 400); // 每400毫秒创建一个
    
    // 页面加载时创建一些初始爱心
    for (let i = 0; i < 8; i++) {
        setTimeout(createHeartParticle, i * 100);
    }
}

/**
 * 平滑滚动到瀑布流区域
 */
function scrollToGallery() {
    const gallerySection = document.getElementById('gallerySection');
    if (gallerySection) {
        gallerySection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

/**
 * 初始化图片灯箱功能
 */
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxClose = document.getElementById('lightboxClose');
    
    if (!lightbox || !lightboxImg || !lightboxClose) return;
    
    // 关闭灯箱
    lightboxClose.addEventListener('click', () => {
        lightbox.classList.remove('active');
    });
    
    // 点击背景关闭
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
        }
    });
    
    // ESC 键关闭
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            lightbox.classList.remove('active');
        }
    });
}

/**
 * 打开图片灯箱
 * @param {string} imgSrc 图片源地址
 */
function openLightbox(imgSrc) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    
    if (lightbox && lightboxImg) {
        lightboxImg.src = imgSrc;
        lightbox.classList.add('active');
    }
}

/**
 * 初始化主题卡片点击事件
 */
function initThemeCards() {
    const themeCards = document.querySelectorAll('.theme-card');
    
    themeCards.forEach(card => {
        card.addEventListener('click', () => {
            const theme = card.getAttribute('data-theme');
            if (theme) {
                // 跳转到详情页，带上主题参数
                window.location.href = `detail.html?theme=${theme}`;
            }
        });
    });
}

/**
 * 初始化照片项点击事件
 */
function initPhotoItems() {
    const photoItems = document.querySelectorAll('.photo-item');
    
    photoItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            if (img) {
                openLightbox(img.src);
            }
        });
    });
}

/**
 * 随机情话列表 (彩蛋5)
 */
const loveQuotes = [
    "遇见你是最美的意外 ✨",
    "余生很长，我只想和你一起走 💕",
    "你是我的小太阳，温暖我的每一天 🌻",
    "世界很大，我只想和你一起看 🌍",
    "有你在的地方，就是家 🏠",
    "你的笑容，是我最爱的风景 😊",
    "感谢时光，让我遇见了你 ⏰",
    "和你在一起的每一天，都是最好的一天 📅",
    "你是我的小确幸，也是我的大幸运 🍀",
    "爱你，是我做过最对的决定 ❤️",
    "想把世界上最好的都给你 🎁",
    "你在我身边，什么都变得有意义了 🌟",
    "陪你走过四季，看遍风景 🍂",
    "你的快乐，就是我的快乐 😄",
    "未来可期，因为有你 🌈",
    "简单的生活，因为有你而不简单 💫",
    "每天醒来第一个想到的人是你 🌅",
    "想和你一起慢慢变老 👴👵",
    "你是我心里最柔软的地方 💗",
    "爱你，从未改变 💝"
];

/**
 * 显示随机情话
 */
function showRandomLoveQuote() {
    const quoteElement = document.getElementById('loveQuote');
    if (quoteElement) {
        const randomIndex = Math.floor(Math.random() * loveQuotes.length);
        quoteElement.textContent = loveQuotes[randomIndex];
    }
}

// 页面加载时显示随机情话
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', showRandomLoveQuote);
} else {
    showRandomLoveQuote();
}

/**
 * 懒加载图片
 */
function lazyLoadImages() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

// 初始化懒加载
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', lazyLoadImages);
} else {
    lazyLoadImages();
}

/**
 * 瀑布流布局优化（可选）
 * 如果需要更复杂的瀑布流效果，可以在这里添加
 */
function optimizeWaterfall() {
    // 使用 CSS Grid 已经可以实现基本的瀑布流效果
    // 这里保留函数以便将来扩展
    console.log('Waterfall layout initialized');
}

// 窗口大小改变时重新计算布局
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(optimizeWaterfall, 250);
});

// 导出函数供全局使用
window.scrollToGallery = scrollToGallery;
window.openLightbox = openLightbox;
