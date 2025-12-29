/**
 * 主要逻辑文件
 * 处理粒子动画、打字机效果、密码模态框等功能
 */

// 等待 DOM 加载完成
document.addEventListener('DOMContentLoaded', function() {
    initParticles();
    initTypewriter();
});

/**
 * 初始化粒子动画 - 星星、萤火虫、稀有爱心
 */
function initParticles() {
    const container = document.getElementById('heartParticles');
    if (!container) return;
    
    let particleInterval = null;
    
    // 创建单个粒子
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // 90% 星星/萤火虫，10% 爱心
        const rand = Math.random();
        if (rand > 0.9) {
            // 稀有爱心
            particle.classList.add('rare-heart');
            particle.textContent = '💕';
        } else if (rand > 0.5) {
            // 星星
            particle.classList.add('star-particle');
        } else {
            // 萤火虫
            particle.classList.add('firefly-particle');
        }
        
        // 随机位置
        particle.style.left = Math.random() * 100 + '%';
        
        // 随机漂移距离
        const drift = (Math.random() - 0.5) * 150; // -75 to 75
        particle.style.setProperty('--drift', drift + 'px');
        
        // 随机动画持续时间
        const duration = Math.random() * 5 + 8; // 8-13秒
        particle.style.animationDuration = duration + 's';
        
        container.appendChild(particle);
        
        // 动画结束后移除元素
        setTimeout(() => {
            particle.remove();
        }, duration * 1000);
    }
    
    // 持续创建粒子 - 降低频率
    particleInterval = setInterval(createParticle, 600); // 每600毫秒创建一个
    
    // 页面加载时创建一些初始粒子
    for (let i = 0; i < 10; i++) {
        setTimeout(createParticle, i * 150);
    }
    
    // 清理函数（如果需要停止粒子生成）
    return function cleanup() {
        if (particleInterval) {
            clearInterval(particleInterval);
        }
    };
}

/**
 * 打字机效果
 */
function initTypewriter() {
    const text = "余生很长，只想和你走";
    const typewriterElement = document.getElementById('typewriterText');
    
    if (!typewriterElement) return;
    
    let index = 0;
    
    function type() {
        if (index < text.length) {
            typewriterElement.textContent += text.charAt(index);
            index++;
            setTimeout(type, 150); // 每个字150ms
        } else {
            // 打字完成后，移除光标闪烁
            setTimeout(() => {
                const cursor = document.querySelector('.typewriter');
                if (cursor) {
                    cursor.style.display = 'none';
                }
            }, 2000);
        }
    }
    
    // 延迟1.5秒后开始打字
    setTimeout(type, 1500);
}
