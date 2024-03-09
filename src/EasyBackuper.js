// LiteLoader-AIDS automatic generated
/// <reference path="c:\Users\HeYuHan\.liteloader/dts/HelperLib-master/src/index.d.ts"/>


ll.registerPlugin(
    /* name */ "EasyBackuper",
    /* introduction */ "简单化的LSE - JS备份插件 v0.0.6-beta 作者: 梦涵LOVE",
    /* version */[0, 0, 6],
    /* otherInformation */ "作者: 梦涵LOVE"
)

const plugin_name = "EasyBackuper",
    author = `梦涵LOVE`,
    plugin_version = "v0.0.6-beta",
    description = `简单化的LSE - JS备份插件`,
    last_edit_date = "2024-3-2 18:00",
    update_log = `什么都没有哦~`,
    plugin_installed_sucess = `${description} 安装成功！`,
    github_storehouse = "NOPE",
    the_helps = `No ANY HELP FOR YOU ALL!!!`,
    copyright = "务必保留原作者信息！！！！！",
    last_log = `${plugin_name}(LLSE - JS版) - ${description}`,
    cmd_name = "easybackuper",
    cmd_alias = "backup"


function test(a) {
    logger.log('test')
    logger.log(a)
}


/**
 * 备份功能
 */
function Backup() {
    mc.runcmdEx("save hold")

    if (!File.exists("./backup")) {
        File.mkdir("./backup")
    } else {
        File.copy("./worlds/Bedrock level/", "./backup")
        var endingthing = File.copy("./worlds/Bedrock level/db/", "./backup")

    // 检查是否成功备份
    var check = setInterval(() => {
        if (endingthing) {
            logger.log('succes')
            mc.runcmdEx("save resume")
            clearInterval(check)
        } else {
            logger.log('wrong')
            mc.runcmdEx("save resume")
            clearInterval(check)
        }}, 1000)
    }

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

    cmd.setCallback((_cmd, _origin, output, _results) => {
        // 如果有选项就进行判断
        // switch (results.action) {
        //     case "":
        //         return output.success(`start "${results.name}"`)
        // }

        // 默认/backup指令后执行的代码
        output.success(`Hello??? Any people there?`)
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