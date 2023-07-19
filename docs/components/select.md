# Select

<script setup>
import { ref } from 'vue'
import { HSelect, HButton, HIconButton } from '../../src'
import Preview from '../Preview.vue'
import CloseCircle from '~icons/mdi/close-circle-outline'

const selected = ref(null)

const selectOptions = [
    {
        label: 'Blue',
        value: '#0000ff',
    },
    {
        label: 'Red',
        value: '#ff0000',
        disabled: true
    },
    {
        label: 'Green',
        value: '#00ff00'
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
}
</script>

<preview :options="previewOptions" v-slot="{ state }">
    <h-select
        label="Color"
        :options="selectOptions"
        v-model="selected"
        :kind="state.kind"
    />
    <h-icon-button label="Clear" @click="selected = null">
        <close-circle />
    </h-icon-button>
</preview>