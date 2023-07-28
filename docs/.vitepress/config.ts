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
        text: 'Introduction',
        items: [
          { text: 'Getting started', link: '/getting-started' },
          { text: 'Components', link: '/components' }
        ]
      },
      {
        text: 'Component APIs',
        items: [
          { text: 'Bottom app bar', link: '/components/bottom-app-bar' },
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
          { text: 'Checkbox', link: '/components/checkbox' },
          { text: 'Dialog', link: '/components/dialog' },
          { text: 'Menu', link: '/components/menu' },
          { text: 'Navigation bar', link: '/components/navigation-bar' },
          { text: 'Navigation drawer', link: '/components/navigation-drawer' },
          { text: 'Navigation rail', link: '/components/navigation-rail' },
          { text: 'Select', link: '/components/select' },
          { text: 'Snackbar', link: '/components/snackbar' },
          { text: 'Switch', link: '/components/switch' },
          { text: 'Text field', link: '/components/text-field' },
          { text: 'Top app bar', link: '/components/top-app-bar' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/halcyon-vue/halcyon-vue' }
    ],
    footer: {
      message: 'Made with ❤ by <a href="https://autumns.page">Autumn</a>',
      copyright: '© 2023-present under MIT'
    },
    search: {
      provider: 'local',
      options: {
        
      }
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
