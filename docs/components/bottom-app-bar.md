# Bottom App Bar

<script setup>
import { ref } from 'vue'
import Preview from '../Preview.vue'
import { HBottomAppBar, HSwitch, HFloatingActionButton, HIconButton, snackbar, HButton, HSnackbar } from '../../src/'
import Magnify from '~icons/mdi/magnify'
import Delete from '~icons/mdi/delete-outline'
import Archive from '~icons/mdi/archive-arrow-down'
import Reply from '~icons/mdi/reply'
import Plus from '~icons/mdi/plus'

const isOpen = ref(false)
const alert = (msg) => window.alert(msg)
const sendNotification = () => snackbar.send({ message: 'notification' })
</script>

<preview :options="{}">
    <div class="preview-row">
        <label for="app-bar-open">Show bottom app bar?</label>
        <h-switch id="app-bar-open" v-model="isOpen" />
        <h-button kind="filled" content="Send notification" @click="sendNotification" />
        <HSnackbar />
    </div>
    <h-bottom-app-bar v-if="isOpen" fab-label="New" @fab-click="alert('hey')">
        <template #icon-1>
            <h-icon-button kind="standard" label="Search">
                <magnify />
            </h-icon-button>
        </template>
        <template #icon-2>
            <h-icon-button kind="standard" label="Delete">
                <delete />
            </h-icon-button>
        </template>
        <template #icon-3>
            <h-icon-button kind="standard" label="Archive">
                <archive />
            </h-icon-button>
        </template>
        <template #icon-4>
            <h-icon-button kind="standard" label="Reply">
                <reply />
            </h-icon-button>
        </template>
        <template #icon-fab>
            <plus />
        </template>
    </h-bottom-app-bar>
</preview>

A bottom app bar displays navigation and key actions at the bottom of mobile
screens. [See the Material 3 documentation for this component][m3-bab].

## Props

```ts
defineProps<{
    // Label for the floating action button.
    fabLabel: string
}>()
```

## Slots

### `icon-n`

The `icon-n` slots are used for the icon buttons. Replace `n` with the number,
in order, to display them in.

### `icon-fab`

The `icon-fab` slot is used for the icon in the [floating action button][h-fab].

## Events

### `fab-click`

Emitted with the `Event` from any click on the floating action button.

[m3-bab]: https://m3.material.io/components/bottom-app-bar
[h-fab]: /components/fab
