<script setup lang="ts">
import { useSlots } from 'vue'

const props = defineProps<{
    // The kind of button to render.
    kind: 'elevated' | 'filled' | 'filled-tonal' | 'outline' | 'text',
    // The text content to include in the button.
    content?: string,
    // The label to use for accessibility.
    // If none is provided, the content will be used.
    label?: string,
    disabled?: boolean,
    // Which element to render the button as.
    as?: 'button' | 'a' | 'router-link',
    // If the button is a link, where to link to.
    to?: string

    addEmptyPadding?: boolean
    removeEmptyPadding?: boolean
}>()

const slots = useSlots()
const icon = props.removeEmptyPadding || (slots.default && !props.addEmptyPadding)

</script>

<template>
    <button
        :class="[kind, { icon }]"
        :aria-label="label || content"
        :disabled="disabled"
    >
        <slot/>
        <span v-if="content">{{ content }}</span>
    </button>
</template>

<style scoped lang="scss">
@use "../util";

button {
  @include util.label-large;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  padding: 0 24px;
  height: 40px;
  white-space: nowrap;
  gap: 8px;
  border: none;
  transition-property: background-color, box-shadow, border-color;
  transition-duration: util.$duration-short-4;
  transition-timing-function: util.$te-standard;
  &:not(:disabled) {
    cursor: pointer;
  }
  span {
    vertical-align: middle;
  }
}

.icon {
  padding-left: 16px;
}
:is(button.filled, button.filled-tonal, button.elevated):disabled {
  pointer-events: none;
  box-shadow: none;
  background-color: var(--halcyon-on-surface-o12);
  color: var(--halcyon-on-surface-o38);
}

:is(button.filled, button.filled-tonal):is(:hover, :focus):not(:disabled), button.elevated {
  @include util.shadow-sm;
}

button.filled {
  background-color: var(--halcyon-primary);
  color: var(--halcyon-on-primary);

  &:is(:hover, :active) {
    background-color: var(--halcyon-primary-elevation-1);
  }

  &:focus {
    background-color: var(--halcyon-primary-elevation-2);
  }
}

button.filled-tonal {
  background-color: var(--halcyon-secondary-container);
  color: var(--halcyon-on-secondary-container);

  &:is(:hover, :active) {
    background-color: var(--halcyon-secondary-container-elevation-1);
  }

  &:focus {
    background-color: var(--halcyon-secondary-container-elevation-2);
  }
}

button.elevated, button.outline, button.text {
  color: var(--halcyon-primary);
}

button.elevated {
  background-color: var(--halcyon-surface-container-low);

  &:is(:hover, :focus) {
    background-color: var(--halcyon-surface-container);
    @include util.shadow-md;
  }
}

button.outline {
  border: 1px solid var(--halcyon-outline);
}

:is(button.outline, button.text) {
  &:hover {
    background-color: var(--halcyon-primary-o8);
  }
  &:focus {
    background-color: var(--halcyon-primary-o12);
    border-color: var(--halcyon-primary);
  }
  &:active {
    background-color: var(--halcyon-primary-o12);
    border-color: var(--halcyon-primary);
  }
  &:disabled {
    border-color: var(--halcyon-on-surface-o12);
    color: var(--halcyon-on-surface-o38)
  }
}

</style>
