<script setup lang="ts">
const props = defineProps<{
    label: string
    useRouterLink?: boolean
    to?: string
    hideLabel?: boolean
    isActive?: boolean
    showBadge?: boolean
    badgeCount?: number
}>()

const handleClick = () => {
    if(props.isActive) {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }
}

const formatBadgeCount = () => {

}
</script>

<template>
    <component
        :is="useRouterLink ? 'router-link' : 'a'"
        :aria-label="label"
        class="navigation-button"
        :class="{ active: isActive }"
        :href="to"
        :to="to"
        @click="handleClick"
    >
        <div class="state-layer-outer">
            <div class="state-layer-inner" aria-hidden>
                <slot name="active" v-if="isActive" />
                <slot name="inactive" v-else />
            </div>
            <div
                v-if="showBadge"
                :class="{ 'count': badgeCount }"
                class="badge"
            >
                {{ badgeCount ? (badgeCount > 999 ? '999+' : badgeCount) : ' ' }}
            </div>
        </div>
        <span v-if="!hideLabel">{{ label }}</span>
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

.state-layer-outer, .state-layer-inner {
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