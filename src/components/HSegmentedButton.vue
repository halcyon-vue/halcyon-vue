<script setup lang="ts">
import { useSlots } from 'vue'
import Check from '~icons/mdi/check'

const props = defineProps<{
  // Whether only one option can be selected, or if multiple can be.
  kind?: 'single' | 'multiple'

  // If true, text will not show and icons will be used instead.
  iconsOnly?: boolean

  // Applies accessibility attributes associated with tabs.
  // Cannot be used with `kind="multiple"`.
  isTab?: boolean

  default?: number | number[]

  disabled?: boolean | number[]

  modelValue?: number | number[]
}>()

const emit = defineEmits<{
  'update:modelValue': [number | number[]]
}>()

const n = Object.keys(useSlots())
  .map((s) => s.slice(-1))
  .map((s) => Number(s))
  .filter((n) => !Number.isNaN(n))
  .reduce((acc, val) => (val > acc ? val : acc))

if (props.isTab && (props.kind === 'multiple')) {
  console.error('HSegmentedButton: `isTab` is not compatible with `kind="multiple"`')
}

if (n > 5) {
  console.error('HSegmentedButton: Should not be used for more than 5 elements.')
}

const isSelected = (i: number) => {
  if (props.kind === 'single') {
    let value = props.modelValue
    if (Array.isArray(props.modelValue)) {
      emit('update:modelValue', props.modelValue[0])
      value = props.modelValue[0]
    }
    if (props.modelValue === undefined) {
      emit('update:modelValue', props.default)
      value = props.default
    }
    return value === i
  } else {
    if (!Array.isArray(props.modelValue)) {
      emit('update:modelValue', [props.modelValue])
      return i === props.modelValue
    }
    return (props.modelValue as number[]).includes(i)
  }
}

const isDisabled = (i: number) => {
  if (props.disabled === true) {
    return true
  } else if (props.disabled === false) {
    return false
  } else {
    return (props.disabled as number[]).includes(i)
  }
}

const select = (i: number) => {
  if (props.kind === 'single') {
    emit('update:modelValue', i)
  } else {
    if (!Array.isArray(props.modelValue)) emit('update:modelValue', [i, props.modelValue])
    const arr = props.modelValue as number[]
    if (arr.includes(i)) {
      arr.splice(arr.indexOf(i), 1)
    } else {
      arr.push(i)
    }
    emit('update:modelValue', arr)
  }
}
</script>

<template>
  <div class="h-segmented-button-container">
    <button v-for="i in n" :key="i" class="h-segmented-button" :disabled="isDisabled(i)" :class="{
      selected: isSelected(i),
      tab: isTab,
    }" @click="select(i)">
      <check v-if="isSelected(i)" />
      <slot v-if="iconsOnly || !isSelected(i)" :name="'icon-' + i"></slot>
      <slot v-if="!iconsOnly" :name="'text-' + i"></slot>
    </button>
  </div>
</template>

<style scoped lang="scss">
@use "../util";

div.h-segmented-button-container {
  display: grid;
  grid-template-columns: repeat(v-bind('n'), 1fr);
}

button {
  display: flex;
  flex-direction: row;
  flex: 1 1 0px;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 40px;
  padding: 0 12px;
  @include util.label-large;

  border: 1px solid var(--halcyon-outline);
  border-right-width: 0;
  color: var(--halcyon-on-surface);

  &:hover {
    background-color: var(--halcyon-on-surface-o8);
  }

  &:focus {
    background-color: var(--halcyon-on-surface-o12);
  }

  &:active {
    background-color: var(--halcyon-on-surface-o16);
  }

  &.selected {
    color: var(--halcyon-on-secondary-container);
    background-color: var(--halcyon-secondary-container);

    &:hover {
      background-color: var(--halcyon-secondary-hover);
    }

    &:focus {
      background-color: var(--halcyon-secondary-focus);
    }

    &:active {
      background-color: var(--halcyon-secondary-press);
    }
  }

  &:disabled,
  &.selected:disabled {
    pointer-events: none;
    border-color: var(--halcyon-on-surface-o12);
    color: var(--halcyon-on-surface-o38);
  }
}

button:first-child {
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
}

button:last-child {
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  border-right-width: 1px;
}
</style>
