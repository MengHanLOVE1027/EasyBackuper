// LiteLoader-AIDS automatic generated
/// <reference path="c:\Users\HeYuHan\LiteDev/dts/HelperLib-master/src/index.d.ts"/>


// 注册插件
const plugin = {
    Name: "EasyBackuper",
    Introduction: "简单化的LSE - JS备份插件 v0.2.6 作者: 梦涵LOVE",
    Version: [0, 2, 6],
    Other: {
        Author: "梦涵LOVE",
        Github: "https://github.com/MengHanLOVE1027/EasyBackuper",
        License: "GPL-3.0 license",
    },
}
// LL3弃用并改用manifest.json加载插件信息
// ll.registerPlugin(
//     plugin.Name,
//     plugin.Introduction,
//     plugin.Version,
//     plugin.Other
// )



/**
 * 全局常量模块
 * (Start)
 */

// 声明常量
const plugin_name = "EasyBackuper",
    plugin_version = "v0.2.6",
    cmd_name = "backup",
    cmd_alias = "easybackuper",
    plugin_path = `./plugins/${plugin_name}`,


    backup_tmp_path = "./backup_tmp/", // 临时复制解压缩路径
    world_level_name = /level-name=(.*)/.exec(File.readFrom('./server.properties'))[1], // 获取存档名称
    world_folder_path = `./worlds/${world_level_name}/` // 存档路径

/**
 * 全局常量模块
 * (End)
 */



/**
 * 配置文件模块
 * (Start)
 */

// 配置文件初始化
const pluginConfigFile = {
    Language: "zh_CN",
    exe_7z_path: "./plugins/EasyBackuper/7za.exe",
    BackupFolderPath: "./backup/",
    Auto_Clean: {
        Use_Number_Detection: {
            Status: false,
            Max_Number: 5
        }
    },
    Scheduled_Tasks: {
        Status: false,
        Cron: "*/30 * * * * *"
    },
    Broadcast: {
        Status: true,
        Time_ms: 5000,
        Title: "[OP]要开始备份啦~",
        Message: "将于 5秒 后进行备份！",
        Server_Title: "[Server]Neve Gonna Give You UP~",
        Server_Message: "Never Gonna Let You Down~",
        Backup_success_Title: "备份完成！",
        Backup_success_Message: "星级服务，让爱连接",
        Backup_wrong_Title: "很好的邢级服务，使我备份失败",
        Backup_wrong_Message: "RT"
    },
    Debug_MoreLogs: false,
    Debug_MoreLogs_Player: false,
    Debug_MoreLogs_Cron: false
}
// i18n国际化文件初始化
const i18nLangFile = {
    localeName: {
        src: "translation",
    },
    zh_CN: {
        loaded_text_author: "作者",
        loaded_text_author_nickname: "梦涵LOVE",
        loaded_text_version: "版本",
        loaded_text_description: "简单化的LSE - JS备份插件",
        loaded_text_plugin_installed_success: "EasyBackuper 安装成功！",
        loaded_text_the_helps: "查看帮助：https://www.minebbs.com/resources/easybackuper-eb.7771/",
        loaded_text_copyright: "务必保留原作者信息！",
        loaded_text_plugins_github_storehouse: "GitHub 仓库",
        loaded_text_plugins_github_storehouse_link: "https://github.com/MengHanLOVE1027/EasyBackuper",
        loaded_text_the_latest_log: "EasyBackuper(LLSE - JS) - 简单化的LSE - JS备份插件",
        init_config_file_success: "初始化文件成功",
        backup_broadcast_start: "§2§l[EasyBackuper]§r§3开始备份力！",
        backup_broadcast_check_copy_success: "§2§l[EasyBackuper]§r§6拷贝成功！",
        backup_broadcast_check_copy_wrong: "§2§l[EasyBackuper]§r§c拷贝失败！",
        backup_broadcast_check_compress_success: "§2§l[EasyBackuper]§r§6备份成功！",
        backup_broadcast_check_compress_wrong: "§2§l[EasyBackuper]§r§c备份失败！",
        backup_processing: "操作中：",
        backup_check_copying: "拷贝中...",
        backup_check_copy_success: "拷贝成功",
        backup_check_copy_wrong: "拷贝出错",
        backup_check_compressing: "压缩中...",
        backup_check_compress_success: "压缩成功，压缩包位于：",
        backup_check_compress_wrong: "压缩出错",
        auto_backup_status: "自动备份状态：",
        auto_backup_start: "自动备份正在启动中...",
        auto_cleanup_status: "自动清理状态：",
        auto_cleaup_start: "自动清理正在启动中...",
        auto_cleaup_do_not_start: "本小姐看了一下，很干净捏~",
        auto_cleaup_success: "清理成功，清理了：",
        auto_cleaup_wrong: "清理失败！",
        reload_text: "重载中...",
        reload_text_pluginConfig: "配置文件：",
        reload_text_i18nLangConfig: "i18n文件：",
        debug_morelogs_status: "Debug更多日志状态(控制台)：",
        debug_morelogs_player_status: "Debug更多日志状态(玩家)：",
        debug_morelogs_cron_status: "Debug更多日志状态(Cron)："
    },
    en_US: {
        loaded_text_author: "Author",
        loaded_text_author_nickname: "MengHanLOVE",
        loaded_text_version: "Version",
        loaded_text_description: "Simplistic LSE - JS backup plugin.",
        loaded_text_plugin_installed_success: "EasyBackuper has been installed.",
        loaded_text_the_helps: "See the helps: https://www.minebbs.com/resources/easybackuper-eb.7771/",
        loaded_text_copyright: "Please keep the original author information!",
        loaded_text_plugins_github_storehouse: "Github Repository",
        loaded_text_plugins_github_storehouse_link: "https://github.com/MengHanLOVE1027/EasyBackuper",
        loaded_text_the_latest_log: "EasyBackuper(LLSE - JS) - Simplistic LSE - JS backup plugin",
        init_config_file_success: "Init Configs Success",
        backup_broadcast_start: "§2[EasyBackuper]§r§3Start the backup",
        backup_broadcast_check_copy_success: "§2[EasyBackuper]§r§6Copy Success!",
        backup_broadcast_check_copy_wrong: "§2[EasyBackuper]§r§cCopy Wrong",
        backup_broadcast_check_compress_success: "§2[EasyBackuper]§r§cCompress Success",
        backup_broadcast_check_compress_wrong: "§2[EasyBackuper]§r§cCompress Wrong",
        backup_processing: "Processing: ",
        backup_check_copying: "Copying...",
        backup_check_copy_success: "Copy Success",
        backup_check_copy_wrong: "Copy Wrong",
        backup_check_compressing: "Compressing...",
        backup_check_compress_success: "Compress Success, the archive is located in: ",
        backup_check_compress_wrong: "Compress Wrong",
        auto_backup_status: "Auto Backup Status: ",
        auto_backup_start: "Auto Backup is Starting...",
        auto_cleanup_status: "Automatic Cleanup Status: ",
        auto_cleaup_start: "Automatic Cleanup is Starting...",
        auto_cleaup_do_not_start: "If the number of backup folders does not reach the specified number, the cleanup is stopped",
        auto_cleaup_success: "Cleanup is Success, Cleaned: ",
        auto_cleaup_wrong: "Cleanup is Wrong",
        reload_text: "Reloading...",
        reload_text_pluginConfig: "Config File: ",
        reload_text_i18nLangConfig: "i18n File: ",
        debug_morelogs_status: "Debug More Logs Status(Console): ",
        debug_morelogs_player_status: "Debug More Logs Status(Player): ",
        debug_morelogs_cron_status: "Debug More Logs Status(Cron): "
    },
}
// 创建配置文件
let pluginConfig = new JsonConfigFile(
    plugin_path + `/config/${plugin_name}.json`,
    JSON.stringify(pluginConfigFile)
)
let i18nLangConfig = new JsonConfigFile(
    plugin_path + "/i18n/translation.json",
    JSON.stringify(i18nLangFile)
)
// 加载i18n国际化文件
let i18nLocaleName = pluginConfig.get("Language")
i18n.load(plugin_path + "/i18n/translation.json", i18nLocaleName)

/**
 * 配置文件模块
 * (End)
 */



/**
 * 全局变量模块
 * (Start)
 */

// 全局变量
let pl, yes_no_console
// Cron相关变量
let scheduled_tasks = pluginConfig.get('Scheduled_Tasks')
let scheduled_tasks_status = scheduled_tasks['Status']
let scheduled_tasks_cron = scheduled_tasks['Cron']
let cronExpr = scheduled_tasks_cron
let parsed = parseCronExpression(cronExpr)

// 获取配置文件中Auto_Clean配置内容
let auto_cleaup = pluginConfig.get('Auto_Clean')
// 读取"Use_Number_Detection"
let use_number_detection = auto_cleaup['Use_Number_Detection']
// 读取"Use_Number_Detection"中的Status和Max_Clean_Number
let use_number_detection_status = use_number_detection['Status']
let use_number_detection_max_number = use_number_detection['Max_Number']

// Debug相关
let Debug_Morelogs = pluginConfig.get("Debug_MoreLogs")
let Debug_Morelogs_Player = pluginConfig.get("Debug_MoreLogs_Player")
let Debug_Morelogs_Cron = pluginConfig.get("Debug_MoreLogs_Cron")
let Cron_Use_Backup = true

/**
 * 全局变量模块
 * (End)
 */



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



/**
 * 清理冗余备份文件模块
 * (Start)
 */

/**
 * 删除指定文件夹内超过最大备份量的文件
 * @param {*} backupDir 备份文件夹路径
 * @param {*} maxBackups 最大保留数量
 */
function deleteOldBackups(backupDir, maxBackups) {
    let goingto_delete_backups = []
    let ending = []
    let err_out
    // 列出指定文件夹下的所有文件
    let filesList = File.getFilesList(backupDir)

    // 当备份文件夹文件大于用户设置最大保留值时
    if (filesList.length > maxBackups) {
        for (let file of filesList) {
            // 添加至数组
            goingto_delete_backups.push(file)
        }
        // 计算差值
        let a = filesList.length - maxBackups
        for (let i = 0; i < a; i++) {
            // 获取删除的文件名保存在数组内
            ending.push(goingto_delete_backups[i])
            err_out = File.delete(pluginConfig.get('BackupFolderPath') + '/' + goingto_delete_backups[i])
        }
        // 对返回值进行判断是否成功运行
        if (err_out) {
            for (let i = 0; i < ending.length; i++) {
                logger.warn(i18n.get('auto_cleaup_success') + ending[i])
            }
        } else {
            // 当备份文件夹文件小于等于用户设置最大保留值时
            logger.error(i18n.get('auto_cleaup_wrong'))
        }
    } else {
        logger.log(i18n.get('auto_cleaup_do_not_start'))
    }
}
/**
 * 清理多余备份文件
 */
function Clean_Backup_Files() {
    // 获取配置文件中Auto_Clean配置内容
    auto_cleaup = pluginConfig.get('Auto_Clean')
    // 读取"Use_Number_Detection"
    use_number_detection = auto_cleaup['Use_Number_Detection']


    // 读取"Use_Number_Detection"中的Status和Max_Clean_Number
    use_number_detection_status = use_number_detection['Status']
    use_number_detection_max_number = use_number_detection['Max_Number']

    // 判断选择方式
    if (use_number_detection_status) {
        // 调用函数，例如删除除了最新的5个文件外的所有文件
        logger.warn(i18n.get('auto_cleaup_start'))
        deleteOldBackups(pluginConfig.get('BackupFolderPath'), use_number_detection_max_number)
    }
}

/**
 * 清理冗余备份文件模块
 * (End)
 */



/**
 * 通知模块
 * (Start)
 */

/**
 * 通知功能(类似于成就获得提示，位于上方,通知全体玩家)
 * @param {*} broadcast_title 标题
 * @param {*} broadcast_message 内容
 */
function Notice_Upper(broadcast_title, broadcast_message) {
    let pl1
    let players = mc.getOnlinePlayers()
    for (let i = 0; i < players.length; i++) {
        pl1 = mc.getPlayer(players[i].realName)
        // 通知全体玩家(类似于成就获得提示)
        pl1.sendToast(broadcast_title, broadcast_message)
    }
}
/**
 * 通知功能
 * @param {*} origin 传入的origin对象(在注册指令处)
 */
function Nocite(origin) {
    // 当没有传参时默认为BDS调用
    if (typeof origin === 'undefined') {
        yes_no_console = 1
    } else {
        // 判断指令主体是什么(重中之重)
        if (origin.typeName == 'Virtual') {
            // 设置玩家对象
            pl = mc.getPlayer(origin.player.realName)
            yes_no_console = 0
        } else if (origin.typeName == 'DedicatedServer') {
            yes_no_console = 1
        }
    }

    // 获取配置文件中Broadcast配置内容
    let broadcast = pluginConfig.get('Broadcast')
    // 读取"Status"
    let broadcast_status = broadcast['Status']
    // 读取"Time"(延迟时间)
    let broadcast_time_ms = broadcast['Time_ms']
    // 读取"Title"(通知标题)
    let broadcast_title = broadcast['Title']
    // 读取"Message"(通知内容)
    let broadcast_message = broadcast['Message']
    // 读取"Title"(通知标题)
    let broadcast_server_title = broadcast['Server_Title']
    // 读取"Message"(通知内容)
    let broadcast_server_message = broadcast['Server_Message']

    // 延时后并开始备份
    if (yes_no_console == 0) {
        setTimeout(() => {
            Backup(pl)
        }, broadcast_time_ms)
    } else {
        Backup()
    }

    if (yes_no_console == 0) {
        if (broadcast_status) {
            Notice_Upper(broadcast_title, broadcast_message)
        }
    } else if (yes_no_console == 1) {
        Notice_Upper(broadcast_server_title, broadcast_server_message)
    }
}

/**
 * 通知模块
 * (End)
 */



/**
 * 备份模块
 * (Start)
 */

/**
 * 递归复制子目录辅助函数
 * @param {*} src 源文件夹
 * @param {*} dest 目标文件夹
 * @param {*} pl 玩家对象
 * @returns 真(但是貌似没必要返回，具体详见Backup()中的复制文件部分)
 */
function copyDirectory(src, dest, pl) {
    // 获取源目录下的所有文件和目录
    let files = File.getFilesList(src)
    for (let file of files) {
        let srcPath = src + '/' + file
        let destPath = dest + '/' + file

        // 检查是否为目录
        if (File.checkIsDir(srcPath)) {
            // 创建目标目录
            let backupSubDirPath = dest + '/' + file
            File.mkdir(backupSubDirPath)
            // 递归复制子目录
            copyDirectory(srcPath, backupSubDirPath, pl)
        } else {

            // 调试信息(在配置文件中Debug_MoreLogs开启)
            if (Debug_Morelogs) {
                logger.log('[Debug]' + srcPath + " ==> " + destPath)
            }
            // 调试信息(在配置文件中Debug_MoreLogs_Player开启)
            if (Debug_Morelogs_Player) {
                // 提醒使用该指令玩家
                if (yes_no_console == 0) {
                    pl.tell('[Debug]' + srcPath + " ==> " + destPath)
                }
            }

            // 如果是文件，则复制文件
            File.copy(srcPath, dest)
        }
    }
    return true
}
/**
 * 备份功能
 * @param {*} pl 传入玩家对象
 */
function Backup(pl) {
    // 获取配置文件中Broadcast配置内容
    let broadcast = pluginConfig.get('Broadcast')
    // 读取"Status"
    let broadcast_status = broadcast['Status']
    // 读取"Backup_success_Title"(通知标题)
    let broadcast_Backup_success_Title = broadcast['Backup_success_Title']
    // 读取"Backup_success_Message"(通知内容)
    let broadcast_Backup_success_Message = broadcast['Backup_success_Message']
    // 读取"Backup_wrong_Title"(通知标题)
    let broadcast_Backup_wrong_Title = broadcast['Backup_wrong_Title']
    // 读取"Backup_wrong_Message"(通知内容)
    let broadcast_Backup_wrong_Message = broadcast['Backup_wrong_Message']

    // 如果开启广播功能则进行广播
    if (broadcast_status) {
        // type可选数字: 0-普通消息(Raw), 1-聊天消息(Chat) 5-物品栏上方的消息(Tip)
        mc.broadcast(i18n.get('backup_broadcast_start'), 0)
        mc.broadcast(i18n.get('backup_broadcast_start'), 5)
    }

    // 局部变量
    let world_folder_list = File.getFilesList(world_folder_path)
    let copy_return, compress_return

    // 暂停存档写入
    mc.runcmdEx("save hold")
    logger.log(i18n.get("backup_check_copying")) // 提示信息

    // 提醒使用该指令玩家
    if (yes_no_console == 0) {
        pl.tell(i18n.get("backup_check_copying"))
    }

    // 创建备份文件夹
    if (!File.exists(pluginConfig.get("BackupFolderPath"))) {
        File.mkdir(pluginConfig.get("BackupFolderPath"))
    }

    // 检测tmp文件夹是否存在，清空tmp文件夹
    if (File.exists(backup_tmp_path)) {
        File.delete(backup_tmp_path)
        File.mkdir(backup_tmp_path)
    } else {
        File.mkdir(backup_tmp_path)
    }

    // 复制文件(备份存档)
    for (let i = 0; i < world_folder_list.length; i++) {
        let currentPath = world_folder_path + world_folder_list[i]

        // 调试信息(在配置文件中Debug_MoreLogs开启)
        if (Debug_Morelogs) {
            logger.log('[Debug]' + i18n.get("backup_processing") + `${world_folder_list[i]} --> ${currentPath}`)
        }
        // 调试信息(在配置文件中Debug_MoreLogs_Player开启)
        if (Debug_Morelogs_Player) {
            // 提醒使用该指令玩家
            if (yes_no_console == 0) {
                pl.tell('[Debug]' + i18n.get("backup_processing") + `${world_folder_list[i]} --> ${currentPath}`)
            }
        }

        // 检查是否为目录
        if (File.checkIsDir(currentPath)) {
            // 创建备份目录
            let backupDirPath = backup_tmp_path + world_folder_list[i]
            File.mkdir(backupDirPath)

            // 递归复制子目录
            copy_return = copyDirectory(currentPath, backupDirPath, pl)
        } else {
            // 如果是文件，直接复制
            File.copy(currentPath, backup_tmp_path)
        }
    }

    // 获取当前时间
    let archive_name = system.getTimeObj().Y + '_' +
        system.getTimeObj().M + '_' +
        system.getTimeObj().D + '=' +
        system.getTimeObj().h + '-' +
        system.getTimeObj().m + '-' +
        system.getTimeObj().s + `[${world_level_name}].zip`

    // 压缩存档(tmp文件夹)
    system.newProcess(pluginConfig.get("exe_7z_path") + ' a -tzip ' + '"' + pluginConfig.get("BackupFolderPath") + `/${archive_name}` + '"' + ` ${backup_tmp_path}/`, (exit, out) => {
        logger.log(i18n.get("backup_check_compressing")) // 提示信息

        // 提醒使用该指令玩家
        if (yes_no_console == 0) {
            pl.tell(i18n.get("backup_check_compressing"))
        }

        // 调试信息(在配置文件中Debug_MoreLogs开启)
        if (Debug_Morelogs) {
            log('[Debug]' + exit, '\n', out)
        }
        // 调试信息(在配置文件中Debug_MoreLogs_Player开启)
        if (Debug_Morelogs_Player) {
            // 提醒使用该指令玩家
            if (yes_no_console == 0) {
                pl.tell('[Debug]' + exit + '\n' + out)
            }
        }

        compress_return = exit
    })


    // 检查是否拷贝成功
    let check_copy = setInterval(() => {
        if (copy_return) { // 感觉没必要判断复制成功或失败，一般情况都是可以复制成功的
            logger.log(i18n.get("backup_check_copy_success"))

            // 全体广播备份情况
            // type可选数字: 0-普通消息(Raw), 1-聊天消息(Chat) 5-物品栏上方的消息(Tip)
            if (broadcast_status) {
                mc.broadcast(i18n.get('backup_broadcast_check_copy_success'), 0)
                mc.broadcast(i18n.get('backup_broadcast_check_copy_success'), 5)
            }
            // 提醒使用该指令玩家
            if (yes_no_console == 0) {
                pl.tell(i18n.get("backup_check_copy_success"))
            }

            mc.runcmdEx("save resume") // 恢复存档写入
            clearInterval(check_copy) // 退出循环函数
        } else {
            logger.log(i18n.get("backup_check_copy_wrong"))

            // 全体广播备份情况
            // type可选数字: 0-普通消息(Raw), 1-聊天消息(Chat) 5-物品栏上方的消息(Tip)
            if (broadcast_status) {
                mc.broadcast(i18n.get('backup_broadcast_check_copy_wrong'), 0)
                mc.broadcast(i18n.get('backup_broadcast_check_copy_wrong'), 5)
            }
            // 提醒使用该指令玩家
            if (yes_no_console == 0) {
                pl.tell(i18n.get("backup_check_copy_wrong"))
            }

            mc.runcmdEx("save resume") // 恢复存档写入
            clearInterval(check_copy) // 退出循环函数
        }
    }, 100)

    // 检查是否压缩成功
    let check_compress = setInterval(() => {
        if (compress_return == 0) {
            logger.log(i18n.get("backup_check_compress_success") + pluginConfig.get("BackupFolderPath") + `/${archive_name}`)

            // 全体广播备份情况
            // type可选数字: 0-普通消息(Raw), 1-聊天消息(Chat) 5-物品栏上方的消息(Tip)
            if (broadcast_status) {
                mc.broadcast(i18n.get('backup_broadcast_check_compress_success'), 0)
                mc.broadcast(i18n.get('backup_broadcast_check_compress_success'), 5)

                // 通知全体玩家(类似于成就获得提示)
                Notice_Upper(broadcast_Backup_success_Title, broadcast_Backup_success_Message)
            }
            // 提醒使用该指令玩家
            if (yes_no_console == 0) {
                pl.tell(i18n.get("backup_check_compress_success") + pluginConfig.get("BackupFolderPath") + `/${archive_name}`)
            }

            File.delete(backup_tmp_path)
            clearInterval(check_compress) // 退出循环函数
        } else if (compress_return == 1) {
            logger.log(i18n.get("backup_check_compress_wrong"))

            // 全体广播备份情况
            // type可选数字: 0-普通消息(Raw), 1-聊天消息(Chat) 5-物品栏上方的消息(Tip)
            if (broadcast_status) {
                mc.broadcast(i18n.get('backup_broadcast_check_compress_wrong'), 0)
                mc.broadcast(i18n.get('backup_broadcast_check_compress_wrong'), 5)

                // 通知全体玩家(类似于成就获得提示)
                Notice_Upper(broadcast_Backup_wrong_Title, broadcast_Backup_wrong_Message)
            }
            // 提醒使用该指令玩家
            if (yes_no_console == 0) {
                pl.tell(i18n.get("backup_check_compress_wrong"))
            }

            File.delete(backup_tmp_path)
            clearInterval(check_compress) // 退出循环函数
        }
    }, 100)
}

/**
 * 备份模块
 * (End)
 */



/**
 * 重载插件模块
 * (Start)
 */

/**
 * 重载配置文件和i18n
 * @returns (数组)配置文件重载状态[0]和i18n重载状态[1]
 */
function ReloadPlugin() {
    let a, b, c = []
    a = pluginConfig.reload() // 配置文件重载
    // Debug相关
    Debug_Morelogs = pluginConfig.get("Debug_MoreLogs")
    Debug_Morelogs_Player = pluginConfig.get("Debug_MoreLogs_Player")
    Debug_Morelogs_Cron = pluginConfig.get("Debug_MoreLogs_Cron")
    // Cron配置重载
    scheduled_tasks = pluginConfig.get('Scheduled_Tasks')
    scheduled_tasks_status = scheduled_tasks['Status']
    scheduled_tasks_cron = scheduled_tasks['Cron']
    cronExpr = scheduled_tasks_cron
    parsed = parseCronExpression(cronExpr)
    // Auto_Clean重载
    auto_cleaup = pluginConfig.get('Auto_Clean')
    use_number_detection = auto_cleaup['Use_Number_Detection']
    use_number_detection_status = use_number_detection['Status']
    use_number_detection_max_number = use_number_detection['Max_Number']

    b = i18nLangConfig.reload() // i18n文件重载
    let i18nLocaleName = pluginConfig.get("Language") // 重载i18n语言选择
    i18n.load(plugin_path + "/i18n/translation.json", i18nLocaleName) // 加载i18n对应语言

    // 将a和b的结果放入到数组c中并返回值
    c.push(a, b)
    return c
}

/**
 * 重载插件模块
 * (End)
 */



/**
 * 初始化配置文件模块
 * (Start)
 */

/**
 * 初始化配置文件和i18n
 */
function InitPluginConfig() {
    // 检测配置文件是否存在
    if (File.exists(plugin_path + "/i18n/translation.json")) {
        File.delete(plugin_path + "/i18n/translation.json")
    }
    if (File.exists(plugin_path + `/config/${plugin_name}.json`)) {
        File.delete(plugin_path + `/config/${plugin_name}.json`)
    }

    // 重新创建配置文件
    new JsonConfigFile(
        plugin_path + `/config/${plugin_name}.json`,
        JSON.stringify(pluginConfigFile)
    )
    new JsonConfigFile(
        plugin_path + "/i18n/translation.json",
        JSON.stringify(i18nLangFile)
    )
}

/**
 * 初始化配置文件模块
 * (End)
 */



/**
 * 注册指令模块
 * (Start)
 */

/**
 * 注册指令
 */
function RegisterCmd() {
    const cmd = mc.newCommand(cmd_name, i18n.get("loaded_text_description"), PermType.GameMasters)
    cmd.setAlias(cmd_alias) // 设置别名

    cmd.setEnum("ReloadAction", ["reload"]) // 添加枚举选项
    cmd.setEnum("InitConfig", ["init"]) // 同上

    cmd.mandatory("action", ParamType.Enum, "ReloadAction", 1) // 赋予指令选项属性(展开枚举选项,必选参数)
    cmd.mandatory("action", ParamType.Enum, "InitConfig", 1) // 同上

    // cmd.optional("name", ParamType.RawText) // 同上
    // cmd.optional("abcd", ParamType.RawText) // 同上(可选)

    cmd.overload([])
    // cmd.overload(["ReloadAction", "name", "abcd"]) // 指令重载(必须有的且我不理解的东西)
    cmd.overload(["ReloadAction"]) // 指令重载(必须有的且我不理解的东西)
    cmd.overload(["InitConfig"]) // 同上

    cmd.setCallback((_cmd, origin, output, results) => {
        // 如果有选项就进行判断
        switch (results.action) {
            case "reload": // 重载插件配置
                let a = ReloadPlugin()[0] // 读取返回值数组的第一个
                let b = ReloadPlugin()[1] // 读取返回值数组的第二个
                let x = i18n.get("reload_text") + '\n' + i18n.get("reload_text_pluginConfig") + a + '\n' + i18n.get("reload_text_i18nLangConfig") + b + '\n'
                let y = i18n.get("auto_backup_status") + scheduled_tasks_status + '\n' + i18n.get("auto_cleanup_status") + use_number_detection_status + '\n'
                let z = i18n.get("debug_morelogs_status") + pluginConfig.get('Debug_MoreLogs') + '\n' + i18n.get('debug_morelogs_player_status') + pluginConfig.get('Debug_MoreLogs_Player') + '\n' + i18n.get('debug_morelogs_cron_status') + pluginConfig.get('Debug_MoreLogs_Cron')
                return output.success(x + y + z)

            case "init": // 初始化配置文件
                InitPluginConfig()
                let c = ReloadPlugin()[0] // 读取返回值数组的第一个
                let d = ReloadPlugin()[1] // 读取返回值数组的第二个
                let e = i18n.get("reload_text") + '\n' + i18n.get("reload_text_pluginConfig") + c + '\n' + i18n.get("reload_text_i18nLangConfig") + d + '\n'
                let f = i18n.get("auto_backup_status") + scheduled_tasks_status + '\n' + i18n.get("auto_cleanup_status") + use_number_detection_status + '\n'
                let g = i18n.get("debug_morelogs_status") + pluginConfig.get('Debug_MoreLogs') + '\n' + i18n.get('debug_morelogs_player_status') + pluginConfig.get('Debug_MoreLogs_Player') + '\n' + i18n.get('debug_morelogs_cron_status') + pluginConfig.get('Debug_MoreLogs_Cron')
                return output.success(i18n.get("init_config_file_success") + '\n' + e + f + g)
        }

        // 默认/backup指令后执行的代码
        // 当玩家执行时检测并传参
        Nocite(origin)

    })
    cmd.setup() // 指令初始化(必须)

}

/**
 * 注册指令模块
 * (End)
 */



/**
 * 加载插件模块
 * (Start)
 */

/**
 * 加载插件
 */
function Loadplugin() {
    logger.setTitle(`\x1b[32m${plugin_name}\x1b[0m`) // 设置日志头
    logger.log(`
===============================================================================================================
     ********                             ******                     **            
    /**/////                     **   ** /*////**                   /**             ******                
    /**        ******    ****** //** **  /*   /**   ******    ***** /**  ** **   ** /**///**  *****  ******
    /*******  //////**  **////   //***   /******   //////**  **////*/** ** /**  /** /**  /** **///**//**//*
    /**////    ******* //*****    /**    /*//// **  ******* /**  // /****  /**  /** /****** /******* /** / 
    /**       **////**  /////**   **     /*    /** **////** /**   **/**/** /**  /** /**///  /**////  /**   
    /********//******** ******   **      /******* //********//***** /**//**//****** /**     //******/***   
    ////////  //////// //////   //       ///////   ////////  /////  //  //  /////// /*     ////// ///    
                            \x1b[33m`+ i18n.get("loaded_text_author") + `：` + i18n.get("loaded_text_author_nickname") + `                        \x1b[13047m` + i18n.get("loaded_text_version") + `：${plugin_version}[${i18nLocaleName}]\x1b[0m
===============================================================================================================`)


    logger.log(`\x1b[36m==============================${plugin_name}==============================\x1b[0m`)
    logger.log(`\x1b[3743m` + i18n.get("loaded_text_plugin_installed_success") + `\x1b[0m`)
    logger.log(`\x1b[3743m` + i18n.get("loaded_text_version") + `: \x1b[13047m${plugin_version}\x1b[0m`)
    logger.log(`\x1b[135m` + i18n.get("loaded_text_the_helps") + `\x1b[0m`)
    logger.log(`\x1b[31m` + i18n.get("loaded_text_copyright") + `\x1b[0m`)
    logger.log(`\x1b[33m` + i18n.get("loaded_text_plugins_github_storehouse") + `：` + i18n.get("loaded_text_plugins_github_storehouse_link") + `\x1b[0m`)
    logger.log(`\x1b[36m` + i18n.get("loaded_text_the_latest_log") + `\x1b[0m  \x1b[33m` + i18n.get("loaded_text_author") + `：` + i18n.get("loaded_text_author_nickname") + `\x1b[0m`)
    let a = i18n.get("auto_backup_status") + scheduled_tasks_status
    let b = i18n.get("auto_cleanup_status") + use_number_detection_status
    let c = i18n.get("debug_morelogs_status") + pluginConfig.get('Debug_MoreLogs')
    let d = i18n.get('debug_morelogs_player_status') + pluginConfig.get('Debug_MoreLogs_Player')
    let e = i18n.get('debug_morelogs_cron_status') + pluginConfig.get('Debug_MoreLogs_Cron')
    logger.log(a)
    logger.log(b)
    logger.log(c)
    logger.log(d)
    logger.log(e)
    logger.log(`\x1b[36m==============================${plugin_name}===============================\x1b[0m`)


    mc.listen("onServerStarted", () => {
        // 清理冗余备份压缩包
        Clean_Backup_Files()
        // 注册指令
        RegisterCmd()
    })
    mc.listen("onTick", () => {
        // 是否开启Cron定时任务
        if (scheduled_tasks_status) {
            // 检测时间是否匹配，然后调用函数
            checkCronAndRun(parsed, logCurrentTime)
        }
    })
}

/**
 * 加载插件模块
 * (End)
 */



// 加载插件
Loadplugin()