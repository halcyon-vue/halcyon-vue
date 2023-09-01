import {addTemplate, defineNuxtModule, addComponent, createResolver} from '@nuxt/kit'
import { HalcyonPluginOptions, HalcyonTheme, makeTheme } from './plugin'
import baseTheme from './base'
import reset from './reset'
import * as components from './index'

export interface HalcyonNuxtOptions {
  halcyon?: HalcyonPluginOptions<HalcyonTheme>,
  excludeBase?: boolean,
  excludeReset?: boolean
}

export default defineNuxtModule<HalcyonNuxtOptions>({
  meta: {
    name: 'halcyon-vue',
    configKey: 'halcyon',
    compatibility: {
      nuxt: '^3.0.0'
    }
  },
  setup(moduleOptions, nuxt) {
    const resolver = createResolver(import.meta.url)
    const theme = makeTheme(moduleOptions.halcyon ?? {})

    addTemplate({
      filename: 'halcyon-theme.css',
      getContents: () => theme
    })

    if (!moduleOptions.excludeBase) {
      addTemplate({
        filename: 'halcyon-base.css',
        getContents: () => baseTheme
      })
    }

    if (!moduleOptions.excludeReset) {
      addTemplate({
        filename: 'halcyon-reset.css',
        getContents: () => reset
      })
    }

    nuxt.options.css.push('halcyon-vue/style')
    nuxt.options.css.push('#build/halcyon-theme.css')
    nuxt.options.css.push('#build/halcyon-base.css')
    nuxt.options.css.push('#build/halcyon-reset.css')

    for (const component in components) {
      addComponent({
        name: component,
        filePath: resolver.resolve(`./components/${component}.vue`)
      })
    }
  }
})
