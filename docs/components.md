# Components

Components are interactive building blocks for creating a user interface.
They can be organized into categories based on their purpose: Action,
containment, communication, navigation, selection, and text input.

<script setup>
import { ref, onMounted } from 'vue'

const progress = ref('')

// kind of filthy way to do this, but it works
onMounted(() => {
    const [implemented, total] =
        [...document.querySelectorAll('.vp-doc ul')].
            flatMap(e => [...e.children])
            .map(n => n.firstChild.nodeType !== 3)
            .reduce((a, v) =>  [a[0] + (v ? 1 : 0), a[1] + 1], [0, 0])

    const percent = Math.round(implemented / total * 100)

    progress.value = `At the moment, ${implemented} of ${total} components are implemented (${percent}%!).`
})
</script>

{{ progress }}

## Action

- [Common button](/components/button)
- [Floating action button](/components/fab)
- [Icon button](/components/icon-button)
- [Segmented button](/components/segmented)

## Communication

- [Snackbar](/components/snackbar)

Progress indicators can be achieved with
[VueUse's `useNProgress`](https://vueuse.org/integrations/useNProgress/).

Badges are considered part of their parent element and thus not listed.

## Containment

- Bottom sheet (to be implemented)
- [Card](/components/card)
- Carousel (to be implemented)
- [Dialog](/components/dialog)
- Side sheet (to be implemented)
- Tooltip (to be implemented)

Dividers and lists are considered trivial to implement for one's own application,
and not included.

## Navigation

- [Bottom app bar](/components/bottom-app-bar)
- [Navigation bar](/components/navigation-bar)
- [Navigation drawer](/components/navigation-drawer)
- [Navigation rail](/components/navigation-rail)
- Search (to be implemented)
- Tabs (to be implemented)
- [Top app bar](/components/top-app-bar)

## Selection

- [Checkbox](/components/checkbox)
- Chip (to be implemented)
- Date picker (to be implemented)
- [Menu](/components/menu)
- Radio button (to be implemented)
- Slider (to be implemented)
- [Switch](/components/switch)
- Time picker (to be implemented)

Additionally, a [Select](/components/select) component is provided, which is
not technically a first-level component of the spec, but is nevertheless present.

A Combobox component is to be implemented.

## Text input

- [Text field](/components/text-field)