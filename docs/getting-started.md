# Getting started

## Installation

Firstly, you'll need a project that has:
- [Vue 3][vue-3]
- [Vite][vite]
- *(optional)* [Unplugin Icons][unplugin-icons] (or another way to use Material Design icons)
- *(optional)* [Vue Router][vue-router]

[vue-3]: https://v3.vuejs.org/
[vite]: https://vitejs.dev/
[unplugin-icons]: https://github.com/antfu/unplugin-icons
[vue-router]: https://router.vuejs.org/

Then, install Halcyon:

```bash
pnpm add halcyon-vue
# or:
yarn add halcyon-vue
# or:
pnpm install halcyon-vue
```

## Theme creation (optional)

You should use the [Material Theme Builder][theme-builder] to generate a theme.
Once you've done that, you can download the JSON file and use it in your project.

[theme-builder]: https://www.figma.com/community/plugin/1034969338659738588/Material-Theme-Builder

## Vite setup

Load the plugin within your Vite config:

```ts
import { defineConfig } from 'vite'
import { Halcyon } from 'halcyon-vue/plugin'
import theme from './theme.json' // the theme you created in the last step
// ...
export default defineConfig({
    plugins: [
        // ...
        Halcyon({ theme })
    ]
})
```

If a custom theme is not passed in, the default theme will be used.

## Font setup (optional)

It's not required, but you should import a couple fonts for the most accurate
experience. In particular, [Roboto Flex][roboto-flex] (or [Roboto] if your target
doesn't support variable fonts) and [Noto Sans][noto-sans] (as a fallback font)
are used. Here's a snippet you can put into your `index.html` to import Roboto Flex
and Noto Sans:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&family=Roboto+Flex:wght@400;500;700&display=swap" rel="stylesheet">
```

(This snippet probably imports more than you'll need, so consider selecting the
fonts on Google Fonts yourself.)

[roboto-flex]: https://fonts.google.com/specimen/Roboto+Flex
[roboto]: https://fonts.google.com/specimen/Roboto
[noto-sans]: https://fonts.google.com/noto/specimen/Noto+Sans

## Vue setup

In the file where you set up Vue (i.e. `main.js` or `main.ts`), import the stylesheets:

```ts
import 'halcyon:reset.css' // optional if you're already using a css reset
import 'halcyon:theme.css' // sets up the theme variables
import 'halcyon:base.css'  // includes global styles (e.g. body)
import 'halcyon-vue/style' // includes component styles
```

Now you can use the components in your app!

## Usage

Here's an example of how to use a button:

```vue
<script setup>
import { HButton } from 'halcyon-vue'

const alert = (msg) => window.alert(msg) // vue why
</script>
<template>
    <div>
        <HButton
            kind="filled"
            content="Press me!"
            @click="alert('yippee')"
        />
    </div>
</template>
```

This renders the following button:

<script setup>
import { HButton } from '../src'
const alert = (msg) => window.alert(msg)
</script>

<div>
    <HButton
        kind="filled"
        content="Press me!"
        @click="alert('yippee')"
    />
</div>