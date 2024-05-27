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