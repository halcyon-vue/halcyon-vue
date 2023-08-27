<script setup lang="ts">
import { Ref, onMounted, onUnmounted, ref } from 'vue';
import { popNotification, currentNotifications, Notification, listen, unlisten } from '../snackbar'
import HButton from './HButton.vue'
import HIconButton from './HIconButton.vue'
import CloseIcon from '~icons/mdi/close'
import { state } from '../state'

defineProps<{
    align?: 'center' | 'left'
}>()

const working = ref(false)

const currentNotification: Ref<Notification | null> = ref(null)

const addNext = () => {
    const notification = popNotification()
    currentNotification.value = notification
    if (!notification) {
        working.value = false
        return
    }
    if (!notification.persistent) {
        setTimeout(close, 4000)
    }
}

const close = () => {
    currentNotification.value = null
    setTimeout(addNext, 300)
}

const listener = () => {
    if (!working.value) {
        working.value = true
        addNext()
    }
}

const action = () => {
    const handler = currentNotification.value?.action?.handler
    if (handler) {
        handler()
        close()
    }
}

onMounted(() => listen(listener))
onUnmounted(() => unlisten(listener))

const stateClasses = {
    'bottom-bar-open': state.bottomBarOpen,
    'nav-bar-open': state.navbarOpen,
    'rail-open': state.railOpen
}

</script>

<template>
    <Teleport to="body">
        <div id="snackbar-container" role="alert" :class="[align, stateClasses]">
            <Transition>
                <div v-if="currentNotification" class="notification" :class="{ multiline: currentNotification.multiline }">
                    <span class="message">
                        {{ currentNotification.message }}
                    </span>
                    <h-button v-if="currentNotification.action" kind="text" @click="action">
                        {{ currentNotification.action.label }}
                    </h-button>
                    <h-icon-button v-if="currentNotification.persistent" label="Close" @click="close">
                        <close-icon />
                    </h-icon-button>
                </div>
            </Transition>
        </div>
    </Teleport>
</template>

<style scoped lang="scss">
@use "../util";

#snackbar-container {
    transition-property: bottom;
    transition-duration: util.$duration-short-4;
    transition-timing-function: util.$te-standard;
    z-index: var(--halcyon-snackbar-z);
    position: fixed;
    bottom: 24px;
    left: 12px;
    right: 12px;
    display: flex;
    flex-direction: row;
    justify-content: center;

    &.left {
        justify-content: start;
    }

    &.bottom-bar-open, &.nav-bar-open {
        bottom: 104px;
    }

    &.rail-open {
        left: 102px;
    }
}

.notification {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 48px;
    max-width: min(70ch, calc(100vw - 24px));
    min-width: 30ch;
    padding: 0 8px 0 16px;
    border-radius: 4px;
    background-color: var(--halcyon-inverse-surface);
    color: var(--halcyon-inverse-on-surface);
    @include util.shadow-sm;

    &:deep(svg) {
        color: var(--halcyon-inverse-on-surface);
    }

    &:deep(button.text) {
        color: var(--halcyon-inverse-primary);
    }
}

.message {
    @include util.label-large;
    flex: 1;
}

.message:last-child {
    padding-right: 8px;
}

.v-enter-active,
.v-leave-active {
    transition-property: opacity, transform;
    transition-duration: util.$duration-short-4;
    transition-timing-function: util.$te-standard;
    transform-origin: center bottom;
}

.v-enter-from {
    transform: scaleY(0.7);
    opacity: 0;
}

.v-leave-to {
    opacity: 0;
}
</style>