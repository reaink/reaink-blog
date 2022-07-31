import { defineUserConfig } from 'vuepress'
import recoTheme from 'vuepress-theme-reco'

export default defineUserConfig({
  title: 'Rea\'s Home',
  description: '清风皓月，光景常新。',
  theme: recoTheme({
    style: '@vuepress-reco/style-default',
    logo: '/logo.png',
    author: 'Rea',
    authorAvatar: '/logo.png',
    docsRepo: 'https://github.com/reaink/reaink-blog',
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
    navbar: [
      { text: '首页', link: '/' },
      { text: '分类', link: '/categories/qianduan/1/' },
      { text: '标签', link: '/tags/JavaScript/1/' },
      { text: '开源', children: [
        { text: '键道议题', link: 'https://jd.rea.ink' },
        { text: '星空输入法', link: 'https://xkinput.github.io' },
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
