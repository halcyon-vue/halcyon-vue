# Top app bar

[Click here to see the preview for this component](top-app-bar-preview).

Top app bars contain a title and actions related to the current screen.
[See the Material 3 documentation for this component][m3-top-app-bar].

[m3-top-app-bar]: https://m3.material.io/components/top-app-bar/overview

## Props

```ts
{
    // The kind of top app bar to render.
    kind: 'center' | 'small' | 'medium' | 'large' | 'compressing'
    // The title to display in the top app bar.
    title: string
    // Whether to hide the top app bar when scrolling down.
    hideOnScroll?: boolean
}
```
## Slots

### `navigation-icon`

This is used for the leading navigation icon, usually either a
`HNavigationDrawer` or a back navigation button.

### `trailing`

This contains icon buttons for actions, or for a center-aligned top app bar, an
avatar. If there are more than 3 actions, they should be put into a menu.

## Known issues

- The "compressing" kind has a buggy visual appearance.