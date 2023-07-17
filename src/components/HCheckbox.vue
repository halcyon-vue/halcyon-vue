<script setup lang="ts">
import { watch, ref, Ref } from 'vue';

const props = defineProps<{
    modelValue?: boolean
    indeterminate?: boolean
    disabled?: boolean
    error?: boolean
    id: string
}>()

const emit = defineEmits<{
    'update:modelValue': [boolean]
}>()

const checkbox: Ref<HTMLInputElement | null> = ref(null)

const update = () => emit('update:modelValue', checkbox.value.checked ?? false)

const toggle = () => emit('update:modelValue', !props.modelValue)

watch(() => props.indeterminate, () => {
    if (checkbox.value) {
        checkbox.value.indeterminate = props.indeterminate ?? false
    }
})
</script>

<template>
    <div
        class="checkbox-container"
        :class="{ error }"
        @click="toggle"
    >
        <input
            :id="id"
            type="checkbox"
            :checked="modelValue"
            :disabled="disabled"
            @change="update"
            ref="checkbox"
        />
    </div>
</template>

<style scoped lang="scss">
@use "../util";
.checkbox-container {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100%;
    width: 40px;
    height: 40px;

    &:hover {
        background-color: var(--halcyon-on-surface-o12);
    }

    &.error input {
        accent-color: var(--halcyon-error);
    }

    input {
        position: relative;
        left: -1px;
        transition: accent-color util.$duration-short-4 util.$te-standard;
        height: 18px;
        width: 18px;
        accent-color: var(--halcyon-primary);
    }

    &:focus-within {
        background-color: var(--halcyon-on-surface-o16);
    }
}
</style>