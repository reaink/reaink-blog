---
title: 服务器部署nginx子域名转换方式
date: 2019-09-29 13:05:07
categories: ['后端']
tags: ['Nginx']
---

## 配置服务器

1. 域名解析配置\*.xxx.xxx 转接到服务器 IP
2. 配置 nginx.conf

<!-- more -->

```nginx
server {
    listen  80;
    server_name xxx.xxx;
    rewrite ^(.*) https://$host$request_uri permanent;
    # 当访问http协议 无www二级域名时，修改访问至https地址并包含www
}
server {
    listen  443 ssl http2;
    server_name www.xxx.xxx;

    if ($host !~ "^www.xxx.xxx$") {
    # 当访问https，并且host不等于www二级域名时 修改至www
      rewrite ^(.*) https://${server_name}$1 permanent;
    }
    ... # https配置
}
server {
    listen  443 ssl http2;
    server_name xxx.xxx.xxx; # 子域名
    ... # 子域名配置 可正常访问
}
```

## 重启服务器

```bash
nginx -s reload
```
