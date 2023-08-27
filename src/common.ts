import { useScroll } from '@vueuse/core'
import { type Component, toRefs, watch } from 'vue'

const LINK_COMPONENTS = ['router-link', 'nuxt-link', 'a', 'RouterLink', 'NuxtLink', 'A']

export const isLink = /* @__PURE__ */ (component: string | Component) => {
    const name = typeof component === 'string' ? component : component.name

    return LINK_COMPONENTS.includes(name)
} 

interface HideOnScrollOptions {
    onUp: () => any
    onDown: () => any
}

export const useHideOnScroll = /* @__PURE__ */ ({ onUp, onDown }: HideOnScrollOptions) => {
    const scroll = useScroll(
        document,
        { throttle: 300, eventListenerOptions: true }
    )

    const { top: up, bottom: down } = toRefs(scroll.directions)
    
    watch([up, down], ([up, down]) => {
        if (up) onUp()
        if (down) onDown()
    })
}

const onIntersectionObserver = (entries: IntersectionObserverEntry[]) => {
  entries[0].target.classList.toggle('is-pinned', entries[0].intersectionRatio < 1)
}

const ioOpts = { threshold: [1] }

export const pinnedHandler: [((entries: IntersectionObserverEntry[]) => void), {
    threshold: number[];
}] = [ onIntersectionObserver, ioOpts ]

export interface SelectOption<T> {
    label: string
    value: T
    disabled?: boolean
}