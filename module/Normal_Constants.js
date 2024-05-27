/**
 * 全局常量模块
 * (Start)
 */

// 声明常量
const plugin_name = "EasyBackuper",
    plugin_version = "v0.2.8",
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