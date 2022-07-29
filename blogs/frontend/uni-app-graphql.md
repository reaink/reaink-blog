---
title: UniAPP 中使用 GraphQL 支持的问题记录及解决方案
date: 2022-01-10 16:49:51
categories: ['前端']
tags: ['JavaScript', 'GraphQL', 'UniAPP', 'Vue']
---
本教程基于 [UniAPP (Vite/Vue3)](https://uniapp.dcloud.io/quickstart-cli?id=%e5%88%9b%e5%bb%bauni-app "使用Vue3/Vite版") 来添加 GraphQL 支持

初始化项目

```bash
npx degit dcloudio/uni-preset-vue#vite my-vue3-project
```

以下正题

## 一、安装Villus（GraphQL客户端）

> [Villus](https://villus.logaretm.com/ "Villus官网") 是vue.js的一个小而快速的graphql客户端，支持Vue3 及Composition API。

1. 添加villus包

```shell
pnpm add villus graphql
or
npm add villus graphql
or
yarn add villus graphql
```

2. 安装到Vue项目

* 创建Villus插件包（这里示例命名为gql.ts）

`src/plugins/gql.ts`

```ts
import { getToken } from '~/utils/token'
import { createClient, fetch } from 'villus'

type Methods = 'OPTIONS' | 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'TRACE' | 'CONNECT'

// 此处重写fetch，请求采用UniAPP提供的uni.request
const fetchPlugin = fetch({
  fetch(url, options) {
    let token = getToken()
    return new Promise((resolve, reject) => {
      uni.request({
        url: url.toString(),
        method: options?.method as Methods,
        data: options?.body as any,
        header: {
          ...options?.headers,
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        success(res) {
          return resolve({
            ok: true,
            status: res.statusCode,
            headers: res.header,
            text: async () => JSON.stringify(res.data),
            json: async () => res.data,
          } as Response)
        },
        fail(e) {
          return reject(e)
        },
      })
    })
  },
})

export const apolloClient = createClient({
  url: 'http://localhost:4001/graphql',
  use: [fetchPlugin],
})
```

* 引用创建的gql包

> 引入gql插件因为UniAPP中使用SSR模式，故支持CompositionAPI注入模式会无法找到初始Client，所以推荐使用[Vue插件方式](https://villus.logaretm.com/guide/setup#vue-plugin)安装

`main.ts`

```ts
import { apolloClient } from './plugins/gql'

export function createApp() {
  const app = createSSRApp(App)

  app.use(apolloClient)
  return {
    app,
  }
}
```

## 使用Villus请求

1. 在vue文件中使用
   ```vue
   <div v-if="isFetching">Loading...</div>
     <div v-else-if="error">
       oh no ...{{ error }}
     </div>
     <div v-else>
       {{ data }}
     </div>
   </div>

   <script lang="ts" setup>
   import { useQuery } from 'villus'

   const { data, isFetching, error } = useQuery({
     query: FindManyActorDocument,
   })
   </script>
   ```

## 添加Villus插件等工具

参考[官方介绍页](https://villus.logaretm.com/guide/plugins/)可以使用 [fetch]()(我们用来覆盖请求方法), [cache](https://villus.logaretm.com/plugins/cache), [dedup](https://villus.logaretm.com/plugins/dedup)等等库,

## 参考

- [1] [Villus官网](https://villus.logaretm.com/)
- [2] [在小程序框架Taro中使用 vue3+graphql](https://www.jianshu.com/p/fa90069ce280)
