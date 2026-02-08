# 🌍 Language Files

This directory contains all language translations for Pickit Color.

## Contributing a Translation

### 1. Create a new language file

Copy `en.ts` and rename it to your [ISO 639-1 language code](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes):

```bash
cp en.ts fr.ts  # For French
cp en.ts es.ts  # For Spanish
cp en.ts it.ts  # For Italian
```

### 2. Translate the strings

```typescript
import { ColorPickerLanguage } from '../index';

const fr: ColorPickerLanguage = {
  hue: "Teinte",
  saturation: "Saturation et luminosité",
  lightness: "Luminosité",
  alpha: "Alpha",
  presets: "Couleurs prédéfinies",
  eyeDropper: "Pipette à couleurs",
  systemPicker: "Sélecteur système"
};

export default fr;
```

### 3. Export in index.ts

Add your language to `index.ts`:

```typescript
export { default as fr } from './fr';
```

### 4. Submit a Pull Request

That's it! Your translation will be available in the next release.

## Translation Guidelines

- **hue**: Label for the hue slider (0-360°)
- **saturation**: Label for the 2D saturation/lightness picker
- **lightness**: Label for the lightness slider
- **alpha**: Label for transparency/alpha slider
- **presets**: Label for preset colors section
- **eyeDropper**: Tooltip for the eyedropper button (screen color picker)
- **systemPicker**: Tooltip for system color picker button

Keep labels concise but descriptive. They will be used as ARIA labels for screen readers.

## Available Languages

- 🇬🇧 **en** - English
- 🇩🇪 **de** - Deutsch (German)
- 🇸🇮 **sl** - Slovenščina (Slovenian)

## External Language Packages

You can also publish language packs as separate npm packages:

```typescript
// pickit-color-lang-fr package
import { ColorPicker } from 'pickit-color';

export const fr = { /* ... */ };

// Auto-register on import
ColorPicker.addTranslation('fr', fr);
```

Install and import:

```bash
npm install pickit-color-lang-fr
```

```javascript
import 'pickit-color-lang-fr';
import colorpicker from 'pickit-color';

colorpicker('#input', { language: 'fr' });
```

---

Thank you for contributing! 🙏
