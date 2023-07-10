<script setup lang="ts">
import { ref } from 'vue';
import { useHideOnScroll } from '../common'

defineProps<{
    hideOnScroll?: boolean
}>()

const show = ref(true)

useHideOnScroll({
    onUp: () => { show.value = true }, 
    onDown: () => { show.value = false }
})
</script>

<template>
    <Teleport to="body">
        <Transition name="nav-bar" appear>
            <nav v-if="hideOnScroll ? show : true">
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

    background-color: var(--halcyon-surface);

    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;

    z-index: 20;
}

.nav-bar-enter-active,
.nav-bar-leave-active {
    transition: transform util.$duration-short-4 util.$te-standard;
}

.nav-bar-enter-from,
.nav-bar-leave-to {
    transform: translateY(100%);
}
</style>