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