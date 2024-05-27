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