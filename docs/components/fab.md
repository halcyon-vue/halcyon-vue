# Icon button

<script setup>
import { HFloatingActionButton } from '../../src/'
import Preview from '../Preview.vue'
import PencilOutline from '~icons/mdi/pencil-outline'

const previewOptions = {
    example: {
        kind: 'select',
        default: 'small',
        label: 'Example',
        options: [
            {
                value: 'small',
                label: 'Small'
            },
            {
                value: 'large',
                label: 'Large'
            },
            {
                value: 'extended',
                label: 'Extended'
            },
        ]
    },
    color: {
        kind: 'select',
        default: 'surface',
        label: 'Color',
        options: [
            {
                value: 'surface',
                label: 'Surface'
            },
            {
                value: 'secondary',
                label: 'Secondary'
            },
            {
                value: 'tertiary',
                label: 'Tertiary'
            },
        ]
    }
}
</script>

<preview :options="previewOptions" v-slot="{ state }">
    <div style="display: flex; flex-direction: column; align-items: end;" v-if="state.example === 'small'">
        <h-floating-action-button kind="small" :color="state.color">
            <pencil-outline />
        </h-floating-action-button>
        <h-floating-action-button kind="small" :color="state.color">
            <pencil-outline />
        </h-floating-action-button>
        <h-floating-action-button kind="small" :color="state.color">
            <pencil-outline />
        </h-floating-action-button>
        <h-floating-action-button kind="standard" :color="state.color">
            <pencil-outline />
        </h-floating-action-button>
    </div>
    <h-floating-action-button kind="large" :color="state.color" v-else-if="state.example === 'large'">
        <pencil-outline />
    </h-floating-action-button>
    <h-floating-action-button kind="extended" :color="state.color" content="New post" v-else>
        <pencil-outline />
    </h-floating-action-button>
</preview>