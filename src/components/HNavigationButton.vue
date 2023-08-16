<script setup lang="ts">
import { inject, computed } from 'vue';
import HNavigationButtonInner from './HNavigationButtonInner.vue'
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

const inDrawer = inject('in drawer', false)
const inBar = inject('in bar', false)
const inRail = inject('in rail', false)

const offset = computed(() => {
    if (inBar) {
        return 18
    } else if (inRail) {
        return 16
    } else {
        return 'small'
    }
})

const hideTooltip = computed(() => props.noTooltip || inDrawer)
</script>

<template>
    <h-navigation-button-inner
        v-if="hideTooltip"
        :content="content"
        :label="label"
        :use-router-link="useRouterLink"
        :to="to"
        :hide-label="hideLabel"
        :is-active="isActive"
        :show-badge="showBadge"
        :badge-count="badgeCount"
        :no-tooltip="hideTooltip"
    >
        <template #active>
            <slot name="active" />
        </template>
        <template #inactive>
            <slot name="inactive" />
        </template>
    </h-navigation-button-inner>
    <h-tooltip :content="label" :on-side="!inBar" :offset="offset" v-else>
        <h-navigation-button-inner
            :content="content"
            :label="label"
            :use-router-link="useRouterLink"
            :to="to"
            :hide-label="hideLabel"
            :is-active="isActive"
            :show-badge="showBadge"
            :badge-count="badgeCount"
            :no-tooltip="hideTooltip"
        >
            <template #active>
                <slot name="active" />
            </template>
            <template #inactive>
                <slot name="inactive" />
            </template>
        </h-navigation-button-inner>
    </h-tooltip>
    
</template>