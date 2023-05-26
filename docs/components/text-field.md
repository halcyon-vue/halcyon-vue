# Text field

<script setup>
import { ref } from 'vue'
import { HTextField, HIconButton } from '../../src/'
import Preview from '../Preview.vue'
import Search from '~icons/mdi/magnify'
import CloseCircle from '~icons/mdi/close-circle-outline'

const a = ref('')

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
    required: {
        kind: 'bool',
        default: false,
        label: 'Required'
    },
    helper: {
        kind: 'bool',
        default: false,
        label: 'Helper text'
    },
    disabled: {
        kind: 'bool',
        default: false,
        label: 'Disabled'
    },
    iconPrepended: {
        kind: 'bool',
        default: false,
        label: 'Icon prepended'
    },
    iconAppended: {
        kind: 'bool',
        default: false,
        label: 'Icon appended'
    },
    error: {
        kind: 'bool',
        default: false,
        label: 'Error state enabled'
    },
    lengthLimit: {
        kind: 'bool',
        default: false,
        label: 'Max / min length set'
    },
    multiline: {
        kind: 'bool',
        default: false,
        label: 'Multiline'
    },
    placeholder: {
        kind: 'bool',
        default: false,
        label: 'Placeholder text'
    }
}
</script>

<preview :options="previewOptions" v-slot="{ state }">
    <h-text-field
        v-model="a"
        name="Text field example"
        label="Label text"
        :kind="state.kind"
        :disabled="state.disabled"
        :required="state.required"
        :show-required="state.required"
        :max-length="state.lengthLimit ? 20 : undefined"
        :min-length="state.lengthLimit ? 5 : undefined"
        :has-error="state.error"
        :multiline="state.multiline"
        :placeholder="state.placeholder ? 'Placeholder text' : ''"
    >
        <template #helper    v-if="state.helper">Helper text</template>
        <template #prepended v-if="state.iconPrepended"><search/></template>
        <template #appended  v-if="state.iconAppended">
            <button
                @click="a = ''"
                aria-label="Clear input"
                :disabled="state.disabled"
            >
                <close-circle />
            </button>
        </template>
    </h-text-field>
</preview>

::: details Source code

```html
<h-text-field
    v-model="a"
    name="Text field example"
    label="Label text"
    :kind="state.kind"
    :disabled="state.disabled"
    :required="state.required"
    :show-required="state.required"
    :max-length="state.lengthLimit ? 20 : undefined"
    :min-length="state.lengthLimit ? 5 : undefined"
    :has-error="state.error"
    :multiline="state.multiline"
    :placeholder="state.placeholder ? 'Placeholder text' : ''"
>
    <template #helper    v-if="state.helper">Helper text</template>
    <template #prepended v-if="state.iconPrepended"><search/></template>
    <template #appended  v-if="state.iconAppended">
        <button
            @click="a = ''"
            aria-label="Clear input"
            :disabled="state.disabled"
        >
            <close-circle />
        </button>
    </template>
</h-text-field>
```

:::

Text fields allow users to enter text into a UI. They typically appear in forms
and dialogs. [See the Material 3 documentation on this component][m3-text-field].

## Props

```ts
{
  // The name of the input. Must be unique on the page.
  name: string

  // The kind of input to render.
  kind: 'outlined' | 'filled'

  // The HTML input type to assign to this input.
  // See [1].
  // This will likely not work with input types which the browser renders in
  // special ways.
  inputType?: string

  // The label text to use.
  label: string

  // Passes along the HTML `required` attribute.
  required?: boolean

  // Show styling for the input being required. Note that this doesn't change
  // the HTML attribute. See [2] for guidance on when to use this.
  showRequired?: boolean

  // The text to use for the "required" text displayed in the supporting text
  // slot. Defaults to "required". Intended for localization.
  requiredText?: string

  // Whether the input is disabled.
  disabled?: boolean

  // The maximum (exclusive) length for this input.
  // You should not use this to actually validate input length, as HTML and JS
  // might not agree on how long an input is, and someone can simply edit the
  // contents regardless.
  maxLength?: number

  // The minimum (exclusive) length for this input.
  // See caveats on maxLength.
  minLength?: number

  // Whether to display an error state on this input.
  hasError?: boolean

  // Whether this input should allow multiple lines of input.
  multiline?: boolean

  // How many rows to render when using multiple lines of input by default.
  rows?: number

  // The placeholder text to show when the input is empty.
  placeholder?: string

  // A function which returns the text to use in the `aria-label` for the
  // character count. Defaults to
  // (current, max) => `Character count, ${current} out of ${max} characters entered`.
  // Intended for localization.
  formatCharCountText?:(current: number, max: number) => string

  // Whether to clean the input value before emitting it. Defaults to false.
  // "Cleaned" indicates running the value through this function:
  // (s: string) => s?.trim().split(/\s+/).join(' ') || ''
  // The length calculation uses the cleaned value, so it can be useful. However,
  // with multiline inputs in particular, this can be problematic.
  returnRaw?: boolean
  
  // Passes along the HTML `autocomplete` attribute.
  autocomplete?: string

  modelValue?: string
}
```

1. [MDN docs on `input`][mdn-input]
2. [Material 3 docs on the `required` attribute][m3-required]

## Slots

### `helper`

The `helper` slot is used for the helper text (called the supporting text in
the official documentation).

### `prepended`

The `prepended` slot is used for the prepended icon (i.e. the one at the start).

### `appended`

The `appended` slot is used for the appended icon (i.e. the one at the end).

## Known issues

1. The text displayed in the supporting text is not used for the accessibility
label, as proscribed by [the docs][accessibility-issue].

[mdn-input]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Input#input_types
[m3-required]: https://m3.material.io/components/text-fields/guidelines#6c36a812-273d-4f5d-9102-2f00386c9145
[m3-text-field]: https://m3.material.io/components/text-fields/overview
[accessibility-issue]: https://m3.material.io/components/text-fields/accessibility#c27882a3-48e3-49c8-8760-8cd0602b935c