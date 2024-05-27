/**
 * 加载插件模块
 * (Start)
 */

/**
 * 加载插件
 */
function Loadplugin() {
    logger.setTitle(`\x1b[32m${plugin_name}\x1b[0m`) // 设置日志头
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
                            \x1b[33m`+ i18n.get("loaded_text_author") + `：` + i18n.get("loaded_text_author_nickname") + `                        \x1b[13047m` + i18n.get("loaded_text_version") + `：${plugin_version}[${i18nLocaleName}]\x1b[0m
===============================================================================================================`)


    logger.log(`\x1b[36m==============================${plugin_name}==============================\x1b[0m`)
    logger.log(`\x1b[3743m` + i18n.get("loaded_text_plugin_installed_success") + `\x1b[0m`)
    logger.log(`\x1b[3743m` + i18n.get("loaded_text_version") + `: \x1b[13047m${plugin_version}\x1b[0m`)
    logger.log(`\x1b[135m` + i18n.get("loaded_text_the_helps") + `\x1b[0m`)
    logger.log(`\x1b[31m` + i18n.get("loaded_text_copyright") + `\x1b[0m`)
    logger.log(`\x1b[33m` + i18n.get("loaded_text_plugins_github_storehouse") + `：` + i18n.get("loaded_text_plugins_github_storehouse_link") + `\x1b[0m`)
    logger.log(`\x1b[36m` + i18n.get("loaded_text_the_latest_log") + `\x1b[0m  \x1b[33m` + i18n.get("loaded_text_author") + `：` + i18n.get("loaded_text_author_nickname") + `\x1b[0m`)
    let a = i18n.get("auto_backup_status") + scheduled_tasks_status
    let b = i18n.get("auto_cleanup_status") + use_number_detection_status
    let c = i18n.get("debug_morelogs_status") + pluginConfig.get('Debug_MoreLogs')
    let d = i18n.get('debug_morelogs_player_status') + pluginConfig.get('Debug_MoreLogs_Player')
    let e = i18n.get('debug_morelogs_cron_status') + pluginConfig.get('Debug_MoreLogs_Cron')
    logger.log(a)
    logger.log(b)
    logger.log(c)
    logger.log(d)
    logger.log(e)
    logger.log(`\x1b[36m==============================${plugin_name}===============================\x1b[0m`)


    mc.listen("onServerStarted", () => {
        // 清理冗余备份压缩包
        Clean_Backup_Files()
        // 注册指令
        RegisterCmd()
    })
    mc.listen("onTick", () => {
        // 是否开启Cron定时任务
        if (scheduled_tasks_status) {
            // 检测时间是否匹配，然后调用函数
            checkCronAndRun(parsed, logCurrentTime)
        }
    })
}

/**
 * 加载插件模块
 * (End)
 */