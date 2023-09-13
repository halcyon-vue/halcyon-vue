import { addComponent, addTemplate, defineNuxtModule } from '@nuxt/kit'
import { HalcyonPluginOptions, HalcyonTheme, makeTheme } from './plugin'
import baseTheme from './base'
import reset from './reset'

export interface HalcyonNuxtOptions {
  halcyon?: HalcyonPluginOptions<HalcyonTheme>,
  excludeBase?: boolean,
  excludeReset?: boolean
}

/*

    snackbar
*/

const componentNames = [
    'HButton',
    'HBottomAppBar',
    'HCard',
    'HCheckbox',
    'HCombobox',
    'HDialog',
    'HDivider',
    'HIconButton',
    'HFloatingActionButton',
    'HMenu',
    'HMenuButton',
    'HMenuDivider',
    'HNavigationBar',
    'HNavigationButton',
    'HNavigationDrawer',
    'HNavigationRail',
    'HSegmentedButton',
    'HSelect',
    'HSnackbar',
    'HSubmenu',
    'HSwitch',
    'HTextField',
    'HTooltip',
    'HTopAppBar',
]

export default defineNuxtModule<HalcyonNuxtOptions>({
  meta: {
    name: 'halcyon-vue',
    configKey: 'halcyon',
    compatibility: {
      nuxt: '^3.0.0'
    }
  },
  setup(moduleOptions, nuxt) {
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

    componentNames.forEach(name => {
      addComponent({ name, filePath: 'halcyon-vue' })
    })

    nuxt.options.css.push('halcyon-vue/style')
    nuxt.options.css.push('#build/halcyon-theme.css')
    nuxt.options.css.push('#build/halcyon-base.css')
    nuxt.options.css.push('#build/halcyon-reset.css')
  }
})
