<script setup lang="ts">
import HNavigationDrawer from './HNavigationDrawer.vue'
import HIconButton from './HIconButton.vue'
import HFloatingActionButton from './HFloatingActionButton.vue'
import MenuIcon from '~icons/mdi/menu'
import { provide, ref } from 'vue'
defineProps<{
    align?: 'top' | 'center' | 'bottom'
    hasDrawer?: boolean
    hasFab?: boolean
    fabLabel?: string
}>()

const emit = defineEmits<{
    (e: 'fab-click', event: Event): void
}>()

provide('in rail', true)

const drawerOpen = ref(false)
</script>

<template>
    <Teleport to="body">
        <nav>
            <h-icon-button
                v-if="hasDrawer"
                kind="standard"
                label="Menu"
                @click="drawerOpen = true"
            >
                <MenuIcon />
            </h-icon-button>
            <h-navigation-drawer v-if="hasDrawer" v-model:open="drawerOpen">
                <slot name="drawer" />
            </h-navigation-drawer>
            <h-floating-action-button
                v-if="hasFab"
                color="tertiary"
                no-shadow
                :label="fabLabel"
                @click="e => emit('fab-click', e)"
                class="rail-fab"
            >
                <slot name="fab-icon" />
            </h-floating-action-button>
            <section :class="[align || 'center']">
                <slot name="content" />
            </section>
        </nav>
    </Teleport>
</template>

<style scoped lang="scss">
nav {
    display: flex;
    flex-direction: column;
    align-items: center;

    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    background-color: var(--halcyon-surface-container);
    width: 80px;

    padding: 12px 0;

    z-index: var(--halcyon-modal-z);
}

section {
    padding-top: 12px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    flex: 1;

    &.top {
        justify-content: start;
    }

    &.center {
        justify-content: center;
    }

    &.end {
        justify-content: end;
    }
}

.rail-fab {
    margin: 12px 0 0 0;
}

</style>