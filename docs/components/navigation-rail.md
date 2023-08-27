# Navigation rail

<script setup>
import { ref } from 'vue'
import Preview from '../Preview.vue'
import { HSwitch, HNavigationRail, HFloatingActionButton, HNavigationButton, HButton, HSnackbar, snackbar } from '../../src/'
import MapIcon from '~icons/mdi/map'
import HomeCityIcon from '~icons/mdi/home-city-outline'
import BookmarkIcon from '~icons/mdi/bookmark-outline'
import PlusCircleIcon from '~icons/mdi/plus-circle-outline'
import BellIcon from '~icons/mdi/bell-outline'
import NavigationIcon from '~icons/mdi/navigation-variant-outline'

const show = ref(false)

const options = {
    align: {
        kind: 'select',
        default: 'center',
        label: 'Alignment',
        options: [
            {
                value: 'center',
                label: 'Center'
            },
            {
                value: 'start',
                label: 'Start'
            },
            {
                value: 'end',
                label: 'End'
            }
        ]
    },
    hasDrawer: {
        kind: 'bool',
        default: false,
        label: 'Has drawer'
    },
    hasFab: {
        kind: 'bool',
        default: false,
        label: 'Has FAB'
    }
}

const sendNotification = () => snackbar.send({ message: 'notification' })
</script>

<preview :options="options" v-slot="{ state }">
    <div class="preview-row">
        <label for="rail-switch">Show rail</label>
        <h-switch v-model="show" id="rail-switch" />
        <h-button kind="filled" content="Send notification" @click="sendNotification" />
        <HSnackbar />
    </div>
    <h-navigation-rail
        v-if="show"
        :align="state.align"
        :has-drawer="state.hasDrawer"
        :has-fab="state.hasFab"
        fab-label="Navigate"
    >
        <template #drawer>
            <h1>Navigation</h1>
            <h-navigation-button is-active label="Map">
                <template #active>
                    <map-icon />
                </template>
            </h-navigation-button>
            <h-navigation-button label="Home">
                <template #inactive>
                    <home-city-icon />
                </template>
            </h-navigation-button>
            <h-navigation-button label="Bookmarks">
                <template #inactive>
                    <bookmark-icon />
                </template>
            </h-navigation-button>
            <h-navigation-button label="Add">
                <template #inactive>
                    <plus-circle-icon />
                </template>
            </h-navigation-button>
            <h-navigation-button label="Notifications">
                <template #inactive>
                    <bell-icon />
                </template>
            </h-navigation-button>
        </template>
        <template #fab-icon>
            <navigation-icon />
        </template>
        <template #content>
            <h-navigation-button is-active label="Map" hide-label>
                <template #active>
                    <map-icon />
                </template>
            </h-navigation-button>
            <h-navigation-button label="Home" hide-label>
                <template #inactive>
                    <home-city-icon />
                </template>
            </h-navigation-button>
            <h-navigation-button label="Bookmarks" hide-label>
                <template #inactive>
                    <bookmark-icon />
                </template>
            </h-navigation-button>
            <h-navigation-button label="Add" hide-label>
                <template #inactive>
                    <plus-circle-icon />
                </template>
            </h-navigation-button>
            <h-navigation-button label="Notifications" hide-label>
                <template #inactive>
                    <bell-icon />
                </template>
            </h-navigation-button>
        </template>
    </h-navigation-rail>
</preview>

::: details Source code

```html
<div class="preview-row">
    <label for="rail-switch">Show rail</label>
    <h-switch v-model="show" id="rail-switch" />
</div>
<h-navigation-rail
    v-if="show"
    :align="state.align"
    :has-drawer="state.hasDrawer"
    :has-fab="state.hasFab"
    fab-label="Navigate"
>
    <template #drawer>
        <h1>Navigation</h1>
        <h-navigation-button is-active label="Map">
            <template #active>
                <map-icon />
            </template>
        </h-navigation-button>
        <h-navigation-button label="Home">
            <template #inactive>
                <home-city-icon />
            </template>
        </h-navigation-button>
        <h-navigation-button label="Bookmarks">
            <template #inactive>
                <bookmark-icon />
            </template>
        </h-navigation-button>
        <h-navigation-button label="Add">
            <template #inactive>
                <plus-circle-icon />
            </template>
        </h-navigation-button>
        <h-navigation-button label="Notifications">
            <template #inactive>
                <bell-icon />
            </template>
        </h-navigation-button>
    </template>
    <template #fab-icon>
        <navigation-icon />
    </template>
    <template #content>
        <h-navigation-button is-active label="Map" hide-label>
            <template #active>
                <map-icon />
            </template>
        </h-navigation-button>
        <h-navigation-button label="Home" hide-label>
            <template #inactive>
                <home-city-icon />
            </template>
        </h-navigation-button>
        <h-navigation-button label="Bookmarks" hide-label>
            <template #inactive>
                <bookmark-icon />
            </template>
        </h-navigation-button>
        <h-navigation-button label="Add" hide-label>
            <template #inactive>
                <plus-circle-icon />
            </template>
        </h-navigation-button>
        <h-navigation-button label="Notifications" hide-label>
            <template #inactive>
                <bell-icon />
            </template>
        </h-navigation-button>
    </template>
</h-navigation-rail>
```

:::

Navigation rails let people switch between UI views on mid-sized devices.
[See the Material 3 documentation on this component][m3-nav-rail].

[m3-nav-rail]: https://material.io/components/navigation-rail

## Props

```ts
defineProps<{
    // Where to align the destination buttons.
    align?: 'top' | 'center' | 'bottom'
    // Whether to show a drawer button.
    hasDrawer?: boolean
    // Whether to show the floating action button.
    hasFab?: boolean
    // The label for the floating action button.
    fabLabel?: string
}>()
```

## Slots

### `drawer`

The content of the drawer.

### `fab-icon`

The icon for the floating action button.

### `content`

The content of the navigation rail.

## Events

### `fab-click`

Emitted with the `Event` from any click on the floating action button.