<script setup lang="ts">
import HTooltip from './HTooltip.vue';
import { type Component, computed, ref } from 'vue'

const props = defineProps<{
  kind?: 'filled' | 'filled-tonal' | 'outlined' | 'standard',
  // The label to use for accessibility.
  label: string,
  toggleable?: boolean,
  disabled?: boolean,
  // Which element to render the button as.
  as?: string | Component,
  // What the toggle state defaults to.
  checked?: boolean
  modelValue?: boolean

  noTooltip?: boolean
}>()

if (props.toggleable && (props.as === 'a' || props.as === 'router-link' || props.as === 'nuxt-link')) {
  console.error('HIconButton: Toggleable buttons cannot be links.')
}

const emit = defineEmits<{
  'update:modelValue': [boolean]
}>()

const _toggleable = props.toggleable && !(props.as === 'a' || props.as === 'router-link')

const role = computed(() => {
  if (props.as === 'a' || props.as === 'router-link') return 'link'
  if (_toggleable) return 'checkbox'
  return 'button'
})

const selected = ref(!!props.checked)

const toggle = () => {
  if (!_toggleable) return
  selected.value = !selected.value
  emit('update:modelValue', selected.value)
}
</script>

<template>
  <component :content="label" :is="noTooltip ? 'div' : HTooltip">
    <component :is="as || 'button'" :aria-label="label" :disabled="disabled" class="h-icon-button" :class="{
      selected,
      toggleable: _toggleable,
      [kind || 'standard']: true,
    }" @click="toggle" :role="role" v-bind="$attrs">
      <span class="state-layer">
        <slot v-if="!toggleable" />
        <slot name="selected" v-if="toggleable && selected" />
        <slot name="unselected" v-if="toggleable && (!selected)" />
      </span>
    </component>
  </component>
</template>

<style scoped lang="scss">
@use "../util";

.h-icon-button {
  border-radius: 100%;
  height: 48px;
  width: 48px;

  display: flex;
  justify-content: center;
  align-items: center;

  color: var(--halcyon-on-surface-variant);

  transition-timing-function: util.$te-standard;
  transition-duration: util.$duration-short-4;
  transition-property: background-color, color, outline-color;
}

.h-icon-button.filled .state-layer {
  background-color: var(--halcyon-primary);
  color: var(--halcyon-on-primary);
}

.h-icon-button.filled.toggleable .state-layer {
  background-color: var(--halcyon-surface-variant);
  color: var(--halcyon-primary);
}

.h-icon-button.filled.selected .state-layer {
  background-color: var(--halcyon-primary);
  color: var(--halcyon-on-primary);
}

.h-icon-button.filled-tonal .state-layer {
  background-color: var(--halcyon-secondary-container);
  color: var(--halcyon-on-secondary-container);
}

.h-icon-button.filled-tonal.toggleable .state-layer {
  background-color: var(--halcyon-surface-container-highest);
  color: var(--halcyon-on-surface-variant);
}

.h-icon-button.filled-tonal.selected .state-layer {
  background-color: var(--halcyon-secondary-container);
  color: var(--halcyon-on-secondary-container);
}

.h-icon-button:is(.filled, .filled-tonal):disabled .state-layer {
  color: var(--halcyon-on-surface-o38);
  background-color: var(--halcyon-on-surface-o12);
}

.h-icon-button.standard.selected {
  color: var(--halcyon-primary);
}

.state-layer {
  border-radius: 100%;
  height: 40px;
  width: 40px;

  display: flex;
  justify-content: center;
  align-items: center;

  transition: background-color util.$te-standard util.$duration-short-4;
}

.h-icon-button.outlined .state-layer {
  outline: 1px solid var(--halcyon-outline);
}

.h-icon-button.outlined:disabled .state-layer {
  color: var(--halcyon-on-surface-o38);
  background-color: var(--halcyon-on-surface-o12);
}

.h-icon-button.outlined.selected .state-layer {
  color: var(--halcyon-inverse-on-surface);
  background-color: var(--halcyon-inverse-surface);
  outline-color: transparent;
}

.h-icon-button.outlined.selected:disabled .state-layer {
  color: var(--halcyon-on-surface-o38);
  background-color: var(--halcyon-on-surface-o12);
}

.h-icon-button:is(.standard, .outlined):not(.selected):hover .state-layer {
  background-color: var(--halcyon-on-surface-o8);
}

.h-icon-button:is(.standard, .outlined):not(.selected):focus .state-layer {
  background-color: var(--halcyon-on-surface-o12);
}

.h-icon-button:is(.standard, .outlined):not(.selected):active .state-layer {
  background-color: var(--halcyon-on-surface-o16);
}

.h-icon-button:is(.standard, .outlined):not(.selected):disabled {
  color: var(--halcyon-on-surface-o38);
}

.h-icon-button:deep(svg) {
  width: 24px;
  height: 24px;
}
</style>