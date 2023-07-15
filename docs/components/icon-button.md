# Icon button

<script setup>
import { HIconButton } from '../../src/'
import Preview from '../Preview.vue'
import Cog from '~icons/mdi/cog-outline'
import Heart from '~icons/mdi/heart'
import HeartOutline from '~icons/mdi/heart-outline'
const previewOptions = {
    disabled: {
        kind: 'bool',
        default: false,
        label: 'Disabled'
    },
    kind: {
        kind: 'select',
        default: 'standard',
        label: 'Kind',
        options: [
            {
                value: 'filled',
                label: 'Filled'
            },
            {
                value: 'filled-tonal',
                label: 'Filled tonal'
            },
            {
                value: 'outlined',
                label: 'Outlined'
            },
            {
                value: 'standard',
                label: 'Standard'
            }
        ]
    }
}

const click = () => alert('you clicked the button!')
</script>

<preview :options="previewOptions" v-slot="{ state }">
    <h-icon-button
        :kind="state.kind"
        :disabled="state.disabled"
        @click="click"
        :label="`${state.kind} non-toggleable icon button example`"
    >
        <cog/>
    </h-icon-button>
    <h-icon-button
        :kind="state.kind"
        :disabled="state.disabled"
        toggleable
        :label="`${state.kind} toggleable icon button example`"
    >
        <template #unselected><heart-outline/></template>
        <template #selected><heart/></template>
    </h-icon-button>
</preview>

::: details Source code

```html
<h-icon-button
    :kind="state.kind"
    :disabled="state.disabled"
    @click="click"
    :label="`${state.kind} non-toggleable icon button example`"
>
    <cog/>
</h-icon-button>
<h-icon-button
    :kind="state.kind"
    :disabled="state.disabled"
    toggleable
    :label="`${state.kind} toggleable icon button example`"
>
    <template #unselected><heart-outline/></template>
    <template #selected><heart/></template>
</h-icon-button>
```

:::

Icon buttons help people take supplementary actions with a single tap.
[See the Material 3 documentation on this component][m3-icon-button].

[m3-icon-button]: https://m3.material.io/components/icon-buttons/overview

## Props

```ts
defineProps<{
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
