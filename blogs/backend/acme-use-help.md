---
title: acme.sh 搭配 nginx 实现自动更新证书
date: 2020-10-07 23:47:45
categories: ['后端']
tags: ['SSL', '证书']
hideComments: false
---
使用[acme.sh](https://github.com/acmesh-official/acme.sh)申请 Let's Encrypt 网站证书

<!-- more -->

## 克隆安装

```bash
curl  https://get.acme.sh | sh
```

普通用户或 ROOT 账户皆可运行，这步操作将 acme.sh 安装至 `~/.acme.sh`并为你创建了一个 alias 方便使用
别名为：`acme.sh`，可以在 `source ~/.bashrc`或其他在使用的 shellrc 后使用

## 证书申请

> 申请有次数限制，确保网址可以正确访问到服务器，具体见：[速率限制](https://letsencrypt.org/zh-cn/docs/rate-limits/)

下面将使用 HTTP 方式来申请证书文件，也是官方推荐的一种，可以自动检测过期并自动更新。

```bash
acme.sh  --issue  -d mydomain.com -d www.mydomain.com  --webroot  /home/wwwroot/mydomain.com/
```

> 将 mydomain.com 替换为你的域名，将/home/wwwroot/mydomain.com/替换为你网站静态文件所在位置

申请完成后将输出证书 cer 与 key 到 `~/.acme/mydomain`下

## 安装证书

1. 输出可用的 key 与 pem

```bash
acme.sh --install-cert -d example.com \
--key-file       /home/wwwroot/ssl/cert.key  \
--fullchain-file /home/wwwroot/ssl/cert.key.pem \
--reloadcmd     "systemctl restart nginx"
```

> 具体输出位置据个人网站位置而定

2. 修改 nginx 配置文件，引入证书

```nginx
server {

	listen  443 ssl;
	server_name www.xx.com;

	...

	ssl_certificate     /home/wwwroot/ssl/cert.key.pem;
	ssl_certificate_key /home/wwwroot/ssl/cert.key;

	ssl_ciphers	HIGH:!aNULL:!MD5;
	ssl_protocols	TLSv1 TLSv1.1 TLSv1.2;

	ssl_session_timeout	5m;

	ssl_prefer_server_ciphers on;

	...

}
```

3. 重启 nginx 服务使配置生效

```bash
nginx -t
# 检测nginx配置是否正确

systemctl restart nginx
# 重启nginx
```

打开网站检查是否已配置成功

到此结束，祝你好运。
