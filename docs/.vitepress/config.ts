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
          {
            text: 'Buttons',
            collapsed: true,
            items: [
              { text: 'Common button', link: '/components/button' },
              { text: 'Icon button', link: '/components/icon-button' },
              { text: 'Floating action button', link: '/components/fab' },
              { text: 'Segmented button', link: '/components/segmented' },
            ]
          },
          { text: 'Switch', link: '/components/switch' },
          { text: 'Text field', link: '/components/text-field' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/halcyon-vue/halcyon-vue' }
    ],
    footer: {
      message: 'Made with ❤ by <a href="https://autumns.page">Autumn</a>',
      copyright: '© 2023-present under MIT'
    }
  },
  vite: {
    plugins: [
      Halcyon(),
      Icons({
        //scale: 1.2
      }),
      vueJsx(),
    ]
  }
})
