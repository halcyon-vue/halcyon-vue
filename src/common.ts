import { MaybeComputedElementRef, tryOnMounted, unrefElement, useEventListener, useResizeObserver, useScroll } from '@vueuse/core'
import { toRefs, watch, ref } from 'vue'

export const navButtonComponent = /* @__PURE__ */ (isLink: boolean, useRouterLink: boolean) => {
    if (isLink) {
        return useRouterLink ? 'router-link' : 'a'
    }
    return 'button'
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
