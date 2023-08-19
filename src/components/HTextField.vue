<script setup lang="ts">
import { Ref, computed, onMounted, onUpdated, ref } from 'vue'

const props = defineProps<{
  // The name of the input. Must be unique on the page.
  name: string

  // The kind of input to render.
  kind: 'outlined' | 'filled'

  // The HTML input type to assign to this input.
  // See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Input#input_types.
  // This will likely not work with input types which the browser renders in
  // special ways.
  inputType?: string

  // The label text to use.
  label: string

  // Passes along the HTML `required` attribute.
  required?: boolean

  // Show styling for the input being required. Note that this doesn't change
  // the HTML attribute. See https://m3.material.io/components/text-fields/guidelines#6c36a812-273d-4f5d-9102-2f00386c9145
  // for guidance on when to use this.
  showRequired?: boolean

  // The text to use for the "required" text displayed in the supporting text
  // slot. Defaults to "required". Intended for localization.
  requiredText?: string

  // Whether the input is disabled.
  disabled?: boolean

  // The maximum (exclusive) length for this input.
  // You should not use this to actually validate input length, as HTML and JS
  // might not agree on how long an input is, and someone can simply edit the
  // contents regardless.
  maxLength?: number

  // The minimum (exclusive) length for this input.
  // See caveats on maxLength.
  minLength?: number

  // Whether to display an error state on this input.
  hasError?: boolean

  // Whether this input should allow multiple lines of input.
  multiline?: boolean

  // How many rows to render when using multiple lines of input by default.
  rows?: number

  // The placeholder text to show when the input is empty.
  placeholder?: string

  // A function which returns the text to use in the `aria-label` for the
  // character count. Defaults to
  // (current, max) => `Character count, ${current} out of ${max} characters entered`.
  // Intended for localization.
  formatCharCountText?:(current: number, max: number) => string

  // Whether to clean the input value before emitting it. Defaults to false.
  // "Cleaned" indicates running the value through this function:
  // (s: string) => s?.trim().split(/\s+/).join(' ') || ''
  // The length calculation uses the cleaned value, so it can be useful. However,
  // with multiline inputs in particular, this can be problematic.
  returnRaw?: boolean

  // Passes along the HTML `autocomplete` attribute.
  autocomplete?: string

  modelValue?: string
}>()

type Emits = {
  (e: 'update:modelValue', modelValue: string): any
  (e: 'focus', ev: FocusEvent): any
  (e: 'blur', ev: FocusEvent): any
}

const emit = defineEmits<Emits>()

const _formatCharCountText = computed(() =>
  props.formatCharCountText ||
  ((current: number, max: number) =>
    `Character count, ${current} out of ${max} characters entered`
  )
)

/* Focus stuff */
const focused = ref(false)

const populated = computed(() => props.modelValue || !!props.placeholder)

const focus = (e: FocusEvent) => {
  focused.value = true
  emit('focus', e)
}

const blur = (e: FocusEvent) => {
  focused.value = false
  emit('blur', e)
}

const _rows = computed(() => props.rows || 3)

/* Error state and length checks */
const clean = (s: string) => {
  return s?.trim().split(/\s+/).join(' ') || ''
}

const cleanedLength = (min: number, max: number) => (s: string) => {
  const len = clean(s).length
  return len >= min && len <= max
}

const contentLength = computed(() => clean(props.modelValue).length)

const hasValidLength = computed(() =>
  props.maxLength || props.minLength
    ? cleanedLength(
      props.minLength || -1,
      props.maxLength || Number.POSITIVE_INFINITY
    )(props.modelValue)
    : true
)

const error = computed(() => props.hasError || !hasValidLength.value)

const input: Ref<HTMLInputElement | null> = ref(null)

const updateRows = () => {
  if (props.multiline) {
    const i = input.value!
    i.style.height = '0'
    const height = i.scrollHeight

    const fontSize = window
      .getComputedStyle(i)
      .getPropertyValue('font-size')
      .match(/\d+/)
    if (!fontSize) return undefined

    i.style.height = Math.max(height, _rows.value * +fontSize[0]) + 7 + 'px'
  }
}

const onInput = () => {
  const value = (props.returnRaw ? input.value?.value : clean(input.value?.value || '')) || ''
  emit('update:modelValue', value)
  updateRows()
}

onMounted(() => {
  updateRows()
  if (window && window.onresize) {
    // im tired
    // @ts-ignore
    window.onresize(() => updateRows())
  }
})

onUpdated(() => {
  updateRows()
})

</script>

<template>
  <div class="text-field" :class="{
      disabled,
      error,
      focused,
      populated,
      [kind]: true,
      'icon-prepended': !!$slots.prepended,
      'icon-appended': !!$slots.appended
    }"
    :style="{
      'margin-bottom': !!$slots.helper || maxLength || (required && showRequired) ? '0' : '17px'
    }"
  >
    <div class="inner">
      <component
        :is="multiline ? 'textarea' : 'input'"
        :name="name"
        :id="name"
        :type="inputType || ''"
        :autocomplete="autocomplete"
        :placeholder="placeholder"

        :value="modelValue"

        :disabled="disabled"

        :minlength="minLength"
        :maxlength="maxLength"

        :required="required"

        ref="input"

        v-bind="$attrs"

        @focus="focus"
        @blur="blur"
        @input="onInput"
      />
      <label :for="name">{{ label }}<template v-if="required && showRequired">*</template></label>
      <span
        class="icon-container prepended"
        v-if="!!$slots.prepended"
        @click="input!.focus()"
      >
        <slot name="prepended" />
      </span>
      <span
        class="icon-container appended"
        v-if="!!$slots.appended"
        @click="input!.focus()"
      >
        <slot name="appended" />
      </span>
    </div>
    <div class="helper" v-if="!!$slots.helper || maxLength || (required && showRequired)">
      <span>
        <slot v-if="!!$slots.helper" name="helper" />
        <template v-else-if="required && showRequired">* {{requiredText || 'required'}}</template>
      </span>
      <span v-if="maxLength" :aria-label="_formatCharCountText(contentLength, maxLength)">
        {{ contentLength }}/{{ maxLength }}
      </span>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "../util";

.text-field {
  position: relative;
  > div.inner {
    position: relative;
    display: flex;
    flex: 1;
  }
}

textarea, input {
  height: 56px;
  width: 100%;
  padding: 20px 16px 8px 16px;
  transition-timing-function: util.$te-standard;
  transition-duration: util.$duration-short-4;
  transition-property: border-color, outline-color, color;
  white-space: pre-wrap;

  // textarea fixes
  font-family: inherit;
  resize: none;

  $border-radius: 6px;

  @include util.body-large;
  color: var(--halcyon-on-surface);
  caret-color: var(--halcyon-primary);

  &::placeholder {
    color: var(--halcyon-on-surface-variant);
  }

  &:disabled {
    color: var(--halcyon-on-surface-o38);
  }

  .filled & {
    background-color: var(--halcyon-surface-container-highest);
    border-top-left-radius: $border-radius;
    border-top-right-radius: $border-radius;
    border-bottom: 1px solid var(--halcyon-on-surface-variant);

    &:disabled {
      background-color: var(--halcyon-on-surface-o4);
      border-bottom: 1px solid var(--halcyon-on-surface-o38)
    }
  }
  .filled.focused &, .filled.focused &:hover:not(:disabled) {
    border-bottom: 2px solid var(--halcyon-primary);
  }
  .filled &:hover:not(:disabled) {
    border-bottom: 1px solid var(--halcyon-on-surface);
  }

  .outlined & {
    border-radius: $border-radius;
    outline: 1px solid var(--halcyon-outline);
    //padding: 0 16px;
    background-color: transparent;
  }
  .outlined.focused &, .outlined.focused &:hover:not(:disabled)  {
    outline: 2px solid var(--halcyon-primary);
  }
  .outlined &:hover:not(:disabled) {
    outline-color: var(--halcyon-on-surface);
  }

  .outlined.error & {
    caret-color: var(--halcyon-error);
    outline-color: var(--halcyon-error);

    &:hover:not(:disabled) {
      outline-color: var(--halcyon-on-error-container);
    }
  }

  .outlined.error.focused & {
    outline-color: var(--halcyon-error);
  }

  /*.outlined.error.focused &:hover {
    outline-color: var(--halcyon-on-error-container);
  }*/

  .icon-prepended & {
    padding-left: 56px;
  }
  .icon-appended & {
    padding-right: 56px;
  }

  .outlined &:disabled {
    outline-color: var(--halcyon-on-surface-o12);
  }
}

label {
  display: inline;
  position: absolute;
  left: 0;
  padding: 16px;
  right: auto;
  transition-timing-function: util.$te-standard;
  transition-duration: util.$duration-short-4;
  transition-property: all;
  overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
  white-space: nowrap;
  user-select: none;

  color: var(--halcyon-on-surface-variant);
  @include util.body-large;

  :is(textarea, input):not(:disabled) + & {
    cursor: text;
  }

  .focused & {
    color: var(--halcyon-primary);
  }

  .focused &, .populated & {
    max-width: 133%;
    transform: translateY(-8px);
    @include util.body-small;
  }

  /*.outlined.focused &, .outlined.populated & {
    transform: translateY(-24px);
  }*/

  :is(textarea, input):disabled + & {
    color: var(--halcyon-on-surface-o38);
  }

  :is(textarea, input):hover:not(:disabled) + & {
    color: var(--halcyon-on-surface);
  }

  .focused :is(textarea, input):hover:not(:disabled) + & {
    color: var(--halcyon-primary);
  }

  .error &, .focused.error &,
  .error.focused :is(textarea, input) + &,
  .error.focused :is(textarea, input):hover:not(:disabled) + & {
    color: var(--halcyon-error);
  }

  .error :is(textarea, input):hover:not(:disabled) + & {
    color: var(--halcyon-on-error-container);
  }
  .icon-prepended & {
    padding-left: 56px;
  }

  .icon-appended & {
    padding-right: 56px;
  }
}

.icon-container {
  position: absolute;
  height: 56px;
  width: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: text;
  color: var(--halcyon-on-surface-variant);
  transition: background-color, border-color, color, fill, stroke;

  :disabled ~ & {
    color: var(--halcyon-on-surface-o38);
    pointer-events: none;
  }

  &.prepended {
    left: 16px;
  }

  &.appended {
    right: 16px;

    .error & {
      color: var(--halcyon-error);

      :is(textarea, input):hover:not(:disabled) ~ & {
        color: var(--halcyon-on-error-container);
      }
    }

    .error :disabled ~ & {
      color: var(--halcyon-on-surface-o38);
    }
  }
}

.helper {
  padding: 1px 16px 0 16px;
  @include util.body-small;
  transition: background-color, border-color, color, fill, stroke;
  display: flex;
  flex-direction: row;
  gap: 16px;
  justify-content: space-between;
  color: var(--halcyon-on-surface-variant);
  .error & {
    color: var(--halcyon-error);
  }
  span {
    font-variant-numeric: tabular-nums;
  }
  .disabled & {
    cursor: default;
    color: var(--halcyon-on-surface-o38);
  }
}
.icon-container:deep(svg) {
  height: 24px;
  width: 24px;
}
</style>
