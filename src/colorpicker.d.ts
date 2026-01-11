declare module "pickit/colorpicker" {
  export interface ColorPickerOptions {
    defaultColor?: string;
    format?: "hex" | "rgb" | "hsl";
    showAlpha?: boolean;
    sliderMode?: boolean;
    eyeDropper?: boolean;
    presetColors?: string[];
    presetLabels?: string[];
    presetsOnly?: boolean;
    listView?: boolean;
    inputPreview?: boolean;
    inline?: boolean;
    compact?: boolean;
    onChange?: (color: string) => void;
    onOpen?: () => void;
    onClose?: () => void;
    appendTo?: HTMLElement;
    position?: "auto" | "above" | "below";
    closeOnSelect?: boolean;
    ariaLabels?: {
      hue?: string;
      saturation?: string;
      lightness?: string;
      alpha?: string;
      presets?: string;
    };
  }

  export class ColorPicker {
    constructor(
      element: string | HTMLInputElement,
      options?: ColorPickerOptions
    );
    open(): void;
    close(): void;
    toggle(): void;
    setColor(color: string): void;
    getColor(): string;
    destroy(): void;
    static getInstance(element: HTMLElement): ColorPicker | undefined;
  }

  export default function colorpicker(
    selector: string | HTMLInputElement,
    options?: ColorPickerOptions
  ): ColorPicker;

  export function initColorPickers(
    root?: Document | HTMLElement
  ): ColorPicker[];
}
