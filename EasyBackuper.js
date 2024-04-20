// LiteLoader-AIDS automatic generated
/// <reference path="c:\Users\HeYuHan\LiteDev/dts/HelperLib-master/src/index.d.ts"/>

// 注册插件
const plugin = {
    Name: "EasyBackuper",
    Introduction: "简单化的LSE - JS备份插件 v0.1.0 作者: 梦涵LOVE",
    Version: [0, 1, 0],
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

// 声明常量
const plugin_name = "EasyBackuper",
    plugin_version = "v0.1.0",
    cmd_name = "backup",
    cmd_alias = "easybackuper",
    plugin_path = `./plugins/${plugin_name}`,


    backup_tmp_path = "./backup_tmp/", // 临时复制解压缩路径
    world_level_name = /level-name=(.*)/.exec(File.readFrom('./server.properties'))[1], // 获取存档名称
    world_folder_path = `./worlds/${world_level_name}/` // 存档路径


// 配置文件初始化
const pluginConfigFile = {
    Language: "zh_CN",
    exe_7z_path: "./7za.exe",
    BackupFolderPath: "./backup/",
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
    Debug_MoreLogs_Player: false
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
        loaded_text_the_helps: "No ANY HELP FOR YOU ALL!",
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
        reload_text: "重载中...",
        reload_text_pluginConfig: "配置文件：",
        reload_text_i18nLangConfig: "i18n文件：",
    },
    en_US: {
        loaded_text_author: "Author",
        loaded_text_author_nickname: "MengHanLOVE",
        loaded_text_version: "Version",
        loaded_text_description: "Simplistic LSE - JS backup plugin.",
        loaded_text_plugin_installed_success: "EasyBackuper has been installed.",
        loaded_text_the_helps: "No ANY HELP FOR YOU ALL!",
        loaded_text_copyright: "Please keep the original author information!",
        loaded_text_plugins_github_storehouse: "Github Repository",
        loaded_text_plugins_github_storehouse_link: "https://github.com/MengHanLOVE1027/EasyBackuper",
        loaded_text_the_latest_log: "EasyBackuper(LLSE - JS) - Simplistic LSE - JS backup plugin",
        init_config_file_success: "Init Configs Success",
        backup_broadcast_start: "§2[EasyBackuper]§r§3Start the backup",
        backup_broadcast_check_copy_success: "§2[EasyBackuper]§r§6Copy Success！",
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
        reload_text: "Reloading...",
        reload_text_pluginConfig: "Config File：",
        reload_text_i18nLangConfig: "i18n File：",
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

// 全局变量
let pl, yes_no_console



/**
 * 递归复制子目录辅助函数
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
            if (pluginConfig.get("Debug_MoreLogs")) {
                logger.log(srcPath + " ==> " + destPath)
            }
            if (pluginConfig.get("Debug_MoreLogs_Player")) {
                // 提醒使用该指令玩家
                if (yes_no_console == 0) {
                    pl.tell(srcPath + " ==> " + destPath)
                }
            }

            // 如果是文件，则复制文件
            File.copy(srcPath, dest)
        }
    }
    return true
}

/**
 * 通知功能(类似于成就获得提示，位于上方,通知全体玩家)
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
 */
function Nocite(origin) {

    // 判断指令主体是什么
    if (origin.typeName == 'Virtual') {
        // 设置玩家对象
        pl = mc.getPlayer(origin.player.realName)
        yes_no_console = 0
    } else if (origin.typeName == 'DedicatedServer') {
        logger.log('asasaasa SERVER!')
        yes_no_console = 1
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
        }, broadcast_time_ms);
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
 * 备份功能
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


    for (let i = 0; i < world_folder_list.length; i++) {
        let currentPath = world_folder_path + world_folder_list[i]

        // 调试信息(在配置文件中Debug_MoreLogs开启)
        if (pluginConfig.get("Debug_MoreLogs")) {
            logger.log(i18n.get("backup_processing") + `${world_folder_list[i]} --> ${currentPath}`)
        }
        if (pluginConfig.get("Debug_MoreLogs_Player")) {
            // 提醒使用该指令玩家
            if (yes_no_console == 0) {
                pl.tell(i18n.get("backup_processing") + `${world_folder_list[i]} --> ${currentPath}`)
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
        if (pluginConfig.get("Debug_MoreLogs")) {
            log(exit, '\n', out)
        }
        if (pluginConfig.get("Debug_MoreLogs_Player")) {
            // 提醒使用该指令玩家
            if (yes_no_console == 0) {
                pl.tell(exit + '\n' + out)
            }
        }

        compress_return = exit
    })


    // 检查是否拷贝成功
    let check_copy = setInterval(() => {
        if (copy_return) {
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
                let a = pluginConfig.reload()
                let b = i18nLangConfig.reload()
                let i18nLocaleName = pluginConfig.get("Language")
                i18n.load(plugin_path + "/i18n/translation.json", i18nLocaleName)
                return output.success(i18n.get("reload_text") + '\n' + i18n.get("reload_text_pluginConfig") + a + '\n' + i18n.get("reload_text_i18nLangConfig") + b)

            case "init": // 初始化配置文件
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

                return output.success(i18n.get("init_config_file_success"))
        }

        // 默认/backup指令后执行的代码
        // 当玩家执行时检测并传参
        Nocite(origin)

    })
    cmd.setup() // 指令初始化(必须)

}

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
    logger.log(`\x1b[36m==============================${plugin_name}===============================\x1b[0m`)

    // colorLog('blue', "Hello World!") // 输出带颜色的文本
    // mc.sendCmdOutput("Hello LegacyScriptEngine!") // 模拟产生一个控制台命令输出

    mc.listen("onServerStarted", () => {
        // 注册指令
        RegisterCmd()
    })
}

// 加载插件
Loadplugin()