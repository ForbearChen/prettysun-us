/**
 * 彩蛋功能集合
 * 包含5个隐藏彩蛋的实现
 */

// ========== 彩蛋1: 音乐播放器 🎵 ==========
function initMusicPlayer() {
    const musicToggle = document.getElementById('musicToggle');
    const bgMusic = document.getElementById('bgMusic');

    if (!musicToggle || !bgMusic) return;

    let isPlaying = false;

    musicToggle.addEventListener('click', () => {
        if (isPlaying) {
            bgMusic.pause();
            musicToggle.classList.remove('playing');
            musicToggle.querySelector('.music-icon').textContent = '🎵';
        } else {
            // 尝试播放音乐
            const playPromise = bgMusic.play();

            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        musicToggle.classList.add('playing');
                        musicToggle.querySelector('.music-icon').textContent = '🎶';
                        isPlaying = true;
                    })
                    .catch(error => {
                        console.log('音乐播放失败:', error);
                        // 如果音乐文件不存在，显示提示
                        showMusicHint();
                    });
            }
        }

        isPlaying = !isPlaying;
    });

    // 检查音乐文件是否存在
    bgMusic.addEventListener('error', () => {
        console.log('音乐文件未找到');
    });
}

/**
 * 显示音乐添加提示
 */
function showMusicHint() {
    const hint = document.createElement('div');
    hint.className = 'easter-message active';
    hint.innerHTML = `
        <h2>🎵 音乐播放器</h2>
        <p>将你喜欢的音乐文件命名为 <code>song.mp3</code></p>
        <p>放到 <code>music</code> 文件夹中即可播放</p>
        <p style="font-size: 0.9em; margin-top: 10px; opacity: 0.7;">
            支持格式：MP3, WAV, OGG
        </p>
    `;
    document.body.appendChild(hint);

    setTimeout(() => {
        hint.classList.remove('active');
        setTimeout(() => hint.remove(), 300);
    }, 4000);
}

// ========== 彩蛋2: 秘密入口 🔐 ==========
let secretClickCount = 0;
let secretClickTimer = null;
const SECRET_PASSWORD = 'sun3469220';

function initSecretEntrance() {
    const secretDot = document.getElementById('secretDot');
    const passwordModal = document.getElementById('passwordModal');
    const passwordInput = document.getElementById('passwordInput');
    const submitPassword = document.getElementById('submitPassword');
    const modalClose = document.getElementById('modalClose');
    const passwordError = document.getElementById('passwordError');

    if (!secretDot || !passwordModal) return;

    // 点击秘密点
    secretDot.addEventListener('click', () => {
        secretClickCount++;

        // 清除之前的计时器
        if (secretClickTimer) {
            clearTimeout(secretClickTimer);
        }

        // 3秒内点击3次触发
        if (secretClickCount >= 3) {
            secretClickCount = 0;
            openPasswordModal();
        } else {
            // 3秒后重置计数
            secretClickTimer = setTimeout(() => {
                secretClickCount = 0;
            }, 3000);
        }
    });

    // 关闭模态框
    if (modalClose) {
        modalClose.addEventListener('click', closePasswordModal);
    }

    // 点击背景关闭
    passwordModal.addEventListener('click', (e) => {
        if (e.target === passwordModal) {
            closePasswordModal();
        }
    });

    // 提交密码
    if (submitPassword) {
        submitPassword.addEventListener('click', checkPassword);
    }

    // 回车提交
    if (passwordInput) {
        passwordInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                checkPassword();
            }
        });
    }

    function openPasswordModal() {
        passwordModal.classList.add('active');
        if (passwordInput) {
            passwordInput.value = '';
            passwordInput.focus();
        }
        if (passwordError) {
            passwordError.textContent = '';
        }
    }

    function closePasswordModal() {
        passwordModal.classList.remove('active');
    }

    function checkPassword() {
        const password = passwordInput ? passwordInput.value : '';

        if (password === SECRET_PASSWORD) {
            // 密码正确，跳转到秘密页面
            passwordError.textContent = '✓ 密码正确！正在进入...';
            passwordError.style.color = '#4CAF50';

            setTimeout(() => {
                window.location.href = 'secret.html';
            }, 1000);
        } else {
            // 密码错误
            passwordError.textContent = '密码不对哦，再想想～ 💭';
            passwordError.style.color = '#FF6B6B';

            // 抖动效果
            passwordInput.style.animation = 'shake 0.5s';
            setTimeout(() => {
                if (passwordInput) {
                    passwordInput.style.animation = '';
                }
            }, 500);
        }
    }
}

// 添加抖动动画
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
`;
document.head.appendChild(style);

// ========== 彩蛋3: 生日特效 🎂 ==========
let birthdayEffectTriggered = false;

function triggerBirthdayEffect() {
    if (birthdayEffectTriggered) return;
    birthdayEffectTriggered = true;

    // 改变页面配色为喜庆样式
    document.body.style.background = 'linear-gradient(135deg, #FFE5E5 0%, #FFD4D4 50%, #FFC4C4 100%)';

    // 显示生日祝福弹窗
    showBirthdayMessage();

    // 触发烟花效果
    startFireworks();

    // 播放气球动画
    createBalloons();
}

/**
 * 显示生日祝福消息
 */
function showBirthdayMessage() {
    const message = document.createElement('div');
    message.className = 'easter-message active';
    message.style.background = 'linear-gradient(135deg, #FFE5E5, #FFF0F0)';
    message.style.border = '3px solid #FF6B6B';
    message.innerHTML = `
        <h2 style="font-size: 2rem; margin-bottom: 1rem;">
            🎂 生日快乐！ 🎂
        </h2>
        <p style="font-size: 1.2rem; margin: 1rem 0;">
            愿你今天特别快乐！
        </p>
        <p style="font-size: 1rem; color: #FF6B6B;">
            ✨ 愿所有美好如期而至 ✨
        </p>
    `;
    document.body.appendChild(message);

    setTimeout(() => {
        message.classList.remove('active');
        setTimeout(() => message.remove(), 300);
    }, 5000);
}

/**
 * 烟花效果
 */
function startFireworks() {
    const container = document.getElementById('birthdayEffect');
    if (!container) return;

    const emojis = ['🎆', '🎇', '✨', '🎉', '🎊', '🎈', '🎁'];

    function createFirework() {
        const firework = document.createElement('div');
        firework.className = 'firework';
        firework.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        firework.style.left = Math.random() * 100 + '%';
        firework.style.top = Math.random() * 100 + '%';
        container.appendChild(firework);

        setTimeout(() => firework.remove(), 2000);
    }

    // 持续30秒的烟花
    let count = 0;
    const interval = setInterval(() => {
        createFirework();
        count++;
        if (count > 60) {
            clearInterval(interval);
        }
    }, 500);
}

/**
 * 气球动画
 */
function createBalloons() {
    const container = document.getElementById('birthdayEffect');
    if (!container) return;

    const balloons = ['🎈', '🎈', '🎈', '🎈', '🎈'];

    balloons.forEach((balloon, index) => {
        setTimeout(() => {
            const el = document.createElement('div');
            el.textContent = balloon;
            el.style.position = 'fixed';
            el.style.fontSize = '3rem';
            el.style.left = (20 + index * 15) + '%';
            el.style.bottom = '-50px';
            el.style.transition = 'bottom 3s ease-out';
            el.style.zIndex = '1500';
            container.appendChild(el);

            setTimeout(() => {
                el.style.bottom = '110vh';
            }, 100);

            setTimeout(() => el.remove(), 3500);
        }, index * 300);
    });
}

// ========== 彩蛋4: 爱心雨和彩虹效果 💖🌈 ==========
// 简化触发方式：
// - PC端：快速双击页面任意位置
// - 移动端：双指同时触摸屏幕1秒以上

let lastClickTime = 0;
let doubleClickTriggered = false;

/**
 * 初始化简单彩蛋触发 - PC端双击
 */
function initSimpleEasterEgg() {
    // PC端：双击触发
    document.addEventListener('dblclick', (e) => {
        // 避免在输入框等元素上触发
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'BUTTON') {
            return;
        }

        triggerLoveEffect();
    });

    // 移动端：双指长按触发
    initMobileLoveEffect();
}

/**
 * 移动端双指触摸检测
 */
function initMobileLoveEffect() {
    let touchStartTime = 0;
    let twoFingerTouch = false;
    let touchTimer = null;

    document.addEventListener('touchstart', (e) => {
        // 检测是否是双指触摸
        if (e.touches.length === 2) {
            twoFingerTouch = true;
            touchStartTime = Date.now();

            // 设置1秒计时器
            touchTimer = setTimeout(() => {
                if (twoFingerTouch) {
                    triggerLoveEffect();

                    // 显示提示
                    const hint = document.createElement('div');
                    hint.className = 'easter-message active';
                    hint.style.background = 'linear-gradient(135deg, #FFE5F0, #FFF0FA)';
                    hint.innerHTML = `
                        <p style="font-size: 1.2rem;">🎉 触发成功！</p>
                    `;
                    document.body.appendChild(hint);

                    setTimeout(() => {
                        hint.classList.remove('active');
                        setTimeout(() => hint.remove(), 300);
                    }, 1500);
                }
            }, 1000);
        }
    });

    document.addEventListener('touchend', (e) => {
        if (touchTimer) {
            clearTimeout(touchTimer);
        }
        twoFingerTouch = false;
    });

    document.addEventListener('touchcancel', (e) => {
        if (touchTimer) {
            clearTimeout(touchTimer);
        }
        twoFingerTouch = false;
    });
}

/**
 * 触发爱心雨和彩虹效果
 */
function triggerLoveEffect() {
    // 显示提示消息
    showLoveMessage();

    // 爱心雨效果
    createHeartRain();

    // 彩虹渐变特效
    applyRainbowEffect();
}

/**
 * 显示爱心彩蛋消息
 */
function showLoveMessage() {
    const message = document.createElement('div');
    message.className = 'easter-message active';
    message.style.background = 'linear-gradient(135deg, #FFE5F0, #FFF0FA)';
    message.innerHTML = `
        <h2>💖 你发现了隐藏的小秘密！</h2>
        <p style="font-size: 1.2rem; margin: 1rem 0;">
            爱心雨和彩虹特效 ✨
        </p>
        <p style="font-size: 0.9rem; opacity: 0.8;">
            ${isMobileDevice() ? '双指长按触发' : '双击页面触发'}
        </p>
    `;
    document.body.appendChild(message);

    setTimeout(() => {
        message.classList.remove('active');
        setTimeout(() => message.remove(), 300);
    }, 3000);
}

/**
 * 检测是否是移动设备
 */
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

/**
 * 爱心雨效果
 */
function createHeartRain() {
    const hearts = ['❤️', '💕', '💖', '💗', '💝', '💞', '💓', '💗'];

    for (let i = 0; i < 40; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'heart-rain';
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.left = Math.random() * 100 + '%';
            heart.style.fontSize = (Math.random() * 25 + 25) + 'px';
            heart.style.position = 'fixed';
            heart.style.top = '-50px';
            heart.style.zIndex = '2000';
            heart.style.animation = 'heartFall 3s linear forwards';
            heart.style.opacity = '0.9';

            // 添加随机旋转
            const rotation = Math.random() * 360;
            heart.style.transform = `rotate(${rotation}deg)`;

            document.body.appendChild(heart);

            setTimeout(() => heart.remove(), 3500);
        }, i * 80);
    }

    // 添加爱心下落动画
    if (!document.getElementById('heartFallStyle')) {
        const style = document.createElement('style');
        style.id = 'heartFallStyle';
        style.textContent = `
            @keyframes heartFall {
                0% {
                    top: -50px;
                    opacity: 0.9;
                }
                100% {
                    top: 110vh;
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

/**
 * 彩虹渐变效果
 */
function applyRainbowEffect() {
    const originalBg = document.body.style.background;

    const rainbowGradient = 'linear-gradient(45deg, #FF6B6B, #FFD166, #06FFA5, #00D4FF, #A66BFF, #FF6B9D)';
    document.body.style.background = rainbowGradient;
    document.body.style.backgroundSize = '400% 400%';
    document.body.style.animation = 'rainbowMove 3s ease infinite';

    // 添加彩虹动画
    if (!document.getElementById('rainbowStyle')) {
        const style = document.createElement('style');
        style.id = 'rainbowStyle';
        style.textContent = `
            @keyframes rainbowMove {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
            }
        `;
        document.head.appendChild(style);
    }

    // 6秒后恢复原背景
    setTimeout(() => {
        document.body.style.background = originalBg;
        document.body.style.animation = '';
    }, 6000);
}

// ========== 彩蛋5: 彩蛋照片查看器 📸 ==========
/**
 * 彩蛋照片查看器
 * 触发方式：
 * - 键盘快捷键: Ctrl + Shift + E
 * - 或在页脚点击"未完待续..." 3次
 */
let easterEggClicks = 0;
let easterEggTimeout;

function initEasterEggViewer() {
    // 键盘快捷键触发
    document.addEventListener('keydown', (e) => {
        // Ctrl + Shift + E
        if (e.ctrlKey && e.shiftKey && e.key === 'E') {
            e.preventDefault();
            showEasterEggGallery();
        }
    });

    // 页脚点击触发 (点击3次)
    const footerText = document.querySelector('.footer-text');
    if (footerText) {
        footerText.addEventListener('click', () => {
            easterEggClicks++;

            if (easterEggClicks === 1) {
                // 第一次点击显示提示
                showEasterEggHint();
            }

            clearTimeout(easterEggTimeout);
            easterEggTimeout = setTimeout(() => {
                easterEggClicks = 0;
            }, 2000); // 2秒内完成3次点击

            if (easterEggClicks >= 3) {
                easterEggClicks = 0;
                showEasterEggGallery();
            }
        });
    }

    // 添加隐藏的彩蛋触发按钮 (开发模式)
    if (window.location.search.includes('debug=1')) {
        addDebugEasterEggButton();
    }
}

/**
 * 显示彩蛋触发提示
 */
function showEasterEggHint() {
    const hint = document.createElement('div');
    hint.className = 'easter-egg-hint';
    hint.innerHTML = `
        <div style="position: fixed; top: 20px; right: 20px; background: rgba(0,0,0,0.8); color: white; padding: 10px 15px; border-radius: 20px; font-size: 14px; z-index: 10000; animation: fadeIn 0.3s;">
            💡 继续点击发现彩蛋...
        </div>
    `;

    document.body.appendChild(hint);

    setTimeout(() => {
        if (hint.parentNode) {
            hint.remove();
        }
    }, 3000);
}

/**
 * 显示彩蛋照片画廊
 */
function showEasterEggGallery() {
    // 收集所有easter-eggs文件夹中的图片
    const easterEggImages = collectEasterEggImages();

    if (easterEggImages.length === 0) {
        showEasterEggMessage('🎭 彩蛋照片还未准备好哦~', 'info');
        return;
    }

    // 创建模态框
    const modal = document.createElement('div');
    modal.className = 'easter-egg-modal';
    modal.innerHTML = `
        <div class="easter-egg-overlay"></div>
        <div class="easter-egg-content">
            <div class="easter-egg-header">
                <h2>🎭 隐藏的彩蛋照片</h2>
                <button class="easter-egg-close">&times;</button>
            </div>
            <div class="easter-egg-description">
                这些是日常生活中的趣事和搞笑瞬间 💕
            </div>
            <div class="easter-egg-grid">
                ${easterEggImages.map((img, index) => `
                    <div class="easter-egg-item" style="animation-delay: ${index * 0.1}s">
                        <img src="${img.src}" alt="${img.alt}" loading="lazy">
                        <div class="easter-egg-caption">${img.caption}</div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // 动画显示
    requestAnimationFrame(() => {
        modal.classList.add('active');
    });

    // 绑定事件
    const closeBtn = modal.querySelector('.easter-egg-close');
    const overlay = modal.querySelector('.easter-egg-overlay');

    const closeModal = () => {
        modal.classList.remove('active');
        setTimeout(() => modal.remove(), 300);
    };

    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);

    // ESC键关闭
    const escHandler = (e) => {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', escHandler);
        }
    };
    document.addEventListener('keydown', escHandler);

    // 显示成功消息
    showEasterEggMessage(`🎉 发现 ${easterEggImages.length} 张彩蛋照片！`, 'success');
}

/**
 * 显示自定义图片画廊（可从外部传入图片列表）
 * images: [{src, alt, caption}, ...]
 */
function showCustomEasterGallery(images, title = '彩蛋相册') {
    if (!Array.isArray(images) || images.length === 0) {
        showEasterEggMessage('🎭 该章节暂无彩蛋照片', 'info');
        return;
    }

    const modal = document.createElement('div');
    modal.className = 'easter-egg-modal';
    modal.innerHTML = `
        <div class="easter-egg-overlay"></div>
        <div class="easter-egg-content">
            <div class="easter-egg-header">
                <h2>🎭 ${title}</h2>
                <button class="easter-egg-close">&times;</button>
            </div>
            <div class="easter-egg-description">
                这些是该章节的隐藏彩蛋 💕
            </div>
            <div class="easter-egg-grid">
                ${images.map((img, index) => `
                    <div class="easter-egg-item" style="animation-delay: ${index * 0.06}s">
                        <img src="${img.src}" alt="${img.alt || ''}" loading="lazy">
                        <div class="easter-egg-caption">${img.caption || ''}</div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    requestAnimationFrame(() => modal.classList.add('active'));

    const closeBtn = modal.querySelector('.easter-egg-close');
    const overlay = modal.querySelector('.easter-egg-overlay');

    const closeModal = () => {
        modal.classList.remove('active');
        setTimeout(() => modal.remove(), 300);
    };

    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);

    const escHandler = (e) => {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', escHandler);
        }
    };
    document.addEventListener('keydown', escHandler);

    // 为每张图片添加点击放大处理（如果 story.js 中定义了 openImageZoomModal，则复用）
    const thumbImgs = modal.querySelectorAll('.easter-egg-item img');
    const allForZoom = images.map(img => ({ src: img.src, alt: img.alt || '' }));
    thumbImgs.forEach((imgEl, idx) => {
        imgEl.style.cursor = 'zoom-in';
        imgEl.addEventListener('click', (e) => {
            e.preventDefault();
            if (window.openImageZoomModal && typeof window.openImageZoomModal === 'function') {
                // 打开 story.js 中的放大模态框，传入图片数组和索引
                window.openImageZoomModal(allForZoom[idx].src, allForZoom[idx].alt, allForZoom, idx);
            } else {
                // 回退：在新标签中打开大图
                window.open(allForZoom[idx].src, '_blank');
            }
        });
    });

    showEasterEggMessage(`🎉 发现 ${images.length} 张彩蛋照片！`, 'success');
}

// 导出以便其他脚本调用
window.showCustomEasterGallery = showCustomEasterGallery;
// 将收集函数导出为全局，以便外部脚本（story.js）调用并按章节过滤
window.collectEasterEggImages = collectEasterEggImages;
/**
 * 收集所有easter-eggs文件夹中的图片
 */
function collectEasterEggImages() {
    // 根据实际的easter-eggs文件夹内容来收集图片
    const allImages = [
        // Food彩蛋
        { src: 'images/food/easter-eggs/2019_08_04_fafa_01.jpg', alt: '家人美食趣事', caption: '厨艺大作战' },

        // Travel彩蛋
        { src: 'images/travel/easter-eggs/2024_08_05_xian_03.jpg', alt: '旅行趣闻', caption: '路上的惊喜' },
        { src: 'images/travel/easter-eggs/2025_04_16_xian_03.jpg', alt: '旅行趣闻', caption: '风景之外的故事' },

        // Daily彩蛋 (大量图片)
        { src: 'images/daily/easter-eggs/2019_07_17_shangqiu_01.jpg', alt: '日常生活趣事', caption: '商丘小记' },
        { src: 'images/daily/easter-eggs/2019_08_01_fan_01.jpg', alt: '日常生活趣事', caption: '粉丝趣事' },
        { src: 'images/daily/easter-eggs/2019_08_04_shangqiu_01.jpg', alt: '日常生活趣事', caption: '商丘见闻' },
        { src: 'images/daily/easter-eggs/2019_09_01_body_01.jpg', alt: '日常生活趣事', caption: '有趣瞬间' },
        { src: 'images/daily/easter-eggs/2019_09_01_body_02.PNG', alt: '日常生活趣事', caption: '搞笑时刻' },
        { src: 'images/daily/easter-eggs/2019_09_01_body_03.JPG', alt: '日常生活趣事', caption: '生活乐趣' },
        { src: 'images/daily/easter-eggs/2019_09_01_body_04.JPG', alt: '日常生活趣事', caption: '开心一刻' },
        { src: 'images/daily/easter-eggs/2019_09_01_body_05.JPG', alt: '日常生活趣事', caption: '欢乐时光' },
        { src: 'images/daily/easter-eggs/2019_09_01_body_06.JPG', alt: '日常生活趣事', caption: '有趣见闻' },
        { src: 'images/daily/easter-eggs/2019_09_01_body_07.JPG', alt: '日常生活趣事', caption: '生活花絮' },
        { src: 'images/daily/easter-eggs/2019_12_19_body_02.jpg', alt: '日常生活趣事', caption: '节日乐事' },
        { src: 'images/daily/easter-eggs/2019_12_19_body_07.jpg', alt: '日常生活趣事', caption: '开心节日' },
        { src: 'images/daily/easter-eggs/2019_12_23_body_01.jpg', alt: '日常生活趣事', caption: '圣诞趣事' },
        { src: 'images/daily/easter-eggs/2019_12_23_body_02.jpg', alt: '日常生活趣事', caption: '节日快乐' },
        { src: 'images/daily/easter-eggs/2019_12_25_body_02.jpg', alt: '日常生活趣事', caption: '圣诞祝福' },
        { src: 'images/daily/easter-eggs/2020_01_01_weixin_01.PNG', alt: '日常生活趣事', caption: '新年快乐' },
        { src: 'images/daily/easter-eggs/2020_01_04_body_02.jpg', alt: '日常生活趣事', caption: '新年趣事' },
        { src: 'images/daily/easter-eggs/2020_03_23_weixin_01.PNG', alt: '日常生活趣事', caption: '春日问候' },
        { src: 'images/daily/easter-eggs/2020_09_24_weixin_01.PNG', alt: '日常生活趣事', caption: '中秋祝福' },
        { src: 'images/daily/easter-eggs/2020_12_30_body_01.jpg', alt: '日常生活趣事', caption: '跨年快乐' },
        { src: 'images/daily/easter-eggs/2020_12_30_body_02.jpg', alt: '日常生活趣事', caption: '新年将至' },
        { src: 'images/daily/easter-eggs/2021_01_25_body_02.jpg', alt: '日常生活趣事', caption: '春节乐事' },
        { src: 'images/daily/easter-eggs/2022_07_06_body_02.jpg', alt: '日常生活趣事', caption: '夏日趣闻' },
        { src: 'images/daily/easter-eggs/2022_07_28_body_02.jpg', alt: '日常生活趣事', caption: '欢乐时光' },
        { src: 'images/daily/easter-eggs/2023_01_30_body_02.jpg', alt: '日常生活趣事', caption: '春节趣事' },
        { src: 'images/daily/easter-eggs/2023_01_31_body_02.jpg', alt: '日常生活趣事', caption: '新春快乐' },
        { src: 'images/daily/easter-eggs/2023_07_26_body_02.jpg', alt: '日常生活趣事', caption: '夏日见闻' },
        { src: 'images/daily/easter-eggs/2023_08_02_body_02.jpg', alt: '日常生活趣事', caption: '欢乐假期' },
        { src: 'images/daily/easter-eggs/2023_08_07_weixin_01.PNG', alt: '日常生活趣事', caption: '节日祝福' },
        { src: 'images/daily/easter-eggs/2023_10_08_weixin_01.PNG', alt: '日常生活趣事', caption: '国庆快乐' },
        { src: 'images/daily/easter-eggs/2024_02_20_body_02.jpg', alt: '日常生活趣事', caption: '春节乐事' },
        { src: 'images/daily/easter-eggs/2025_08_11_body_02.jpg', alt: '日常生活趣事', caption: '夏日趣事' },

        // Couple彩蛋
        { src: 'images/couple/easter-eggs/2019_06_25_zhengzhou_01.mov', alt: '情侣趣事', caption: '郑州之行' },
        { src: 'images/couple/easter-eggs/2019_08_22_xian_01.mov', alt: '情侣趣事', caption: '西安Live Photo' },
        { src: 'images/couple/easter-eggs/2020_12_12_xian_02.jpg', alt: '情侣趣事', caption: '温馨时刻' }
    ];

    return allImages;
}

/**
 * 显示彩蛋消息
 */
function showEasterEggMessage(message, type = 'info') {
    const existingMessage = document.querySelector('.easter-egg-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    const messageEl = document.createElement('div');
    messageEl.className = `easter-egg-message ${type}`;
    messageEl.textContent = message;

    document.body.appendChild(messageEl);

    setTimeout(() => {
        messageEl.classList.add('show');
    }, 100);

    setTimeout(() => {
        messageEl.classList.remove('show');
        setTimeout(() => messageEl.remove(), 300);
    }, 3000);
}

/**
 * 添加调试彩蛋按钮
 */
function addDebugEasterEggButton() {
    const button = document.createElement('button');
    button.textContent = '🎭 彩蛋';
    button.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 20px;
        z-index: 10000;
        padding: 10px 15px;
        background: rgba(255, 107, 129, 0.9);
        color: white;
        border: none;
        border-radius: 20px;
        font-size: 12px;
        cursor: pointer;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    `;

    button.addEventListener('click', showEasterEggGallery);
    document.body.appendChild(button);
}

// ========== 每章节的彩蛋按钮 ==========
function initChapterEasterButtons() {
    const chapters = document.querySelectorAll('.chapter');
    if (!chapters || chapters.length === 0) return;

    chapters.forEach(chapter => {
        const viewMoreBtn = chapter.querySelector('.view-more-btn');
        const viewMoreContainer = chapter.querySelector('.view-more-container') || (viewMoreBtn ? viewMoreBtn.parentElement : null);
        if (!viewMoreBtn || !viewMoreContainer) return;

        // 对特定章节禁用章节级彩蛋按钮
        const disabledChapters = ['chapter1', 'chapter6'];
        if (disabledChapters.includes(chapter.id)) {
            return;
        }

        // 创建章节级彩蛋按钮
        const btn = document.createElement('button');
        btn.className = 'chapter-easter-btn';
        btn.type = 'button';
        btn.title = '查看该章节的彩蛋照片';
        btn.innerHTML = '🎭 彩蛋';

        btn.addEventListener('click', (e) => {
            e.preventDefault();
            // 轻提示然后打开该章节的查看更多（复用现有画廊逻辑）
            showEasterEggHint();
            setTimeout(() => {
                viewMoreBtn.click();
            }, 250);
        });

        // 将按钮放到查看更多旁边，样式由 CSS 控制
        viewMoreContainer.appendChild(btn);
    });
}

// ========== 初始化所有彩蛋 ==========
document.addEventListener('DOMContentLoaded', () => {
    initMusicPlayer();
    initSecretEntrance();
    initSimpleEasterEgg(); // 简化的爱心雨和彩虹效果触发

    // 新增：彩蛋照片查看器
    initEasterEggViewer();

    // 新增：按章节显示彩蛋按钮（放在各章节的查看更多旁）
    initChapterEasterButtons();

    // 检查是否是生日
    const now = new Date();
    if (now.getMonth() === 0 && now.getDate() === 12) { // 1月12日
        setTimeout(triggerBirthdayEffect, 1000);
    }
});

// 导出函数供其他模块使用
window.triggerBirthdayEffect = triggerBirthdayEffect;
