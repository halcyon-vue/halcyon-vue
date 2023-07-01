<script setup lang="ts">
import { MenuItem } from '@headlessui/vue'
</script>

<template>
    <MenuItem disabled aria-hidden as="div" class="menu-divider">
        <hr />
    </MenuItem>
</template>

<style scoped lang="scss">
hr {
    color: var(--halcyon-outline-variant);
    margin: 8px 0;
}
</style>