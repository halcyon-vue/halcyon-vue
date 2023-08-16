<script setup lang="ts" generic="T extends string | number | boolean | object">
import { computed, ref, watch } from 'vue';
import { SelectOption } from '../common';
import HTextField from './HTextField.vue';
import {
    Combobox,
    ComboboxInput,
    ComboboxOptions,
    ComboboxOption,
} from '@headlessui/vue'

const props = defineProps<{
    label: string
    options: SelectOption<T>[]
    modelValue?: T | null
    input: string
    nullable?: boolean
    filter?: (input: string, option: SelectOption<T>) => boolean

    kind?: 'outlined' | 'filled'
    disabled?: boolean

    allowCustom?: boolean
    customLabel?: (input: string) => string
    customValue?: (input: string) => T
    customDisabled?: boolean
}>()

const emit = defineEmits<{
    'update:modelValue': [T | null]
    'update:input': [string]
}>()

const input = ref('')

watch(input, (value) => {
    emit('update:input', value)
})

const filter = computed(() => props.filter || ((input: string, option: SelectOption<T>) => {
    if(!input) return true
    return option.label.toLowerCase().includes(input.toLowerCase())
}))

const filteredOptions = computed(() => props.options.filter(o => filter.value(input.value, o)))

const customLabel_ = computed(() => props.customLabel || ((input: string) => input))
const customValue_ = computed(() => props.customValue || ((input: string) => input as unknown as T))
</script>

<template>
    <Combobox :nullable="nullable" class="combobox" as="div" :disabled="disabled">
        <ComboboxInput
            v-model="input"
            :as="HTextField"
            :label="label"
            :kind="kind"
            :name="label"
            @change="$emit('update:modelValue', $event.target.value)
        "/>
        <div class="menu-container">
            <Transition name="menu">
                <ComboboxOptions>
                    <ComboboxOption
                        v-slot="{ active }"
                        v-if="allowCustom"
                        :disabled="customDisabled"
                        :value="customValue_(input)"
                        class="option"
                        as="template"
                    >
                        <li :class="{ active, disabled: customDisabled }">
                            {{ customLabel_(input) }}
                        </li>
                    </ComboboxOption>
                    <ComboboxOption
                        v-slot="{ active }"
                        v-for="option in filteredOptions"
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
                    </ComboboxOption>
                </ComboboxOptions>
            </Transition>
        </div>
    </Combobox>
</template>

<style scoped lang="scss">
@use "../util";
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
    
    max-height: 20vh;
    overflow-y: auto;
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
</style>