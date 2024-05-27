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