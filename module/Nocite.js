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