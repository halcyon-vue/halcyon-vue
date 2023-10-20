<script lang="ts" setup>
import { computed, ref, useSlots } from 'vue'
import { useVModel } from "@vueuse/core";

const props = defineProps<{
  id: string;
  disabled?: boolean;
  modelValue?: boolean;
}>()

const emit = defineEmits<{ (e: 'update:modelValue', modelValue: boolean): any; }>()

const value = useVModel(props, "modelValue", emit)
const toggle = () => {
  value.value = !value.value
  emit('update:modelValue', value.value)
}

const slots = useSlots()
const hasIcon = computed(
  () => (value.value && slots.on) || (!value.value && slots.off)
)
</script>

<template>
  <label class="switch">
    <input :disabled="disabled" :id="id" type="checkbox" @input="toggle" :checked="value" />
    <span class="thumb" :class="{ 'has-icon': hasIcon }">
      <slot name="on" v-if="value && hasIcon" />
      <span v-else-if="!value && hasIcon" class="off-container">
        <slot name="off" />
      </span>
      <template v-else>&nbsp;</template>
    </span>
    <span class="slider" :aria-label="value ? 'on' : 'off'" />
  </label>
</template>

<style scoped lang="scss">
@use "../util";

/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 52px;
  min-width: 52px;
  height: 32px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider,
.thumb {
  position: absolute;
  transition-timing-function: util.$te-standard;
  transition-duration: util.$duration-short-4;
  transition-property: all;
}

input:not(:disabled)~.slider {
  cursor: pointer;
}

/* The slider */
.slider {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--halcyon-surface-container-highest);
  border-radius: 32px;
}

input:not(:checked)~.slider {
  border: 2px solid var(--halcyon-outline);
}

input:disabled~.slider {
  background-color: var(--halcyon-on-surface-o12);
}

input:disabled:not(:checked)~.slider {
  border: 2px solid var(--halcyon-on-surface-o38);
}

.thumb {
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 16px;
  width: 16px;
  left: 6px;
  bottom: 8px;
  background-color: var(--halcyon-outline);
  border-radius: 50%;
  color: var(--halcyon-surface-container-highest);
  user-select: none;
}

.thumb.has-icon {
  width: 24px;
  height: 24px;
  bottom: 4px;
  left: 4px;
}

.thumb .off-container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 2px;
}

input:not(:disabled)~.thumb {
  cursor: pointer;
}

input:disabled~.thumb {
  background-color: var(--halcyon-on-surface-o38);
}

.switch:hover input:not(:disabled)~.thumb {
  box-shadow: 0 0 0 12px var(--halcyon-on-surface-o8);
  background-color: var(--halcyon-on-surface-variant);
}

.switch:hover input:not(:disabled):checked~.thumb {
  box-shadow: 0 0 0 12px var(--halcyon-primary-o8);
  background-color: var(--halcyon-primary-container);
}

.switch input:not(:disabled):focus~.thumb {
  box-shadow: 0 0 0 12px var(--halcyon-on-surface-o12);
  background-color: var(--halcyon-on-surface-variant);
}

.switch input:not(:disabled):focus:checked~.thumb {
  box-shadow: 0 0 0 12px var(--halcyon-primary-o12);
  background-color: var(--halcyon-primary-container);
}

.switch input:not(:disabled):active~.slider {
  border-color: var(--halcyon-on-surface-variant);
}

.switch input:not(:disabled):active~.thumb {
  box-shadow: 0 0 0 4px var(--halcyon-on-surface-o12);
  background-color: var(--halcyon-on-surface-variant);
  height: 30px;
  width: 30px;
  bottom: 0px;
  left: -1px;
}

.switch input:not(:disabled):active~.thumb .off-container {
  left: 4px;
}

.switch input:not(:disabled):active:checked~.thumb {
  box-shadow: 0 0 0 4px var(--halcyon-primary-o12);
  background-color: var(--halcyon-primary-container);
  height: 28px;
  width: 28px;
  bottom: 2px;
  left: 6px;
}

.switch input:not(:disabled):active:checked~.thumb.has-icon {
  left: 2px;
}

input:checked+.slider {
  border: none;
}

input:not(:disabled):checked~.slider {
  background-color: var(--halcyon-primary);
}

input:focus~.slider {
  box-shadow: 0 0 1px var(--halcyon-primary);
}

input:checked~.thumb {
  transform: translateX(18px);
  width: 24px;
  height: 24px;
  bottom: 4px;
}

input:checked~.thumb.has-icon {
  transform: translateX(20px);
}

input:not(:disabled):checked~.thumb {
  background-color: var(--halcyon-on-primary);
  color: var(--halcyon-primary);
}
</style>
