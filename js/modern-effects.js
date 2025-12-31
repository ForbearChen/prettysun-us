/**
 * 现代交互效果 - 滚动动画、视差效果、微交互
 * iPhone 14 Pro 优化
 */

// ========== 1. 滚动显示动画 ==========
class ScrollReveal {
    constructor() {
        this.elements = document.querySelectorAll('.fade-in-up, .slide-in-left, .slide-in-right');
        this.init();
    }

    init() {
        // 使用 Intersection Observer API - 性能更好
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // 一次性动画，观察后即停止
                    observer.unobserve(entry.target);
                }
            });
        }, options);

        this.elements.forEach(el => {
            observer.observe(el);
        });
    }
}

// ========== 2. 视差滚动效果 ==========
class ParallaxEffect {
    constructor() {
        this.parallaxElements = document.querySelectorAll('.parallax');
        this.init();
    }

    init() {
        if (this.parallaxElements.length === 0) return;

        // 使用 requestAnimationFrame 优化性能
        let ticking = false;

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    this.updateParallax();
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }

    updateParallax() {
        const scrolled = window.pageYOffset;

        this.parallaxElements.forEach(el => {
            const speed = el.dataset.speed || 0.5;
            const yPos = -(scrolled * speed);
            el.style.transform = `translateY(${yPos}px)`;
        });
    }
}

// ========== 3. 磁性按钮效果 ==========
class MagneticButton {
    constructor(selector) {
        this.buttons = document.querySelectorAll(selector);
        this.init();
    }

    init() {
        this.buttons.forEach(button => {
            button.addEventListener('mousemove', (e) => {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                button.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
            });

            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translate(0, 0)';
            });
        });
    }
}

// ========== 4. 数字滚动动画 ==========
class CountUp {
    constructor(element, target, duration = 2000) {
        this.element = element;
        this.target = target;
        this.duration = duration;
        this.startValue = 0;
    }

    start() {
        const startTime = performance.now();

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / this.duration, 1);

            // 缓动函数
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(this.startValue + (this.target - this.startValue) * easeOutQuart);

            this.element.textContent = current;

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                this.element.textContent = this.target;
            }
        };

        requestAnimationFrame(animate);
    }
}

// ========== 5. 触摸涟漪效果 ==========
class RippleEffect {
    constructor(selector) {
        this.elements = document.querySelectorAll(selector);
        this.init();
    }

    init() {
        this.elements.forEach(el => {
            el.addEventListener('click', (e) => {
                this.createRipple(e, el);
            });
        });
    }

    createRipple(event, element) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        element.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
}

// ========== 6. 平滑滚动到元素 ==========
function smoothScrollTo(target, duration = 1000) {
    const targetElement = document.querySelector(target);
    if (!targetElement) return;

    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const startTime = performance.now();

    function animation(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // 缓动函数
        const easeInOutCubic = progress < 0.5
            ? 4 * progress * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 3) / 2;

        window.scrollTo(0, startPosition + distance * easeInOutCubic);

        if (progress < 1) {
            requestAnimationFrame(animation);
        }
    }

    requestAnimationFrame(animation);
}

// ========== 7. 卡片3D倾斜效果 ==========
class Card3DTilt {
    constructor(selector) {
        this.cards = document.querySelectorAll(selector);
        this.init();
    }

    init() {
        this.cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                this.handleTilt(e, card);
            });

            card.addEventListener('mouseleave', () => {
                this.resetTilt(card);
            });
        });
    }

    handleTilt(e, card) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    }

    resetTilt(card) {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    }
}

// ========== 8. 懒加载图片 ==========
class LazyLoadImages {
    constructor() {
        this.images = document.querySelectorAll('img[data-src]');
        this.init();
    }

    init() {
        const options = {
            threshold: 0,
            rootMargin: '50px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        }, options);

        this.images.forEach(img => observer.observe(img));
    }
}

// ========== 9. 触觉反馈 (iPhone) ==========
function hapticFeedback(type = 'light') {
    if ('vibrate' in navigator) {
        const patterns = {
            light: [10],
            medium: [20],
            heavy: [30],
            success: [10, 50, 10],
            error: [20, 100, 20]
        };
        navigator.vibrate(patterns[type] || patterns.light);
    }
}

// ========== 10. 性能监控 ==========
class PerformanceMonitor {
    constructor() {
        this.fps = 0;
        this.lastTime = performance.now();
        this.frames = 0;
    }

    start() {
        this.measure();
    }

    measure() {
        const currentTime = performance.now();
        this.frames++;

        if (currentTime >= this.lastTime + 1000) {
            this.fps = Math.round((this.frames * 1000) / (currentTime - this.lastTime));
            this.frames = 0;
            this.lastTime = currentTime;

            // 如果FPS低于30，禁用一些动画
            if (this.fps < 30) {
                document.body.classList.add('low-performance');
            } else {
                document.body.classList.remove('low-performance');
            }
        }

        requestAnimationFrame(() => this.measure());
    }
}

// ========== 初始化所有效果 ==========
document.addEventListener('DOMContentLoaded', () => {
    // 滚动显示动画
    new ScrollReveal();

    // 视差效果
    new ParallaxEffect();

    // 磁性按钮（仅桌面端）
    if (window.innerWidth > 768) {
        new MagneticButton('.modern-button, .cta-button');
    }

    // 涟漪效果
    new RippleEffect('.interactive-element, .glass-card');

    // 3D卡片倾斜（仅桌面端）
    if (window.innerWidth > 768) {
        new Card3DTilt('.glass-card');
    }

    // 懒加载图片
    new LazyLoadImages();

    // 数字动画
    const statsNumbers = document.querySelectorAll('.stat-number, .countdown-value');
    statsNumbers.forEach(el => {
        const target = parseInt(el.textContent) || 0;
        if (target > 0) {
            const counter = new CountUp(el, target);

            // 使用 Intersection Observer 触发
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        counter.start();
                        observer.unobserve(entry.target);
                    }
                });
            });

            observer.observe(el);
        }
    });

    // 性能监控（开发环境）
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        const monitor = new PerformanceMonitor();
        monitor.start();
    }

    // 页面加载动画
    document.body.classList.add('page-load-animation');

    // 添加触摸反馈类
    const touchElements = document.querySelectorAll('button, a, .interactive-element');
    touchElements.forEach(el => {
        el.classList.add('touch-feedback');

        // 添加触觉反馈
        el.addEventListener('click', () => {
            hapticFeedback('light');
        });
    });
});

// ========== 导出工具函数 ==========
window.modernEffects = {
    smoothScrollTo,
    hapticFeedback,
    CountUp,
    RippleEffect,
    Card3DTilt
};
