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

Navigation drawers let people switch between UI views on larger devices.

<preview :options="options" v-slot="{ state }">
    <h-icon-button label="Open menu" @click="open = true">
        <menu-icon />
    </h-icon-button>
    <h-navigation-drawer v-model:open="open" title="Mail" :static="state.static">
    </h-navigation-drawer>
</preview>

Icon buttons help people take supplementary actions with a single tap.
[See the Material 3 documentation on this component][m3-icon-button].

[m3-icon-button]: https://m3.material.io/components/icon-buttons/overview

## Props

```ts
{
    // The kind of button to render.
    // See the above preview for how each one renders.
    kind: 'filled' | 'filled-tonal' | 'outlined' | 'standard',
    // The label to use for accessibility.
    label: string,
    // Whether this is a toggleable icon button.
    toggleable?: boolean,
    // Whether this button is disabled.
    disabled?: boolean,
    // Which element to render the button as.
    as?: 'button' | 'a' | 'router-link',
    // If the button is a link, where to link to.
    to?: string
    // What the toggle state defaults to.
    checked?: boolean

    modelValue?: boolean
}
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