# Switch

<script setup>
import { HSwitch } from '../../src/'
import Preview from '../Preview.vue'
import MdiCheck from '~icons/mdi/check'
import MdiClose from '~icons/mdi/close'
const previewOptions = {
    disabled: {
        kind: 'bool',
        default: false,
        label: 'Disabled'
    },
}

</script>

<preview :options="previewOptions" v-slot="{state}">
    <div style="display: flex; flex-direction: row; gap: 1rem;">
        <h-switch id="switch" :disabled="state.disabled" />
        <h-switch id="with-icon" :disabled="state.disabled">
            <template #on><mdi-check /></template>
            <template #off><mdi-close /></template>
        </h-switch>
    </div>
</preview>

::: details Source code

```html
<h-switch id="switch" :disabled="state.disabled" />
<h-switch id="with-icon" :disabled="state.disabled">
    <template #on><mdi-check /></template>
    <template #off><mdi-close /></template>
</h-switch>
```

:::

A switch for single-option items.
[See the Material 3 documentation on this component][m3-switch].

## Props

```ts
defineProps<{
  // The ID to use on the input.
  id: string
  // Whether the switch is disabled or not.
  disabled?: boolean
  // Allows you to use this as though it were a regular `<input type="checkbox" />`
  modelValue?: boolean
}>()
```

## Slots

### `on`

The icon to use when the switch is on.

### `off`

The icon to use when the switch is off.

[m3-switch]: https://m3.material.io/components/switch/overview
