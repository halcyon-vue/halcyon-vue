<script setup lang="ts">
import HNavigationBar from "./HNavigationBar.vue";
import HNavigationRail from "./HNavigationRail.vue";
import HNavigationDrawer from "./HNavigationDrawer.vue";
import HFloatingActionButton from "./HFloatingActionButton.vue";

type SizeClass = 'compact' | 'medium' | 'expanded'
type Pane = 1 | 2

const props = withDefaults(defineProps<{
  initialSizeClass?: SizeClass | 'auto',
  initialPanes?: Pane | 'auto'
  floatingActionButtonLabel?: string,
  sizeClass?: SizeClass,
  panes?: Pane,
}>(), {
  initialSizeClass: 'auto',
  initialPanes: 'auto',
})

const emits = defineEmits<{
  'update:sizeClass': [value: SizeClass],
  'update:panes': [value: Pane],
}>()

defineSlots<{
  navigationBarContent(): any,
  navigationDrawerContent(): any,
  navigationRailContent(): any,
  defaultContent(): any,
  extraPaneContent(): any,
  floatingActionButtonIcon(): any,
}>()

const slots = useSlots()

function updateState() {
  updateSizeClass()
  nextTick(updatePanes)
}

function updateSizeClass() {
  if (props.initialSizeClass !== 'auto') {
    emits('update:sizeClass', props.initialSizeClass)
    return
  }

  emits('update:sizeClass', window.matchMedia("(min-width: 840px)").matches ? 'expanded' :
      window.matchMedia("(min-width: 600px)").matches ? 'medium' : 'compact')
}

function updatePanes() {
  if (props.initialPanes !== 'auto') {
    emits('update:panes', props.initialPanes)
    return
  }

  emits('update:panes', props.sizeClass === 'expanded' ? 2 : 1)
}

const matchMedia = window.matchMedia("(min-width: 600px) and (max-width: 840px)")

function registerMediaListener() {
  if (!window.matchMedia) return

  if (matchMedia)
    if ('addEventListener' in matchMedia) {
      matchMedia.addEventListener('change', updateState)
    } else {
      // @ts-expect-error deprecated API
      matchMedia.addListener(updateState)
    }
}

function cleanup() {
  if (!window.matchMedia) return

  if ('removeEventListener' in matchMedia) {
    matchMedia.removeEventListener('change', updateState)
  } else {
    // @ts-expect-error deprecated API
    mediaQuery.removeListener(updateState)
  }
}

onMounted(() => {
  registerMediaListener()
  updateState()
})
onUnmounted(cleanup)

const mainPadding = computed(() => {
  let paddingTop = 0
  let paddingRight = 0
  let paddingBottom = 0
  let paddingLeft = 0

  if (props.sizeClass === 'compact') {
    paddingLeft += 16
    paddingRight += 16
  } else {
    paddingLeft += 24
    paddingRight += 24
  }

  if (props.sizeClass === 'compact' && 'navigationBarContent' in slots) {
    paddingBottom += 80
  }
  if (props.sizeClass !== 'compact' && 'navigationRailContent' in slots) {
    paddingLeft += 80
  }

  return `${paddingTop}px ${paddingRight}px ${paddingBottom}px ${paddingLeft}px`
})

</script>

<template>
  <template v-if="sizeClass === 'compact'">
    <h-navigation-bar v-if="'navigationBarContent' in $slots">
      <slot name="navigationBarContent"/>
    </h-navigation-bar>
    <!--  TODO: navigation drawer menu in Search component-->
    <h-navigation-drawer v-if="'navigationDrawerContent' in $slots">
      <slot name="navigationDrawerContent"/>
    </h-navigation-drawer>

    <h-floating-action-button v-if="'floatingActionButtonIcon' in $slots || floatingActionButtonLabel"
                              class="fab-btn"
                              kind="small" label="">
      <slot name="floatingActionButtonIcon"/>
    </h-floating-action-button>
  </template>

  <template v-else-if="sizeClass === 'medium'">
    <h-navigation-rail v-if="'navigationRailContent' in $slots"
                       :hasDrawer="'navigationDrawerContent' in $slots"
                       :hasFab="'floatingActionButtonIcon' in $slots || floatingActionButtonLabel"
                       :fabLabel="floatingActionButtonLabel"
                       v-bind="$attrs">
      <template #content>
        <slot name="navigationRailContent"/>
      </template>
      <template #drawer v-if="'navigationDrawerContent' in $slots">
        <slot name="navigationDrawerContent"/>
      </template>
      <template #fab-icon>
        <slot name="floatingActionButtonIcon"/>
      </template>
    </h-navigation-rail>
  </template>

  <template v-else-if="sizeClass === 'expanded'">
    <h-navigation-rail v-if="'navigationRailContent' in $slots"
                       :hasDrawer="'navigationDrawerContent' in $slots"
                       :hasFab="'floatingActionButtonIcon' in $slots || floatingActionButtonLabel"
                       :fabLabel="floatingActionButtonLabel"
                       v-bind="$attrs">
      <template #content>
        <slot name="navigationRailContent"/>
      </template>
      <template #drawer v-if="'navigationDrawerContent' in $slots">
        <slot name="navigationDrawerContent"/>
      </template>
      <template #fab-icon>
        <slot name="floatingActionButtonIcon"/>
      </template>
    </h-navigation-rail>
  </template>

  <div v-if="panes === 2" class="main two-panes">
    <div class="pane default-pane">
      <slot name="defaultContent"/>
    </div>
    <div class="spacer"></div>
    <div class="pane extra-pane">
      <slot name="extraPaneContent"/>
    </div>
  </div>
  <div v-else class="main">
    <div class="pane default-pane">
      <slot name="defaultContent"/>
    </div>
  </div>
</template>

<style scoped>
.main {
  min-height: 100vh;
  width: 100vw;
  padding: v-bind(mainPadding);
}

.main.two-panes {
  display: grid;
  grid-template-columns: 360px 24px 1fr;
}

.fab-btn {
  position: fixed;
  bottom: 80px;
  right: 0;
}

</style>