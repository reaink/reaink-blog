---
title: hackintosh安装与设置教程整理
date: 2020-3-22 19:52:00
categories: ['其他']
tags: ['Mac', '系统', '教程']
---
> Hackintosh 顾名思义黑苹果系统，在尝试过 windows 与 Linux 系统后，再试试这个系统简直神清气爽，建议大家也试试。在下面将给大家简述安装的流程。

<!-- more -->

## 安装准备步骤

1. 「U 盘」一个 U 盘大小**大于**所下载版本的 dmg 包的大小，建议使用 16GB 的 U 盘。
2. 「刻录工具」建议使用[Etcher][Etcher]
3. 「镜像包」建议到[黑果小兵的部落阁][heiguo]寻找下载新版本的 dmg 下载（推荐尾缀 UEFI 版本）

## 安装步骤分析

1. 设置好系统 U 盘
2. 为 MacOS 腾出安装分区（建议大与 80G）
3. 启动：目前多数是使用 Clover 根据自己电脑调整启动使用的驱动文件（多数无法进入是显卡驱动文件的问题）
4. 修正音频等其他问题（更改使用的驱动文件）

## 操作步骤

1. 打开 Etcher 选择 DMG 并且选择 U 盘后执行，等待完成后重启电脑。
2. 进入电脑快捷启用选项（若没有快捷启动选项便进入 BIOS 选项找启动项）进入 U 盘引导。
3. 进入后可以看到 Clover 的选项，寻找 Boot Install MacOS 并且进入。

等待进入……

将会加载 MacOS 使用工具页面

1. 进入磁盘工具，选择要安装的分区，在此格式化为 APFS 格式后返回
2. 选择安装 MacOS，等待完成（在此时间根据机器性能而定 ，等待完成）
3. 根据引导自己设置账户等等完成启动
4. 安装[Clover Configurator][cloverconfigurator]，选择挂载 EFI 分区
5. 将 U 盘 Clover 各种文件移动到电脑 EFI 分区中
6. 拔掉 U 盘，在 BIOS 中，叫 clover 设置为首选第一个启动即可
7. 完成安装

## 优化其他分区访问

在此使用[FUSE][FUSE]来自动挂在 ntfs 等格式为读写

## Catalina 开启任何来源

在 MacOS Catalina 系统中隐藏了任何来源开关，关闭 Gatekeeper，在终端中输入并回车执行（输入开机时的密码无回显，输入完回车即可）

```bash
sudo spctl --master-disable
```

执行完成后，即可在设置 → 安全与隐私中通用页面下开启任何来源

## Catalina 中无法对系统分区进行写操作

终端中执行，重新挂在/目录，即可对/目录有写的权限

```
sudo mount -uw /
```

## 笔记本电源剩余电量不显示

部分笔记本只需要将 [ACPIBatteryManager.kext][acpibatterymanager] 放在 /EFI/CLOVER/kexts/Other 路径下之后，重启即可正常显示电源信息。

若无法显示，则需要手动提取 DSDT.aml 文件，再修改后才能正常显示

先创建一个 DSDT 文件夹来放下面提取出的文件

1. 提取 DSDT.aml 文件

   重启电脑至 Clover 界面，按 F4 键提取（没有提示）。启动后，使用[Clover Configurator][cloverconfigurator]挂载 EFI 分区，进入路径 /EFI/CLOVER/ACPI/origin/ 路径，将其中 DSDT 开头 和 SSDT 开头 的所有文件拷贝出来至 DSDT 文件夹中。
2. 使用 iasl 反编译 DSDT

   [下载 iasl 程序][iasl]放在 DSDT 目录下

   在 DSDT 文件夹下创建一个 refs.txt 文件辅助编译，在文件中写入以下内容

   ```bash
   External(MDBG, MethodObj, 1)
   External(_GPE.MMTB, MethodObj, 0)
   External(_SB.PCI0.LPCB.H_EC.ECWT, MethodObj, 2)
   External(_SB.PCI0.LPCB.H_EC.ECRD, MethodObj, 1)
   External(_SB.PCI0.LPCB.H_EC.ECMD, MethodObj, 1)
   External(_SB.PCI0.PEG0.PEGP.SGPO, MethodObj, 2)
   External(_SB.PCI0.GFX0.DD02._BCM, MethodObj, 1)
   External(_SB.PCI0.SAT0.SDSM, MethodObj, 4)
   External(_GPE.VHOV, MethodObj, 3)
   External(_SB.PCI0.XHC.RHUB.TPLD, MethodObj, 2)
   ```

   检查下目前 DSDT 文件夹下应该有以下文件

   ```
   DSDT/
   	iasl
   	refs.txt
   	DSDT.aml
   	DSDT-xxx.aml(任意个DSDT开头的文件)
   	SSDT-xxx.aml(任意个SSDT开头的文件)
   ```

   在 DSDT 目录下打开终端，执行

   ```bash
   ./iasl -da -dl -fe refs.txt DSDT.aml SSDT*.aml
   ```

   待执行完毕，将会输出同样数量的以.dsl 后缀结尾的文件
3. 修改 DSDT.dsl 文件

   [下载 MaciASL 程序][maciasl]，然后使用 MaciASL 打开 DSDT.dsl

   > 如果下载的最新版本打开报错，请下载历史版本
   >

   点击 Compile 查看输出信息 Err 数量为 0 则为最好。

   点击 Patch，在此需要寻找适合自己机型的 Patch.txt 信息（如果没有则需要自己手动写，较麻烦）

   寻找 Patch 文本可以到 [Laptop-DSDT-Patch][Laptop-DSDT-Patch]搜索自己笔记本型号

   将文件内容粘贴至文本区域，点击 apply，完成修改

   保存文件后，在菜单栏 File -> Save As… 打开另存为面板后，修改保存格式为 ACPI Machine Language Binary 保存下来
4. 将保存下来的 DSDT.aml 拷贝至 /EFI/CLOVER/ACPI/patched 路径下，重启以验证是否成功

## 蓝牙无法关闭

目前仅测试了 Intel 蓝牙驱动程序

[下载][intelbluetooth] 最新 IntelBluetooth，压缩包其中包括 IntelBluetoothFirmware.kext 与 IntelBluetoothInjector.kext 将两个文件放至 /EFI/CLOVER/kexts/Other 路径下之后，重启检查蓝牙是否正常可以关闭。

> 以后有什么补充，我将继续在本文中添加更新。

[etcher]: https://etcher.io
[heiguo]: https://blog.daliansky.net/categories/下载/镜像/
[cloverconfigurator]: https://blog.daliansky.net/Clover-Configurator-Chinese-Version.html
[fuse]: https://osxfuse.github.io/
[acpibatterymanager]: https://bitbucket.org/RehabMan/os-x-acpi-battery-driver/downloads/
[iasl]: https://bitbucket.org/RehabMan/acpica/downloads/
[laptop-dsdt-patch]: https://github.com/RehabMan/Laptop-DSDT-Patch/tree/master/battery
[maciasl]: https://bitbucket.org/RehabMan/os-x-maciasl-patchmatic/downloads/
[intelbluetooth]: https://github.com/zxystd/IntelBluetoothFirmware/releases
