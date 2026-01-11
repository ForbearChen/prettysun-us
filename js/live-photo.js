/**
 * Live Photo 支持
 * 支持 MOV 格式的动态照片播放
 */

class LivePhotoManager {
    constructor() {
        this.videoCache = new Map(); // 缓存已加载的视频
        this.init();
    }

    init() {
        this.setupVideoElements();
        this.addLivePhotoSupport();
    }

    // 设置视频元素样式
    setupVideoElements() {
        const style = document.createElement('style');
        style.textContent = `
            .live-photo-video {
                width: 100%;
                height: 100%;
                object-fit: cover;
                border-radius: inherit;
                display: none;
                position: absolute;
                top: 0;
                left: 0;
            }

            .live-photo-container {
                position: relative;
                cursor: pointer;
            }

            .live-photo-container.playing .live-photo-video {
                display: block;
            }

            .live-photo-container.playing img {
                display: none;
            }

            .live-photo-indicator {
                position: absolute;
                bottom: 8px;
                right: 8px;
                background: rgba(0, 0, 0, 0.7);
                color: white;
                padding: 4px 8px;
                border-radius: 12px;
                font-size: 0.75rem;
                opacity: 0.8;
                pointer-events: none;
                backdrop-filter: blur(4px);
            }

            .live-photo-play-btn {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: rgba(255, 255, 255, 0.9);
                border: none;
                border-radius: 50%;
                width: 48px;
                height: 48px;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                opacity: 0;
                transition: all 0.3s ease;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
            }

            .live-photo-container:hover .live-photo-play-btn {
                opacity: 1;
                transform: translate(-50%, -50%) scale(1.1);
            }

            .live-photo-play-btn:active {
                transform: translate(-50%, -50%) scale(0.95);
            }

            /* 模态框中的视频样式 */
            .modal-video-container {
                position: relative;
                width: 100%;
                height: 100%;
                background: #000;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .modal-video-container video {
                max-width: 100%;
                max-height: 100%;
                object-fit: contain;
            }

            .video-controls {
                position: absolute;
                bottom: 20px;
                left: 50%;
                transform: translateX(-50%);
                display: flex;
                gap: 10px;
                opacity: 0;
                transition: opacity 0.3s ease;
            }

            .modal-video-container:hover .video-controls {
                opacity: 1;
            }

            .video-control-btn {
                background: rgba(0, 0, 0, 0.7);
                color: white;
                border: none;
                padding: 8px 12px;
                border-radius: 20px;
                cursor: pointer;
                font-size: 0.9rem;
                backdrop-filter: blur(4px);
            }

            .video-control-btn:hover {
                background: rgba(0, 0, 0, 0.9);
            }
        `;
        document.head.appendChild(style);
    }

    // 检查文件是否为Live Photo (MOV格式)
    isLivePhoto(filename) {
        return filename.toLowerCase().endsWith('.mov');
    }

    // 转换MOV文件路径为视频路径
    getVideoPath(imagePath) {
        // 如果是图片路径，将其转换为对应的视频路径
        if (imagePath.includes('/images/')) {
            // 将图片路径转换为视频路径 (假设MOV文件与图片同名)
            return imagePath.replace(/\.(jpg|jpeg|png)$/i, '.mov');
        }
        return imagePath.replace(/\.(jpg|jpeg|png)$/i, '.mov');
    }

    // 为图片添加Live Photo功能
    addLivePhotoSupport() {
        // 查找所有图片元素
        const images = document.querySelectorAll('img');

        images.forEach(img => {
            const src = img.src || img.dataset.src;
            if (!src) return;

            // 检查是否是Live Photo
            if (this.isLivePhoto(src)) {
                this.convertToLivePhoto(img, src);
            } else {
                // 检查是否有对应的MOV文件
                const videoPath = this.getVideoPath(src);
                this.checkForLivePhoto(img, videoPath);
            }
        });
    }

    // 检查是否有对应的Live Photo文件
    async checkForLivePhoto(img, videoPath) {
        try {
            const response = await fetch(videoPath, { method: 'HEAD' });
            if (response.ok) {
                // 存在对应的MOV文件，转换为Live Photo
                this.convertToLivePhoto(img, videoPath);
            }
        } catch (error) {
            // 没有对应的MOV文件，继续作为普通图片
        }
    }

    // 将图片转换为Live Photo
    convertToLivePhoto(img, videoPath) {
        const container = img.parentElement;
        if (!container) return;

        // 添加Live Photo样式类
        container.classList.add('live-photo-container');

        // 创建视频元素
        const video = document.createElement('video');
        video.className = 'live-photo-video';
        video.src = videoPath;
        video.muted = true;
        video.playsInline = true;
        video.preload = 'metadata';

        // 创建播放按钮
        const playBtn = document.createElement('button');
        playBtn.className = 'live-photo-play-btn';
        playBtn.innerHTML = '▶️';
        playBtn.title = '播放Live Photo';

        // 创建Live Photo指示器
        const indicator = document.createElement('div');
        indicator.className = 'live-photo-indicator';
        indicator.textContent = 'LIVE';

        // 添加到容器
        container.appendChild(video);
        container.appendChild(playBtn);
        container.appendChild(indicator);

        // 绑定事件
        this.bindLivePhotoEvents(container, video, playBtn);

        // 缓存视频元素
        this.videoCache.set(videoPath, video);
    }

    // 绑定Live Photo事件
    bindLivePhotoEvents(container, video, playBtn) {
        let isPlaying = false;

        // 播放按钮点击事件
        playBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.playLivePhoto(container, video);
        });

        // 容器点击事件（移动端）
        container.addEventListener('click', (e) => {
            if (e.target === container || e.target === container.querySelector('img')) {
                this.playLivePhoto(container, video);
            }
        });

        // 视频播放结束事件
        video.addEventListener('ended', () => {
            this.stopLivePhoto(container, video);
        });

        // 视频错误处理
        video.addEventListener('error', (e) => {
            console.warn('Live Photo 加载失败:', e);
            container.classList.remove('live-photo-container');
            container.classList.add('live-photo-error');
        });

        // 鼠标悬停自动播放（桌面端）
        if (!this.isMobile()) {
            container.addEventListener('mouseenter', () => {
                this.playLivePhoto(container, video);
            });

            container.addEventListener('mouseleave', () => {
                this.stopLivePhoto(container, video);
            });
        }
    }

    // 播放Live Photo
    playLivePhoto(container, video) {
        container.classList.add('playing');
        video.currentTime = 0;
        video.play().catch(e => {
            console.warn('Live Photo 播放失败:', e);
        });
    }

    // 停止Live Photo
    stopLivePhoto(container, video) {
        container.classList.remove('playing');
        video.pause();
        video.currentTime = 0;
    }

    // 检查是否为移动设备
    isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    // 为模态框添加视频支持
    enhanceModalForVideo() {
        const modalGrid = document.getElementById('modalGalleryGrid');
        if (!modalGrid) return;

        // 监听模态框内容变化
        const observer = new MutationObserver(() => {
            const modalItems = modalGrid.querySelectorAll('.modal-photo-item');
            modalItems.forEach(item => {
                const img = item.querySelector('img');
                if (img && this.isLivePhoto(img.src)) {
                    this.convertModalItemToVideo(item, img.src);
                }
            });
        });

        observer.observe(modalGrid, { childList: true, subtree: true });
    }

    // 将模态框项目转换为视频
    convertModalItemToVideo(item, videoSrc) {
        // 移除图片
        const img = item.querySelector('img');
        if (img) img.remove();

        // 创建视频容器
        const videoContainer = document.createElement('div');
        videoContainer.className = 'modal-video-container';

        const video = document.createElement('video');
        video.src = videoSrc;
        video.controls = true;
        video.preload = 'metadata';
        video.style.maxWidth = '100%';
        video.style.maxHeight = '100%';

        // 创建控制按钮
        const controls = document.createElement('div');
        controls.className = 'video-controls';

        const playBtn = document.createElement('button');
        playBtn.className = 'video-control-btn';
        playBtn.textContent = '播放';
        playBtn.onclick = () => video.play();

        const pauseBtn = document.createElement('button');
        pauseBtn.className = 'video-control-btn';
        pauseBtn.textContent = '暂停';
        pauseBtn.onclick = () => video.pause();

        const restartBtn = document.createElement('button');
        restartBtn.className = 'video-control-btn';
        restartBtn.textContent = '重播';
        restartBtn.onclick = () => {
            video.currentTime = 0;
            video.play();
        };

        controls.appendChild(playBtn);
        controls.appendChild(pauseBtn);
        controls.appendChild(restartBtn);

        videoContainer.appendChild(video);
        videoContainer.appendChild(controls);

        item.appendChild(videoContainer);
    }

    // 获取Live Photo统计信息
    getLivePhotoStats() {
        const livePhotos = document.querySelectorAll('.live-photo-container');
        return {
            total: livePhotos.length,
            loaded: livePhotos.length - document.querySelectorAll('.live-photo-error').length
        };
    }
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    window.livePhotoManager = new LivePhotoManager();
});
