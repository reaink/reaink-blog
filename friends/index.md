---
lang: zh-CN
title: 伙伴们
description: 友情链接推荐
---

这里汇集好学、上进的伙伴们的个人站点，若您想要交换友链，请留言哦，我收到邮件后会尽快添加！

<div class="friends-box">
  <div v-for="item of friendsList" :key="item.name" class="card-box" @click="openNewTab(item.href)">
    <img v-if="item.avatar" :src="item.avatar" :alt="item.name + '头像'" class="card-box-avatar" />
    <div class="card-box-right">
      <span class="card-box-name">{{ item.name }}</span>
      <p class="card-box-bio">{{ item.bio }}</p>
    </div>
  </div>
</div>

暂时失效的站点：
<div class="friends-box">
  <div v-for="item of failsList" :key="item.name" class="card-box" @click="openNewTab(item.href)">
    <img v-if="item.avatar" :src="item.avatar" :alt="item.name + '头像'" class="card-box-avatar" />
    <div class="card-box-right">
      <span class="card-box-name">{{ item.name }}</span>
      <p v-if="item.bio" class="card-box-bio">{{ item.bio }}</p>
    </div>
  </div>
</div>

<script setup>
  import { ref, onMounted } from 'vue'
  const friendsList = ref([])
  const failsList = ref([])

  const fillAvatar = 'https://1.gravatar.com/avatar/d41d8cd98f00b204e9800998ecf8427e?s=50&amp;d=mm&amp;r=x'
  const friendsData = [
    {
      name: `Ryan4Yin's Space`,
      avatar: 'https://thiscute.world/avatar/myself.webp',
      href: 'https://thiscute.world',
      bio: '赞美快乐~',
      status: true,
    },
    {
      name: `Yutent Bash Blog`,
      avatar: fillAvatar,
      href: 'https://yutent.top',
      bio: '那些年的记忆',
      status: false,
    },
    {
      name: `Jdragon`,
      avatar: 'https://jdragon.club/upload/2019/7/timg-94aa8d5435584189995800b6d2743349.jpg',
      href: 'https://jdragon.club',
      bio: 'Hello world!'
    },
    {
      name: `椎咲良田`,
      avatar: fillAvatar,
      href: 'https://sanshiliuxiao.top',
      bio: '快走吧 趁风停止之前',
      status: false,
    },
    {
      name: `StarryFK 个人博客`,
      avatar: 'https://www.starryfk.com/usr/uploads/head.png',
      href: 'https://www.starryfk.com',
      bio: '快走吧 趁风停止之前'
    },
    {
      name: `小坤哥哥博客`,
      avatar: 'https://whk.red/wp-content/uploads/2021/11/logo%E5%A4%9C.png',
      href: 'https://whk.red',
      bio: '快走吧 趁风停止之前'
    },
    {
      name: `真的二嘉`,
      avatar: 'https://52dreamsky.cn/logo.png',
      href: 'https://www.52dreamsky.cn',
      bio: '让我的努力，配得上明天的梦想！'
    },
    {
      name: `xingaqr`,
      avatar: fillAvatar,
      href: 'https://www.xingaqr.com/',
      bio: '',
      status: false,
    },
    {
      name: `震邦笔记`,
      avatar: fillAvatar,
      href: 'http://i-lab.top',
      bio: '',
      status: false,
    },
    {
      name: `澈丹大叔`,
      avatar: 'https://marx.run/images/R-C_1650201697744.jpg',
      href: 'https://marx.run/',
      bio: '不积跬步，无以至千里。不积小流，无以成江海',
    },
  ]

  function shuffle(arr) {
    let temp = JSON.parse(JSON.stringify(arr))
    let i = temp.length;
    while (i) {
      let j = Math.floor(Math.random() * i--);
      [temp[j], temp[i]] = [temp[i], temp[j]];
    }
    return temp
  }

  function groupDataList() {
    let fineList = []
    let offineList = []
    for (let it of friendsData) {
      if (it.status === undefined || it.status) {
        fineList.push(it)
      } else {
        offineList.push(it)
      }
    }
    return { fineList, offineList }
  }
  
  onMounted(() => {
    const { fineList, offineList } = groupDataList()
    friendsList.value = shuffle(fineList)
    failsList.value = shuffle(offineList)
  })
  
  function openNewTab(href) {
    open(href)
  }
</script>

<style lang="scss">
  .friends-box {
    display: grid;
  }
  .card-box {
    box-sizing: border-box;
    min-height: 80px;
    display: flex;
    align-items: center;
    margin: 10px;
    padding: 10px;
    border-radius: 15px;
    background: transparent;
    border: 1px solid #999;
    &:hover {
      box-shadow: 0 0 2px #ccc;
      cursor: pointer;
    }
    &:focus, &:active {
      background: rgba(100, 100, 100, 0.5) !important;
    }
    &-avatar {
      width: 50px;
      height: 50px;
      object-fit: contain;
    }
    &-right {
      margin-left: 10px;
    }
    &-name {
      font-size: 20px;
    }
  }
  @media (min-width: 768px) {
    .friends-box {
      grid-template-columns: 50% 50%;
    }
    .card-box {
      min-height: 120px;
      &-avatar {
        width: 80px;
        height: 80px;
      }
      &-name {
        font-size: 25px;
        margin-left: 12px;
      }
    }
  }
</style>
