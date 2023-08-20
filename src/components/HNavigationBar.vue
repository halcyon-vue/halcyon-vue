<script setup lang="ts">
import { onMounted, onUnmounted, provide, ref } from 'vue';
import { useHideOnScroll } from '../common'
import { state } from '../state';

const props = defineProps<{
    hideOnScroll?: boolean
}>()

onMounted(() => {
    state.navbarOpen = true
})

onUnmounted(() => {
    state.navbarOpen = false
})

const show = ref(true)

useHideOnScroll({
    onUp: () => {
        show.value = true
        if(!props.hideOnScroll) return
        state.navbarOpen = true
    }, 
    onDown: () => {
        show.value = false
        if(!props.hideOnScroll) return
        state.navbarOpen = false
    }
})

provide('in bar', true)

</script>

<template>
    <Teleport to="body">
        <Transition name="nav-bar" appear>
            <nav :class="{'off-screen': hideOnScroll ? !show : false}" @focusin="show = true" v-bind="$attrs">
                <slot/>
            </nav>
        </Transition>
    </Teleport>
</template>

<style scoped lang="scss">
@use "../util";
nav {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    gap: 8px;

    padding: 12px 0 16px 0;
    height: 80px;

    background-color: var(--halcyon-surface-container);

    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;

    z-index: 20;

    transition: transform util.$duration-short-4 util.$te-standard;
}

.off-screen {
    transform: translateY(100%);
}
</style>
