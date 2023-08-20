<script setup lang="ts">
import { useHideOnScroll } from '../common'
import { useScroll } from '@vueuse/core'
import { ref, watch, toRefs, useSlots, onMounted, onUnmounted } from 'vue';
import HFloatingActionButton from './HFloatingActionButton.vue'
import { state } from '../state';

defineProps<{
    fabLabel: string
}>()

const emit = defineEmits<{
    (e: 'fab-click', event: Event): void
}>()

const show = ref(true)
const showIcons = ref(true)

onMounted(() => {
    state.bottomBarOpen = true
})
onUnmounted(() => {
    state.bottomBarOpen = false
})

const onUp = () => {
    show.value = true
    state.bottomBarOpen = true
    setTimeout(() => {
        showIcons.value = show.value
    }, 50)
}

useHideOnScroll({
    onUp,
    onDown: () => {
        state.bottomBarOpen = false
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
            <div class="bottom-app-bar" :class="{'off-screen': !show}" @focusin="onUp">
                <ul class="icons-container" :style="{ '--total': n }">
                    <li class="icons" v-for="i in n" :key="i" :style="{ '--i': i }">
                        <slot :name="`icon-${i}`" />
                    </li>
                </ul>
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

    transition: transform util.$duration-short-4 util.$te-standard;

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

    &.off-screen {
        transform: translateY(100%);
    }
}

.icons-container {
    display: flex;
    align-items: center;
    flex-direction: row;
}


.icons {
    transition-property: opacity, transform;
    transition-duration: util.$duration-short-3;
    transition-timing-function: util.$te-standard-decelerate;
    transition-delay: calc(50ms * var(--i));

    .off-screen & {
        opacity: 0;
        transform: translateY(5em);
    }
}
</style>