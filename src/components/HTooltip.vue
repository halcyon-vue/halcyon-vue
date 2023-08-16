<script setup lang="ts">
import HButton from './HButton.vue'
import { useFloating, offset as offset_, autoPlacement } from '@floating-ui/vue'
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { notify, listen, unlisten } from '../tooltip'

const props = defineProps<{
    content: string

    offset?: 'none' | 'small' | 'large'

    rich?: boolean
    title?: string
    actions?: {
        label: string,
        handler: () => any
    }[]

    static?: boolean
    open?: boolean
}>()

const offset = () => {
    switch (props.offset) {
        case 'none': return offset_(0)
        case 'small': return offset_(4)
        case 'large': return offset_(8)
    }
    return offset_(0)
}

const element = ref(null as HTMLElement | null)
const tooltip = ref(null as HTMLElement | null)
const { floatingStyles } = useFloating(element, tooltip, {
    placement: props.rich ? 'bottom-end' : 'bottom',
    // @ts-ignore the docs give a different valid type
    middleware: [offset(), autoPlacement({ alignment: 'bottom' })]
})

const _open = ref(false)

/* HOVER HANDLING */
const hoverOpenTimer = ref(null as number | null)
const hoverCloseTimer = ref(null as number | null)

const onMouseOver = () => {
    hoverOpenTimer.value = window.setTimeout(() => {
        _open.value = true
    }, 500)
    if (hoverCloseTimer.value) {
        window.clearTimeout(hoverCloseTimer.value)
        hoverCloseTimer.value = null
    }
    hoverCloseTimer.value = null
}

const onMouseOut = () => {
    if (hoverOpenTimer.value) {
        window.clearTimeout(hoverOpenTimer.value)
        hoverOpenTimer.value = null
    }
    hoverCloseTimer.value = window.setTimeout(() => {
        console.log('closing: mouseout timer done')
        _open.value = false
    }, 1500)
}

/* CLICK HANDLING */

const clickTimer = ref(null as number | null)

/* HANDLE OTHER TOOLTIPS */
const listener = () => {
    console.log('closing: another tooltip opened')
    _open.value = false
}

watch(_open, value => { if(value) notify(listener) })
onMounted(() => listen(listener))
onUnmounted(() => unlisten(listener))
</script>

<template>
    <div
        ref="element"
        @mouseover="onMouseOver"
        @mouseleave="onMouseOut"
    >
        <slot v-bind="$attrs" />
    </div>
    <Transition>
        <div ref="tooltip" class="tooltip" :class="{ rich }" :style="floatingStyles" v-if="static ? open : _open" @mouseover="onMouseOver" @mouseleave="onMouseOut">
            <h2 v-if="rich && title">{{ title }}</h2>
            <span class="tooltip-content">{{ content }}</span>
            <div v-if="rich && actions" class="actions-container">
                <h-button kind="text" v-for="action in actions" :key="action.label" :label="action.label" :content="action.label" @click="action.handler" />
            </div>
        </div>
    </Transition>
</template>

<style scoped lang="scss">
@use "../util";
.tooltip {
    z-index: var(--halcyon-modal-z);

    background-color: var(--halcyon-inverse-surface);
    color: var(--halcyon-inverse-on-surface);
    min-height: 24px;
    padding: 8px;
    border-radius: 4px;

    @include util.body-small;
}

.tooltip.rich {
    background-color: var(--halcyon-surface);
    
    border-radius: 12px;
    padding: 12px 16px 8px 16px;

    & .tooltip-content {
        color: var(--halcyon-on-surface-variant);
    }

    @include util.body-medium;
    @include util.shadow-md;
}

h2 {
    margin: 0;
    border-top: none;
    padding-top: 12px;
    padding-bottom: 4px;
    color: var(--halcyon-on-surface-variant);
    @include util.title-small;
}

.actions-container {
    display: flex;
    flex-direction: row;
    margin-top: 12px;
}

.v-enter-active,
.v-leave-active {
  transition: opacity util.$duration-short-2 util.$te-standard;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>