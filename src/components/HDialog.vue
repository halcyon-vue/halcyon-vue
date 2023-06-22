<script setup lang="ts">
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogDescription
} from '@headlessui/vue'
import HButton from './HButton.vue'

type Action = () => (any | Promise<any>)

defineProps<{
  // The title of the dialog.
  title: string,
  // The description to show. Optional, but if your dialog has text in the
  // content, it can help with accessibility to have this set.
  description?: string,
  // Whether to show dividers between the description, content, and actions.
  dividers?: boolean
  // Actions that can be taken on this dialog. You should probably only have one
  // or two.
  // If the dialog is fullscreen, only the _last_ action is shown.
  actions?: {
    // The text to be shown for this action.
    label: string,
    // The function to call when this action is taken, to be run before the
    // dialog closes. If it returns a promise, the promise is `await`ed before
    // closing the dialog.
    // eslint-disable-next-line func-call-spacing
    onClick: Action
  }[]
  // Whether or not the modal is open. You can use `v-model:open` to bind this.
  open?: boolean
  // Whether or not to show the dialog fullscreen.
  fullscreen?: boolean
}>()

const emit = defineEmits<{(e: 'update:open', modelValue: boolean): any;}>()

const close = () => emit('update:open', false)

const handleAction = (action: Action) => {
  const result = action()
  if (result instanceof Promise) {
    result.then(close)
  } else {
    close()
  }
}
</script>

<template>
  <TransitionRoot as="template" appear :show="open">
    <Dialog @close="close" class="dialog">
      <TransitionChild
        as="template"
        enter="scrim-active"
        enter-from="scrim-from"
        enter-to="scrim-to"
        leave="scrim-active"
        leave-from="scrim-to"
        leave-to="scrim-from"
      >
        <div class="scrim" aria-hidden="true" />
      </TransitionChild>
      <TransitionChild
        as="template"
        enter="panel-active"
        enter-from="panel-fullscreen-from"
        enter-to="panel-to"
        leave="panel-active"
        leave-from="panel-to"
        leave-to="panel-fullscreen-from"
      >
        <DialogPanel class="fullscreen-panel" v-if="fullscreen">
          <header>
            <DialogTitle class="title">
              {{ title }}
            </DialogTitle>
            <h-button
              kind="text"
              @click="handleAction(actions[actions.length - 1].onClick)"
              :content="actions[actions.length - 1].label"
            />
          </header>
          <DialogDescription class="description" v-if="description">
            {{ description }}
          </DialogDescription>

          <div class="content-container" v-if="$slots.content">
            <slot name="content" />
          </div>
        </DialogPanel>
        <div class="panel-container" :class="{ dividers, 'has-icon': $slots.icon }">
          <DialogPanel class="panel">
            <span class="icon-container" v-if="$slots.icon"><slot name="icon" /></span>
            <DialogTitle class="title">{{ title }}</DialogTitle>
            <DialogDescription class="description" v-if="description">
              {{ description }}
            </DialogDescription>

            <div class="content-container" v-if="$slots.content">
              <slot name="content" />
            </div>

            <div class="footer">
              <h-button
                kind="text"
                v-for="action of actions"
                :key="action.label"
                @click="handleAction(action.onClick)"
                :content="action.label"
              />
            </div>
          </DialogPanel>
        </div>
      </TransitionChild>
    </Dialog>
  </TransitionRoot>
</template>

<style lang="scss" scoped>
@use "../util";
.panel-container {
  position: fixed;
  inset: 0;
  z-index: var(--halcyon-modal-z);
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.panel {
  background-color: var(--halcyon-surface-container-high);
  color: var(--halcyon-on-surface);
  max-width: min(560px, calc(100vw - (112px)));
  max-height: calc(100vh - 112px);
  min-width: 280px;
  border-radius: 28px;
  padding: 24px;
}

.fullscreen-panel {
  background-color: var(--halcyon-surface-container-high);
  position: fixed;
  inset: 0;
  z-index: var(--halcyon-modal-z);
  width: 100vw;
  height: 100vh;

  & header {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 16px;

    & h2 {
      flex: 1;
    }
  }
}

.title {
  @include util.headline-small;
}
.description {
  @include util.body-medium;
  margin-bottom: 16px;
}

.title + .description {
  margin-top: 16px;
}

.icon-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  height: 24px;
}

.has-icon .title {
  text-align: center;
}

.dividers .footer {
  border-top: 1px solid var(--halcyon-outline-variant);
  padding-top: 16px;
}

.dividers .content-container {
  border-top: 1px solid var(--halcyon-outline-variant);
}

.content-container {
  margin-top: 24px;
}

.footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 24px;
}

.scrim {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.27);
  z-index: var(--halcyon-modal-z);
}

.scrim-active, .panel-active {
  transition-duration: util.$duration-short-4;
  transition-timing-function: util.$te-emphasized-decelerate;
}

.scrim-active {
  transition-property: opacity;
}

.scrim-from {
  opacity: 0;
}

.scrim-to {
  opacity: 1;
}

.panel-active {
  transition-property: transform, opacity;
}

.panel-from {
  opacity: 0;
  transform: scale(1.1, 1.1);
}

.panel-to {
  opacity: 1;
  transform: none;
}

.panel-fullscreen-from {
  opacity: 0;
  transform: scale(0.9, 0.9);
}
</style>
