# 🌍 Contributing Translations

Thank you for your interest in translating Pickit Color! Here's how to add a new language:

## Quick Start (5 Minutes)

### 1. Fork & Clone

```bash
git clone https://github.com/YOUR_USERNAME/pickit_color.git
cd pickit_color
npm install
```

### 2. Create Your Language File

```bash
cd src/l10n
cp en.ts YOUR_LANGUAGE_CODE.ts
```

**Examples:**
- `fr.ts` for French
- `es.ts` for Spanish  
- `it.ts` for Italian

See [ISO 639-1 codes](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes)

### 3. Translate

Open your new file and translate all strings:

```typescript
import { ColorPickerLanguage } from '../index';

const fr: ColorPickerLanguage = {
  hue: "Teinte",                           // Hue slider label
  saturation: "Saturation et luminosité",  // 2D picker label
  lightness: "Luminosité",                 // Lightness slider
  alpha: "Alpha",                          // Transparency slider
  presets: "Couleurs prédéfinies",        // Preset colors section
  eyeDropper: "Pipette à couleurs",       // Screen picker button
  systemPicker: "Sélecteur système"       // System picker button
};

export default fr;
```

### 4. Register Your Language

Edit `src/l10n/index.ts` and add:

```typescript
export { default as fr } from './fr';
```

### 5. Build & Test

```bash
npm run build
npm start  # Opens demo page
```

Test your translation:
```html
<input data-colorpicker="language:fr">
```

### 6. Submit Pull Request

```bash
git add src/l10n/
git commit -m "Add French translation"
git push origin main
```

Then create a PR at: https://github.com/skerbis/pickit_color/pulls

## Translation Guidelines

### Keep It Concise
Labels appear in the UI and as screen reader announcements. Keep them clear but brief.

### Screen Reader Friendly
Your translations will be read aloud by screen readers. Use natural, descriptive language.

### Field Descriptions

| Field | Usage | Examples |
|-------|-------|----------|
| `hue` | Slider for color hue (0-360°) | Hue, Farbton, Teinte |
| `saturation` | 2D picker for saturation & lightness | Saturation and Lightness, Sättigung und Helligkeit |
| `lightness` | Slider for lightness | Lightness, Helligkeit, Luminosité |
| `alpha` | Transparency/opacity slider | Alpha, Transparenz, Opacité |
| `presets` | Preset color swatches section | Presets, Vordefinierte Farben, Couleurs prédéfinies |
| `eyeDropper` | Button to pick color from screen | Pick from screen, Farbe aufnehmen, Pipette |
| `systemPicker` | Button to open OS color picker | System picker, System-Farbwähler, Sélecteur système |

## Need Help?

- 💬 [Discussions](https://github.com/skerbis/pickit_color/discussions)
- 🐛 [Issues](https://github.com/skerbis/pickit_color/issues)
- 📖 [Full Translation Guide](TRANSLATIONS.md)

## Want to Publish Separately?

You can also create standalone language packages:

```bash
npm install pickit-color-lang-fr
```

See [LANGUAGE_PACK_TEMPLATE.md](docs/LANGUAGE_PACK_TEMPLATE.md) for details.

---

🙏 **Thank you for contributing!**

Your translation helps make Pickit Color accessible to more people around the world.
