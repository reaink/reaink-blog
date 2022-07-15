---
title: 优惠券余额结算累减实现思路
date: 2020-09-16 11:28:45
categories: ['后端']
tags: ['Idea']
---

> 句中 N1、N2 代表运行中次数

```javascript
originBalance 150
// 备份原始金额

countBalance 150
// 用于累减金额 同原始金额

couponBalance 100
// 单张优惠券金额

for:

    originBalance = countBalance
	N1 originBalance 150
	N2 originBalance 50

    countBalance = countBalance - couponBalance
	N1 countBalance 50

	    countBalance 150
	    couponBalance 100
	    // 更新累减余额 countBalance = 150 - 100 = 50

	N2 countBalance -50

	    countBalance 50
	    couponBalance 100
	    // 更新需要抵扣的金额 countBalance = 50 - 100 = -50

    used =
	countBalance === 0
	    ? couponBalance
	    : countBalance > 0  N1 // 成立
	    ? originBalance - countBalance
	    : Math.abs(originBalance) N2 // 前两个都不符合 成立这条

    N1 used 100
  	countBalance 50
  	couponBalance 100
  	originBalance 150
	// 成立 countBalance > 0
	// 更新券已使用 used = 150 - 50 = 100

    N2 used 50
  	countBalance -50
  	couponBalance 100
  	originBalance 50
	// 成立 Math.abs(originBalance)
	// 更新券已使用 used = Math.abs(50) = 50

    balance = couponBalance - used

    N1 balance 0
	couponBalance 100
	used 100
  	// 更新券余额 100 - 100 = 0

    N2 balance 50
	couponBalance 100
	used 50
	// 更新券余额 100 - 50 = 50


    if (countBalance <= 0) {
        N1
	    countBalance 50
	    //不成立 继续循环
        N2
	    countBalance -50
	    // 跳出循环
        break
    }
```
