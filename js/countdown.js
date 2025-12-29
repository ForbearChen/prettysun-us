/**
 * 倒计时功能
 * 计算到生日（2026年1月12日）的倒计时
 * 以及在一起的时间（实时更新到秒）
 */

// 目标日期：2026年1月12日
const TARGET_DATE = new Date('2026-01-12T00:00:00');

// 在一起的起始日期：2018年7月1日
const START_DATE = new Date('2018-07-01T00:00:00');

/**
 * 更新倒计时显示
 */
function updateCountdown() {
    const now = new Date();
    const diffTime = TARGET_DATE - now;
    
    // 检查是否是生日当天 (彩蛋3触发条件)
    const isBirthday = checkIfBirthday(now);
    
    const countdownElement = document.getElementById('countdown');
    const daysElement = document.getElementById('days');
    
    if (!countdownElement) return;
    
    if (isBirthday) {
        // 生日当天显示特殊信息
        const countdownText = countdownElement.querySelector('.countdown-text');
        const countdownNumbers = countdownElement.querySelector('.countdown-numbers');
        
        if (countdownText) {
            countdownText.textContent = '🎂';
        }
        if (countdownNumbers) {
            countdownNumbers.innerHTML = '<div class="countdown-unit"><span class="countdown-value">生日快乐！</span></div>';
        }
        
        // 触发生日特效（在 easter-eggs.js 中定义）
        if (typeof triggerBirthdayEffect === 'function') {
            triggerBirthdayEffect();
        }
    } else if (diffTime > 0) {
        // 计算剩余天数
        const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (daysElement) {
            daysElement.textContent = days;
        }
    } else {
        // 生日已过
        const countdownText = countdownElement.querySelector('.countdown-text');
        const countdownNumbers = countdownElement.querySelector('.countdown-numbers');
        
        if (countdownText) {
            countdownText.textContent = '期待明年的';
        }
        if (countdownNumbers) {
            // 计算到下一年生日的天数
            const nextBirthday = new Date('2027-01-12T00:00:00');
            const diffToNext = nextBirthday - now;
            const daysToNext = Math.ceil(diffToNext / (1000 * 60 * 60 * 24));
            countdownNumbers.innerHTML = `<div class="countdown-unit"><span class="countdown-value">${daysToNext}</span><span class="countdown-label">天</span></div>`;
        }
    }
}

/**
 * 检查今天是否是生日
 * @param {Date} date 要检查的日期
 * @returns {boolean} 是否是生日
 */
function checkIfBirthday(date) {
    const month = date.getMonth() + 1; // 0-11，需要+1
    const day = date.getDate();
    
    // 生日：1月12日
    return month === 1 && day === 12;
}

/**
 * 获取到生日的剩余天数
 * @returns {number} 剩余天数
 */
function getDaysUntilBirthday() {
    const now = new Date();
    const diffTime = TARGET_DATE - now;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * 计算在一起的天数
 * @returns {number} 在一起的天数
 */
function getDaysTogether() {
    const now = new Date();
    const diffTime = now - START_DATE;
    return Math.floor(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * 更新在一起天数显示（实时到秒）
 */
function updateDaysTogether() {
    const now = new Date();
    const diffTime = now - START_DATE;
    
    const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diffTime % (1000 * 60)) / 1000);
    
    const daysElement = document.getElementById('daysTogether');
    const hoursElement = document.getElementById('hoursTogether');
    const minutesElement = document.getElementById('minutesTogether');
    const secondsElement = document.getElementById('secondsTogether');
    
    if (daysElement) daysElement.textContent = days;
    if (hoursElement) hoursElement.textContent = hours;
    if (minutesElement) minutesElement.textContent = minutes;
    if (secondsElement) secondsElement.textContent = seconds;
}

// 定时器ID
let countdownTimer = null;
let daysTogetherTimer = null;

// 页面加载时初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        updateCountdown();
        updateDaysTogether();
        // 每小时更新一次倒计时
        countdownTimer = setInterval(updateCountdown, 3600000);
        // 每秒更新一次在一起的时间
        daysTogetherTimer = setInterval(updateDaysTogether, 1000);
    });
} else {
    updateCountdown();
    updateDaysTogether();
    countdownTimer = setInterval(updateCountdown, 3600000);
    daysTogetherTimer = setInterval(updateDaysTogether, 1000);
}

// 导出函数供其他模块使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        updateCountdown,
        checkIfBirthday,
        getDaysUntilBirthday,
        getDaysTogether,
        updateDaysTogether
    };
}
