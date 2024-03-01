// LiteLoader-AIDS automatic generated
/// <reference path="c:\Users\HeYuHan\.liteloader/dts/HelperLib-master/src/index.d.ts"/>


ll.registerPlugin(
    /* name */ "EasyBackuper",
    /* introduction */ "",
    /* version */[0, 0, 3],
    /* otherInformation */ null
);


/**
 * 注册指令
 */
function RegisterCmd() {
    const cmd = mc.newCommand("easybackuper", "简单化的LSE备份插件 v0.0.3-beta 作者: 梦涵LOVE", PermType.GameMasters);
    cmd.setAlias("backup"); // 设置别名

    cmd.setEnum("ChangeAction", ["add", "remove"]); // 添加枚举选项
    cmd.setEnum("ListAction", ["list"]); // 同上

    cmd.mandatory("action", ParamType.Enum, "ChangeAction", 1); // 赋予指令选项属性(展开枚举选项,必选参数)
    cmd.mandatory("action", ParamType.Enum, "ListAction", 1); // 同上
    cmd.mandatory("name", ParamType.RawText); // 同上
    cmd.optional("abcd", ParamType.RawText); // 同上(可选)

    cmd.overload(["ChangeAction", "name", "abcd"]); // 指令重载(必须有的且我不理解的东西)
    cmd.overload(["ListAction"]); // 同上

    cmd.setCallback((_cmd, _origin, output, results) => {
        switch (results.action) {
            case "add":
                return output.success(`add "${results.name} ${results.abcd}"`);
            case "remove":
                return output.success(`remove "${results.name} ${results.abcd}"`);
            case "list":
                return output.success(`Name List:`);
        }
    });

    cmd.setup(); // 指令初始化(必须)
};

/**
 * 加载插件
 */
function Loadplugin() {
    logger.setTitle("EasyBackuper"); // 设置日志头
    logger.log("Hello World!");
    logger.log("Hello World!");
    logger.log("Hello World!");
    logger.log("Hello World!");
    colorLog('blue', "Hello World!"); // 输出带颜色的文本
    mc.sendCmdOutput("Hello LegacyScriptEngine!"); // 模拟产生一个控制台命令输出

    mc.listen("onServerStarted", () => {
        RegisterCmd();
    });
};

Loadplugin();