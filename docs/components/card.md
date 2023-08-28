# Card

<script setup>
import { ref, onMounted } from 'vue'
import { HCard, HButton } from '../../src'
import Preview from '../Preview.vue'

const options = {
    kind: {
        kind: 'select',
        default: 'outlined',
        label: 'Kind',
        options: [
            {
                value: 'elevated',
                label: 'Elevated'
            },
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
    interactable: {
        kind: 'bool',
        default: false,
        label: 'Interactable'
    }
}
</script>

<style scoped>
img {
    border-radius: 12px;
    height: 167px;
    object-fit: cover;
}

.button {
    margin: 16px;
}

h1 {
    padding-top: 16px;
}

h1, h2 {
    font-weight: 400;
}

h2 {
    margin: 0;
    border-top: 0;
    padding-top: 0;
}

.image-card {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
}

.text-card {
    height: 100%;
}
</style>

<preview :options="options" v-slot="{ state }">
    <h-card :kind="state.kind" no-padding class="image-card">
        <img src="../images/kingfisher.jpg" height="167" />
        <h-button kind="filled" content="Action" class="button" />
    </h-card>
    <h-card
        :kind="state.kind"
        class="text-card"
        :interactable="state.interactable"
        :as="state.interactable ? 'button' : 'div'"
    >
        <h1>Headline</h1>
        <h2>Subhead</h2>
        <p>Content content content content</p>
    </h-card>
</preview>

::: details Source code

```html
<h-card :kind="state.kind" no-padding class="image-card">
    <img src="../images/kingfisher.jpg" height="167" />
    <h-button kind="filled" content="Action" class="button" />
</h-card>
<h-card
    :kind="state.kind"
    class="text-card"
    :interactable="state.interactable"
    :as="state.interactable ? 'button' : 'div'"
>
    <h1>Headline</h1>
    <h2>Subhead</h2>
    <p>Content content content content</p>
</h-card>
```

:::

Cards display content and actions about a single subject.
[See the Material 3 documentation for this component][m3-card].

[m3-card]: https://m3.material.io/components/cards/overview

## Props

```ts
defineProps<{
    // The kind of card to render.
    kind: 'elevated' | 'filled' | 'outlined'
    // The element or component to render the card as.
    as?: string | Component
    // Whether the card is interactable.
    interactable?: boolean
    // Whether the card has no padding.
    noPadding?: boolean
}>()
```

## Slots

### Default

The default slot is used for the content of the card.