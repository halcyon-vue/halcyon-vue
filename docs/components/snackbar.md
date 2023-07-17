# Snackbar

<script setup>
import { HSnackbar, snackbar, HButton, HTextField, HCheckbox } from '../../src'
import Preview from '../Preview.vue'
import { ref } from 'vue'

const options = {
    alignLeft: {
        kind: 'bool',
        default: false,
        label: 'Align left'
    },
}

const handler = () => {
    alert('Action completed!')
}

const message = ref('')
const actionLabel = ref('')

const persistent = ref(false)
const includeAction = ref(false)

const messageError = ref('')
const labelError = ref('')

const showSnackbar = () => {
    messageError.value = ''
    labelError.value = ''
    if(!message.value) {
        messageError.value = 'Message is required'
        return
    }
    if(includeAction.value && !actionLabel.value) {
        labelError.value = 'Action label is required'
        return
    }
    snackbar.pushNotification({
        message: message.value,
        action: includeAction.value ? {
            label: actionLabel.value,
            handler
        } : undefined,
        persistent: persistent.value
    })
}
</script>

<style>
.form {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    grid-gap: 1rem;
}
</style>

<preview :options="options" v-slot="{ state }">
    <div class="preview-column">
        <div class="form">
            <h-text-field
                name="message"
                kind="outlined"
                v-model="message"
                label="Message"
                :has-error="!!messageError"
            >
                <template #helper v-if="messageError">{{ messageError }}</template>
            </h-text-field>
            <div class="preview-row">
                <label for="persistent">Persistent</label>
                <h-checkbox v-model="persistent" id="persistent" />
            </div>
            <h-text-field
                name="action-label"
                kind="outlined"
                v-model="actionLabel"
                label="Action label"
                :has-error="!!labelError"
            >
                <template #helper v-if="labelError">{{ labelError }}</template>
            </h-text-field>
            <div class="preview-row">
                <label for="include-action">Include action</label>
                <h-checkbox v-model="includeAction" id="include-action" />
            </div>
        </div>
        <h-button kind="filled" @click="showSnackbar" content="Show snackbar" />
    </div>
    <h-snackbar :align="state.alignLeft ? 'left' : 'center'" />
</preview>

Snackbars show short updates about app processes at the bottom of the screen.
[See the Material 3 documentation for this component][m3-snackbar].

[m3-snackbar]: https://material.io/components/snackbar

## API

The snackbar has a separate API which can be imported as the `snackbar` object.

