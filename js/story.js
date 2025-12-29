/**
 * 故事页面交互脚本
 * 处理滚动动画、章节导航等功能
 */

// 等待 DOM 加载完成
document.addEventListener('DOMContentLoaded', function() {
    initScrollAnimations();
    initChapterNavigation();
    initMenuToggle();
    initNavScroll();
});

/**
 * 初始化滚动动画
 * 使用 Intersection Observer 检测章节是否进入视口
 */
function initScrollAnimations() {
    const chapters = document.querySelectorAll('.chapter');
    
    // 创建 Intersection Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // 当章节15%可见时触发
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 章节进入视口，添加 visible 类
                entry.target.classList.add('visible');
                
                // 更新导航栏章节名
                updateNavChapterName(entry.target);
            }
        });
    }, observerOptions);
    
    // 观察所有章节
    chapters.forEach(chapter => {
        observer.observe(chapter);
    });
}

/**
 * 更新导航栏章节名
 */
function updateNavChapterName(chapter) {
    const navChapterName = document.getElementById('navChapterName');
    const chapterName = chapter.getAttribute('data-chapter');
    
    if (navChapterName && chapterName) {
        navChapterName.textContent = chapterName;
        
        // 添加淡入动画
        navChapterName.style.opacity = '0';
        setTimeout(() => {
            navChapterName.style.transition = 'opacity 0.3s ease';
            navChapterName.style.opacity = '0.8';
        }, 100);
    }
}

/**
 * 初始化章节导航
 * 点击导航链接平滑滚动到对应章节
 */
function initChapterNavigation() {
    const chapterLinks = document.querySelectorAll('.chapter-menu-item');
    
    chapterLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetChapter = document.querySelector(targetId);
            
            if (targetChapter) {
                // 平滑滚动到目标章节
                targetChapter.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // 关闭菜单
                closeMenu();
            }
        });
    });
}

/**
 * 初始化菜单切换
 */
function initMenuToggle() {
    const menuToggle = document.getElementById('navMenuToggle');
    const chapterMenu = document.getElementById('chapterMenu');
    
    if (menuToggle && chapterMenu) {
        menuToggle.addEventListener('click', () => {
            chapterMenu.classList.toggle('active');
        });
        
        // 点击菜单外部关闭菜单
        document.addEventListener('click', (e) => {
            if (!menuToggle.contains(e.target) && !chapterMenu.contains(e.target)) {
                chapterMenu.classList.remove('active');
            }
        });
    }
}

/**
 * 关闭章节菜单
 */
function closeMenu() {
    const chapterMenu = document.getElementById('chapterMenu');
    if (chapterMenu) {
        chapterMenu.classList.remove('active');
    }
}

// 导出函数供全局使用
window.closeMenu = closeMenu;

/**
 * 页面滚动时导航栏背景变化
 */
function initNavScroll() {
    window.addEventListener('scroll', () => {
        const nav = document.getElementById('storyNav');
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            nav.style.background = 'rgba(255, 255, 255, 0.98)';
            nav.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
        } else {
            nav.style.background = 'rgba(255, 255, 255, 0.95)';
            nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });
}
