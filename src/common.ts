import { useScroll } from '@vueuse/core'
import { toRefs, watch } from 'vue'

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