<div align="center">

![LSE-EasyBackuper](https://socialify.git.ci/MengHanLOVE1027/lse-easybackuper/image?custom_language=JavaScript&description=1&font=Inter&forks=1&issues=1&language=1&logo=https://avatars.githubusercontent.com/u/99132833?v=4&name=1&owner=1&pattern=Plus&pulls=1&stargazers=1&theme=Auto)
  <!-- <a href="https://github.com/MengHanLOVE1027/lse-easybackuper/releases">
    <img src="https://avatars.githubusercontent.com/u/99132833?v=4" alt="Logo" width="128" height="128">
  </a> -->
<h3>LSE-EasyBackuper</h3>

<p>
  <b>一个基于 LeviLamina 的轻量级、高性能、功能全面的Minecraft服务器热备份插件。 </b>

Powered by LeviLamina.<br>
</p>
</div>
<div align="center">

[![README](https://img.shields.io/badge/README-中文|Chinese-blue)](README.md) [![README_EN](https://img.shields.io/badge/README-英文|English-blue)](README_EN.md)

[![Github Version](https://img.shields.io/github/v/release/MengHanLOVE1027/lse-easybackuper)](https://github.com/MengHanLOVE1027/lse-easybackuper/releases) [![GitHub License](https://img.shields.io/badge/License-AGPL%203.0-blue.svg)](https://opensource.org/licenses/AGPL-3.0) [![LSE Version](https://img.shields.io/badge/LSE-0.10.2+-yellow.svg)](https://github.com/LeviLamina/LeviLamina) [![Platform](https://img.shields.io/badge/Platform-LeviLamina-9cf.svg)](https://levimc.org/) [![Downloads](https://img.shields.io/github/downloads/MengHanLOVE1027/lse-easybackuper/total.svg)](https://github.com/MengHanLOVE1027/lse-easybackuper/releases)

</div>

---

## 📖 简介

LSE-EasyBackuper 是一个专为 LeviLamina 服务器设计的备份插件，旨在简化备份过程，提高备份效率，并确保数据安全。它支持自动定时备份、智能清理、实时通知、多线程加速、多格式支持、备份恢复和多语言等功能，为服务器管理员提供全面的数据保护解决方案。

---

## ✨ 核心特性

| 特性              | 描述                              |
| ----------------- | --------------------------------- |
| 🔄**自动定时备份** | 基于cron表达式的智能定时备份      |
| 🧹**智能清理**     | 自动清理旧备份，节省磁盘空间      |
| 📢**实时通知**     | 备份前后向玩家发送通知            |
| ⚡**多线程加速**   | 并行文件处理，大幅提升备份速度    |
| 🗜️**多格式支持**   | 支持 7z、zip、tar.gz 多种压缩格式 |
| 🔄**备份恢复**     | 一键恢复备份，支持自动重启        |
| 🌍**多语言界面**   | 支持中文、英文等多语言显示        |
| 📝**完整日志系统** | 彩色日志输出，按日期分割存储      |

---

## 🗂️ 目录结构

```
服务器根目录/
├── logs/
│   └── EasyBackuper/                    # 日志目录
│       └── easybackuper_YYYYMMDD.log    # 主日志文件
├── plugins/
│   └── EasyBackuper/                    # 插件资源目录
│       ├── 7za.exe                      # 7z压缩工具
│       ├── EasyBackuper.js              # 插件主文件
│       ├── config/
│       │   └── EasyBackuper.json        # 配置文件
│       └── langs/                       # 多语言文件
│           ├── zh_CN.json               # 简体中文
│           └── en_US.json               # 英文
└── backup/                              # 备份文件存储目录
```

---

## 🚀 快速开始

### 安装步骤

1. **下载插件**
   - 从 [Release页面](https://github.com/MengHanLOVE1027/lse-easybackuper/releases) 下载最新版本
   - 或从 [MineBBS](https://www.minebbs.com/resources/easybackuper-eb.7771/) 获取

2. **安装插件**
   ```bash
   # 将插件压缩包解压到服务器 plugins 目录
   ```
   或者使用 lip 命令安装：
   ```sh
   lip install github.com/MengHanLOVE1027/lse-easybackuper
   ```

3. **安装依赖文件**
   - 将 `7za.exe`、`mhlove-truncate.exe` 放入 `plugins/lse-easybackuper/` 目录 (mhlove-truncate.exe 可从 [Release页面](https://github.com/MengHanLOVE1027/lse-easybackuper/releases) 或者 [MineBBS](https://www.minebbs.com/resources/easybackuper-eb.7771/) 下载的压缩包中获取)

4. **启动服务器**
   - 重启服务器或使用 `/ll reload EasyBackuper` 命令
   - 插件会自动生成默认配置文件

---

## ⚙️ 配置详解

配置文件位于：`plugins/lse-easybackuper/config/EasyBackuper.json`

### 📋 主要配置项

```json
{
  // 🌐 国际化设置
  "Language": "zh_CN",  // 可选: zh_CN, en_US
  
  // 🗜️ 压缩配置
  "Compression": {
    "method": "zip",  // 压缩算法: 7z, zip, tar
    "exe_7z_path": "./plugins/EasyBackuper/7za.exe",  // 7z可执行文件路径
    "formats": {
      "7z": {
        "extension": ".7z",
        "compress_args": ["a", "-t7z", "-mx=5"],
        "extract_args": ["x", "-y"]
      },
      "zip": {
        "extension": ".zip",
        "compress_args": ["a", "-tzip", "-mx=5"],
        "extract_args": ["x", "-y"]
      },
      "tar": {
        "extension": ".tar.gz",
        "compress_args": ["a", "-ttar", "-mx=5"],
        "extract_args": ["x", "-y"]
      }
    }
  },
  
  // 📁 存储路径
  "BackupFolderPath": "./backup",  // 备份文件保存路径
  
  // ⚡ 性能配置
  "Max_Workers": 4,  // 并发线程数
  
  // 🧹 自动清理
  "Auto_Clean": {
    "Use_Number_Detection": {
      "Status": false,    // 启用自动清理
      "Max_Number": 5,   // 最大保留备份数量
      "Mode": 0          // 0=开服后清理, 1=备份后清理, 2=开服时清理
    }
  },
  
  // ⏰ 定时任务
  "Scheduled_Tasks": {
    "Status": false,                // 启用定时备份
    "Cron": "*/30 * * * * *"      // Cron表达式，每30秒
  },
  
  // 📢 通知设置
  "Broadcast": {
    "Status": true,                // 启用广播通知
    "Time_ms": 5000,              // 备份前通知时间（毫秒）
    "Title": "[OP]要开始备份啦~",
    "Message": "将于 5秒 后进行备份！",
    "Server_Title": "[Server]Never Gonna Give You UP~",
    "Server_Message": "Never Gonna Let You Down~",
    "Backup_success_Title": "备份完成！",
    "Backup_success_Message": "星级服务，让爱连接",
    "Backup_wrong_Title": "很好的邢级服务，使我备份失败",
    "Backup_wrong_Message": "RT"
  },
  
  // 🔍 调试设置
  "Debug_MoreLogs": false,         // 启用详细日志（控制台）
  "Debug_MoreLogs_Player": false,  // 启用详细日志（玩家）
  "Debug_MoreLogs_Cron": false,   // 启用详细日志（Cron任务）

  // 🔄 恢复配置
  "Restore": {
    "backup_old_world_before_restore": true,  // 恢复前备份当前世界
  }
}
```

### ⏰ Cron表达式示例

| 表达式           | 描述        |
| ---------------- | ----------- |
| `*/30 * * * * *` | 每30秒一次  |
| `0 0 3 ? * *`    | 每天凌晨3点 |
| `0 0 */2 ? * ?`  | 每2小时一次 |
| `0 0 0 ? * MON`  | 每周一零点  |

---

## 🎮 命令手册

### 备份管理命令

| 命令             | 权限 | 描述               |
| ---------------- | ---- | ------------------ |
| `/backup`        | OP   | 立即执行手动备份   |
| `/backup init`   | OP   | 重新初始化配置文件 |
| `/backup reload` | OP   | 重载配置文件       |

### 恢复管理命令

| 命令                   | 权限 | 描述                          |
| ---------------------- | ---- | ----------------------------- |
| `/restore list <数量>` | OP   | 显示所有可用备份 (可指定数量) |
| `/restore <索引>`      | OP   | 恢复指定备份                  |
| `/restore`             | OP   | 显示恢复帮助                  |

---

## 🔧 高级功能

### 🗜️ 7z压缩配置

1. **下载7za.exe**
   ```bash
   # 从 7-Zip官网 下载7za.exe
   # 放置在 plugins/EasyBackuper/ 目录
   ```

2. **修改配置**
   ```json
   {
     "Compression": {
       "method": "7z",
       "exe_7z_path": "./plugins/EasyBackuper/7za.exe"
     }
   }
   ```

3. **重载配置**
   ```bash
   /backup reload
   ```

### 🚀 多线程优化建议

| 服务器类型         | 推荐线程数 | 说明            |
| ------------------ | ---------- | --------------- |
| 小型服务器 (1-2核) | 2-4        | 避免占用过多CPU |
| 中型服务器 (4核)   | 4-6        | 平衡性能与资源  |
| 大型服务器 (8+核)  | 6-8        | 最大化备份速度  |

> ⚠️ **注意**：线程数过高可能导致服务器卡顿，请根据实际情况调整。

---

## 🛠️ 故障排除

### 常见问题

<details>
<summary><b>❓ 自动备份未执行</b></summary>

**检查步骤：**
1. 确认定时任务状态已启用
   ```json
   "Scheduled_Tasks": {
     "Status": true,
     ...
   }
   ```
2. 检查cron表达式格式
3. 查看日志文件
   ```bash
   cat logs/EasyBackuper/easybackuper_*.log
   ```
</details>

### 📊 日志文件说明

| 日志文件 | 位置                                                  | 用途                       |
| -------- | ----------------------------------------------------- | -------------------------- |
| 主日志   | `logs/EasyBackuper/easybackuper_YYYYMMDD.log`         | 记录备份、清理等常规操作   |

---

## 📄 许可证

本项目采用 **AGPL-3.0** 许可证开源。

```
版权所有 (c) 2023 梦涵LOVE

本程序是自由软件：您可以自由地重新发布和修改它，
但必须遵循AGPL-3.0许可证的条款。
```

完整许可证文本请参阅 [LICENSE](LICENSE) 文件。

---

## 👥 贡献指南

欢迎提交 Issue 和 Pull Request！

1. **Fork 项目仓库**
2. **创建功能分支**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **提交更改**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **推送分支**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **创建 Pull Request**

---

## 🌟 支持与反馈

- **GitHub Issues**: [提交问题](https://github.com/MengHanLOVE1027/lse-easybackuper/issues)
- **MineBBS**: [讨论帖](https://www.minebbs.com/resources/easybackuper-eb.7771/)
- **作者**: 梦涵LOVE

---

<div align="center">

**⭐ 如果这个项目对你有帮助，请给我们一个 Star！**

[![Star History Chart](https://api.star-history.com/svg?repos=MengHanLOVE1027/lse-easybackuper&type=Date)](https://star-history.com/#MengHanLOVE1027/lse-easybackuper&Date)

</div>
