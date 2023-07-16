# Common button

<script setup>
import { HButton } from '../../src/'
import Preview from '../Preview.vue'
import Plus from '~icons/mdi/plus'
import AddUser from '~icons/mdi/account-multiple-plus'

const previewOptions = {
    disabled: {
        kind: 'bool',
        default: false,
        label: 'Disabled'
    },
    kind: {
        kind: 'select',
        default: 'filled',
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
                value: 'elevated',
                label: 'Elevated'
            },
            {
                value: 'outlined',
                label: 'Outlined'
            },
            {
                value: 'text',
                label: 'Text'
            }
        ]
    }
}
const onClick = () => alert('hey!')

const capitalizeFirst = s =>
    s.charAt(0).toUpperCase() + s.slice(1).replace('-', ' ')
</script>

<preview :options="previewOptions" v-slot="{ state }">
    <div class="preview-column">
        <h-button
            :kind="state.kind"
            :content="capitalizeFirst(state.kind) + ' button'"
            :disabled="state.disabled"
            @click="onClick"
        />
        <h-button
            :kind="state.kind"
            :content="capitalizeFirst(state.kind) + ' button'"
            :disabled="state.disabled"
            @click="onClick"
        >
            <plus />
        </h-button>
    </div>
</preview>

::: details Source code

```html
<h-button
    :kind="state.kind"
    :content="capitalizeFirst(state.kind) + ' button'"
    :disabled="state.disabled"
    @click="onClick"
/>
<h-button
    :kind="state.kind"
    :content="capitalizeFirst(state.kind) + ' button'"
    :disabled="state.disabled"
    @click="onClick"
>
    <plus />
</h-button>
```

:::

A common button, ideal for your app's most basic actions.
[See the Material 3 documentation on this component][m3-button].

## Props

```ts
defineProps<{
    // The kind of button to render.
    // See the above preview for how each renders.
    kind: 'elevated' | 'filled' | 'filled-tonal' | 'outline' | 'text',
    // The text content to include in the button.
    content?: string,
    // The label to use for accessibility.
    // If none is provided, the content will be used.
    label?: string,
    disabled?: boolean,
    // Which element to render the button as.
    as?: 'button' | 'a' | 'router-link',
    // If the button is a link, where to link to.
    to?: string

    // See the `Pitfalls` section of the documentation.
    addEmptyPadding?: boolean
    removeEmptyPadding?: boolean
}>)
```

## Slots

### Default

The default slot is used for icons.

## Pitfalls / Known bugs

Due to it being
[somewhat difficult to tell if a slot is actually being rendered][vuejs-4733],
the component may not respond correctly if an icon is dynamically removed/added,
although changing the icon should work fine. As a stopgap, you can use
`add-empty-padding` and/or `remove-empty-padding` in order to force the button
to render in the desired manner.

Additionally, if `as` is set to `a` or `router-link`, an underline may show
on hover.

[vuejs-4733]: https://github.com/vuejs/core/issues/4733
[m3-button]: https://m3.material.io/components/buttons/overview
