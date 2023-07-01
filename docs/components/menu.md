# Menu

<script setup>
import { HIconButton, HMenu, HMenuButton, HMenuDivider, HSubmenu } from '../../src/'
import Preview from '../Preview.vue'
import Eye from '~icons/mdi/eye-outline'
import Copy from '~icons/mdi/content-copy'
import Pencil from '~icons/mdi/pencil'
import Dots from '~icons/mdi/dots-vertical'

const alert = (msg) => window.alert(msg)
</script>

<preview :options="{}">
    <h-menu>
        <template #button>
            <h-icon-button kind="standard" label="Open menu">
                <dots />
            </h-icon-button>
        </template>
        <template #content>
            <h-menu-button label="Item 1" :onClick="() => alert('hey')">
                <template #leading><eye /></template>
            </h-menu-button>
            <h-menu-button label="Item 2" disabled>
                <template #leading><copy /></template>
                <template #trailing>⌘C</template>
            </h-menu-button>
            <h-menu-divider />
            <h-submenu>
                <template #button>
                    <h-menu-button label="Item 3" has-submenu />
                </template>
                <template #content>
                    <h-menu-button label="Item 4" />
                    <h-menu-button label="Item 5" />
                </template>
            </h-submenu>
        </template>
    </h-menu>
</preview>

::: details Source code

```html
<h-menu>
    <template #button>
        <h-icon-button kind="standard" label="Open menu">
            <dots />
        </h-icon-button>
    </template>
    <template #content>
        <h-menu-button label="Item 1" :onClick="() => alert('hey')">
            <template #leading><eye /></template>
        </h-menu-button>
        <h-menu-button label="Item 2" disabled>
            <template #leading><copy /></template>
            <template #trailing>⌘C</template>
        </h-menu-button>
        <h-menu-divider />
        <h-submenu>
            <template #button>
                <h-menu-button label="Item 3" has-submenu />
            </template>
            <template #content>
                <h-menu-button label="Item 4" />
                <h-menu-button label="Item 5" />
            </template>
        </h-submenu>
    </template>
</h-menu>
```

:::

Menus display a list of choices on a temporary surface.
[See the Material 3 documentation for this component][m3-menu].

::: danger
Keyboard navigation currently **DOES NOT** function with submenus. You should
avoid them if so possible, especially for critical functionality.
:::


## Props

### HMenu

```ts
{
    // Whether this should be a scrollable menu or not.
    scrollable?: boolean
}
```

### HMenuButton

```ts
{
    // The text to be displayed.
    label: string
    // If the button isn't a link, will be run on click, before closing.
    onClick?: () => void
    // Whether this button has a submenu.
    hasSubmenu?: boolean
    // Whether this button should be a link.
    isLink?: boolean
    // Whether the link, specified with the above prop, should use <router-link>.
    useRouterLink?: boolean
    // Whether this menu is `disabled`.
    disabled?: boolean
}
```

### HMenuDivider

There are no props available for this component.

### HSubmenu

This component has the same props available to it as `HMenu`.

## Slots

### HMenu

#### `button`

The `button` slot is used for the button which opens the menu.

#### `content`

The `content` slot is used for the items of the menu; this should consist of
`HMenuButton`s, `HMenuDivider`s, and `HSubmenu`s.

### HMenuButton

#### `leading`

The `leading` slot is used for the leading icon.

### `trailing`

The `trailing` slot is used for the trailing icon.

### HSubmenu

This uses the same slots as HMenu, but you must use an `HMenuButton`
for the `button` slot.

[m3-menu]: https://m3.material.io/components/menus/