# Pickit ColorPicker

Ein barrierefreier, leichtgewichtiger Color Picker inspiriert von Flatpickr mit vollständiger Unterstützung moderner Farbformate.

## ✨ Features

- **♿ Vollständig Barrierefrei**: WCAG 2.1 AA konform mit ARIA-Labels und Tastaturnavigation
- **🎨 Moderne Farbformate**: Unterstützt HEX, RGB, HSL mit optionalem Alpha-Kanal
- **🎯 Voreingestellte Farben**: Schneller Zugriff auf Markenfarben oder gängige Farbpaletten
- **⌨️ Tastaturnavigation**: Volle Steuerung per Pfeiltasten (Shift für größere Schritte)
- **🌙 Dark Mode**: Automatische Unterstützung über `prefers-color-scheme`
- **📱 Responsive**: Optimiert für Desktop und mobile Geräte
- **🎭 Inline oder Popup**: Flexibel als Dropdown oder dauerhaft eingebetteter Picker
- **⚡ Leichtgewichtig**: Keine Abhängigkeiten, nur ~10KB gzipped
- **🔧 Anpassbar**: Umfangreiche Optionen und Callbacks

## 📦 Installation

```bash
npm install pickit
```

Oder über CDN:

```html
<link rel="stylesheet" href="https://unpkg.com/pickit/dist/colorpicker.css">
<script src="https://unpkg.com/pickit/dist/colorpicker.js"></script>
```

## 🚀 Grundlegende Verwendung

### HTML

```html
<input type="text" id="colorInput" placeholder="Farbe auswählen">
```

### JavaScript

```javascript
import colorpicker from 'pickit/colorpicker';

const picker = colorpicker('#colorInput', {
  defaultColor: '#3b82f6',
  format: 'hex',
  onChange: (color) => {
    console.log('Ausgewählte Farbe:', color);
  }
});
```

## ⚙️ Optionen

| Option | Typ | Standard | Beschreibung |
|--------|-----|----------|--------------|
| `defaultColor` | `string` | `'#3b82f6'` | Standardfarbe beim Initialisieren |
| `format` | `'hex' \| 'rgb' \| 'hsl'` | `'hex'` | Ausgabeformat der Farbe |
| `showAlpha` | `boolean` | `false` | Alpha-Kanal (Transparenz) aktivieren |
| `presetColors` | `string[]` | `[...]` | Array vordefinierter Farben |
| `inline` | `boolean` | `false` | Picker dauerhaft sichtbar machen |
| `appendTo` | `HTMLElement` | `document.body` | Element, an das der Picker angehängt wird |
| `position` | `'auto' \| 'above' \| 'below'` | `'auto'` | Position des Pickers relativ zum Input |
| `closeOnSelect` | `boolean` | `true` | Picker nach Auswahl schließen |
| `onChange` | `function` | `() => {}` | Callback bei Farbänderung |
| `onOpen` | `function` | `() => {}` | Callback beim Öffnen |
| `onClose` | `function` | `() => {}` | Callback beim Schließen |
| `ariaLabels` | `object` | `{...}` | Anpassbare ARIA-Labels für Barrierefreiheit |

## 📖 Beispiele

### HEX Format

```javascript
const picker = colorpicker('#hex-input', {
  format: 'hex',
  defaultColor: '#3b82f6'
});
```

### RGB mit Alpha

```javascript
const picker = colorpicker('#rgb-input', {
  format: 'rgb',
  showAlpha: true,
  defaultColor: 'rgba(59, 130, 246, 0.8)',
  onChange: (color) => {
    document.body.style.backgroundColor = color;
  }
});
```

### HSL Format

```javascript
const picker = colorpicker('#hsl-input', {
  format: 'hsl',
  defaultColor: 'hsl(217, 91%, 60%)'
});
```

### Eigene Markenfarben

```javascript
const picker = colorpicker('#brand-input', {
  format: 'hex',
  presetColors: [
    '#6366f1', // Indigo
    '#8b5cf6', // Purple
    '#ec4899', // Pink
    '#f59e0b', // Amber
    '#10b981', // Emerald
    '#06b6d4', // Cyan
  ],
  closeOnSelect: true
});
```

### Inline Modus

```javascript
const picker = colorpicker('#inline-input', {
  inline: true,
  appendTo: document.querySelector('.color-container'),
  format: 'hex',
  onChange: (color) => {
    console.log('Farbe geändert:', color);
  }
});
```

### Position steuern

```javascript
const picker = colorpicker('#positioned-input', {
  position: 'above', // Immer oberhalb des Inputs
  format: 'hex'
});
```

### ARIA-Labels anpassen

```javascript
const picker = colorpicker('#accessible-input', {
  ariaLabels: {
    hue: 'Farbton',
    saturation: 'Sättigung und Helligkeit',
    lightness: 'Helligkeit',
    alpha: 'Transparenz',
    presets: 'Vordefinierte Farben'
  }
});
```

## 🎹 Tastaturnavigation

Der ColorPicker ist vollständig per Tastatur bedienbar:

| Taste | Funktion |
|-------|----------|
| `↑` `↓` `←` `→` | Sättigung und Helligkeit anpassen |
| `Shift` + Pfeiltasten | Größere Schritte |
| `Tab` | Zwischen Steuerelementen wechseln |
| `Escape` | Picker schließen |
| `Enter` | Farbauswahl bestätigen |

## 🔧 API-Methoden

### setColor(color: string)

Farbe programmatisch setzen:

```javascript
picker.setColor('#ff0000');
picker.setColor('rgb(255, 0, 0)');
picker.setColor('hsl(0, 100%, 50%)');
```

### getColor(): string

Aktuelle Farbe abrufen:

```javascript
const currentColor = picker.getColor();
console.log(currentColor); // "#ff0000"
```

### open()

Picker öffnen:

```javascript
picker.open();
```

### close()

Picker schließen:

```javascript
picker.close();
```

### toggle()

Picker umschalten:

```javascript
picker.toggle();
```

### destroy()

Picker entfernen und Event Listener aufräumen:

```javascript
picker.destroy();
```

### getInstance(element: HTMLElement)

Bestehende Picker-Instanz abrufen:

```javascript
const picker = colorpicker.getInstance(inputElement);
```

## 🎨 Farbkonvertierung

Der ColorPicker versteht automatisch alle gängigen Farbformate:

```javascript
// Alle diese Formate werden erkannt:
picker.setColor('#ff0000');           // HEX
picker.setColor('#ff0000ff');         // HEX mit Alpha
picker.setColor('rgb(255, 0, 0)');    // RGB
picker.setColor('rgba(255, 0, 0, 0.5)'); // RGB mit Alpha
picker.setColor('hsl(0, 100%, 50%)'); // HSL
picker.setColor('hsla(0, 100%, 50%, 0.5)'); // HSL mit Alpha
```

## 🌙 Dark Mode

Der ColorPicker unterstützt automatisch Dark Mode über CSS:

```css
@media (prefers-color-scheme: dark) {
  /* Styles werden automatisch angepasst */
}
```

Eigenes Dark Mode Styling:

```css
.colorpicker-container {
  background: #1f2937;
  border-color: #374151;
}
```

## ♿ Barrierefreiheit

Der ColorPicker ist nach WCAG 2.1 AA Standards entwickelt:

- **ARIA-Labels**: Alle interaktiven Elemente sind beschriftet
- **Tastaturnavigation**: Vollständige Steuerung per Tastatur
- **Screen Reader**: Optimiert für Screen Reader
- **Focus Indicators**: Klare visuelle Fokusanzeigen
- **High Contrast**: Unterstützung für hohen Kontrast
- **Reduced Motion**: Respektiert `prefers-reduced-motion`

## 🎯 Browser-Unterstützung

- Chrome/Edge: Letzte 2 Versionen
- Firefox: Letzte 2 Versionen
- Safari: Version 12+
- iOS Safari: Version 12+
- Android Chrome: Letzte 2 Versionen

## 📄 Lizenz

MIT License - siehe [LICENSE.md](../LICENSE.md)

## 🤝 Beitragen

Contributions sind willkommen! Siehe das Haupt-Repository für Guidelines.

## 🔗 Links

- [Hauptprojekt: Pickit](../README.md)
- [Demo](demo-colorpicker.html)
- [GitHub](https://github.com/skerbis/pickit)
