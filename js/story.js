/**
 * 故事页面交互脚本
 * 处理滚动动画、章节导航、全屏画廊等功能
 */

// 等待 DOM 加载完成
document.addEventListener('DOMContentLoaded', function () {
    initScrollAnimations();
    initChapterNavigation();
    initMenuToggle();
    initNavScroll();
    initGalleryModal(); // 新增：初始化画廊模态框
});

/**
 * 初始化滚动动画
 * 使用 Intersection Observer 检测章节是否进入视口
 */
function initScrollAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in-up');

    // 创建 Intersection Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // 如果是章节，更新导航栏名
                if (entry.target.classList.contains('chapter-text') || entry.target.closest('.chapter')) {
                    const chapter = entry.target.closest('.chapter');
                    if (chapter) updateNavChapterName(chapter);
                }

                observer.unobserve(entry.target); // 动画只播放一次
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => {
        observer.observe(el);
    });
}

/**
 * 更新导航栏章节名
 */
function updateNavChapterName(chapter) {
    const navChapterName = document.getElementById('navChapterName');
    const chapterName = chapter.getAttribute('data-chapter');

    if (navChapterName && chapterName && navChapterName.textContent !== chapterName) {
        navChapterName.style.opacity = '0';
        setTimeout(() => {
            navChapterName.textContent = chapterName;
            navChapterName.style.opacity = '0.9';
        }, 300);
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
                targetChapter.scrollIntoView({ behavior: 'smooth', block: 'start' });
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

        document.addEventListener('click', (e) => {
            if (!menuToggle.contains(e.target) && !chapterMenu.contains(e.target)) {
                chapterMenu.classList.remove('active');
            }
        });
    }
}

function closeMenu() {
    document.getElementById('chapterMenu')?.classList.remove('active');
}
window.closeMenu = closeMenu;

/**
 * 页面滚动时导航栏背景变化
 */
function initNavScroll() {
    window.addEventListener('scroll', () => {
        const nav = document.getElementById('storyNav');
        const scrollY = window.scrollY;

        if (scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
}

/**
 * =================================================
 * 全屏画廊模态框逻辑 (New Feature)
 * 支持 Live Photo 播放
 * =================================================
 */
function initGalleryModal() {
    const modal = document.getElementById('galleryModal');
    if (!modal) return;

    const modalGrid = document.getElementById('modalGalleryGrid');
    const modalTitle = document.getElementById('modalGalleryTitle');
    const closeBtn = document.getElementById('modalCloseBtn');

    // 绑定关闭事件
    const closeModal = () => {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
            modalGrid.innerHTML = ''; // 清空内容以节省内存
        }, 300);
        document.body.style.overflow = ''; // 恢复滚动
    };

    closeBtn.addEventListener('click', closeModal);

    // 点击模态框背景关闭
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.classList.contains('modal-header')) {
            closeModal();
        }
    });

    // 绑定 ESC 关闭
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // 绑定 "查看更多" 按钮
    const viewMoreBtns = document.querySelectorAll('.view-more-btn');
    viewMoreBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const chapter = btn.closest('.chapter');
            if (!chapter) return;

            const chapterTitle = chapter.getAttribute('data-chapter');
            const visiblePhotos = chapter.querySelectorAll('.photo-card img'); // 获取当前展示的图片
            const hiddenPhotos = chapter.querySelectorAll('.hidden-photos img'); // 获取隐藏的备用图片

            // 1. 设置标题
            modalTitle.textContent = chapterTitle + " - 影集";

            // 2. 清空并填充网格
            modalGrid.innerHTML = '';

            // 将所有图片/视频地址合并
            const allMediaSrcs = [];
            visiblePhotos.forEach(img => allMediaSrcs.push({
                src: img.src,
                alt: img.alt,
                type: 'image'
            }));
            hiddenPhotos.forEach(img => allMediaSrcs.push({
                src: img.dataset.src || img.src,
                alt: img.alt || '',
                type: 'image'
            }));

            // 动态生成网格项
            allMediaSrcs.forEach((media, index) => {
                const item = document.createElement('div');
                item.className = 'modal-photo-item';
                item.style.animationDelay = `${index * 0.05}s`; // 瀑布流动画延迟

                // 检查是否为Live Photo (MOV文件)
                if (window.livePhotoManager && window.livePhotoManager.isLivePhoto(media.src)) {
                    // 创建视频容器
                    const videoContainer = document.createElement('div');
                    videoContainer.className = 'modal-video-container';

                    const video = document.createElement('video');
                    video.src = media.src;
                    video.controls = true;
                    video.preload = 'metadata';
                    video.style.maxWidth = '100%';
                    video.style.maxHeight = '100%';
                    video.poster = media.src.replace('.mov', '.jpg'); // 使用同名图片作为海报

                    videoContainer.appendChild(video);
                    item.appendChild(videoContainer);
                } else {
                    // 普通图片容器 - 添加点击放大功能
                    const imgContainer = document.createElement('div');
                    imgContainer.className = 'modal-img-container';

                    const img = document.createElement('img');
                    img.src = media.src;
                    img.alt = media.alt;
                    img.loading = "lazy";
                    img.className = 'modal-gallery-img';

                    // 添加放大图标
                    const zoomIcon = document.createElement('div');
                    zoomIcon.className = 'zoom-icon';
                    zoomIcon.innerHTML = '🔍';
                    zoomIcon.title = '点击放大查看';

                    // 添加点击事件 - 放大查看
                    const handleClick = () => {
                        openImageZoomModal(media.src, media.alt, allMediaSrcs, index);
                    };

                    img.addEventListener('click', handleClick);
                    zoomIcon.addEventListener('click', handleClick);

                    imgContainer.appendChild(img);
                    imgContainer.appendChild(zoomIcon);
                    item.appendChild(imgContainer);
                }

                modalGrid.appendChild(item);
            });

            // 在图片列表底部添加“你点点？”按钮容器（对特定章节禁用）
            const disabledTeaseFor = ['chapter1', 'chapter6'];
            if (!disabledTeaseFor.includes(chapter.id)) {
                const teaseContainer = document.createElement('div');
                teaseContainer.className = 'tease-container';
                teaseContainer.style.cssText = 'width:100%; display:flex; justify-content:center; padding: 18px 0;';

                const teaseBtn = document.createElement('button');
                teaseBtn.className = 'tease-btn';
                teaseBtn.type = 'button';
                teaseBtn.textContent = '你点点？';
                teaseBtn.title = '不要乱点，但点了会有惊喜';

                teaseContainer.appendChild(teaseBtn);
                modalGrid.appendChild(teaseContainer);

                // 点击“你点点？”的行为：弹出提示，提示关闭叉触发该章节彩蛋画廊
                teaseBtn.addEventListener('click', () => {
                    showTeasePopup(chapter);
                });
            }

            // 3. 显示模态框
            modal.style.display = 'block';
            // 强制重绘
            modal.offsetHeight;
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // 禁止背景滚动
        });
    });
}

/**
 * 显示“你点点？”弹窗（简洁版）
 * 弹窗显示文本“别点了吧还是”，关闭叉点击后会打开该章节的彩蛋照片
 */
function showTeasePopup(chapterElement) {
    // 避免重复弹窗
    if (document.getElementById('teasePopup')) return;

    const popup = document.createElement('div');
    popup.id = 'teasePopup';
    popup.className = 'tease-popup';
    popup.innerHTML = `
        <div class="tease-popup-overlay"></div>
        <div class="tease-popup-card">
            <button class="tease-popup-close" aria-label="关闭并查看彩蛋">×</button>
            <div class="tease-popup-body">别点了吧还是</div>
        </div>
    `;

    document.body.appendChild(popup);

    // 绑定关闭叉：关闭并打开章节彩蛋画廊
    const closeBtn = popup.querySelector('.tease-popup-close');
    const overlay = popup.querySelector('.tease-popup-overlay');

    const cleanup = () => {
        popup.classList.remove('active');
        setTimeout(() => popup.remove(), 220);
    };

    closeBtn.addEventListener('click', () => {
        cleanup();
        openChapterEasterGallery(chapterElement);
    });

    overlay.addEventListener('click', () => {
        // 如果用户点击遮罩则只关闭弹窗，不进入彩蛋
        cleanup();
    });

    // 显示动画
    requestAnimationFrame(() => popup.classList.add('active'));
}

/**
 * 根据章节打开该章节对应的彩蛋图片集合（使用 easter-eggs.js 中的 collectEasterEggImages）
 */
function openChapterEasterGallery(chapterElement) {
    if (!window.collectEasterEggImages || !window.showCustomEasterGallery) {
        // 回退到全局彩蛋
        if (window.showEasterEggGallery) window.showEasterEggGallery();
        return;
    }

    const chapterId = chapterElement ? chapterElement.id : '';
    // 简单映射章节 id 到图片路径关键词
    const chapterMap = {
        'chapter1': 'study',
        'chapter2': 'food',
        'chapter3': 'travel',
        'chapter4': 'daily',
        'chapter5': 'couple',
        'chapter6': 'future'
    };

    const keyword = chapterMap[chapterId] || '';
    const allEggs = collectEasterEggImages();
    const filtered = allEggs.filter(img => keyword ? img.src.includes(`/${keyword}/`) : false);

    if (filtered.length === 0) {
        // 没有章节级彩蛋，提示用户
        if (window.showEasterEggMessage) window.showEasterEggMessage('该章节暂无彩蛋照片', 'info');
        return;
    }

    // 关闭当前 gallery modal（如果有）
    const galleryModal = document.getElementById('galleryModal');
    if (galleryModal && galleryModal.classList.contains('active')) {
        galleryModal.classList.remove('active');
        setTimeout(() => {
            galleryModal.style.display = 'none';
            const grid = document.getElementById('modalGalleryGrid');
            if (grid) grid.innerHTML = '';
        }, 300);
        document.body.style.overflow = '';
    }

    // 打开章节级彩蛋画廊
    const chapterTitle = chapterElement ? (chapterElement.getAttribute('data-chapter') || '章节彩蛋') : '章节彩蛋';
    window.showCustomEasterGallery(filtered, chapterTitle + ' - 彩蛋');
}
/**
 * =================================================
 * 图片放大查看模态框 (Image Zoom Modal)
 * 支持大图查看和导航
 * =================================================
 */
function openImageZoomModal(currentSrc, currentAlt, allImages, currentIndex) {
    // 如果已经存在放大模态框，先移除
    const existingZoomModal = document.getElementById('imageZoomModal');
    if (existingZoomModal) {
        existingZoomModal.remove();
    }

    // 创建放大模态框
    const zoomModal = document.createElement('div');
    zoomModal.id = 'imageZoomModal';
    zoomModal.className = 'image-zoom-modal';
    zoomModal.innerHTML = `
        <div class="zoom-modal-overlay"></div>
        <div class="zoom-modal-content">
            <div class="zoom-modal-header">
                <div class="zoom-modal-title">${currentAlt || '查看图片'}</div>
                <button class="zoom-modal-close">&times;</button>
            </div>
            <div class="zoom-modal-body">
                <button class="zoom-nav-btn zoom-nav-prev" ${currentIndex === 0 ? 'disabled' : ''}>
                    <span>‹</span>
                </button>
                <div class="zoom-image-container">
                    <img src="${currentSrc}" alt="${currentAlt || ''}" class="zoom-main-image">
                    <div class="zoom-loading">加载中...</div>
                </div>
                <button class="zoom-nav-btn zoom-nav-next" ${currentIndex === allImages.length - 1 ? 'disabled' : ''}>
                    <span>›</span>
                </button>
            </div>
            <div class="zoom-modal-footer">
                <div class="zoom-counter">${currentIndex + 1} / ${allImages.length}</div>
            </div>
        </div>
    `;

    document.body.appendChild(zoomModal);

    // 获取元素引用
    const mainImage = zoomModal.querySelector('.zoom-main-image');
    const loadingIndicator = zoomModal.querySelector('.zoom-loading');
    const closeBtn = zoomModal.querySelector('.zoom-modal-close');
    const overlay = zoomModal.querySelector('.zoom-modal-overlay');
    const prevBtn = zoomModal.querySelector('.zoom-nav-prev');
    const nextBtn = zoomModal.querySelector('.zoom-nav-next');
    const counter = zoomModal.querySelector('.zoom-counter');
    const title = zoomModal.querySelector('.zoom-modal-title');

    let currentImgIndex = currentIndex;

    // 显示模态框
    requestAnimationFrame(() => {
        zoomModal.classList.add('active');
    });

    // 图片加载完成处理
    mainImage.onload = () => {
        loadingIndicator.style.display = 'none';
        mainImage.style.opacity = '1';
    };

    mainImage.onerror = () => {
        loadingIndicator.textContent = '图片加载失败';
        loadingIndicator.style.color = '#ff6b6b';
    };

    // 关闭模态框
    const closeZoomModal = () => {
        zoomModal.classList.remove('active');
        setTimeout(() => zoomModal.remove(), 300);
        document.body.style.overflow = ''; // 恢复滚动
    };

    closeBtn.addEventListener('click', closeZoomModal);
    overlay.addEventListener('click', closeZoomModal);

    // ESC键关闭
    const escHandler = (e) => {
        if (e.key === 'Escape') {
            closeZoomModal();
            document.removeEventListener('keydown', escHandler);
        }
    };
    document.addEventListener('keydown', escHandler);

    // 导航功能
    const navigateImage = (direction) => {
        const newIndex = currentImgIndex + direction;
        if (newIndex < 0 || newIndex >= allImages.length) return;

        currentImgIndex = newIndex;
        const newImage = allImages[newIndex];

        // 更新图片
        mainImage.style.opacity = '0';
        loadingIndicator.style.display = 'block';
        loadingIndicator.textContent = '加载中...';
        loadingIndicator.style.color = '#666';

        mainImage.src = newImage.src;
        title.textContent = newImage.alt || '查看图片';
        counter.textContent = `${currentImgIndex + 1} / ${allImages.length}`;

        // 更新按钮状态
        prevBtn.disabled = currentImgIndex === 0;
        nextBtn.disabled = currentImgIndex === allImages.length - 1;
    };

    prevBtn.addEventListener('click', () => navigateImage(-1));
    nextBtn.addEventListener('click', () => navigateImage(1));

    // 键盘导航
    const keyHandler = (e) => {
        if (e.key === 'ArrowLeft') {
            navigateImage(-1);
        } else if (e.key === 'ArrowRight') {
            navigateImage(1);
        }
    };
    document.addEventListener('keydown', keyHandler);

    // 关闭时移除键盘事件监听器
    const cleanup = () => {
        document.removeEventListener('keydown', escHandler);
        document.removeEventListener('keydown', keyHandler);
    };

    closeBtn.addEventListener('click', cleanup);
    overlay.addEventListener('click', cleanup);

    // 禁止背景滚动
    document.body.style.overflow = 'hidden';
}
