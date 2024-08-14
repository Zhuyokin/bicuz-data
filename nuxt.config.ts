import path from 'node:path'
import { createRuntimeConfig, createViteConfig, useEnv } from './build'
import { pwa } from './config/pwa'
import { appDescription } from './constants/index'

const { viteEnv } = useEnv()

// vCOnsole相关配置
let vConsoleConfig: any[] = []
if (viteEnv.VITE_USE_VCONSOLE) {
  vConsoleConfig = [
    {
      src: '//unpkg.com/vconsole@latest/dist/vconsole.min.js',
      type: 'text/javascript',
      tagPosition: 'bodyClose',
    },
    { innerHTML: 'new VConsole()', tagPosition: 'bodyClose' },
  ]
}

// eruda配置
const erudaConfig = [
  {
    innerHTML: `
    ;(function () {
      const src = '//unpkg.com/eruda@latest/eruda.js';
      if(!/debug=true/.test(window.location)) return;
      document.write('<scr' + 'ipt src="' + src + '"></scr' + 'ipt>');
      document.write('<scr' + 'ipt>eruda.init();</scr' + 'ipt>');
    })();
    `,
    tagPosition: 'bodyClose',
  },
]

// 全局注入和app交互的window方法
const jsBridgeConfig: any[] = [
  {
    innerHTML: `
    window.js_sync_info = (token, id) => {
      console.log('获取客户端token222:', token)
      localStorage.setItem('token', token)
      if (id) localStorage.setItem('device_id', id);
    }`,
    tagPosition: 'bodyClose',
  },
]

export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@vite-pwa/nuxt',
    '@nuxt/eslint',
    '@vant/nuxt',
    'nuxt-lodash',
    '@vueuse/motion/nuxt',
  ],

  experimental: {
    // when using generate, payload js assets included in sw precache manifest
    // but missing on offline, disabling extraction it until fixed
    payloadExtraction: false,
    renderJsonPayloads: true,
    typedPages: true,
  },

  css: [
    '@unocss/reset/tailwind.css',
    '@/assets/styles/index.scss',
  ],

  nitro: {
    esbuild: {
      options: {
        target: 'esnext',
      },
    },
    prerender: {
      crawlLinks: false,
      routes: ['/'],
      ignore: ['/hi'],
    },
    // 启动压缩
    compressPublicAssets: true,
  },

  app: {
    head: {
      htmlAttrs: {
        lang: 'zh-CN',
      },
      viewport: 'width=device-width,initial-scale=1,user-scalable=no,viewport-fit=cover',
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      ],
      meta: [
        { name: 'description', content: appDescription },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
        { name: 'theme-color', media: '(prefers-color-scheme: light)', content: 'white' },
        { name: 'theme-color', media: '(prefers-color-scheme: dark)', content: '#222222' },
      ],
      script: [...jsBridgeConfig, ...vConsoleConfig, ...erudaConfig],
    },
    // pageTransition: { name: 'page', mode: 'out-in' },
  },

  pwa,

  devtools: {
    enabled: false,

    timeline: {
      enabled: true,
    },
  },

  features: {
    // For UnoCSS
    inlineStyles: false,
  },

  eslint: {
    config: {
      standalone: false,
    },
  },

  postcss: {
    plugins: {
      'cnjm-postcss-px-to-viewport': {
        unitToConvert: 'px', // 要转化的单位
        viewportWidth: 750, // UI设计稿的宽度
        unitPrecision: 6, // 转换后的精度，即小数点位数
        propList: ['*'], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
        viewportUnit: 'vw', // 指定需要转换成的视窗单位，默认vw
        fontViewportUnit: 'vw', // 指定字体需要转换成的视窗单位，默认vw
        minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
        mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
        replace: true, // 是否转换后直接更换属性值
        include: [],
        exclude: [], // 设置忽略文件，用正则做目录名匹配
        customFun: ({ file }: any) => {
          // 这个自定义的方法是针对处理vant组件下的设计稿为375问题
          const designWidth = path.join(file).includes(path.join('node_modules', 'vant')) ? 375 : 750
          return designWidth
        },
      },
    },
  },

  runtimeConfig: createRuntimeConfig(),

  vite: createViteConfig(),

  devServer: {
    host: '0.0.0.0',
    port: 3000,
  },
})
