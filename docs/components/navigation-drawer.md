# Navigation drawer

<script setup>
import { ref, reactive } from 'vue'
import Preview from '../Preview.vue'
import { HNavigationDrawer, HNavigationButton, HIconButton, HDivider } from '../../src/'
import MenuIcon from '~icons/mdi/menu'
import InboxIcon from '~icons/mdi/inbox'
import OutboxIcon from '~icons/mdi/send-variant-outline'
import HeartIcon from '~icons/mdi/heart-outline'
import TrashIcon from '~icons/mdi/delete-outline'
import CircleIcon from '~icons/mdi/checkbox-blank-circle-outline'
import TriangleIcon from '~icons/mdi/triangle-outline'
import SquareIcon from '~icons/mdi/crop-square'

const open = ref(false)

const options = {
    static: {
        kind: 'bool',
        default: false,
        label: 'Static'
    }
}

</script>

<preview :options="options" v-slot="{ state }">
    <h-icon-button label="Open menu" @click="open = true">
        <menu-icon />
    </h-icon-button>
    <h-navigation-drawer v-model:open="open" :static="state.static">
        <h1>Mail</h1>
        <h-navigation-button is-active label="Mail" show-badge :badge-count=24>
            <template #active>
                <inbox-icon />
            </template>
        </h-navigation-button>
        <h-navigation-button show-badge label="Outbox">
            <template #inactive>
                <outbox-icon />
            </template>
        </h-navigation-button>
        <h-navigation-button label="Favorites">
            <template #inactive>
                <heart-icon />
            </template>
        </h-navigation-button>
        <h-navigation-button label="Trash">
            <template #inactive>
                <trash-icon />
            </template>
        </h-navigation-button>
        <h-divider />
        <h2>Labels</h2>
        <h-navigation-button label="Label">
            <template #inactive>
                <circle-icon />
            </template>
        </h-navigation-button>
        <h-navigation-button label="Label">
            <template #inactive>
                <triangle-icon />
            </template>
        </h-navigation-button>
        <h-navigation-button label="Label">
            <template #inactive>
                <square-icon />
            </template>
        </h-navigation-button>
    </h-navigation-drawer>
</preview>

Navigation drawers let people switch between UI views on larger devices.
[See the Material 3 documentation on this component][m3-nav-drawer].

[m3-nav-drawer]: https://m3.material.io/components/navigation-drawer/overview

## Props

```ts
defineProps<{
    // Whether the navigation drawer is currently open.
    // You should bind this with `v-model:open`.
    open?: boolean
    // Whether the navigation drawer is currently "static"; i.e. should
    // stay open.
    // You should add a class to the body in order to offset it
    // when this is true.
    static?: boolean
}>()
```

## Slots

### Default

The default slot is used for the drawer content. This should be made of
[navigation icons](navigation-bar#hnavigationbutton).
