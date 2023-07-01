<script setup lang="ts">
import { Menu, MenuButton, MenuItems } from '@headlessui/vue'


defineProps<{
  scrollable?: boolean
}>()
</script>

<template>
  <Menu as="div" class="menu-container">
    <MenuButton as="template">
      <slot name="button" />
    </MenuButton>
    <Transition name="menu">
      <MenuItems as="div" class="menu-items" :class="{ scrollable }">
        <slot name="content" />
      </MenuItems>
    </Transition>
  </Menu>
</template>

<style scoped lang="scss">
.menu-container {
  position: relative;
}

.menu-items {
  position: absolute;
  max-width: 280px;
  min-width: 112px;

  display: flex;
  flex-direction: column;

  &.scrollable {
    max-height: 80vh;
    overflow-y: auto;
  }
}

.menu-enter-active,
.menu-leave-active {
  transition-property: opacity, transform;
  transition-duration: var(--halcyon-duration-short-4);
  transition-timing-function: var(--halcyon-te-standard);
  transform-origin: top left;
}

.menu-enter-from,
.menu-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

.menu-enter-to,
.menu-leave-from {
  opacity: 1;
  transform: scale(1);
}
</style>
