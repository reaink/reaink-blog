---
title: UniAPP TypeScript 路径跳转提示自动完成
date: 2022-02-14 16:59:51
categories: ['前端','小程序']
tags: ['JavaScript','TypeScript','UniAPP']
---
序：本文章在环境基于 [UniAPP (Vite/Vue3)](https://uniapp.dcloud.io/quickstart-cli?id=%e5%88%9b%e5%bb%bauni-app "使用Vue3/Vite版") 来添加路径跳转ts 自动完成支持

初始化项目

```bash
npx degit dcloudio/uni-preset-vue#vite my-vue3-project
```

## 〇、安装生成读取 json 文件生成dts

[unplugin-json-dts](https://github.com/flixcor/unplugin-json-dts/)插件

使用插件（此处以vite示例）

```ts
// vite.config.ts
import jsonDts from 'unplugin-json-dts/vite'
export default defineConfig({
  plugins: [
    jsonDts(),
  ],
})
```

## 一、添加 uni.ts 文件 推荐放在 `src/types/uni.ts`

```ts
import data from '../pages.json'

// 提取 pages 下所有 path 并返回对应类型
export function getUniPathOfPages() {
  return data.pages.map((p): `/${typeof p.path}` => `/${p.path}`)
}

// 获取并遍历 subPackages 下所有path 并拼接root值
export function getUniPathOfSubPackages() {
  return data.subPackages
    .map(it => it.pages.map((p): `/${typeof it.root}/${typeof p.path}` => `/${it.root}/${p.path}`))
    .flat(2)
}

// 获取tabBar下list内所有pagePath 且返回类型
export function getUniPathOfTabBar() {
  return data.tabBar.list.map((p): `/${typeof p.pagePath}` => `/${p.pagePath}`)
}

// 导出类型
export type GetUniPathOfPages =
  | ReturnType<typeof getUniPathOfPages | typeof getUniPathOfSubPackages>[number]
  | (string & {})

export type GetUniPathOfTabBar = ReturnType<typeof getUniPathOfTabBar>[number] | (string & {})
```

## 二、env.d.ts 中引用导出类型合并至Uni Namespace中

```ts
/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare namespace UniApp {
  interface NavigateToOptions {
    url: import('./types/uni').GetUniPathOfPages
  }
  interface RedirectToOptions {
    url: import('./types/uni').GetUniPathOfPages
  }
  interface SwitchTabOptions {
    url: import('./types/uni').GetUniPathOfTabBar
  }
}
```

## 参考

- [1] [二恒生大佬](http://xlboy.cn/)类型标注
