# 🌍 Translation Guide

Pickit Color supports multiple languages through a simple translation system. You can easily add your own language or contribute translations.

## Built-in Languages

- 🇬🇧 **en** - English
- 🇩🇪 **de** - Deutsch (German)
- 🇸🇮 **sl** - Slovenščina (Slovenian)

# 🌍 Translation Guide

Pickit Color supports multiple languages. You can add translations in two ways:

## Method 1: Contributing to the Repository (Recommended)

### Step 1: Create a Language File

Navigate to `src/l10n/` and copy the English template:

```bash
cd src/l10n
cp en.ts fr.ts  # Replace 'fr' with your language code
```

### Step 2: Translate the Strings

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

### Step 3: Export Your Language

Add your language to `src/l10n/index.ts`:

```typescript
export { default as fr } from './fr';
```

### Step 4: Submit a Pull Request

Your translation will be included in the next release!

## Method 2: Runtime Registration (For Custom Projects)

If you need a custom translation without contributing to the repository:
import colorpicker, { ColorPicker } from 'pickit-color';

ColorPicker.addTranslation('fr', {
  hue: 'Teinte',
  saturation: 'Saturation et luminosité',
  lightness: 'Luminosité',
  alpha: 'Alpha',
  presets: 'Couleurs prédéfinies',
  eyeDropper: 'Pipette à couleurs',
  systemPicker: 'Sélecteur système'
});
```

### Method 2: TypeScript Interface

```typescript
import { ColorPickerLanguage, ColorPicker } from 'pickit-color';

const spanishTranslation: ColorPickerLanguage = {
  hue: 'Tono',
  saturation: 'Saturación y luminosidad',
  lightness: 'Luminosidad',
  alpha: 'Alfa',
  presets: 'Colores predefinidos',
  eyeDropper: 'Selector de pantalla',
  systemPicker: 'Selector del sistema'
};

ColorPicker.addTranslation('es', spanishTranslation);
```

## Translation Template

Copy and translate the following template:

```javascript
ColorPicker.addTranslation('XX', {  // Replace XX with your language code
  hue: '',                          // Label for hue slider
  saturation: '',                   // Label for 2D saturation/lightness picker
  lightness: '',                    // Label for lightness slider
  alpha: '',                        // Label for alpha/transparency slider
  presets: '',                      // Label for preset colors section
  eyeDropper: '',                   // Tooltip for eyedropper button
  systemPicker: ''                  // Tooltip for system color picker button
});
```

## Language Codes

Use [ISO 639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) two-letter language codes:

- `fr` - French
- `es` - Spanish
- `it` - Italian
- `pt` - Portuguese
- `nl` - Dutch
- `pl` - Polish
- `ru` - Russian
- `ja` - Japanese
- `zh` - Chinese
- `ko` - Korean
- etc.

## Community Translations

### 🇫🇷 French

```javascript
ColorPicker.addTranslation('fr', {
  hue: 'Teinte',
  saturation: 'Saturation et luminosité',
  lightness: 'Luminosité',
  alpha: 'Alpha',
  presets: 'Couleurs prédéfinies',
  eyeDropper: 'Pipette à couleurs',
  systemPicker: 'Sélecteur système'
});
```

### 🇪🇸 Spanish

```javascript
ColorPicker.addTranslation('es', {
  hue: 'Tono',
  saturation: 'Saturación y luminosidad',
  lightness: 'Luminosidad',
  alpha: 'Alfa',
  presets: 'Colores predefinidos',
  eyeDropper: 'Selector de pantalla',
  systemPicker: 'Selector del sistema'
});
```

### 🇮🇹 Italian

```javascript
ColorPicker.addTranslation('it', {
  hue: 'Tonalità',
  saturation: 'Saturazione e luminosità',
  lightness: 'Luminosità',
  alpha: 'Alfa',
  presets: 'Colori predefiniti',
  eyeDropper: 'Contagocce',
  systemPicker: 'Selettore di sistema'
});
```

### 🇵🇹 Portuguese

```javascript
ColorPicker.addTranslation('pt', {
  hue: 'Matiz',
  saturation: 'Saturação e luminosidade',
  lightness: 'Luminosidade',
  alpha: 'Alfa',
  presets: 'Cores predefinidas',
  eyeDropper: 'Conta-gotas',
  systemPicker: 'Seletor do sistema'
});
```

### 🇳🇱 Dutch

```javascript
ColorPicker.addTranslation('nl', {
  hue: 'Tint',
  saturation: 'Verzadiging en helderheid',
  lightness: 'Helderheid',
  alpha: 'Transparantie',
  presets: 'Vooraf ingestelde kleuren',
  eyeDropper: 'Kleurenpipet',
  systemPicker: 'Systeemkleurenkiezer'
});
```

## Usage After Adding Translation

### Auto-detection

Set the HTML lang attribute:

```html
<html lang="fr">
  <body>
    <!-- ColorPicker will automatically use French -->
    <input data-colorpicker="format:hex">
  </body>
</html>
```

### Explicit Language

```html
<!-- Via attribute -->
<input data-colorpicker="format:hex,language:fr">

<!-- Via JavaScript -->
<script>
  colorpicker('#color-input', {
    format: 'hex',
    language: 'fr'
  });
</script>
```

## Contributing Translations

Want to contribute a translation to be included in the library? Please:

1. Fork the repository
2. Add your translation to `src/index.ts` in the `translations` object
3. Test your translation
4. Submit a Pull Request

We appreciate all translation contributions! 🙏

## Testing Your Translation

```javascript
// Add your translation
ColorPicker.addTranslation('fr', { /* ... */ });

// Check if it's registered
console.log(ColorPicker.getAvailableLanguages());
// Should include: [..., 'fr']

// Create picker with your language
const picker = colorpicker('#test-input', {
  format: 'hex',
  language: 'fr',
  sliderMode: false // Use 2D picker to see all labels
});

// Open picker and verify all labels are translated
picker.open();
```

## Questions?

- 📖 [Documentation](README.md)
- 🐛 [Issues](https://github.com/skerbis/pickit-color/issues)
- 💬 [Discussions](https://github.com/skerbis/pickit-color/discussions)

---

Made with ❤️ by [Thomas Skerbis](https://github.com/skerbis)
