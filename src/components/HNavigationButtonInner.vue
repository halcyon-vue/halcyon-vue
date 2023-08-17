<script setup lang="ts">
import { computed, inject } from 'vue';
import HTooltip from './HTooltip.vue';

const props = defineProps<{
    content?: string
    label: string
    useRouterLink?: boolean
    to?: string
    hideLabel?: boolean
    isActive?: boolean
    showBadge?: boolean
    badgeCount?: number
    noTooltip?: boolean
}>()

const handleClick = () => {
    if (props.isActive) {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }
}

const inDrawer = inject('in drawer', false)

const badgeText = computed(() => {
    if (props.badgeCount) {
        return props.badgeCount > 999 ? '999+' : props.badgeCount
    } else {
        return ' '
    }
})

const hideTooltip = computed(() => props.noTooltip || inDrawer)
</script>

<template>
    
        <component :is="useRouterLink ? 'router-link' : 'a'" :aria-label="label" class="navigation-button"
            :class="{ active: isActive, 'in-drawer': inDrawer, 'label-hidden': hideLabel }" :href="to" :to="to" @click="handleClick" tabindex=0>
            <div class="state-layer-outer" v-if="inDrawer">
                <div class="state-layer-inner">
                    <slot name="active" v-if="isActive" />
                    <slot name="inactive" v-else />
                    <div v-if="showBadge && !badgeCount" class="badge"></div>
                    <span v-if="!hideLabel">{{ content || label }}</span>
                    <div v-if="showBadge && badgeCount" class="badge count">
                        {{ badgeText }}
                    </div>
                </div>
            </div>
            <div class="state-layer-outer" v-else>
                <div class="state-layer-inner" aria-hidden>
                    <slot name="active" v-if="isActive" />
                    <slot name="inactive" v-else />
                </div>
                <div v-if="showBadge" :class="{ 'count': badgeCount }" class="badge">
                    {{ badgeText }}
                </div>
            </div>
            <span v-if="!hideLabel && !inDrawer">{{ content || label }}</span>
        </component>
</template>

<style scoped lang="scss">
@use "../util";

.navigation-button {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    cursor: pointer;
}

.label-hidden:not(.in-drawer) .state-layer-outer,
.label-hidden:not(.in-drawer) .state-layer-inner {
    height: 56px;
    width: 56px;
    border-radius: 100%;
}

.in-drawer .state-layer-outer,
.in-drawer .state-layer-inner {
    width: 336px;
    height: 56px;
    flex-direction: row;
    justify-content: left;
    border-radius: 28px;
}

.in-drawer span {
    @include util.label-large;
    padding-left: 12px;
    flex: 1;
    text-align: left;
}

.in-drawer .state-layer-inner {
    padding: 0 24px;
}

.state-layer-outer,
.state-layer-inner {
    height: 32px;
    width: 64px;
    border-radius: 16px;
    transition: background-color util.$duration-short-2 util.$te-standard;
    transition-property: color, background-color;
    background-color: transparent;
}

.active .state-layer-outer {
    background-color: var(--halcyon-secondary-container);
}

.state-layer-inner {
    display: flex;
    align-items: center;
    justify-content: center;

    color: var(--halcyon-on-surface-variant);

    &:deep(svg) {
        height: 24px;
        width: 24px;
    }

    .navigation-button:hover & {
        background-color: var(--halcyon-on-surface-variant-o16);
    }

    .navigation-button:is(:focus, :active) & {
        background-color: var(--halcyon-on-surface-variant-o38);
    }

    .active & {
        color: var(--halcyon-on-secondary-container);

        .navigation-button:hover & {
            background-color: var(--halcyon-on-surface-o16);
        }

        .navigation-button:is(:focus, :active) & {
            background-color: var(--halcyon-on-surface-o38);
        }

    }
}

span {
    @include util.label-medium;
    text-align: center;
    user-select: none;

    transition: color util.$duration-short-2 util.$te-standard;

    color: var(--halcyon-on-surface-variant);

    .active & {
        color: var(--halcyon-on-surface);
    }
}

a {
    text-decoration: none;
}

.in-drawer .badge {
    left: -6px;
    top: -8px;
}

.in-drawer .badge:not(.count)~span {
    position: relative;
    left: -6px;
}

.in-drawer .badge.count {
    position: static;
    background-color: transparent;
    color: var(--halcyon-on-surface-variant);
    @include util.label-medium;
    width: auto;
    height: auto;
    max-width: max-content;
    padding: 0;
}

.badge {
    position: relative;
    top: -28px;
    left: 38px;
    background-color: var(--halcyon-error);
    border-radius: 9999px;
    width: 6px;
    height: 6px;
}

.badge.count {
    height: 16px;
    left: 32px;
    top: -32px;
    padding: 0 4px;
    width: min-content;
    max-width: 34px;
    border-radius: 8px;
    color: var(--halcyon-on-error);
    font-variant-numeric: tabular-nums;

    @include util.label-small;
}
</style>