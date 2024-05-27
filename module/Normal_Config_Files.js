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