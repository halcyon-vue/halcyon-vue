<script setup lang="ts" generic="T extends string | number | boolean | object">
import DropdownIcon from '~icons/mdi/triangle-small-down'
import {
  Listbox,
  ListboxLabel,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue'
import { computed } from 'vue'

interface Option {
    label: string
    value: T
    disabled?: boolean
}

const props = defineProps<{
    label: string
    modelValue: T | null
    options: Option[]
    scrollable?: boolean
    kind?: 'outlined' | 'filled'
    disabled?: boolean
}>()

const emit = defineEmits<{
    'update:modelValue': [T]
}>()

const selectedLabel = computed(() => {
    const option = props.options.find(o => o.value === props.modelValue)
    return option ? option.label : ''
})
</script>

<template>
    <Listbox
        :model-value="modelValue"
        @update:model-value="e => emit('update:modelValue', e)"
        class="listbox"
        as="div"
        :disabled="disabled"
    >
        <ListboxButton v-slot="{ open }" as="template">
            <button :class="[kind || 'outlined', { open, populated: !!selectedLabel }]">
                <span class="label">{{ label }}</span>
                <Transition name="label">
                    <span v-if="selectedLabel" class="selected">{{ selectedLabel }}</span>
                </Transition>
                <Transition name="fade">
                    <dropdown-icon class="icon flip" v-if="open" aria-hidden />
                    <dropdown-icon class="icon" v-else aria-hidden />
                </Transition>
            </button>
        </ListboxButton>
        <div class="menu-container">
            <Transition name="menu">
                <ListboxOptions>
                    <ListboxOption
                        v-slot="{ active, selected }"
                        v-for="option in options"
                        :key="option.label"
                        :value="option.value"
                        :disabled="option.disabled"
                        class="option"
                        as="template"
                    >
                        <li 
                            :class="{ active, disabled: option.disabled }"
                        >
                            {{ option.label }}
                        </li>
                    </ListboxOption>
                </ListboxOptions>
            </Transition>
        </div>
    </Listbox>
</template>

<style scoped lang="scss">
@use "../util";
.listbox {
    position: relative;
}

button {
    position: relative;
    $border-radius: 6px;
    height: 56px;
    min-width: 112px;
    max-width: 280px;
    padding: 16px;
    transition-timing-function: util.$te-standard;
    transition-duration: util.$duration-short-4;
    transition-property: border-color, outline-color, color;
    white-space: pre-wrap;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    @include util.body-large;
    
    color: var(--halcyon-on-surface-variant);

    margin-right: 16px;

    &.outlined {
        border-radius: $border-radius;
        outline: 1px solid var(--halcyon-outline);
        background-color: transparent;

        &:focus:not(:focus-visible) {
            outline: 1px solid var(--halcyon-outline) !important;
        }
        &.open {
            &:focus:not(:focus-visible) {
                outline: 2px solid var(--halcyon-primary) !important;
            }
            outline: 2px solid var(--halcyon-primary);
        }

        &:disabled {
            outline-color: var(--halcyon-on-surface-o38);
            pointer-events: none;
        }
    }

    &.filled {
        background-color: var(--halcyon-surface-container-highest);
        border-top-left-radius: $border-radius;
        border-top-right-radius: $border-radius;
        border-bottom: 1px solid var(--halcyon-on-surface-variant);

        &.open {
            border-color: var(--halcyon-primary);
        }

        &:disabled {
            background-color: var(--halcyon-on-surface-o4);
            border-bottom: 1px solid var(--halcyon-on-surface-o38)
        }
    }

    & .icon {
        right: 16px;
        position: absolute;
    }

    &.open .icon, &.open .label {
        color: var(--halcyon-primary);
    }

    > .label {
        display: inline;
        transition-timing-function: util.$te-standard;
        transition-duration: util.$duration-short-4;
        transition-property: all;
        overflow: hidden;
        -o-text-overflow: ellipsis;
        text-overflow: ellipsis;
        white-space: nowrap;
        user-select: none;
    }

    &:is(.populated, .open) > .label {
        position: absolute;
        max-width: 133%;
        transform: translateY(-11px);
        @include util.body-small;
    }

    .selected {
        position: relative;
        top: 4px;

        color: var(--halcyon-on-surface);
    }

    &:disabled{
        color: var(--halcyon-on-surface-o38);
        .selected {
            color: var(--halcyon-on-surface-o38);
        }
    }

}

.menu-container {
    position: absolute;
}

ul {
    top: 2px;
    left: 1px;
  position: relative;
  max-width: 280px;
  min-width: 112px;
  border-radius: 4px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  list-style: none;
  margin: 0;
  padding: 0;

  z-index: var(--halcyon-menu-z);
  
  background-color: var(--halcyon-surface-container);
  color: var(--halcyon-on-surface);

  @include util.shadow-md;

  display: flex;
  flex-direction: column;

  .listbox.scrollable & {
    max-height: 20vh;
    overflow-y: auto;
  }
}

.label-leave-active {
    position: absolute;
    left: -61%;
}

.fade-enter-active, .fade-leave-active, .label-enter-active, .label-leave-active {
    transition: opacity util.$duration-short-2 util.$te-standard;
}

.fade-enter-from, .fade-leave-to, .label-enter-from, .label-leave-to {
    opacity: 0;
}

.menu-enter-active,
.menu-leave-active {
  transition: all util.$duration-short-2 util.$te-standard;
  transform-origin: top center;
}

.menu-enter-from,
.menu-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

li {
    cursor: pointer;
    display: flex;
    flex-direction: row;
    align-items: center;

    height: 48px;

    @include util.label-large;
    font-weight: 400;

    padding: 0 12px;

    &.active {
        background-color: var(--halcyon-surface-container-highest);
    }

    &[aria-disabled="true"] {
        color: var(--halcyon-on-surface-o38);
        pointer-events: none;
    }
}

.flip {
    transform: rotate(180deg);
}
</style>