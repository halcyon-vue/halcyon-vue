<!-- eslint-disable func-call-spacing -->
<script setup lang="ts">
import { isLink } from '../common'
import { MenuItem } from '@headlessui/vue'
import type { Component } from 'vue';
import MenuRight from '~icons/mdi/menu-right'

const props = defineProps<{
    label: string
    onClick?: () => void
    hasSubmenu?: boolean
    as: string | Component
    disabled?: boolean
    
}>()
const handleClick = (e: Event, close: () => any) => {
    if(isLink(props.as)) return
    e.preventDefault()
    if(props.hasSubmenu) return
    if (props.onClick) {
        props.onClick()
    }
    close()
}

</script>

<template>
    <MenuItem
        as="template"
        :disabled="disabled"
        v-slot="{ close, active }"
    >
        <component
            class="menu-item"
            :class="{ active, disabled }"
            :is="as"
            @click="e => handleClick(e, close)"
            v-bind="$attrs"
        >
            <slot name="leading" />
            <span class="label">{{ label }}</span>
            <span class="trailing">
                <slot v-if="!hasSubmenu" name="trailing" />
                <menu-right v-else />
            </span>
        </component>
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

    &.active {
        background-color: var(--halcyon-surface-container-highest);
    }

    &.disabled {
        color: var(--halcyon-on-surface-o38);
        pointer-events: none;

        &:deep(:is(svg, .trailing))  {
            color: var(--halcyon-on-surface-o38);
        }
    }
}

a {
    color: var(--halcyon-on-surface);
    text-decoration: none !important;
    :hover {
        text-decoration: none !important;
    }
}
</style>