import { defineUserConfig } from 'vuepress'
import recoTheme from 'vuepress-theme-reco'

export default defineUserConfig({
  title: 'Rea\'s Home',
  description: '清风皓月，光景常新。',
  theme: recoTheme({
    style: '@vuepress-reco/style-default',
    logo: '/logo.png',
    author: 'rea',
    docsRepo: 'https://github.com/vuepress-reco/vuepress-theme-reco-next',
    docsBranch: 'main',
    docsDir: 'example',
    lastUpdatedText: '最后更新',
    series: {
      '/docs/theme-reco/': [
        {
          text: 'module one',
          children: ['home', 'theme']
        },
        {
          text: 'module two',
          children: ['api', 'plugin']
        }
      ]
    },
    navbar:
    [
      { text: '首页', link: '/' },
      { text: '分类', link: '/categories/qianduan/1/' },
      { text: '标签', link: '/tags/JavaScript/1/' },
      { text: '联系', children: [
        { text: 'Github', link: 'https://github.com/reaink' },
        { text: 'Twitter', link: 'https://twitter.com/realqshu' },
      ] },
    ],
    commentConfig: {
      type: 'valine',
      options: {
        appId: 'W8A1Nryv6sKS831Vo4ye25FG-gzGzoHsz',
        appKey: 'DfGWbYHL1vdwHoywwGjlIxzg',
        placeholder: '填写邮箱可以收到回复提醒哦！',
        verify: true,
        notify: true,
        hideComments: true,
      }
    },
    footer: {
      record: '陕ICP备19019970号',
      recordLink: 'http://beian.miit.gov.cn/',
      startYear: 2018
    }
  }),
  // debug: true,
})