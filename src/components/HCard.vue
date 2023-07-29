<script setup lang="ts">
import type { Component } from 'vue';

defineProps<{
    kind: 'elevated' | 'filled' | 'outlined'
    as?: string | Component
    interactable?: boolean
    noPadding?: boolean
}>()
</script>

<template>
    <component :is="as || 'div'" class="card" :class="[kind, { interactable, noPadding }]">
        <div class="state-layer" v-if="interactable">
            <slot />
        </div>
        <slot v-else />
    </component>
</template>

<style scoped lang="scss">
@use "../util";

.card {
    transition: box-shadow util.$duration-short-2 util.$te-standard;
    border-radius: 12px;

    &:not(.interactable):not(.noPadding) {
        padding: 0 16px;
    }
    
    + .card {
        margin-left: 8px;
    }

    &:deep(h1) {
        @include util.display-small;
    }

    &:deep(h2) {
        @include util.headline-small;
    }

    &:deep(p) {
        @include util.body-medium;
    }
}

button {
    text-align: left;
}
.state-layer {
    transition: background-color util.$duration-short-2 util.$te-standard;

    width: 100%;
    height: 100%;

    border-radius: 12px;

    .card:not(.noPadding) & {
        padding: 0 16px;
    }

    .card:hover & {
        background-color: var(--halcyon-on-surface-o8);
    }

    .card:is(:active, :focus) & {
        background-color: var(--halcyon-on-surface-o12);
    }
}

.elevated {
    background-color: var(--halcyon-surface-container-low);
    @include util.shadow-sm;

    &.interactable:hover {
        @include util.shadow-md;
    }
}

.card.interactable:is(.filled, .outlined):hover {
    @include util.shadow-sm;
}

.card.interactable:is(.filled, .outlined):disabled {
    opacity: 0.38;
}

.filled {
    background-color: var(--halcyon-surface-container-highest);
    &:disabled {
        background-color: var(--halcyon-surface);
    }
}

.outlined {
    background-color: var(--halcyon-surface);
    outline: 1px solid var(--halcyon-outline);

    &:disabled {
        outline-color: var(--halcyon-outline-o12);
    }
}
</style>