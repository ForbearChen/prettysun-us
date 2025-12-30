/**
 * Calendar Heatmap Component
 * 显示从恋爱开始日期到当前的每一天
 * 使用温暖的蓝色渐变配色方案
 */

// 恋爱开始日期：2024-10-08
const LOVE_START_DATE = new Date('2024-10-08T00:00:00');

// 等级计算种子乘数（用于伪随机生成 0-4 的等级）
const LEVEL_SEED_MULTIPLIER = 7;
const MAX_LEVEL = 4; // 最大等级值（0-4 共5个等级）
const NUM_LEVELS = MAX_LEVEL + 1; // 总共的等级数量

// 动画常量
const ANIMATION_FRAME_RATE_MS = 16; // 约60fps的帧率

/**
 * 格式化日期为 YYYY-MM-DD
 */
function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

/**
 * 动态生成特殊日子（周年纪念日）
 */
function generateSpecialDays() {
    const specialDays = {};
    const startDate = new Date(LOVE_START_DATE);
    
    // 第一天
    specialDays[formatDate(startDate)] = '在一起的第一天 💕';
    
    // 动态生成每个月纪念日（最多计算到当前日期之后3个月）
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + 3);
    
    let monthCount = 1;
    let currentDate = new Date(startDate);
    currentDate.setMonth(currentDate.getMonth() + monthCount);
    
    while (currentDate <= endDate) {
        const dateStr = formatDate(currentDate);
        if (monthCount === 1) {
            specialDays[dateStr] = '在一起一个月 🎉';
        } else if (monthCount === 2) {
            specialDays[dateStr] = '在一起两个月 🎊';
        } else if (monthCount === 3) {
            specialDays[dateStr] = '在一起三个月 💖';
        } else if (monthCount % 12 === 0) {
            const years = monthCount / 12;
            specialDays[dateStr] = `在一起${years}周年 🎂`;
        } else if (monthCount % 6 === 0) {
            specialDays[dateStr] = `在一起${monthCount}个月 🎈`;
        }
        monthCount++;
        currentDate = new Date(startDate);
        currentDate.setMonth(currentDate.getMonth() + monthCount);
    }
    
    return specialDays;
}

// 特殊日子标记（动态生成）
const SPECIAL_DAYS = generateSpecialDays();

/**
 * 初始化日历热力图
 */
function initCalendarHeatmap() {
    const container = document.getElementById('calendarHeatmapContent');
    if (!container) {
        console.warn('Calendar heatmap container not found');
        return;
    }
    
    const now = new Date();
    const days = getDaysBetween(LOVE_START_DATE, now);
    
    // 按月分组
    const monthsData = groupDaysByMonth(LOVE_START_DATE, now);
    
    // 渲染每个月
    monthsData.forEach(monthData => {
        const monthElement = createMonthElement(monthData);
        container.appendChild(monthElement);
    });
    
    // 更新统计信息
    updateStats(days);
}

/**
 * 获取两个日期之间的天数
 */
function getDaysBetween(startDate, endDate) {
    const diffTime = Math.abs(endDate - startDate);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * 按月分组日期
 */
function groupDaysByMonth(startDate, endDate) {
    const monthsData = [];
    const currentDate = new Date(startDate);
    
    while (currentDate <= endDate) {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        
        // 检查是否是新的月份
        const lastMonth = monthsData[monthsData.length - 1];
        if (!lastMonth || lastMonth.year !== year || lastMonth.month !== month) {
            monthsData.push({
                year: year,
                month: month,
                days: []
            });
        }
        
        // 添加日期到当前月份
        const dateStr = formatDate(currentDate);
        const isSpecial = dateStr in SPECIAL_DAYS;
        const level = calculateLevel(currentDate);
        
        monthsData[monthsData.length - 1].days.push({
            date: new Date(currentDate),
            dateStr: dateStr,
            isSpecial: isSpecial,
            specialText: isSpecial ? SPECIAL_DAYS[dateStr] : '',
            level: level
        });
        
        // 移动到下一天
        currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return monthsData;
}

/**
 * 计算日期的强度等级 (0-4)
 * 可以基于特定逻辑，这里简单使用伪随机
 */
function calculateLevel(date) {
    // 特殊日子使用特殊标记
    const dateStr = formatDate(date);
    if (dateStr in SPECIAL_DAYS) {
        return 'special';
    }
    
    // 基于日期的简单伪随机等级
    // 使用日期作为种子生成0-4的等级
    const dayOfYear = getDayOfYear(date);
    const level = (dayOfYear * LEVEL_SEED_MULTIPLIER) % NUM_LEVELS; // 0-4
    return level;
}

/**
 * 获取一年中的第几天
 */
function getDayOfYear(date) {
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = date - start;
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
}

/**
 * 格式化日期显示（中文）
 */
function formatDateDisplay(date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}年${month}月${day}日`;
}

/**
 * 获取月份名称
 */
function getMonthName(year, month) {
    const monthNames = [
        '一月', '二月', '三月', '四月', '五月', '六月',
        '七月', '八月', '九月', '十月', '十一月', '十二月'
    ];
    return `${year}年 ${monthNames[month]}`;
}

/**
 * 创建月份元素
 */
function createMonthElement(monthData) {
    const monthDiv = document.createElement('div');
    monthDiv.className = 'calendar-month';
    
    // 月份标题
    const titleDiv = document.createElement('div');
    titleDiv.className = 'calendar-month-title';
    titleDiv.textContent = getMonthName(monthData.year, monthData.month);
    monthDiv.appendChild(titleDiv);
    
    // 日期网格
    const daysDiv = document.createElement('div');
    daysDiv.className = 'calendar-days';
    
    monthData.days.forEach(dayData => {
        const dayElement = createDayElement(dayData);
        daysDiv.appendChild(dayElement);
    });
    
    monthDiv.appendChild(daysDiv);
    
    return monthDiv;
}

/**
 * 创建日期元素
 */
function createDayElement(dayData) {
    const dayDiv = document.createElement('div');
    
    if (dayData.isSpecial) {
        dayDiv.className = 'calendar-day special';
    } else {
        dayDiv.className = `calendar-day level-${dayData.level}`;
    }
    
    // 创建提示框
    const tooltip = document.createElement('div');
    tooltip.className = 'calendar-day-tooltip';
    tooltip.textContent = dayData.isSpecial 
        ? `${formatDateDisplay(dayData.date)} - ${dayData.specialText}`
        : formatDateDisplay(dayData.date);
    
    dayDiv.appendChild(tooltip);
    
    return dayDiv;
}

/**
 * 更新统计信息
 */
function updateStats(totalDays) {
    const statsNumber = document.getElementById('calendarStatsNumber');
    if (statsNumber) {
        // 数字滚动动画
        animateNumber(statsNumber, 0, totalDays, 1500);
    }
}

/**
 * 数字滚动动画
 */
function animateNumber(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / ANIMATION_FRAME_RATE_MS);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            current = end;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, ANIMATION_FRAME_RATE_MS);
}

// 页面加载时初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCalendarHeatmap);
} else {
    initCalendarHeatmap();
}
