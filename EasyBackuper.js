// LiteLoader-AIDS automatic generated
/// <reference path="c:\Users\HeYuHan\LiteDev/dts/HelperLib-master/src/index.d.ts"/>

// 注册插件
const plugin = {
    Name: "EasyBackuper",
    Introduction: "简单化的LSE - JS备份插件 v0.0.6-beta 作者: 梦涵LOVE",
    Version: [0, 0, 6],
    Other: {
        Author: "梦涵LOVE",
        Github: "https://github.com/MengHanLOVE1027/EasyBackuper",
        License: "GPL-3.0 license",
    },
};
ll.registerPlugin(
    plugin.Name,
    plugin.Introduction,
    plugin.Version,
    plugin.Other
);

// 声明常量
const plugin_name = plugin.Name,
    author = plugin.Other.Author,
    plugin_version = "v0.0.6-betaaa",
    description = `简单化的LSE - JS备份插件`,
    last_edit_date = "2024-3-2 18:00",
    update_log = `什么都没有哦~`,
    plugin_installed_sucess = `${description} 安装成功！`,
    github_storehouse = plugin.Other.Github,
    the_helps = `No ANY HELP FOR YOU ALL!!!`,
    copyright = "务必保留原作者信息！！！！！",
    last_log = `${plugin_name}(LLSE - JS版) - ${description}`,
    cmd_name = "easybackuper",
    cmd_alias = "backup",

    backup_folder_path = ".\\backup\\", // 备份路径
    backup_tmp_path = ".\\backup_tmp\\", // 临时复制解压缩路径
    world_level_name = "Bedrock level", // 存档名称
    world_folder_path = `.\\worlds\\${world_level_name}\\`, // 存档路径
    seven_z_path = `.\\plugins\\${plugin_name}\\7z.exe`


/**
 * 递归复制子目录辅助函数
 */
function copyDirectory(src, dest) {
    // 获取源目录下的所有文件和目录
    let files = File.getFilesList(src);
    for (let file of files) {
        let srcPath = src + '\\' + file;
        let destPath = dest + '\\' + file;

        // 检查是否为目录
        if (File.checkIsDir(srcPath)) {
            // 创建目标目录
            let backupSubDirPath = dest + '\\' + file;
            File.mkdir(backupSubDirPath);
            logger.log(backupSubDirPath)
            // 递归复制子目录
            copyDirectory(srcPath, backupSubDirPath);
        } else {
            logger.log(srcPath + " ==> " + destPath)
            // 如果是文件，则复制文件
            File.copy(srcPath, dest);
        }
    }
    return true
}

/**
 * 备份功能
 */
function Backup() {
    let world_folder_list = File.getFilesList(world_folder_path)
    let copy_return, zip_return

    // 暂停存档写入
    log(mc.runcmdEx("save hold"))

    if (!File.exists(backup_folder_path)) {
        File.mkdir(backup_folder_path)
    }

    // let delete_retrun = File.delete('./backup')
    // if (delete_retrun) {
    //     logger.log('delete succes')
    // } else {
    //     logger.log('delete wrong')
    // }

    // 检测tmp文件夹是否存在，清空tmp文件夹
    if (File.exists(backup_tmp_path)) {
        File.delete(backup_tmp_path)
        File.mkdir(backup_tmp_path)
    } else {
        File.mkdir(backup_tmp_path)
    }


    for (let i = 0; i < world_folder_list.length; i++) {
        let currentPath = world_folder_path + world_folder_list[i];
        logger.log(`Processing: ${world_folder_list[i]} ${currentPath}`);

        // 检查是否为目录
        if (File.checkIsDir(currentPath)) {
            // 创建备份目录
            let backupDirPath = backup_tmp_path + world_folder_list[i];
            File.mkdir(backupDirPath);

            // 递归复制子目录
            copy_return = copyDirectory(currentPath, backupDirPath);
        } else {
            // 如果是文件，直接复制
            File.copy(currentPath, backup_tmp_path);
        }
    }

    // 压缩存档(tmp文件夹)
    system.newProcess(`${seven_z_path} a -tzip ${backup_folder_path}\\archive_name.zip ${backup_tmp_path}\\`, (exit, out) => {
        log(exit, '\n', out)
        zip_return = exit
    })


    // 检查是否复制成功
    let check_copy = setInterval(() => {
        if (copy_return) {
            logger.log('Copy succes')
            mc.runcmdEx("save resume") // 恢复存档写入
            clearInterval(check_copy) // 退出循环函数
        } else {
            logger.log('Copy wrong')
            mc.runcmdEx("save resume") // 恢复存档写入
            clearInterval(check_copy) // 退出循环函数
        }
    }, 100)

    // 检查是否压缩成功
    let check_zip = setInterval(() => {
        if (zip_return == 0) {
            logger.log('Zip succes')
            File.delete(backup_tmp_path)
            clearInterval(check_zip) // 退出循环函数
        } else if (zip_return == 1) {
            logger.log('Zip wrong')
            File.delete(backup_tmp_path)
            clearInterval(check_zip) // 退出循环函数
        }
    }, 100)


    // log(system.cmd("C:\\Users\\HeYuHan\\Desktop\\BDS\\plugins\\插件编写\\EasyBackuper\\lip.exe list"))
    // log(system.newProcess("C:\\Users\\HeYuHan\\Desktop\\BDS\\plugins\\插件编写\\EasyBackuper\\lip.exe list", (exit, out) => {log(exit, '\n', out)}))
}

/**
 * 注册指令
 */
function RegisterCmd() {
    const cmd = mc.newCommand(cmd_name, description, PermType.GameMasters)
    cmd.setAlias(cmd_alias) // 设置别名

    // cmd.setEnum("BackupAction") // 添加枚举选项

    // cmd.mandatory("action", ParamType.Enum, "BackupAction", 1) // 赋予指令选项属性(展开枚举选项,必选参数)
    // cmd.optional("abcd", ParamType.RawText) // 同上(可选)

    cmd.overload([])
    // cmd.overload(["BackupAction", "abcd"]) // 指令重载(必须有的且我不理解的东西)

    cmd.setCallback((_cmd, _origin, _output, _results) => {
        // 如果有选项就进行判断
        // switch (results.action) {
        //     case "":
        //         return output.success(`start "${results.name}"`)
        // }

        // 默认/backup指令后执行的代码
        // output.success(`Hello??? Any people there?`)
        Backup()
    })

    cmd.setup() // 指令初始化(必须)
}

/**
 * 加载插件
 */
function Loadplugin() {
    logger.setTitle("\x1b[32mEasyBackuper\x1b[0m") // 设置日志头
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
                            \x1b[33m作者：${author}                             \x1b[13047m版本：${plugin_version}\x1b[0m
===============================================================================================================`)


    logger.log(`\x1b[36m==============================${plugin_name}==============================\x1b[0m`)
    logger.log(`\x1b[3743m${plugin_installed_sucess}\x1b[0m`)
    logger.log(`\x1b[3743m版本: \x1b[13047m${plugin_version}\x1b[0m`)
    logger.log(`\x1b[3743m更新日志: ${update_log}\x1b[0m`)
    logger.log(`\x1b[3743m最后更新于 ${last_edit_date}\x1b[0m`)
    logger.log(`\x1b[135m${the_helps}\x1b[0m`)
    logger.log(`\x1b[31m${copyright}\x1b[0m`)
    logger.log(`\x1b[33m插件仓库：${github_storehouse}\x1b[0m`)
    logger.log(`\x1b[36m${last_log}\x1b[0m  \x1b[33m作者：${author}\x1b[0m`)
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