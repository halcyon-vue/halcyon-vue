<script setup lang="ts">
import { Menu, MenuButton, MenuItems } from '@headlessui/vue'
import { useWindowSize } from '@vueuse/core'
import { Ref, computed, ref, watch } from 'vue';

const props = defineProps<{
  scrollable?: boolean

  _isSubmenu?: boolean
  _open?: boolean
}>()

const { width } = useWindowSize()

const updateSide = (el: HTMLElement) => {
  const { right } = el.getBoundingClientRect()
  el.classList.toggle('open-left', right > width.value)
}

const vWatchSize = {
  mounted: (el) => {
    updateSide(el)
  },
}

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
        ref="menuItems"
        v-watch-size
      >
        <slot name="content" ref="menuItems" />
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

.open-left {
  right: 0;
}

.menu-enter-active,
.menu-leave-active {
  transition: all util.$duration-short-2 util.$te-standard;
  transform-origin: top left;
  &.open-left {
    transform-origin: top right;
  }
}

.menu-enter-from,
.menu-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
