# Pickit Color Language Pack Template

This is a template for creating external language packages for Pickit Color.

## Package Structure

```
pickit-color-lang-{code}/
├── package.json
├── README.md
├── index.ts
└── tsconfig.json
```

## Files

### package.json

```json
{
  "name": "pickit-color-lang-fr",
  "version": "1.0.0",
  "description": "French language pack for Pickit Color",
  "main": "dist/index.js",
  "module": "dist/index.esm.js",
  "types": "dist/index.d.ts",
  "scripts": {
    "build": "tsc && tsc -p tsconfig.esm.json"
  },
  "keywords": [
    "pickit-color",
    "colorpicker",
    "i18n",
    "l10n",
    "french",
    "translation"
  ],
  "peerDependencies": {
    "pickit-color": "^1.0.0"
  },
  "devDependencies": {
    "pickit-color": "^1.1.0",
    "typescript": "^5.0.0"
  },
  "author": "Your Name",
  "license": "MIT"
}
```

### index.ts

```typescript
import { ColorPicker, ColorPickerLanguage } from 'pickit-color';

export const fr: ColorPickerLanguage = {
  hue: "Teinte",
  saturation: "Saturation et luminosité",
  lightness: "Luminosité",
  alpha: "Alpha",
  presets: "Couleurs prédéfinies",
  eyeDropper: "Pipette à couleurs",
  systemPicker: "Sélecteur système"
};

// Auto-register on import
ColorPicker.addTranslation('fr', fr);

export default fr;
```

### tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2015",
    "module": "CommonJS",
    "declaration": true,
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  },
  "include": ["index.ts"]
}
```

### tsconfig.esm.json

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "module": "ES2015",
    "outDir": "./dist",
    "outFile": "./dist/index.esm.js"
  }
}
```

### README.md

```markdown
# Pickit Color - French Language Pack

French translation for [Pickit Color](https://github.com/skerbis/pickit-color).

## Installation

\`\`\`bash
npm install pickit-color pickit-color-lang-fr
\`\`\`

## Usage

### Auto-registration (Import)

\`\`\`javascript
import 'pickit-color-lang-fr';
import colorpicker from 'pickit-color';

colorpicker('#input', { language: 'fr' });
\`\`\`

### Manual Registration

\`\`\`javascript
import { fr } from 'pickit-color-lang-fr';
import { ColorPicker } from 'pickit-color';

ColorPicker.addTranslation('fr', fr);
\`\`\`

### HTML

\`\`\`html
<html lang="fr">
  <input data-colorpicker="format:hex">
</html>
\`\`\`

## Translation

| Key | French |
|-----|--------|
| hue | Teinte |
| saturation | Saturation et luminosité |
| lightness | Luminosité |
| alpha | Alpha |
| presets | Couleurs prédéfinies |
| eyeDropper | Pipette à couleurs |
| systemPicker | Sélecteur système |

## Contributing

Found an error? Submit a PR or [open an issue](https://github.com/your-username/pickit-color-lang-fr/issues).

## License

MIT
\`\`\`

## Publishing

1. **Build**:
   ```bash
   npm run build
   ```

2. **Test locally**:
   ```bash
   npm link
   cd your-test-project
   npm link pickit-color-lang-fr
   ```

3. **Publish**:
   ```bash
   npm publish
   ```

## Example Packages

Here are some examples you can create:

- `pickit-color-lang-fr` - French
- `pickit-color-lang-es` - Spanish
- `pickit-color-lang-it` - Italian
- `pickit-color-lang-pt` - Portuguese
- `pickit-color-lang-nl` - Dutch
- `pickit-color-lang-pl` - Polish
- `pickit-color-lang-ru` - Russian
- `pickit-color-lang-ja` - Japanese
- `pickit-color-lang-zh` - Chinese
- `pickit-color-lang-ko` - Korean

## Naming Convention

Use the format: `pickit-color-lang-{ISO-639-1-code}`

## Questions?

- Main Project: [github.com/skerbis/pickit-color](https://github.com/skerbis/pickit-color)
- Translation Guide: [TRANSLATIONS.md](https://github.com/skerbis/pickit-color/blob/master/TRANSLATIONS.md)

---

Made with ❤️ for the Pickit Color community
