<script lang="ts" setup>
import { reactive } from 'vue'
import { nanoid } from 'nanoid'

// TODO: make this not have `any`

interface SelectOption {
    kind: 'select'
    default: any,
    label: string,
    options: {
        value: any,
        label: string
    }[]
}

interface BooleanOption {
    kind: 'bool'
    default: boolean,
    label: string,
}

type Option = SelectOption | BooleanOption

const props = defineProps<{
    options: Record<string, Option>
}>()

const opts = Object.entries(props.options)

const state = reactive<Record<string, any>>(Object.fromEntries(opts.map(([name, option]) => [name, option.default])))

const id = nanoid()

// TODO: display source code
// i keep getting a weird error trying to do it
</script>

<template>
    <section class="preview">
        <header>
            <h1>Preview</h1>
        </header>
        <div class="preview-container">
            <div class="preview-display">
                <slot :state="state"></slot>
            </div>
            <div class="preview-options">
                <section v-for="[name, option] of opts" :key="name">
                    <div v-if="option.kind === 'select'">
                        <label :for="`option-${name}-${id}`">{{ option.label }}</label>
                        <select v-model="state[name]" :id="`option-${name}-${id}`">
                            <option v-for="opt of option.options" :value="opt.value" :key="opt.value">{{ opt.label }}</option>
                        </select>
                    </div>
                    <div v-else-if="option.kind === 'bool'">
                        <input type="checkbox" v-model="state[name]" :id="`option-${name}-${id}`">
                        <label :for="`option-${name}-${id}`">{{ option.label }}</label>
                    </div>
                </section>
            </div>
        </div>
    </section>
</template>

<style scoped>
h1 {
    font-size: 1rem;
    display: inline-flex;
}
section.preview {
    font-family: "Roboto Flex", "Roboto", Roboto, "Noto Sans", system-ui,
    "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji";

    border: 1px solid var(--vp-custom-block-details-border);
    border-radius: 8px;

    display: flex;
    flex-direction: column;
}

header {
    background-color: var(--vp-custom-block-details-bg);
    color: var(--vp-custom-block-details-text);
    padding: 8px 16px;

    line-height: 24px;
    font-size: var(--vp-custom-block-font-size);
    letter-spacing: 0.1;
    font-weight: 500;

    border-bottom: 1px solid var(--vp-custom-block-details-border);

    border-top-right-radius: 8px;
    border-top-left-radius: 8px;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}

.preview-container {
    display: flex;
    flex-direction: row;
}

.preview-display, .preview-source {
    border-bottom-left-radius: 8px;
    padding: 8px 16px;
    flex: 1;
}

.preview-display {
    background-color: var(--halcyon-surface);
    color: var(--halcyon-on-surface);
    display: flex;
    justify-content: center;
    align-items: center;
}

.preview-options {
    border-left: 1px solid var(--vp-custom-block-details-border);
    padding: 8px 16px;
    background-color: var(--vp-custom-block-details-bg);
    border-bottom-right-radius: 8px;
}

section + section {
    margin-top: 8px;
}
</style>
