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