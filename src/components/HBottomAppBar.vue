<script setup lang="ts">
import { useHideOnScroll } from '../common'
import { useScroll } from '@vueuse/core'
import { ref, watch, toRefs, useSlots } from 'vue';
import HFloatingActionButton from './HFloatingActionButton.vue'

defineProps<{
    fabLabel: string
}>()

const emit = defineEmits<{
    (e: 'fab-click', event: Event): void
}>()

const show = ref(true)
const showIcons = ref(true)

useHideOnScroll({
    onUp: () => {
        show.value = true
        setTimeout(() => {
            showIcons.value = show.value
        }, 50)
    },
    onDown: () => {
        show.value = false
        showIcons.value = false
    }
})

const n = Object.keys(useSlots())
    .map((s) => s.slice(-1))
    .map((s) => Number(s))
    .filter((n) => !Number.isNaN(n))
    .reduce((acc, val) => (val > acc ? val : acc))
</script>

<template>
    <Teleport to="body">
        <Transition name="bottom-app-bar" appear>
            <div class="bottom-app-bar" v-if="show">
                <TransitionGroup name="icons" tag="ul" class="icons-container" :style="{ '--total': n }" appear>
                    <li v-for="i in n" :key="i" :style="{ '--i': i }" v-if="showIcons">
                        <slot :name="`icon-${i}`" />
                    </li>
                </TransitionGroup>
            </div>
        </Transition>
        <h-floating-action-button class="bottom-app-bar-fab" :class="{ 'bar-showing': show }" color="secondary"
            :noShadow="show" :label="fabLabel" @click="e => emit('fab-click', e)">
            <slot name="icon-fab" />
        </h-floating-action-button>
    </Teleport>
</template>

<style scoped lang="scss">
@use "../util";

.bottom-app-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 100;
    padding: 0 16px;
    height: 80px;
    background-color: var(--halcyon-surface-container);
    color: var(--halcyon-on-surface);
    display: flex;
    align-items: center;
    justify-content: space-between;

    &-fab {
        transition-property: box-shadow, transform, background-color, color;
        transition-duration: util.$duration-short-4;
        transition-timing-function: util.$te-standard;

        position: fixed;
        bottom: 0;
        right: 0;
        z-index: 101;

        &.bar-showing {
            transform: translateY(4px);
        }
    }
}

.icons-container {
    display: flex;
    align-items: center;
    flex-direction: row;
}

.bottom-app-bar-enter-active,
.bottom-app-bar-leave-active {
    transition: transform util.$duration-short-4 util.$te-standard;
}

.bottom-app-bar-enter-from,
.bottom-app-bar-leave-to {
    transform: translateY(100%);
}

.icons {

    &-leave-active,
    &-enter-active {
        transition-property: opacity, transform;
        transition-duration: util.$duration-short-3;
        transition-timing-function: util.$te-standard-decelerate;
        transition-delay: calc(50ms * var(--i));
    }

    // &-enter-active {
    //     transition: opacity .5s linear, transform .5s cubic-bezier(.2, .5, .1, 1);
    //     transition-delay: calc(50ms * var(--i));
    // }

    &-enter-from,
    &-leave-to {
        opacity: 0;
        transform: translateY(5em);
    }
}
</style>