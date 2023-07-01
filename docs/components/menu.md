# Menu

<script setup>
import { HButton, HMenu, HMenuButton } from '../../src/'
import Preview from '../Preview.vue'
import Eye from '~icons/mdi/eye-outline'
import Copy from '~icons/mdi/content-copy'
import Pencil from '~icons/mdi/pencil'
</script>

<preview :options="{}">
    <h-menu>
        <template #button>
            <h-button kind="text" content="Open dialog" />
        </template>
        <template #content>
            <h-menu-button label="Item 1">
                <template #leading><eye /></template>
            </h-menu-button>
            <h-menu-button label="Item 2">
                <template #leading><copy /></template>
                <template #trailing>⌘C</template>
            </h-menu-button>
            <h-menu-button label="Item 3">
                <template #leading><pencil /></template>
            </h-menu-button>
        </template>
    </h-menu>
</preview>
