<script setup lang="ts">
defineProps<{
  kind?: 'standard' | 'small' | 'large' | 'extended'
  color?: 'surface' | 'secondary' | 'tertiary'

  // Content to use when `kind` is `extended`.
  content?: string
}>()
</script>

<template>
  <button class="h-fab" :class="[kind ?? 'standard', color ?? 'surface']">
    <slot/>
    <span v-if="kind === 'extended'">
      {{ content }}
    </span>
  </button>
</template>

<style scoped lang="scss">
@use "../util";
button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  font-family: inherit;

  margin: 0 16px 16px 0;

  @include util.shadow-md;

  &:deep(svg) {
    width: 24px;
    height: 24px;
  }
  span {
    @include util.label-large;
  }
}

.extended {
  padding: 16px;
  height: 56px;

  min-width: 80px;
  border-radius: 16px;
}

.surface {
  background-color: var(--halcyon-surface-container-high);
  color: var(--halcyon-primary);
}

.secondary {
  background-color: var(--halcyon-secondary-container);
  color: var(--halcyon-on-secondary-container);
}

.tertiary {
  background-color: var(--halcyon-tertiary-container);
  color: var(--halcyon-on-tertiary-container);
}

.small {
  height: 40px;
  width: 40px;
  border-radius: 12px;

  & + .h-fab:not(.small) {
    margin-top: 8px; // makes a 24px gap between small and standard
  }
}

.standard {
  height: 56px;
  width: 56px;
  border-radius: 16px;
}

.large {
  height: 96px;
  width: 96px;
  border-radius: 28px;

  &:deep(svg) {
    width: 36px;
    height: 36px;
  }
}

.surface {

}
</style>
