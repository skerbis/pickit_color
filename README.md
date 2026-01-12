# TS Pickit Color

A modern, lightweight, and accessible color picker with HSL/RGBA support, preset colors, multiple UI modes, and screen color picking capabilities.

[![Donate](https://img.shields.io/badge/Sponsor-GitHub-pink.svg)](https://github.com/sponsors/skerbis)
[![License](https://img.shields.io/badge/license-Donationware-blue.svg)](LICENSE.md)

## ✨ Features

- 🎯 **Multiple Color Formats**: HEX, HEX8, RGB, RGBA, HSL, HSLA
- 🎚️ **Slider Mode**: Individual sliders for H, S, L, A values
- 🎨 **2D Picker**: Traditional saturation/lightness picker
- 🎯 **Live Theme Builder**: Target elements for live color updates
- 📌 **Preset Colors**: With optional labels and list view
- 👁️ **Screen Color Picker**: EyeDropper API + System ColorPicker fallback
- 🔲 **Compact Mode**: Minimal button interface
- 📍 **Inline Mode**: Always-visible picker
- 🖼️ **Input Preview**: Color square inside input field
- 🌙 **Dark Mode**: Automatic dark theme support
- ♿ **Accessibility**: WCAG 2.1 AA compliant with full keyboard navigation
- 📦 **Lightweight**: ~15 KB minified

## 📦 Installation

### NPM

```bash
npm install pickit-color
```

### CDN

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/pickit-color/dist/colorpicker.min.css">
<script src="https://cdn.jsdelivr.net/npm/pickit-color/dist/colorpicker.min.js"></script>
```

## 🚀 Quick Start

### HTML Attribute (Auto-Init)

```html
<input 
  type="text" 
  data-colorpicker="format:hex,showAlpha:true"
  value="#3b82f6"
>
```

### JavaScript

```javascript
import colorpicker from 'pickit-color';

const picker = colorpicker('#myInput', {
  format: 'hex',
  showAlpha: true,
  onChange: (color) => {
    console.log('Selected color:', color);
  }
});
```

## 📖 Examples

### Standard Picker

```html
<input data-colorpicker="format:hex" value="#3b82f6">
```

### Slider Mode (Individual H, S, L, A Sliders)

```html
<input data-colorpicker="format:hsl,sliderMode:true,showAlpha:true">
```

### With Preset Colors

```html
<input 
  data-colorpicker="format:hex,presets:true"
  data-preset-colors="#3b82f6,#10b981,#f59e0b,#ef4444"
  value="#3b82f6"
>
```

### Compact Mode

```html
<input data-colorpicker="format:hex,compact:true" value="#8b5cf6">
```

### With Screen Color Picker

```html
<input data-colorpicker="format:hex,eyeDropper:true">
```

### Inline Mode

```html
<input data-colorpicker="format:hex,inline:true">
```

### Input Preview Mode

```html
<input data-colorpicker="format:hex,inputPreview:true">
```

### Live Theme Builder

```html
<!-- Update background color of target element -->
<div id="preview-box">Live Preview</div>
<input data-colorpicker="format:hex,target:#preview-box,property:background-color">

<!-- Update text color -->
<input data-colorpicker="format:hex,target:#preview-box,property:color">
```

### Multilanguage Support

```html
<!-- Auto-detects from <html lang="de"> or browser language -->
<input data-colorpicker="format:hex">

<!-- Explicitly set language -->
<input data-colorpicker="format:hex,language:de">
```

**Built-in Languages:** `en` (English), `de` (Deutsch), `si` (Slovenščina)

**Contributing Translations:**

1. Create a file in `src/l10n/` (e.g., `fr.ts`)
2. Copy the `ColorPickerLanguage` interface structure
3. Export in `src/l10n/index.ts`
4. Submit a PR!

See [TRANSLATIONS.md](TRANSLATIONS.md) for the complete guide.

**Runtime Translation:**

```javascript
import colorpicker, { ColorPicker } from 'pickit-color';

// Add French translation
ColorPicker.addTranslation('fr', {
  hue: 'Teinte',
  saturation: 'Saturation et luminosité',
  lightness: 'Luminosité',
  alpha: 'Alpha',
  presets: 'Couleurs prédéfinies',
  eyeDropper: 'Pipette à couleurs',
  systemPicker: 'Sélecteur système'
});

// Check available languages
console.log(ColorPicker.getAvailableLanguages()); // ['en', 'de', 'sl', 'fr']
```

## ⚙️ Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `previewTarget` | `string` | `''` | CSS selector of element to update with color |
| `previewProperty` | `string` | `'background-color'` | CSS property to update on target element |
| `language` | `string` | `auto` | UI language: `en`, `de`, `si` or custom (auto-detects from HTML or browser) |
| `format` | `string` | `'hex'` | Color format: `hex`, `hex8`, `rgb`, `rgba`, `hsl`, `hsla` |
| `showAlpha` | `boolean` | `false` | Show alpha/transparency slider |
| `defaultColor` | `string` | `'#3b82f6'` | Initial color if input is empty |
| `presetColors` | `string[]` | `[]` | Array of preset colors |
| `presetLabels` | `string[]` | `[]` | Labels for preset colors |
| `compact` | `boolean` | `false` | Show as compact button instead of input |
| `inline` | `boolean` | `false` | Always show picker (no popup) |
| `presetsOnly` | `boolean` | `false` | Show only preset colors |
| `listView` | `boolean` | `false` | Show presets as list with labels |
| `sliderMode` | `boolean` | `false` | Use individual sliders for H, S, L instead of 2D picker |
| `inputPreview` | `boolean` | `false` | Show color preview inside input field |
| `eyeDropper` | `boolean` | `false` | Enable screen color picker (EyeDropper API + System fallback) |
| `closeOnSelect` | `boolean` | `true` | Close picker when selecting preset |
| `onChange` | `function` | `() => {}` | Callback when color changes |
| `appendTo` | `HTMLElement` | `document.body` | Where to append the picker |

## 🎨 Theming

Pickit Color uses CSS custom properties for easy theming:

```css
.colorpicker-container {
  --cp-primary: #3b82f6;
  --cp-bg: #ffffff;
  --cp-text: #1f2937;
  --cp-border: #e5e7eb;
  --cp-radius: 8px;
}
```

## 🌐 Browser Support

- Chrome 95+ (EyeDropper API)
- Firefox 96+
- Safari 15.4+ (System ColorPicker with EyeDropper)
- Edge 95+

## 📄 License

This software is **Donationware**. You can use it for free, but if you find it useful, please consider supporting development:

💖 [Sponsor on GitHub](https://github.com/sponsors/skerbis)

## 👨‍💻 Author

**Thomas Skerbis**  
KLXM Crossmedia  
[GitHub](https://github.com/skerbis) • [Website](https://klxm.de)

## 🙏 Acknowledgments

Built with modern web standards and accessibility in mind. Inspired by the need for a lightweight, feature-rich color picker without dependencies.

---

Made with ❤️ by [Thomas Skerbis](https://github.com/skerbis)
