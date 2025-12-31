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

// ========== 初始化所有彩蛋 ==========
document.addEventListener('DOMContentLoaded', () => {
    initMusicPlayer();
    initSecretEntrance();
    initSimpleEasterEgg(); // 简化的爱心雨和彩虹效果触发

    // 检查是否是生日
    const now = new Date();
    if (now.getMonth() === 0 && now.getDate() === 12) { // 1月12日
        setTimeout(triggerBirthdayEffect, 1000);
    }
});

// 导出函数供其他模块使用
window.triggerBirthdayEffect = triggerBirthdayEffect;
