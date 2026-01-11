/**
 * Calendar Heatmap Component - Year View with Month Expansion
 * 年份视图日历热力图，点击年份展开月份详情
 * 从2018年开始到2025年
 */

// 恋爱开始日期：2018年7月1日
const LOVE_START_DATE = new Date('2018-07-01T00:00:00');

// 年份范围：2018-2025
const YEARS = [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025];

// 动画常量
const ANIMATION_FRAME_RATE_MS = 16; // 约60fps

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

    // 不再标记“在一起的第一天”，只保留生日等特殊日

    // 生日：每年1月12日
    // 使用农历标记生日（例如：农历十一月二十四）
    // 我们通过 Intl.DateTimeFormat (chinese calendar) 把公历日期转换为农历，并寻找匹配的月/日
    const lunarBirthdayMonth = 11; // 农历月（十一月）
    const lunarBirthdayDay = 24;   // 农历日（廿四）

    // 找到每年对应的公历日期（从 LOVE_START_DATE 年开始到 2026 年）
    const startYear = startDate.getFullYear();
    const endYear = 2026;

    // Helper: 判断某个公历日期对应的农历月/日是否匹配
    function isLunarMatch(date, targetLunarMonth, targetLunarDay) {
        try {
            const dtf = new Intl.DateTimeFormat('zh-CN-u-ca-chinese', { month: 'numeric', day: 'numeric' });
            const parts = dtf.formatToParts(date);
            let m = null, d = null;
            parts.forEach(p => {
                if (p.type === 'month') m = Number(p.value);
                if (p.type === 'day') d = Number(p.value);
            });
            return m === targetLunarMonth && d === targetLunarDay;
        } catch (e) {
            // 如果环境不支持该 Intl 日历，回退到公历固定日期 (1月12日) 作为备选
            return false;
        }
    }

    for (let year = startYear; year <= endYear; year++) {
        // 遍历该年所有日期，寻找农历匹配日（性能足够：每年最多 366 次判断）
        const yearStart = new Date(year, 0, 1);
        const yearEnd = new Date(year, 11, 31);
        let d = new Date(yearStart);
        let found = false;
        while (d <= yearEnd) {
            if (isLunarMatch(d, lunarBirthdayMonth, lunarBirthdayDay)) {
                specialDays[formatDate(d)] = '生日（农历） 🎂';
                found = true;
                break;
            }
            d.setDate(d.getDate() + 1);
        }

        // 兼容性回退：如果没有找到（例如 Intl 不支持），使用公历 1 月 12 日 作为备用生日标记
        if (!found) {
            const fallback = new Date(year, 0, 12);
            specialDays[formatDate(fallback)] = '生日 🎂';
        }
    }

    return specialDays;
}

// 特殊日子标记
const SPECIAL_DAYS = generateSpecialDays();

/**
 * 初始化日历热力图 - 年份视图
 */
function initCalendarHeatmap() {
    const container = document.getElementById('calendarHeatmapContent');
    if (!container) {
        console.warn('Calendar heatmap container not found');
        return;
    }

    // 清空容器
    container.innerHTML = '';

    // 创建年份网格容器
    const yearsGrid = document.createElement('div');
    yearsGrid.className = 'calendar-years-grid';

    // 为每个年份创建卡片
    YEARS.forEach(year => {
        const yearCard = createYearCard(year);
        yearsGrid.appendChild(yearCard);
    });

    container.appendChild(yearsGrid);

    // 更新总天数统计
    const now = new Date();
    const totalDays = getDaysBetween(LOVE_START_DATE, now);
    updateStats(totalDays);
}

/**
 * 创建年份卡片
 */
function createYearCard(year) {
    const card = document.createElement('div');
    card.className = 'calendar-year-card';

    // 年份标题
    const title = document.createElement('div');
    title.className = 'calendar-year-title';
    title.textContent = `${year}年`;
    card.appendChild(title);

    // 计算这一年的天数和活跃度
    const yearStats = calculateYearStats(year);

    // 统计信息
    const stats = document.createElement('div');
    stats.className = 'calendar-year-stats';
    stats.innerHTML = `
        <div class="year-stat-item">
            <span class="year-stat-number">${yearStats.days}</span>
            <span class="year-stat-label">天</span>
        </div>
        <div class="year-stat-item">
            <span class="year-stat-number">${yearStats.specialDays}</span>
            <span class="year-stat-label">特殊日</span>
        </div>
    `;
    card.appendChild(stats);

    // 简化的年度热力图预览（12个月的小方块）
    const preview = document.createElement('div');
    preview.className = 'calendar-year-preview';
    for (let month = 0; month < 12; month++) {
        const monthBlock = document.createElement('div');
        monthBlock.className = 'calendar-month-block';
        const monthLevel = calculateMonthLevel(year, month);
        monthBlock.classList.add(`level-${monthLevel}`);
        monthBlock.title = `${month + 1}月`;
        preview.appendChild(monthBlock);
    }
    card.appendChild(preview);

    // 点击展开月份详情
    card.addEventListener('click', () => {
        expandYearDetails(year);
    });

    return card;
}

/**
 * 计算年份统计信息
 */
function calculateYearStats(year) {
    const yearStart = new Date(year, 0, 1);
    const yearEnd = new Date(year, 11, 31);
    const now = new Date();

    // 确定实际的开始和结束日期
    const actualStart = yearStart < LOVE_START_DATE ? LOVE_START_DATE : yearStart;
    const actualEnd = yearEnd > now ? now : yearEnd;

    let days = 0;
    let specialDays = 0;

    if (actualStart <= actualEnd) {
        days = getDaysBetween(actualStart, actualEnd) + 1;

        // 计算特殊日子数量
        const currentDate = new Date(actualStart);
        while (currentDate <= actualEnd) {
            const dateStr = formatDate(currentDate);
            if (dateStr in SPECIAL_DAYS) {
                specialDays++;
            }
            currentDate.setDate(currentDate.getDate() + 1);
        }
    }

    return { days, specialDays };
}

/**
 * 计算月份的活跃度等级
 */
function calculateMonthLevel(year, month) {
    const monthStart = new Date(year, month, 1);
    const monthEnd = new Date(year, month + 1, 0);
    const now = new Date();

    const actualStart = monthStart < LOVE_START_DATE ? LOVE_START_DATE : monthStart;
    const actualEnd = monthEnd > now ? now : monthEnd;

    if (actualStart > actualEnd) {
        return 0; // 还未到达的月份
    }

    // 计算这个月的特殊日子数量
    let specialCount = 0;
    const currentDate = new Date(actualStart);
    while (currentDate <= actualEnd) {
        const dateStr = formatDate(currentDate);
        if (dateStr in SPECIAL_DAYS) {
            specialCount++;
        }
        currentDate.setDate(currentDate.getDate() + 1);
    }

    // 根据特殊日子数量返回等级
    if (specialCount >= 2) return 4;
    if (specialCount === 1) return 3;

    // 否则基于月份的伪随机等级
    return (year + month * 7) % 3 + 1; // 1-3
}

/**
 * 展开年份详情 - 显示12个月的热力图
 */
function expandYearDetails(year) {
    const container = document.getElementById('calendarHeatmapContent');

    // 创建模态框
    const modal = document.createElement('div');
    modal.className = 'calendar-year-modal';
    modal.innerHTML = `
        <div class="calendar-year-modal-content">
            <div class="calendar-year-modal-header">
                <h3>${year}年详情</h3>
                <button class="calendar-year-modal-close">×</button>
            </div>
            <div class="calendar-year-modal-body" id="yearModalBody"></div>
        </div>
    `;

    document.body.appendChild(modal);

    // 关闭按钮
    const closeBtn = modal.querySelector('.calendar-year-modal-close');
    closeBtn.addEventListener('click', () => {
        modal.remove();
    });

    // 点击背景关闭
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });

    // 生成月份热力图
    const modalBody = document.getElementById('yearModalBody');
    for (let month = 0; month < 12; month++) {
        // 2018年只显示7-12月 (因为在一起是从7月开始)
        if (year === 2018 && month < 6) {
            continue;
        }

        const monthElement = createMonthHeatmap(year, month);
        modalBody.appendChild(monthElement);
    }

    // 显示动画
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
}

/**
 * 创建月份热力图
 */
function createMonthHeatmap(year, month) {
    const monthDiv = document.createElement('div');
    monthDiv.className = 'calendar-month-heatmap';

    // 月份标题
    const monthNames = [
        '一月', '二月', '三月', '四月', '五月', '六月',
        '七月', '八月', '九月', '十月', '十一月', '十二月'
    ];
    const title = document.createElement('div');
    title.className = 'calendar-month-heatmap-title';
    title.textContent = monthNames[month];
    monthDiv.appendChild(title);

    // 日期网格
    const daysGrid = document.createElement('div');
    daysGrid.className = 'calendar-month-days-grid';

    // 获取这个月的所有日期
    const monthStart = new Date(year, month, 1);
    const monthEnd = new Date(year, month + 1, 0);
    const now = new Date();

    const actualStart = monthStart < LOVE_START_DATE ? LOVE_START_DATE : monthStart;
    const actualEnd = monthEnd > now ? now : monthEnd;

    if (actualStart <= actualEnd) {
        const currentDate = new Date(actualStart);
        while (currentDate <= actualEnd) {
            const dayElement = createDayElement(currentDate);
            daysGrid.appendChild(dayElement);
            currentDate.setDate(currentDate.getDate() + 1);
        }
    } else {
        // 还未到达的月份
        const emptyMsg = document.createElement('div');
        emptyMsg.className = 'calendar-empty-month';
        emptyMsg.textContent = '未来的日子 ✨';
        daysGrid.appendChild(emptyMsg);
    }

    monthDiv.appendChild(daysGrid);
    return monthDiv;
}

/**
 * 创建日期元素
 */
function createDayElement(date) {
    const dayDiv = document.createElement('div');
    const dateStr = formatDate(date);
    const isSpecial = dateStr in SPECIAL_DAYS;

    if (isSpecial) {
        const label = SPECIAL_DAYS[dateStr] || '';
        if (label.includes('生日')) {
            dayDiv.className = 'calendar-day birthday';
        } else {
            dayDiv.className = 'calendar-day special';
        }
    } else {
        const level = calculateDayLevel(date);
        dayDiv.className = `calendar-day level-${level}`;
    }

    // 日期数字
    const dayNumber = document.createElement('span');
    dayNumber.className = 'calendar-day-number';
    dayNumber.textContent = date.getDate();
    dayDiv.appendChild(dayNumber);

    // 提示框
    const tooltip = document.createElement('div');
    tooltip.className = 'calendar-day-tooltip';
    tooltip.textContent = isSpecial
        ? `${formatDateDisplay(date)} - ${SPECIAL_DAYS[dateStr]}`
        : formatDateDisplay(date);
    dayDiv.appendChild(tooltip);

    return dayDiv;
}

/**
 * 计算日期的强度等级 (1-4)
 */
function calculateDayLevel(date) {
    const dateStr = formatDate(date);
    if (dateStr in SPECIAL_DAYS) {
        return 4; // 特殊日子最高等级
    }

    // 基于日期的伪随机等级
    const dayOfYear = getDayOfYear(date);
    return (dayOfYear * 7) % 4 + 1; // 1-4
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
 * 获取两个日期之间的天数
 */
function getDaysBetween(startDate, endDate) {
    const diffTime = Math.abs(endDate - startDate);
    return Math.floor(diffTime / (1000 * 60 * 60 * 24));
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
