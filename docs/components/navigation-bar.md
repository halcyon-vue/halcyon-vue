# Navigation bar

<script setup>
    import { ref } from 'vue'
import { HNavigationBar, HNavigationButton, HSwitch } from '../../src/'
import Preview from '../Preview.vue'
import CircleIcon from '~icons/mdi/circle'
import CircleOutlineIcon from '~icons/mdi/checkbox-blank-circle-outline'
import TriangleIcon from '~icons/mdi/triangle'
import TriangleOutlineIcon from '~icons/mdi/triangle-outline'

const isOpen = ref(false)

const options = {
    hideOnScroll: {
        kind: 'bool',
        default: false,
        label: 'Hide on scroll'
    },
    hideLabels: {
        kind: 'bool',
        default: false,
        label: 'Hide labels'
    }
}

const activeIcon = ref(0)
</script>

<preview :options="options" v-slot="{ state }">
    <div class="preview-row">
        <label for="nav-bar-open">Show navigation bar?</label>
        <h-switch id="nav-bar-open" v-model="isOpen" />
    </div>
    <h-navigation-bar v-if="isOpen" :hide-on-scroll="state.hideOnScroll">
        <h-navigation-button
            label="Label"
            :is-active="activeIcon === 0"
            @click.prevent="activeIcon = 0"
            :hide-label="state.hideLabels"
        >
            <template #inactive><circle-outline-icon /></template>
            <template #active><circle-icon /></template>
        </h-navigation-button>
        <h-navigation-button
            label="Label"
            :is-active="activeIcon === 1"
            @click.prevent="activeIcon = 1"
            show-badge
            :hide-label="state.hideLabels"
        >
            <template #inactive><triangle-outline-icon /></template>
            <template #active><triangle-icon /></template>
        </h-navigation-button>
        <h-navigation-button
            label="Label"
            :is-active="activeIcon === 2"
            @click.prevent="activeIcon = 2"
            show-badge
            :badge-count="1000"
            :hide-label="state.hideLabels"
        >
            <template #inactive><triangle-outline-icon /></template>
            <template #active><triangle-icon /></template>
        </h-navigation-button>
        <h-navigation-button
            label="Label"
            :is-active="activeIcon === 3"
            @click.prevent="activeIcon = 3"
            :hide-label="state.hideLabels"
        >
            <template #inactive><triangle-outline-icon /></template>
            <template #active><triangle-icon /></template>
        </h-navigation-button>
    </h-navigation-bar>
</preview>

::: details Source code

```html
<div class="preview-row">
    <label for="nav-bar-open">Show navigation bar?</label>
    <h-switch id="nav-bar-open" v-model="isOpen" />
</div>
<h-navigation-bar v-if="isOpen" :hide-on-scroll="state.hideOnScroll">
    <h-navigation-button
        label="Label"
        :is-active="activeIcon === 0"
        @click.prevent="activeIcon = 0"
        :hide-label="state.hideLabels"
    >
        <template #inactive><circle-outline-icon /></template>
        <template #active><circle-icon /></template>
    </h-navigation-button>
    <h-navigation-button
        label="Label"
        :is-active="activeIcon === 1"
        @click.prevent="activeIcon = 1"
        show-badge
        :hide-label="state.hideLabels"
    >
        <template #inactive><triangle-outline-icon /></template>
        <template #active><triangle-icon /></template>
    </h-navigation-button>
    <h-navigation-button
        label="Label"
        :is-active="activeIcon === 2"
        @click.prevent="activeIcon = 2"
        show-badge
        :badge-count="1000"
        :hide-label="state.hideLabels"
    >
        <template #inactive><triangle-outline-icon /></template>
        <template #active><triangle-icon /></template>
    </h-navigation-button>
    <h-navigation-button
        label="Label"
        :is-active="activeIcon === 3"
        @click.prevent="activeIcon = 3"
        :hide-label="state.hideLabels"
    >
        <template #inactive><triangle-outline-icon /></template>
        <template #active><triangle-icon /></template>
    </h-navigation-button>
</h-navigation-bar>
```

:::

Navigation bars let people switch between UI views on smaller devices.
[See the Material 3 documentation for this component][m3-navbar].

[m3-navbar]: https://m3.material.io/components/navigation-bar

## Props

### `HNavigationBar`

```ts
{
    // If this navigation bar should be hidden when the user scrolls down.
    hideOnScroll: boolean
}
```

### `HNavigationButton`

```ts
{
    // The label to display.
    label: string
    // Whether this link should use a `router-link`.
    useRouterLink?: boolean
    // The location to link to.
    to?: string
    // Whether the label should be hidden.
    hideLabel?: boolean
    // Whether the button links to the location that the user is currently at.
    isActive?: boolean
    // Whether to show a notification badge.
    showBadge?: boolean
    // The count to show on the notification badge, if any.
    badgeCount?: number
}
```