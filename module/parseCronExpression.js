/**
 * Cron解析模块
 * (Start)
 */

/**
 * Cron传入函数
 * @param {*} cronExpr Cron表达式
 * @returns 秒，分，时，日，月，星期，月份
 */
function parseCronExpression(cronExpr) {
    let parts = cronExpr.split(' ')

    if (parts.length < 6 || parts.length > 7) {
        throw new Error('Invalid cron expression')
    }

    let second = parseCronPart(parts[0], 0, 59)
    let minute = parseCronPart(parts[1], 0, 59)
    let hour = parseCronPart(parts[2], 0, 23)
    let dayOfMonth = parseCronPart(parts[3], 1, 31)
    let month = parseCronPart(parts[4], 1, 12, true)
    let dayOfWeek = parseCronPart(parts[5], 0, 7, true) // 0 和 7 都代表周日

    let year = null;
    if (parts.length > 6) {
        year = parseCronPart(parts[6], 1970, 9999)
    }

    return {
        second,
        minute,
        hour,
        dayOfMonth,
        month,
        dayOfWeek,
        year
    };
}
/**
 * 处理Cron的位置部分是否符合指定范围
 * @param {*} part 位置部分(Cron分开来解析后的顺序)
 * @param {*} min 最小值
 * @param {*} max 最大值
 * @param {*} allowNames 是否启用标识符
 * @returns 数组
 */
function parseCronPart(part, min, max, allowNames = false) {
    let values = [];

    if (part === '*') {
        for (let i = min; i <= max; i++) {
            values.push(i)
        }
    } else if (part.includes('/')) {
        let [rangeStart, step] = part.split('/')
        let stepNum = parseInt(step, 10)
        for (let i = parseInt(rangeStart, 10) || min; i <= max; i += stepNum) {
            values.push(i)
        }
    } else if (part.includes('-')) {
        let [start, end] = part.split('-').map(Number)
        for (let i = start; i <= end; i++) {
            values.push(i)
        }
    } else if (part.includes(',')) {
        values.push(...part.split(',').map(Number))
    } else if (!isNaN(part)) {
        let num = parseInt(part, 10)
        if (num >= min && num <= max) {
            values.push(num)
        }
    } else if (allowNames && ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'].includes(part.toLowerCase())) {
        values.push(['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'].indexOf(part.toLowerCase()))
    } else {
        throw new Error(`Invalid cron field: ${part}`)
    }

    return values;
}
/**
 * Cron检查并运行
 * @param {*} parsed Cron表达式(解析后)
 * @param {*} callback 回调函数
 * @returns 秒，分，时，日期，月份，星期
 */
function checkCronAndRun(parsed, callback) {
    let now = new Date()
    let currentSecond = now.getSeconds()
    let currentMinute = now.getMinutes()
    let currentHour = now.getHours()
    let currentDayOfMonth = now.getDate()
    let currentMonth = now.getMonth() + 1; // 月份是从 0 开始的
    let currentDayOfWeek = now.getDay() // 0 表示周日，1 表示周一，等等

    // 检查秒
    if (!parsed.second.includes(currentSecond)) {
        return;
    }

    // 检查分钟
    if (!parsed.minute.includes(currentMinute)) {
        return;
    }

    // 检查小时
    if (!parsed.hour.includes(currentHour)) {
        return;
    }

    // 检查日期
    if (!parsed.dayOfMonth.includes(currentDayOfMonth) && !parsed.dayOfMonth.includes('*')) {
        return;
    }

    // 检查月份
    if (!parsed.month.includes(currentMonth)) {
        return;
    }

    // 检查星期几
    if (!parsed.dayOfWeek.includes(currentDayOfWeek) && !parsed.dayOfWeek.includes('*')) {
        return;
    }

    // 退出循环调用(防止过多的调用备份)
    if (Cron_Use_Backup == false) {
        // 延迟1.5s后允许下一次Cron检测到后进行调用备份
        setTimeout(() => {
            Cron_Use_Backup = true
        }, 1500);
        // 退出onTick的循环，防止运行callback()
        return
    }

    // 如果所有条件都满足，执行回调函数
    callback()
}
/**
 * Cron与当前时间对应时运行代码
 */
function logCurrentTime() {
    // 调试信息(在配置文件中Debug_MoreLogs_Cron开启)
    if (Debug_Morelogs_Cron) {
        let now = new Date()
        logger.warn('[Debug]Current time:', now.toDateString(), now.toTimeString())
    }

    // 防止1秒内20游戏刻重复调用备份
    if (Cron_Use_Backup == true) {
        logger.log(i18n.get('auto_backup_start'))
        Nocite()
        // 清空数值方便下次被正确调用时可以继续备份
        Cron_Use_Backup = false
    }
}

/**
 * Cron解析模块
 * (End)
 */