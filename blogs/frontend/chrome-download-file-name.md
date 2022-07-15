---
title: 浏览器重命名下载文件的方法
date: 2019-07-16 18:42:58
categories: ['前端']
tags: ['JavaScript', '浏览器']
---

## Chrome 支持的方法

优点：简介直观
缺点：跨域不支持 非 chrome 不支持

```html
<a href="/a.png" download></a> // download属性 开启下载功能
<a href="/a.png" download="重命名.png"></a> //将以重命名.png来下载这个文件
```

<!-- more -->

## js 通用方式

<a href='https://www.jianshu.com/p/6545015017c4'>简书 - JavaScript 实现文件下载并重命名</a>
