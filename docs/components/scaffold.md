# Scaffold

A scaffold is a layout component that provides a consistent structure for a page.

## Props

```ts
defineProps<{
    initialSizeClass?: 'compact' | 'medium' | 'expanded' | 'auto',
    initialPanes?: 1 | 2 | 'auto'
    floatingActionButtonLabel?: string,
    sizeClass?: SizeClass,
    panes?: Pane,
}>
```

## Slots

defineSlots<{
navigationBarContent(): any,
navigationDrawerContent(): any,
navigationRailContent(): any,
defaultContent(): any,
extraPaneContent(): any,
floatingActionButtonIcon(): any,
}>()

### navigationBarContent

The content of the navigation bar.

### navigationDrawerContent

The content of the navigation drawer.

### navigationRailContent

The content of the navigation rail.

### defaultContent

The main pane content.

### extraPaneContent

The extra pane content.

### floatingActionButtonIcon

The icon for the floating action button.