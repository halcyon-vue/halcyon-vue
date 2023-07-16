<script setup lang="ts">
import {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogPanel,
    DialogTitle
} from '@headlessui/vue'
import { useSwipe } from '@vueuse/core';
import { provide, watch } from 'vue';

const props = defineProps<{
    title?: string
    open?: boolean
    static?: boolean
}>()

const emit = defineEmits<{ (e: 'update:open', modelValue: boolean): any; }>()

const close = () => emit('update:open', false)

const { isSwiping, direction } = useSwipe(document)

watch(isSwiping, (isSwiping) => {
    if (!props.static) return
    if (isSwiping) {
        if (direction.value === 'left') {
            close()
        } else if (direction.value === 'right') {
            emit('update:open', true)
        }
    }
})

provide('in drawer', true);
</script>

<template>
    <Teleport to="body" v-if="static">
        <nav>
            <h1>{{ title }}</h1>
        </nav>
    </Teleport>
    <TransitionRoot as="template" appear :show="open" v-else>
        <Dialog @close="close">
            <TransitionChild as="template" enter="scrim-active" enter-from="scrim-from" enter-to="scrim-to"
                leave="scrim-active" leave-from="scrim-to" leave-to="scrim-from">
                <div class="scrim" aria-hidden="true" />
            </TransitionChild>
            <TransitionChild as="template" enter="drawer-active" enter-from="drawer-from" enter-to="drawer-to"
                leave="drawer-active" leave-from="drawer-to" leave-to="drawer-from">
                <DialogPanel as="nav">
                    <slot />
                </DialogPanel>
            </TransitionChild>
        </Dialog>
    </TransitionRoot>
</template>

<style scoped lang="scss">
@use "../util";

nav {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    background-color: var(--halcyon-surface-container);
    width: 360px;

    z-index: var(--halcyon-modal-z);

    padding: 0 28px;

    &:deep(h1, h2) {
        color: var(--halcyon-on-surface-variant);
        @include util.title-small;
        margin: 8px 0;
    }

    &:deep(hr) {
        color: var(--halcyon-outline-variant);
        margin: 8px 0;
        border-width: 1px;
    }
}

.scrim {
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.27);
    z-index: calc(var(--halcyon-modal-z) - 1);
}

.scrim-active,
.drawer-active {
    transition-duration: util.$duration-short-4;
    transition-timing-function: util.$te-emphasized-decelerate;
}

.drawer-active {
    transition-property: transform;
}

.drawer-from {
    transform: translateX(-100%);
}

.drawer-to {
    transform: none;
}

.scrim-active {
    transition-property: opacity;
}

.scrim-from {
    opacity: 0;
}

.scrim-to {
    opacity: 1;
}
</style>