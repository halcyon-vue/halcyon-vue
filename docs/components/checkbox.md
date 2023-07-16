# Checkbox

<script setup>
import { ref } from 'vue'
import Preview from '../Preview.vue'
import { HCheckbox } from '../../src/'

const options = {
    disabled: {
        kind: 'bool',
        default: false,
        label: 'Disabled'
    },
    indeterminate: {
        kind: 'bool',
        default: false,
        label: 'Indeterminate'
    },
    error: {
        kind: 'bool',
        default: false,
        label: 'Error'
    }
}
</script>

<preview :options="options" v-slot="{ state }">
    <label for="checkbox">Checkbox</label>
    <h-checkbox
        v-model="state.checked"
        :disabled="state.disabled"
        :indeterminate="state.indeterminate"
        :error="state.error"
        id="checkbox"
    />
</preview>

Checkboxes let users select one or more items from a list, or turn an item on
or off. [See the Material 3 documentation for this component][m3-checkbox].

[m3-checkbox]: https://m3.material.io/components/checkbox

## Props

```ts
defineProps<{
    // Whether the checkbox is checked.
    modelValue?: boolean
    // Whether the checkbox is in an indeterminate state.
    indeterminate?: boolean
    // Whether the checkbox is disabled.
    disabled?: boolean
    // Whether the checkbox is in an error state.
    error?: boolean
}>()
```


## Known issues

This doesn't actually replicate the Material 3 checkbox cross-browser. This
would need a lot of SVG stuff going on.