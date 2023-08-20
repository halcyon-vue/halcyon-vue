export interface Notification {
    message: string,
    action?: {
        label: string,
        handler: () => any
    },
    persistent?: boolean,
    multiline?: boolean
}

/**
 * The current queue of notifications.
 */
export const currentNotifications: Notification[] = []

export type Listener = (notifications: Notification[]) => any

export const listeners: Listener[] = []

/**
 * Adds a notification to the queue.
 * @param {Notification} notification The notification to add.
 * @returns {number} The new length of the queue.
 */
export const pushNotification = (notification: Notification) => {
    currentNotifications.push(notification)
    listeners.forEach(listener => listener(currentNotifications))
    return currentNotifications.length
}

/**
 * Adds a notification to the queue.
 * @param {Notification} notification The notification to add.
 * @returns {number} The new length of the queue.
 */
export const send = pushNotification

// TODO: i really wish that i could just do, like,
// export const popNotification = currentNotifications.shift, and pretend like
// js is a real functional language but the tree shaker or something doesn't
// seem to like it
// same with `listen`
// oh well

/**
 * Removes the first notification from the queue and returns it.
 * @returns {Notification} The notification that was removed.
 */
export const popNotification = () => currentNotifications.shift()

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