<!-- eslint-disable func-call-spacing -->
<script setup lang="ts">
import { MenuItem } from '@headlessui/vue'
import MenuRight from '~icons/mdi/menu-right'

const props = defineProps<{
    label: string
    onClick?: () => void
    dividerAbove?: boolean
    hasSubmenu?: boolean
    isLink?: boolean
    useRouterLink?: boolean
}>()

const getComponentKind = (): string => {
    if (props.isLink) {
        if (props.useRouterLink) {
            return 'router-link'
        } else {
            return 'a'
        }
    } else {
        return 'button'
    }
}

</script>

<template>
    <MenuItem :as="getComponentKind()" class="menu-item">
    <slot name="leading" />
    <span>{{ label }}</span>
    <slot name="trailing" v-if="!hasSubmenu" />
    <menu-right v-else />
    </MenuItem>
</template>

<style scoped lang="scss">
.menu-item {
    display: flex;
    flex-direction: row;

    background-color: var(--halcyon-surface-container);
    color: var(--halcyon-on-surface);
    height: 48px;

    &:first-child {
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
    }

    &:last-child {
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
    }
}
</style>