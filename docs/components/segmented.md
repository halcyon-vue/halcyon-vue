# Segmented button

<script setup>
import { HSegmentedButton } from '../../src/'
import { ref } from 'vue'
import Preview from '../Preview.vue'
import Walk from '~icons/mdi/walk'
import Bike from '~icons/mdi/bike'
import Bus from '~icons/mdi/bus'
import Train from '~icons/mdi/train'

const previewOptions = {
    kind: {
        kind: 'select',
        default: 'single',
        label: 'Kind',
        options: [
            {
                value: 'single',
                label: 'Single'
            },
            {
                value: 'multiple',
                label: 'Multiple'
            },
        ]
    },
    disabled: {
        kind: 'bool',
        default: false,
        label: 'Disabled'
    },
    iconsOnly: {
        kind: 'bool',
        default: false,
        label: 'Icons only'
    }
}

const selected = ref(0)
</script>

<preview :options="previewOptions" v-slot="{ state }">
    <h-segmented-button
        :default="0"
        :kind="state.kind"
        :disabled="state.disabled"
        :icons-only="state.iconsOnly"
        v-model="selected"
    >
        <template #icon-0><walk/></template>
        <template #text-0>Walk</template>
        <template #icon-1><bike/></template>
        <template #text-1>Bike</template>
        <template #icon-2><bus/></template>
        <template #text-2>Bus</template>
        <template #icon-3><train/></template>
        <template #text-3>Train</template>
    </h-segmented-button>
</preview>

Segmented buttons help people select options, switch views, or sort elements.
[See the Material 3 documentation for this component][m3-segmented].

[m3-segmented]: https://m3.material.io/components/segmented-buttons/overview
