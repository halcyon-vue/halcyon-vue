# Navigation drawer

<script setup>
import { ref, reactive } from 'vue'
import Preview from '../Preview.vue'
import { HNavigationDrawer, HIconButton } from '../../src/'
import MenuIcon from '~icons/mdi/menu'

const open = ref(false)

const options = {
    static: {
        kind: 'bool',
        default: false,
        label: 'Static'
    }
}

</script>

<preview :options="options" v-slot="{ state }">
    <h-icon-button label="Open menu" @click="open = true">
        <menu-icon />
    </h-icon-button>
    <h-navigation-drawer v-model:open="open" title="Mail" :static="state.static">
    </h-navigation-drawer>
</preview>

Navigation drawers let people switch between UI views on larger devices.
[See the Material 3 documentation on this component][m3-nav-drawer].

[m3-nav-drawer]: https://m3.material.io/components/navigation-drawer/overview

## Props

```ts
defineProps<{
    // The title of this navigation drawer.
    title?: string
    // Whether the navigation drawer is currently open.
    // You should bind this with `v-model:open`.
    open?: boolean
    // Whether the navigation drawer is currently "static"; i.e. should
    // stay open.
    // You should add a class to the body in order to offset it
    // when this is true.
    static?: boolean
}>()
```

## Slots

### Default

The default slot is used for the icon in non-toggleable buttons.

### `unchecked`

The `unchecked` slot is used for the icon in toggleable buttons when they are
not checked.

### `checked`

The `checked` slot is used for the icon in toggleable buttons when they are
checked.

## Known issues

1. The label does not appear as a tooltip.
1. The `checked` prop seems to be somewhat inconsistent.
