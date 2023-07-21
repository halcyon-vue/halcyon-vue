# Select

<script setup>
import { ref } from 'vue'
import { HSelect, HButton, HIconButton } from '../../src'
import Preview from '../Preview.vue'
import CloseCircle from '~icons/mdi/close-circle-outline'

const selected = ref(null)

const selectOptions = [
    {
        label: 'Blue',
        value: '#0000ff',
    },
    {
        label: 'Red',
        value: '#ff0000',
        disabled: true
    },
    {
        label: 'Green',
        value: '#00ff00'
    }
]

const previewOptions = {
    kind: {
        kind: 'select',
        default: 'outlined',
        label: 'Kind',
        options: [
            {
                value: 'filled',
                label: 'Filled'
            },
            {
                value: 'outlined',
                label: 'Outlined'
            },
        ]
    },
    disabled: {
        kind: 'bool',
        default: false,
        label: 'Disabled'
    }
}
</script>

<preview :options="previewOptions" v-slot="{ state }">
    <h-select
        label="Color"
        :options="selectOptions"
        v-model="selected"
        :kind="state.kind"
        :disabled="state.disabled"
    />
    <h-icon-button label="Clear" @click="selected = null">
        <close-circle />
    </h-icon-button>
</preview>

::: details Source code

```html
<h-select
    label="Color"
    :options="selectOptions"
    v-model="selected"
    :kind="state.kind"
/>
<h-icon-button label="Clear" @click="selected = null">
    <close-circle />
</h-icon-button>
```

:::

A Select component helps users choose between a set of choices.
There is no current official documentation for this component, but
[the guidelines for menus][m3-menu] and [the guidelines for text fields][m3-text]
have pertinent information.

## Props

```ts
interface Option {
    // The text to be displayed in the select.
    label: string
    // The value that this option represents.
    value: T
    // Whether this option is disabled.
    disabled?: boolean
}

const props = defineProps<{
    // The label for the overall select.
    label: string
    // The current value, if any.
    // This can be bound with v-model.
    modelValue: T | null
    // The options to display.
    options: Option[]
    // Whether this is scrollable or not.
    scrollable?: boolean
    // What kind of select to render.
    kind?: 'outlined' | 'filled'
    // Whether the select as a whole is disabled or not.
    disabled?: boolean
}>()
```

[m3-menu]: https://m3.material.io/components/menus/guidelines
[m3-text]: https://m3.material.io/components/text-fields/guidelines
