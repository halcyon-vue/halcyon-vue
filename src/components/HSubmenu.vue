<script setup lang="ts">
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import HMenu from './HMenu.vue'

defineProps<{
  scrollable?: boolean
}>()
</script>

<template>
    <MenuItem v-slot="{ active }">
        <h-menu :_open="active" :scrollable="scrollable" _is-submenu>
            <template #button>
                <slot name="button" />
            </template>
            <template #content>
                <slot name="content" />
            </template>
        </h-menu>
    </MenuItem>
</template>