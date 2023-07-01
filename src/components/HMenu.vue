<script setup lang="ts">
import { Menu, MenuButton, MenuItems } from '@headlessui/vue'


defineProps<{
  scrollable?: boolean

  _isSubmenu?: boolean
  _open?: boolean
}>()
</script>

<template>
  <Menu as="div" class="menu-container">
    <MenuButton as="template">
      <slot name="button" />
    </MenuButton>
    <Transition name="menu">
      <MenuItems
        as="div"
        class="menu-items"
        :class="{ scrollable, submenu: _isSubmenu }"
        :static="_isSubmenu"
        v-if="_isSubmenu ? _open : true"
      >
        <slot name="content" />
      </MenuItems>
    </Transition>
  </Menu>
</template>

<style scoped lang="scss">
@use "../util";
.menu-container {
  position: relative;
}

.menu-items {
  position: absolute;
  max-width: 280px;
  min-width: 112px;
  border-radius: 4px;
  
  background-color: var(--halcyon-surface-container);
  color: var(--halcyon-on-surface);

  @include util.shadow-md;

  display: flex;
  flex-direction: column;

  &.scrollable {
    max-height: 20vh;
    overflow-y: auto;
  }

  &:deep(:is(.menu-container,[aria-haspopup="menu"])) {
    width: 100%;
  }
}

.submenu {
  left: 100%;
  top: 0px;
}

.menu-enter-active,
.menu-leave-active {
  transition: all util.$duration-short-2 util.$te-standard;
  transform-origin: top left;
}

.menu-enter-from,
.menu-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
