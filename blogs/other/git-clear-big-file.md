---
title: git清理仓库历史文件缩减仓库
date: 2019-12-8 06:31:20
categories: ['其他']
tags: ['Git', '其他', '记录']
---

> 仓库更新中遇到仓库使用越久.git 文件夹中内容占用越大，迭代中会有路径迁移但.git 中文件持续保留。需要清理的情况。在此推荐使用 bfg 来清理仓库历史遗留的无需文件

<!-- more -->

[bfg][001]是一款使用 java 编写的清理 git 仓库的程序，所以运行时需要 java 环境。它的运行速度是 git 自带的 git filter-branch 来清理速度快 10-720 倍。

## 克隆镜像源

克隆仓库的源镜像到本地 使用 --mirror 来克隆，如：

```bash
git clone --mirror http://xxx.com/xxx
```

克隆完成后会在克隆目录中创建.git 文件夹，当前路径也就成为克隆仓库的根路径

## 下载 bfg 程序

> 注意：bfg 需要 java 环境才可以运行 请先安装 java 运行环境后再使用

下载 bfg.jar 到本地 [下载][002]

## 使用 bfg 清理历史文件

> 执行删除前建议备份仓库以防误操作同步至仓库数据丢失

在清理前可能会需要查看那些文件较大，推荐使用 [Antony Stubbs][003] 所写的脚本文件来查找较大文件：

[下载脚本][003]

运行：

```bash
./git_find_big.sh
```

检索出文件 或 目录名

删除**文件**：

```bash
java -jar bfg.jar --delete-files filename
```

删除**文件夹**：

```bash
java -jar bfg.jar --delete-folder foldername
```

清空 reflog 并且让 gc 生效删除操作：

```bash
git reflog expire --expire=now --all && git gc --prune=now --aggressive
```

推送至仓库：

```bash
git push
```

> 主要几个分支返回提交成功即可确定已同步成功，PR 可能会返回失败但不影响

> 如果有其他人克隆项目，再次 pull 可能会返回失败，重新克隆仓库即可

参考文章：

https://rtyley.github.io/bfg-repo-cleaner/

https://linux.cn/article-8556-1.html

[001]: https://github.com/rtyley/bfg-repo-cleaner
[002]: https://search.maven.org/classic/remote_content?g=com.madgag&a=bfg&v=LATEST
[003]: https://stubbisms.wordpress.com/2009/07/10/git-script-to-show-largest-pack-objects-and-trim-your-waist-line/
[004]: ./file/git_find_big.sh
