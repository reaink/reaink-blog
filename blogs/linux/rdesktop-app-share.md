---
title: rdesktop安装及使用方式总结
date: 2019-11-7 13:26:10
categories: ['运维']
tags: ['Linux']
---

## rdesktop 安装

> 此处以 Archlinux 系演示 yay

```bash
yay -S rdesktop
```

<!-- more -->

## 连接远程 windows 服务器或 windows 桌面

```bash
rdesktop -u [Administrator] -p [password] [ip] -r sound:[on|off] -g [80%]
```

### 可用选项：

| 选项 | 参数           | 功能                                                    |
| :--: | :------------- | :------------------------------------------------------ |
|  -u  | 用户名         |                                                         |
|  -p  | 用户密码       |                                                         |
|  ip  | 服务器 IP 地址 |                                                         |
|  -r  | 扩展项         | 其他扩展设置如 sound disk 等 具体见 man rdesktop 中     |
|  -g  | 宽度百分比     | 显示分辨率设置旧版本以 1024\*768 新版本以屏幕宽度百分比 |
