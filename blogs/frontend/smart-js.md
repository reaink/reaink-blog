---
title: 聪明的JavaScript
date: 2019-03-24 23:01:51
categories: ['前端']
tags: ['JavaScript', '日常']
---
## js 中给字符串数组快速取整

```javascript
//可以使用
parseInt('123.56') //123

//快捷操作
~~'123.56' //123
```

<!-- more -->

## js 中不声明中间变量交换变量内容

```javascript
;(function () {
  var a = 1,
    b = 2
  a = [b, (b = a)][0]
  /**
   * 1、设置 a 与 b 值。
   * 2、重新设置 a 的内容为一个数组，开始交换。
   * 数组参数二为表达式，重新赋值b等于a。
   * 仅将数组参数一赋值给a做交换。
   * 以达到不需要重新声明变量交换的目的。
   */
})()
a //not defined
b //not defined
```

## js 中 if 语句的简化方法

```javascript
//常规if
if (day) {
  alert('今天是周天')
  console.log(day)
}

//使用逻辑运算符简化if
day && alert('今天是周天'), console.log(day)
```
