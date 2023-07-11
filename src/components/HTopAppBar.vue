<script setup lang="ts">
import { vIntersectionObserver } from '@vueuse/components'
import { pinnedHandler } from '../common'
import { useHideOnScroll } from '../common'
import { useWindowScroll } from '@vueuse/core'
import { computed, ref } from 'vue';

const show = ref(true)

useHideOnScroll({
    onUp() {
        show.value = true
    },
    onDown() {
        show.value = false
    }
})

const props = defineProps<{
    kind: 'center' | 'small' | 'medium' | 'large' | 'compressing'
    title: string
    hideOnScroll?: boolean
}>()

const { y } = useWindowScroll()

const atTop = computed(() => y.value === 0)

const _kind = computed(() => {
    if(props.kind === 'compressing') {
        if(atTop.value) {
            return 'medium'
        } else {
            return 'center'
        }
    } else {
        return props.kind
    }
})
</script>

<template>
    <header :class="[_kind, { 'off-screen': hideOnScroll ? !show : false, 'is-pinned': !atTop, 'compressing': kind === 'compressing'}]">
        <div class="leading">
            <slot name="navigation-icon" />
        </div>
        <Transition name="fade">
            <h1 class="first" v-if="kind === 'compressing' ? _kind === 'center': true">
                {{ title }}
            </h1>
            <h1 class="second" v-else>
                {{ title }}
            </h1>
        </Transition>
        <div class="trailing">
            <slot name="trailing" />
        </div>
        
    </header>
</template>

<style scoped lang="scss">
@use "../util";
header {
    transition-property: background-color, transform, grid-template-rows;
    transition-duration: util.$duration-short-2, util.$duration-short-4, util.$duration-short-4;
    transition-timing-function: util.$te-standard;
    color: var(--halcyon-on-surface);

    position: sticky;
    top: 0;
    //top: -1px;
    left: 0;
    right: 0;
    //padding-top: 1px;
    display: grid;
    grid-template-areas: "leading h1 trailing";
    align-items: center;
    min-height: 64px;
    z-index: 50;

    &.is-pinned {
      background-color: var(--halcyon-surface-container);
    }
}

.small {
    grid-template-columns: 64px auto auto;
}

:is(.medium, .large) {
    grid-template-areas:
        "leading trailing"
        "below below";

    & > h1 {
        margin: 0 16px;
        grid-row: below;
        grid-column: span 2;
    }
}

.compressing.center {
    grid-template-areas:
        "leading first trailing"
        "below below below";
    grid-template-rows: 64px 0px;
}

.compressing:is(.medium, .large) {
    grid-template-areas:
        "leading first trailing"
        "below below below";
    grid-template-columns: 1fr auto 1fr;

    & > .first {
        grid-area: first;
    }

    & > .second {
        grid-area: below;
    }
}

.medium {
    min-height: 112px;
    margin-bottom: 24px;
    grid-template-rows: 64px 48px;

    & > h1 {
        @include util.headline-small;
    }
}
.large {
    min-height: 152px;
    margin-bottom: 28px;
    grid-template-rows: 64px 88px;

    & > h1 {
        @include util.headline-medium;
    }
}

.center {
    grid-template-columns: 1fr auto 1fr;
    & h1 {
        text-align: center;
    }
}

:is(.center, .small) h1 {
    @include util.title-large;
    margin: 0 16px;
}
.leading {
    display: flex;
    flex-direction: row;
    justify-content: start;
    margin-left: 8px;
}

.trailing {
    grid-area: trailing;
    display: flex;
    flex-direction: row;
    justify-content: end;

    color: var(--halcyon-on-surface-variant);

    &:deep(> :not(svg)) {
        margin-right: 8px;
    }
}

.off-screen {
    transform: translateY(-100%);
}

.fade-enter-active,
.fade-leave-active {
    transition-property: transform, opacity;
    transition-duration: util.$duration-short-4;
    transition-timing-function: util.$te-standard;
}
.first.fade-leave-active {
    text-align: center;
}

.first.fade-enter-from,
.first.fade-leave-to {
    transform: translateY(100%);
    opacity: 0;
}

.second.fade-enter-from,
.second.fade-leave-to {
    transform: translateY(-100%);
    opacity: 0;
}
</style>