<!-- eslint-disable func-call-spacing -->
<script setup lang="ts">
import { MenuItem } from '@headlessui/vue'
import MenuRight from '~icons/mdi/menu-right'

const props = defineProps<{
    label: string
    onClick?: () => void
    hasSubmenu?: boolean
    isLink?: boolean
    useRouterLink?: boolean
    disabled?: boolean
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
    <MenuItem
        :as="getComponentKind()"
        class="menu-item"
        :disabled="disabled"
        v-slot="{ close }"
        @click="(isLink || onClick()) && close()"
    >
        <slot name="leading" />
        <span class="label">{{ label }}</span>
        <span class="trailing">
            <slot v-if="!hasSubmenu" name="trailing" />
            <menu-right v-else />
        </span>
    </MenuItem>
</template>

<style scoped lang="scss">
@use "../util";

.menu-item {
    display: flex;
    flex-direction: row;
    align-items: center;

    height: 48px;

    @include util.label-large;

    padding: 0 12px;

    .label {
        margin: 0 8px;
        white-space: nowrap;
        flex: 1;
        text-align: start;
    }

    &:first-child {
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
        padding-top: 4px;
    }

    &:last-child {
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
        padding-bottom: 4px;
    }

    &:deep(:is(svg, .trailing))  {
        color: var(--halcyon-on-surface-variant);
    }

    &[data-headlessui-state="active"] {
        background-color: var(--halcyon-surface-container-highest);
    }

    &[data-headlessui-state="disabled"] {
        color: var(--halcyon-on-surface-o38);
        pointer-events: none;

        &:deep(:is(svg, .trailing))  {
            color: var(--halcyon-on-surface-o38);
        }
    }
}
</style>