export type Listener = () => any

export const listeners: Listener[] = []

export const listen = (listener: Listener) => {
    listeners.push(listener)
    return listener
}

export const unlisten = (listener: Listener) => {
    const index = listeners.indexOf(listener)
    if (index !== -1) {
        listeners.splice(index, 1)
    }
}

export const notify = (from_: Listener) => listeners.forEach(listener => {
    if(listener !== from_) listener()
})