# Tooltip

<script setup>
import Preview from '../Preview.vue'
import { HTooltip, HIconButton } from '../../src/'
import Brush from '~icons/mdi/brush'

const options = {
    rich: {
        kind: 'bool',
        default: false,
        label: 'Rich'
    }
}

const alert = s => window.alert(s)

const actions = [
    {
        label: 'Action 1',
        handler: () => alert('Action 1')
    },
    {
        label: 'Action 2',
        handler: () => alert('Action 2')
    }
]
</script>

<style>
.pfp {
    height: 40px;
    border-radius: 100%;
    cursor: pointer;
}
</style>

<preview :options="options" v-slot="{ state }">
    <h-tooltip rich content="awawa" v-if="state.rich" :actions="actions" title="Paint tool">
        <h-icon-button label="Paint tool">
            <brush />
        </h-icon-button>
    </h-tooltip>
    <div class="preview-row" v-else>
        <h-icon-button label="Paint tool">
            <brush />
        </h-icon-button>
        <h-tooltip content="sucrose@aleikats.example" offset="small">
            <img class="pfp" src="../images/sucrose.png" @click="alert('hi!')">
        </h-tooltip>
    </div>
</preview>

::: details Source code

```html
<h-tooltip rich content="awawa" v-if="state.rich" :actions="actions" title="Paint tool">
    <h-icon-button label="Paint tool">
        <brush />
    </h-icon-button>
</h-tooltip>
<div class="preview-row" v-else>
    <h-icon-button label="Paint tool">
        <brush />
    </h-icon-button>
    <h-tooltip content="sucrose@aleikats.example" offset="small">
        <img class="pfp" src="../images/sucrose.png" @click="alert('hi!')">
    </h-tooltip>
</div>
```

:::

::: warning
This does not work very well on mobile.
:::

Tooltips display brief labels or messages.

## Props

```ts
defineProps<{
    // The text content of the tooltip.
    content: string

    // The amount offset to have: 0px, 4px, 8px respectively.
    // For advanced uses, a number is allowed.
    offset?: 'none' | 'small' | 'large' | number
    // Whether the tooltip should be on the horizontal axis of the target.
    // By default, it's on the vertical axis.
    onSide?: boolean

    // Whether this is a "rich" tooltip, which can contain multiple lines of
    // text, a title, and actions.
    rich?: boolean
    // The title for a rich tooltip.
    title?: string
    // Actions on a rich tooltip. There should be a maximum of 2.
    actions?: {
        label: string,
        handler: () => any
    }[]

    // If this tooltip is "static", i.e. its shown status is controlled by
    // the `open` prop.
    static?: boolean
    // Whether the tooltip is open. Only applies if `static` is true.
    open?: boolean
}>()
```

## Slots

### Default

The default slot is used for the area where the tooltip is applied to.
