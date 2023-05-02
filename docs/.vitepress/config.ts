import { defineConfig } from 'vitepress';
import { Halcyon } from "../../src/plugin";
import vueJsx from "@vitejs/plugin-vue-jsx";
import Icons from "unplugin-icons/vite";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Halcyon Docs",
  description: "Documentation for halcyon-vue",
  base: '/halcyon-vue/',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Components', link: '/components' }
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      },
      {
        text: 'Components',
        items: [
          { text: 'Button', link: '/components/button' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/auctumnus/halcyon' }
    ],
    footer: {
      message: 'Made with ❤ by <a href="https://autumns.page">Autumn</a>',
      copyright: '© 2023-present under MIT'
    }
  },
  vite: {
    plugins: [
      Halcyon(),
      Icons(),
      vueJsx(),
    ]
  }
})
