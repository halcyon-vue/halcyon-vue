# Floating action buttons

<script setup>
import { HFloatingActionButton } from '../../src/'
import Preview from '../Preview.vue'
import PencilOutline from '~icons/mdi/pencil-outline'
import Document from '~icons/mdi/document'
import Spreadsheet from '~icons/mdi/spreadsheet'
import Presentation from '~icons/mdi/file-presentation-box'

const previewOptions = {
    example: {
        kind: 'select',
        default: 'small',
        label: 'Example',
        options: [
            {
                value: 'small',
                label: 'Small'
            },
            {
                value: 'large',
                label: 'Large'
            },
            {
                value: 'extended',
                label: 'Extended'
            },
        ]
    },
    color: {
        kind: 'select',
        default: 'surface',
        label: 'Color',
        options: [
            {
                value: 'surface',
                label: 'Surface'
            },
            {
                value: 'secondary',
                label: 'Secondary'
            },
            {
                value: 'tertiary',
                label: 'Tertiary'
            },
        ]
    }
}
</script>

<preview :options="previewOptions" v-slot="{ state }">
    <div
        style="display: flex; flex-direction: column; align-items: flex-end;"
        v-if="state.example === 'small'"
    >
        <h-floating-action-button kind="small" :color="state.color">
            <spreadsheet />
        </h-floating-action-button>
        <h-floating-action-button kind="small" :color="state.color">
            <presentation />
        </h-floating-action-button>
        <h-floating-action-button kind="small" :color="state.color">
            <document />
        </h-floating-action-button>
        <h-floating-action-button kind="standard" :color="state.color">
            <pencil-outline />
        </h-floating-action-button>
    </div>
    <h-floating-action-button
        kind="large"
        :color="state.color"
        v-else-if="state.example === 'large'"
    >
        <pencil-outline />
    </h-floating-action-button>
    <h-floating-action-button
        kind="extended"
        :color="state.color"
        content="New post"
        v-else
    >
        <pencil-outline />
    </h-floating-action-button>
</preview>

::: details Source code

```html
<div
    style="display: flex; flex-direction: column; align-items: flex-end;"
    v-if="state.example === 'small'"
>
    <h-floating-action-button kind="small" :color="state.color">
        <Spreadsheet />
    </h-floating-action-button>
    <h-floating-action-button kind="small" :color="state.color">
        <Presentation />
    </h-floating-action-button>
    <h-floating-action-button kind="small" :color="state.color">
        <Document />
    </h-floating-action-button>
    <h-floating-action-button kind="standard" :color="state.color">
        <pencil-outline />
    </h-floating-action-button>
</div>
<h-floating-action-button
    kind="large"
    :color="state.color"
    v-else-if="state.example === 'large'"
>
    <pencil-outline />
</h-floating-action-button>
<h-floating-action-button
    kind="extended"
    :color="state.color"
    content="New post"
    v-else
>
    <pencil-outline />
</h-floating-action-button>
```

:::

The FAB represents the most important action on a screen. It puts key actions
within reach. Optionally, this component can be an Extended FAB, which is wider
than FABs to accommodate a text label and larger target area.
See the Material 3 documentation for this component: [Standard], [Extended].

## Props

```ts
defineProps<{
  // The kind of FAB to render. Defaults to 'standard'.
  kind?: 'standard' | 'small' | 'large' | 'extended'
  // The color of FAB to render. Defaults to 'surface'.
  color?: 'surface' | 'secondary' | 'tertiary'

  // If true, disables the shadow rendering on this component.
  noShadow?: boolean

  // Content to use when `kind` is `extended`.
  content?: string
}>()
```

## Slots

### default

The default slot is used for the icon.

[Standard]: https://m3.material.io/components/floating-action-button/overview
[Extended]: https://m3.material.io/components/extended-fab/overview
