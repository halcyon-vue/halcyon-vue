# Floating action buttons

<script setup>
import { HFloatingActionButton } from '../../src/'
import Preview from '../Preview.vue'
import PencilOutline from '~icons/mdi/pencil-outline'

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
        style="display: flex; flex-direction: column; align-items: end;"
        v-if="state.example === 'small'"
    >
        <h-floating-action-button kind="small" :color="state.color">
            <pencil-outline />
        </h-floating-action-button>
        <h-floating-action-button kind="small" :color="state.color">
            <pencil-outline />
        </h-floating-action-button>
        <h-floating-action-button kind="small" :color="state.color">
            <pencil-outline />
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

The FAB represents the most important action on a screen. It puts key actions
within reach. Optionally, this component can be an Extended FAB, which is wider
than FABs to accommodate a text label and larger target area.
See the Material 3 documentation for this component: [Standard], [Extended].

## Props

```ts
{
  kind?: 'standard' | 'small' | 'large' | 'extended'
  color?: 'surface' | 'secondary' | 'tertiary'

  // If true, disables the shadow rendering on this component.
  noShadow?: boolean

  // Content to use when `kind` is `extended`.
  content?: string
}
```

## Slots

### default

The default slot is used for the icon.

[Standard]: https://m3.material.io/components/floating-action-button/overview
[Extended]: https://m3.material.io/components/extended-fab/overview
