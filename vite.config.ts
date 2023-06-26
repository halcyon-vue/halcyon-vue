import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Icons from 'unplugin-icons/vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    vue(),
    Icons({
      scale: 1.2
    }),
    dts()
  ],
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: {
        main: resolve(__dirname, 'src/index.ts'),
        plugin: resolve(__dirname, 'src/plugin.ts')
      },
      name: 'halcyon-vue',
      // the proper extensions will be added
      fileName: (format, entry) => {
        if(format === 'es' || format === 'esm') {
          return `${entry}.js`
        } else if(format === 'cjs' || format === 'commonjs') {
          return `${entry}.cjs`
        } else {
          return `${entry}.${format}.js`
        }
      },
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue', '@headlessui/vue', '@vueuse/components', '@vueuse/core'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue',
          '@headlessui/vue': 'headlessui',
          '@vueuse/components': 'vueusecomponents',
          '@vueuse/core': 'vueusecore'
        },
      },
    },
  },
})