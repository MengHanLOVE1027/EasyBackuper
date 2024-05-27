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