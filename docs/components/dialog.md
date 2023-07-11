# Dialog

<script setup>
import { HButton, HTextField, HDialog } from '../../src/'
import { ref } from 'vue'
import Preview from '../Preview.vue'
import Reset from '~icons/mdi/rotate-left'

const normalOpen = ref(false)
const fullscreenOpen = ref(false)

const previewOptions = {
    dividers: {
        kind: 'bool',
        default: false,
        label: 'Dividers'
    },
}

const a = ref('')
const b = ref('')
const c = ref('')
const d = ref('')
</script>

<style scoped>
.accounts div {
    display: flex;
    flex-direction: row;
    gap: 16px;
    align-items: center;
    padding: 8px;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.25;
}
.accounts img {
    height: 40px;
    border-radius: 100%;
}
</style>

<preview :options="previewOptions" v-slot="{ state }">
    <div class="preview-col">
        <h-button kind="filled-tonal" content="Open dialog" @click="normalOpen = true" />
        <h-dialog
            v-model:open="normalOpen"
            title="Reset settings?"
            description="This will reset your app preferences back to their default settings. The following accounts will also be signed out:"
            :dividers="state.dividers"
            :actions="[{ label: 'Cancel', onClick: () => {} }, { label: 'Accept', onClick: () => {} }]"
        >
            <template #icon>
                <Reset />
            </template>
            <template #content>
                <div class="accounts">
                    <div>
                        <img src="../images/albedo.png" width="40" height="40"><span>albedo@aleikats.example</span>
                    </div>
                    <div>
                        <img src="../images/sucrose.png" width="40" height="40"><span>sucrose@aleikats.example</span>
                    </div>
                    <div>
                        <img src="../images/klee.png" width="40" height="40"><span>klee@aleikats.example</span>
                    </div>
                </div>
            </template>
        </h-dialog>
        <h-button kind="filled" content="Open fullscreen dialog" @click="fullscreenOpen = true" />
        <h-dialog fullscreen title="New event" v-model:open="fullscreenOpen" :actions="[{ label: 'Accept', onClick: () => {} }]">
            <template #content>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                <h-text-field kind="outlined" v-model="a" name="email" label="Email" />
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                <h-text-field kind="outlined" v-model="b" name="event-name" label="Event name" />
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                <h-text-field kind="outlined" v-model="c" name="date" label="Date (from)" />
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                <h-text-field kind="outlined" v-model="d" name="date" label="Date (to)" />
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </template>
        </h-dialog>
    </div>
</preview>

::: details Source code

```html
<h-button kind="filled" content="Open dialog" @click="open = true" />
<h-dialog
    v-model:open="open"
    title="Reset settings?"
    description="This will reset your app preferences back to their default settings. The following accounts will also be signed out:"
    :dividers="state.dividers"
    :actions="[{ label: 'Cancel', onClick: () => {} }, { label: 'Accept', onClick: () => {} }]"
>
    <template #icon>
        <Reset />
    </template>
    <template #content>
        <div class="accounts">
            <div>
                <img src="../images/albedo.png" width="40" height="40"><span>albedo@aleikats.example</span>
            </div>
            <div>
                <img src="../images/sucrose.png" width="40" height="40"><span>sucrose@aleikats.example</span>
            </div>
            <div>
                <img src="../images/klee.png" width="40" height="40"><span>klee@aleikats.example</span>
            </div>
        </div>
    </template>
</h-dialog>
```

:::

Dialogs provide important prompts in a user flow.
[See the Material 3 documentation for this component][m3-dialog].

## Props

```ts
{
  // The title of the dialog.
  title: string,
  // The description to show. Optional, but if your dialog has text in the
  // content, it can help with accessibility to have this set.
  description?: string,
  // Whether to show dividers between the description, content, and actions.
  dividers?: boolean
  // Actions that can be taken on this dialog. You should probably only have one or two.
  actions?: {
    // The text to be shown for this action.
    label: string,
    // The function to call when this action is taken, to be run before the
    // dialog closes. If it returns a promise, the promise is `await`ed before
    // closing the dialog.
    onClick: () => (any | Promise<any>)
  }[]
  // Whether or not the modal is open. You can use `v-model:open` to bind this.
  open?: boolean;
}
```

## Slots

### `content`

The `content` slot is used for the body of the dialog, displayed below the
description.

### `icon`

The `icon` slot is used for the icon that displays at the top of the dialog.

[m3-dialog]: https://m3.material.io/components/dialogs
