import { Plugin } from 'vite'
import defaultTheme from './default-theme.json'
import baseTheme from './base'
import reset from './reset' // i would have just used this straight from
// the package, but it refuses to import correctly
// for some reason

export type ColorScheme = {
    primary: string,
    onPrimary: string,
    primaryContainer: string,
    onPrimaryContainer: string,
    primaryFixed: string,
    onPrimaryFixed: string,
    primaryFixedDim: string,
    onPrimaryFixedVariant: string,
    secondary: string,
    onSecondary: string,
    secondaryContainer: string,
    onSecondaryContainer: string,
    secondaryFixed: string,
    onSecondaryFixed: string,
    secondaryFixedDim: string,
    onSecondaryFixedVariant: string,
    tertiary: string,
    onTertiary: string,
    tertiaryContainer: string,
    onTertiaryContainer: string,
    tertiaryFixed: string,
    onTertiaryFixed: string,
    tertiaryFixedDim: string,
    onTertiaryFixedVariant: string,
    error: string,
    errorContainer: string,
    onError: string,
    onErrorContainer: string,
    background: string,
    onBackground: string,
    outline: string,
    inverseOnSurface: string,
    inverseSurface: string,
    inversePrimary: string,
    shadow: string,
    surfaceTint: string,
    outlineVariant: string,
    scrim: string,
    surface: string,
    onSurface: string,
    surfaceVariant: string,
    onSurfaceVariant: string,
    surfaceContainerHighest: string,
    surfaceContainerHigh: string,
    surfaceContainer: string,
    surfaceContainerLow: string,
    surfaceContainerLowest: string,
    surfaceDim: string,
    surfaceBright: string
}

export type Palette = {
    "0": string
    "5"?: string,
    "10": string,
    "20": string,
    "25"?: string,
    "30": string,
    "35"?: string,
    "40": string,
    "50": string,
    "60": string,
    "70": string,
    "80": string,
    "90": string,
    "95": string,
    "98": string,
    "99": string,
    "100": string
}

export type Palettes = {
    primary: Palette,
    secondary: Palette,
    tertiary: Palette,
    error: Palette,
    neutral: Palette,
    neutralVariant: Palette
}

export type HalcyonTheme = {
    schemes: {
        light: ColorScheme,
        dark: ColorScheme
    },
    palettes: Palettes
}


/**
 * Options for the Halcyon plugin.
 */
export type HalcyonPluginOptions<Theme extends HalcyonTheme> = {
    /**
     * The theme to use for the application. If no theme is applied, the default theme will be used.
     */
    theme?: Theme

    /**
     * Whether to use media queries in order to detect dark mode, or to use a class name.
     * Defaults to `media`, but you should probably use `class`! See
     * [tailwind's documentation on the matter](https://tailwindcss.com/docs/dark-mode#supporting-system-preference-and-manual-selection).
     */
    darkMode?: 'media' | 'class'

    /**
     * The class name to use if `darkMode` is set to `class`. Defaults to `dark`.
     */
    darkModeClass?: string
}
const DEFAULT_DARK_MODE_CLASS = 'dark'

// https://stackoverflow.com/a/67243723
const kebab = (str) => str.replace(/[A-Z]+(?![a-z])|[A-Z]/g, ($, ofs) => (ofs ? "-" : "") + $.toLowerCase())

const hex = (d: string) => parseInt(d, 16)

const color = (c: string, alpha: number) => [
    hex(c.slice(1, 3)),
    hex(c.slice(3, 5)),
    hex(c.slice(5, 7)),
    alpha,
]

const component = (n: number) => Math.round(n).toString(16).padStart(2, '0')

const mix = (color1: string, color2: string, weight: number) => {
    const colorRGBA1 = color(color1, 255)
    const colorRGBA2 = color(color2, (weight / 100) * 255)

    const red =
        (colorRGBA1[0] * (255 - colorRGBA2[3]) + colorRGBA2[0] * colorRGBA2[3]) /
        255
    const green =
        (colorRGBA1[1] * (255 - colorRGBA2[3]) + colorRGBA2[1] * colorRGBA2[3]) /
        255
    const blue =
        (colorRGBA1[2] * (255 - colorRGBA2[3]) + colorRGBA2[2] * colorRGBA2[3]) /
        255

    return '#' + [red, green, blue].map(component).join('')
}

const pt = (p: Palette, tones: string[]): string[] => tones.map(t => p[t])

const getPrimaryTones = (palette: Palette, kind: 'dark' | 'light') => {
    // @ material theme team PLEASE give me the elevation variants. PLEASE.
    // im fucking BEGGING
    // this isn't accurate but it's the best i can do and it's probably fine for
    // most use cases
    if (kind == 'dark') {
        const elevation1 = mix(palette['80'], palette['70'], 20)
        const elevation2 = mix(palette['80'], palette['70'], 40)
        return [elevation1, elevation2]
    } else {
        const elevation1 = mix(palette['40'], palette['50'], 20)
        const elevation2 = mix(palette['40'], palette['50'], 40)
        return [elevation1, elevation2]
    }
}

const getContainerTones = (palette: Palette, kind: 'dark' | 'light') => {
    if (kind == 'dark') {
        const elevation1 = mix(palette['30'], palette['40'], 20)
        const elevation2 = mix(palette['30'], palette['40'], 40)
        return [elevation1, elevation2]
    } else {
        const elevation1 = mix(palette['90'], palette['80'], 80)
        const elevation2 = mix(palette['80'], palette['70'], 20)
        return [elevation1, elevation2]
    }
}

const stateLayerColors = (color: string, stateLayerColor: string) => {
    return {
        hover: mix(color, stateLayerColor, 8),
        focus: mix(color, stateLayerColor, 12),
        press: mix(color, stateLayerColor, 12),
        drag: mix(color, stateLayerColor, 16),
    }
}

const themeToVars = (scheme: ColorScheme, palettes: Palettes, kind: 'dark' | 'light') => {
    const paletteElevations = {
        primary: getPrimaryTones(palettes.primary, kind),
        secondary: getPrimaryTones(palettes.secondary, kind),
        tertiary: getPrimaryTones(palettes.tertiary, kind),

        primaryContainer: getContainerTones(palettes.primary, kind),
        secondaryContainer: getContainerTones(palettes.secondary, kind),
        tertiaryContainer: getContainerTones(palettes.tertiary, kind),
    }

    const elevationVars = Object.entries(paletteElevations)
        .map(([name, elevations]) =>
            elevations.map((e, i) => `--halcyon-${kebab(name)}-elevation-${i + 1}: ${e};`).join('\n')
        ).join('\n')

    const stateLayerVars = Object.entries({
        surface: stateLayerColors(scheme.surfaceContainer, scheme.primary),
        secondary: stateLayerColors(scheme.secondaryContainer, scheme.onSecondaryContainer),
        tertiary: stateLayerColors(scheme.tertiaryContainer, scheme.onTertiaryContainer),
    })
        .map(([name, colors]) =>
            Object.entries(colors)
                .map(([state, color]) =>
                    `--halcyon-${name}-${state}: ${color};\n`).join('\n')
        ).join('\n')

    // this always gets generated as a color that's way too dark, so fix it
    if (kind == 'light') {
        scheme.shadow = 'rgba(0, 0, 0, 0.12)'
    }

    const additional = [
        ...[8, 12, 16].map(o => `--halcyon-primary-o${o}: ${scheme.primary}0${o.toString(16)};`),
        ...[4, 8, 12].map(o => `--halcyon-on-surface-o${o}: ${scheme.onSurface}0${o.toString(16)};`),
        `--halcyon-on-surface-o16: ${scheme.onSurface}29;`,
        `--halcyon-on-surface-o38: ${scheme.onSurface}61;`,
        `--halcyon-on-surface-variant-o16: ${scheme.onSurfaceVariant}29;`,
        `--halcyon-on-surface-variant-o38: ${scheme.onSurfaceVariant}61;`
    ].join('\n')

    const schemeVars = Object.entries(scheme)
        .map(([name, color]) => `--halcyon-${kebab(name)}: ${color};`)
        .join('\n')

    return [
        stateLayerVars,
        elevationVars,
        schemeVars,
        additional
    ].join('\n')
}

/**
 * Create a Halcyon plugin instance.
 * @param options The options to use.
 * @returns The plugin to be passed to Vite.
 */
export const Halcyon = <Theme extends HalcyonTheme>(options: HalcyonPluginOptions<Theme> = {}): Plugin[] => {
    const theme = options.theme ?? defaultTheme

    const themeMID = 'halcyon:theme.css'
    const themeRMID = '\0' + themeMID

    const baseMID = 'halcyon:base.css'
    const baseRMID = '\0' + baseMID

    const resetMID = 'halcyon:reset.css'
    const resetRMID = '\0' + resetMID

    let plugins: Plugin[] = []

    plugins.push({
        name: 'halcyon-vue',
        enforce: 'post',
        resolveId(id) {
            if (id === themeMID) {
                return themeRMID
            } else if (id === baseMID) {
                return baseRMID
            } else if (id === resetMID) {
                return resetRMID
            }
        },
        load(id) {
            if (id === resetRMID) {
                return reset
            } else
                if (id === baseRMID) {
                    return baseTheme
                } else if (id === themeRMID) {
                    const common = `
                    :root {
                        --halcyon-fab-z: 45;
                        --halcyon-modal-z: 50;
                        --halcyon-snackbar-z: 100;
                        --halcyon-menu-z: 200;
                    }
                    `

                    const lightTheme = `:root {\n${themeToVars(theme.schemes.light, theme.palettes, 'light')}\n}`

                    const darkVars = themeToVars(theme.schemes.dark, theme.palettes, 'dark')
                    let darkTheme: string
                    if (options.darkMode === 'class') {
                        let className = options.darkModeClass ?? DEFAULT_DARK_MODE_CLASS
                        // be kind and remove the dot if it's there
                        if (className.startsWith('.')) {
                            className = className.slice(1)
                        }
                        darkTheme = `.${className} {\n${darkVars}\n}`
                    } else {
                        darkTheme = `@media (prefers-color-scheme: dark) {\n:root {\n${darkVars}\n}\n}`
                    }

                    return common + '\n' + lightTheme + '\n' + darkTheme
                }
        },
    })

    return plugins
}

