import { defineConfig } from 'vitepress';
import { Halcyon } from "../../src/plugin";
import vueJsx from "@vitejs/plugin-vue-jsx";
import Icons from "unplugin-icons/vite";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Halcyon Docs",
  description: "Documentation for halcyon-vue",
  base: '/halcyon-vue/',
  head: [
    /* <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&family=Roboto+Flex:wght@400;500;700&display=swap" rel="stylesheet">
*/
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', { href: 'https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&family=Roboto+Flex:wght@400;500;700&display=swap', rel: 'stylesheet' }],

  ],
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
          { text: 'Dialog', link: '/components/dialog' },
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
