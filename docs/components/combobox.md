# Combobox

<script setup>
import { ref } from 'vue'
import { HCombobox, HButton, HIconButton } from '../../src'
import Preview from '../Preview.vue'

const comboboxOptions = [
    {
        label: 'Reimu Hakurei',
        value: 'hakurei',
    },
    {
        label: 'Marisa Kirisame',
        value: 'kirisame',
    },
    {
        label: 'Sanae Kochiya',
        value: 'kochiya',
    },
    {
        label: 'Youmu Konpaku',
        value: 'konpaku',
    },
    {
        label: 'Reisen Udongein Inaba',
        value: 'inaba',
    },
    {
        label: 'Cirno',
        value: 'cirno',
    },
    {
        label: 'Sakuya Izayoi',
        value: 'izayoi',
    },
    {
        label: 'Remilia Scarlet',
        value: 'scarlet',
    },
    {
        label: 'Flandre Scarlet',
        value: 'scarlet2',
    }
]

const previewOptions = {
    kind: {
        kind: 'select',
        default: 'outlined',
        label: 'Kind',
        options: [
            {
                value: 'filled',
                label: 'Filled'
            },
            {
                value: 'outlined',
                label: 'Outlined'
            },
        ]
    },
    allowCustom: {
        kind: 'bool',
        default: false,
        label: 'Allow custom value'
    },
    nullable: {
        kind: 'bool',
        default: false,
        label: 'Allow null value'
    },
    disabled: {
        kind: 'bool',
        default: false,
        label: 'Disabled'
    },
}

const selected = ref(null)
const input = ref('')
</script>

<preview :options="previewOptions" v-slot="{ state }">
    <h-combobox
        label="Character"
        :options="comboboxOptions"
        v-model="selected"
        v-model:input="input"
        :kind="state.kind"
        :allow-custom="state.allowCustom"
        :custom-label="(input) => 'Add ' + input"
        :custom-value="(input) => input.toLowerCase()"
        :nullable="state.nullable"
        :disabled="state.disabled"
    />
</preview>
