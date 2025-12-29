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

// ========== 彩蛋4: Konami 密码 🎮 ==========
const KONAMI_CODE = [
    'ArrowUp', 'ArrowUp', 
    'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 
    'ArrowLeft', 'ArrowRight',
    'b', 'a'
];
let konamiProgress = 0;

function initKonamiCode() {
    document.addEventListener('keydown', (e) => {
        const key = e.key;
        
        // 检查是否匹配当前应该按的键
        if (key.toLowerCase() === KONAMI_CODE[konamiProgress].toLowerCase()) {
            konamiProgress++;
            
            // 完成整个序列
            if (konamiProgress === KONAMI_CODE.length) {
                triggerKonamiEffect();
                konamiProgress = 0;
            }
        } else {
            // 重置进度
            konamiProgress = 0;
        }
    });
}

/**
 * 移动端触摸手势检测
 */
function initMobileKonami() {
    let touchStartX = 0;
    let touchStartY = 0;
    let swipeSequence = [];
    const requiredSequence = ['up', 'up', 'down', 'down', 'left', 'right', 'left', 'right'];
    let lastTapTime = 0;
    let tapCount = 0;
    
    document.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        
        // 检测双击
        const currentTime = new Date().getTime();
        const tapLength = currentTime - lastTapTime;
        
        if (tapLength < 300 && tapLength > 0) {
            tapCount++;
            if (tapCount === 2 && swipeSequence.length === 8) {
                // 完成手势序列
                triggerKonamiEffect();
                swipeSequence = [];
                tapCount = 0;
            }
        } else {
            tapCount = 1;
        }
        
        lastTapTime = currentTime;
    });
    
    document.addEventListener('touchend', (e) => {
        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;
        
        const diffX = touchEndX - touchStartX;
        const diffY = touchEndY - touchStartY;
        
        // 判断滑动方向
        if (Math.abs(diffX) > Math.abs(diffY)) {
            // 水平滑动
            if (diffX > 50) {
                swipeSequence.push('right');
            } else if (diffX < -50) {
                swipeSequence.push('left');
            }
        } else {
            // 垂直滑动
            if (diffY > 50) {
                swipeSequence.push('down');
            } else if (diffY < -50) {
                swipeSequence.push('up');
            }
        }
        
        // 只保留最后8个手势
        if (swipeSequence.length > 8) {
            swipeSequence.shift();
        }
        
        // 检查序列是否匹配
        if (swipeSequence.length === 8) {
            const matches = requiredSequence.every((dir, i) => dir === swipeSequence[i]);
            if (matches) {
                // 等待双击确认
                // 双击会在 touchstart 中检测
            }
        }
    });
}

/**
 * 触发 Konami 彩蛋效果
 */
function triggerKonamiEffect() {
    // 显示隐藏消息
    showKonamiMessage();
    
    // 爱心雨效果
    createHeartRain();
    
    // 彩虹渐变特效
    applyRainbowEffect();
}

/**
 * 显示 Konami 消息
 */
function showKonamiMessage() {
    const message = document.createElement('div');
    message.className = 'easter-message active';
    message.style.background = 'linear-gradient(135deg, #FFE5F0, #FFF0FA)';
    message.innerHTML = `
        <h2>🎮 恭喜你！</h2>
        <p style="font-size: 1.2rem; margin: 1rem 0;">
            你发现了隐藏的小秘密！❤️
        </p>
        <p style="font-size: 0.9rem; opacity: 0.8;">
            Konami Code 解锁成功 ✨
        </p>
    `;
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.classList.remove('active');
        setTimeout(() => message.remove(), 300);
    }, 4000);
}

/**
 * 爱心雨效果
 */
function createHeartRain() {
    const hearts = ['❤️', '💕', '💖', '💗', '💝', '💞'];
    
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'heart-rain';
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.left = Math.random() * 100 + '%';
            heart.style.fontSize = (Math.random() * 20 + 20) + 'px';
            heart.style.position = 'fixed';
            heart.style.top = '-50px';
            heart.style.zIndex = '2000';
            document.body.appendChild(heart);
            
            setTimeout(() => heart.remove(), 3000);
        }, i * 100);
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
    
    // 5秒后恢复原背景
    setTimeout(() => {
        document.body.style.background = originalBg;
        document.body.style.animation = '';
    }, 5000);
}

// ========== 初始化所有彩蛋 ==========
document.addEventListener('DOMContentLoaded', () => {
    initMusicPlayer();
    initSecretEntrance();
    initKonamiCode();
    initMobileKonami();
    
    // 检查是否是生日
    const now = new Date();
    if (now.getMonth() === 0 && now.getDate() === 12) { // 1月12日
        setTimeout(triggerBirthdayEffect, 1000);
    }
});

// 导出函数供其他模块使用
window.triggerBirthdayEffect = triggerBirthdayEffect;
