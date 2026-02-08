/**
 * Pickit Color Picker
 * An accessible, lightweight color picker inspired by flatpickr
 * Supports HSL, RGB, HEX formats with keyboard navigation
 */

import * as languages from './l10n';

export interface ColorPickerLanguage {
  hue: string;
  saturation: string;
  lightness: string;
  alpha: string;
  presets: string;
  eyeDropper: string;
  systemPicker: string;
}

// Initialize translations with built-in languages
const translations: Record<string, ColorPickerLanguage> = {
  en: languages.en,
  de: languages.de,
  si: languages.si
};

function detectLanguage(): string {
  // Try HTML lang attribute
  const htmlLang = document.documentElement.lang;
  if (htmlLang) {
    const lang = htmlLang.split('-')[0].toLowerCase();
    if (translations[lang]) return lang;
  }
  
  // Try browser language
  const browserLang = navigator.language.split('-')[0].toLowerCase();
  if (translations[browserLang]) return browserLang;
  
  // Default to English
  return 'en';
}

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
  inline?: boolean;
  compact?: boolean;
  inputPreview?: boolean;
  previewTarget?: string;
  previewProperty?: string;
  language?: string;
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

interface HSL {
  h: number; // 0-360
  s: number; // 0-100
  l: number; // 0-100
  a: number; // 0-1
}

interface HSV {
  h: number; // 0-360
  s: number; // 0-100
  v: number; // 0-100
  a: number; // 0-1
}

interface RGB {
  r: number; // 0-255
  g: number; // 0-255
  b: number; // 0-255
  a: number; // 0-1
}

export class ColorPicker {
  private input: HTMLInputElement;
  private options: Required<ColorPickerOptions>;
  private container: HTMLElement | null = null;
  private colorBox: HTMLElement | null = null;
  private hueSlider: HTMLInputElement | null = null;
  private saturationSlider: HTMLInputElement | null = null;
  private lightnessSlider: HTMLInputElement | null = null;
  private alphaSlider: HTMLInputElement | null = null;
  private hexInput: HTMLInputElement | null = null;
  private currentColor: HSL = { h: 0, s: 100, l: 50, a: 1 };
  private isOpen = false;
  private saturationPointer: HTMLElement | null = null;
  private compactButton: HTMLButtonElement | null = null;
  private inputPreview: HTMLElement | null = null;

  private static instances: Map<HTMLElement, ColorPicker> = new Map();

  /**
   * Add a custom translation for the ColorPicker
   * @param langCode - Language code (e.g., 'fr', 'es', 'it')
   * @param translation - Translation object with all required strings
   * @example
   * ColorPicker.addTranslation('fr', {
   *   hue: 'Teinte',
   *   saturation: 'Saturation et luminosité',
   *   lightness: 'Luminosité',
   *   alpha: 'Alpha',
   *   presets: 'Couleurs prédéfinies',
   *   eyeDropper: 'Pipette à couleurs',
   *   systemPicker: 'Sélecteur système'
   * });
   */
  static addTranslation(langCode: string, translation: ColorPickerLanguage): void {
    translations[langCode.toLowerCase()] = translation;
  }

  /**
   * Get all available language codes
   * @returns Array of language codes
   */
  static getAvailableLanguages(): string[] {
    return Object.keys(translations);
  }

  constructor(
    element: string | HTMLInputElement,
    options: ColorPickerOptions = {}
  ) {
    this.input =
      typeof element === "string"
        ? (document.querySelector(element) as HTMLInputElement)
        : element;

    if (!this.input) {
      throw new Error("ColorPicker: Invalid element selector");
    }

    // Read preset colors from data attribute if available
    const dataPresets = this.input.getAttribute("data-preset-colors");
    const presetsFromAttr = dataPresets ? dataPresets.split(",").map(c => c.trim()) : null;
    
    this.options = {
      defaultColor: options.defaultColor || "#3b82f6",
      format: options.format || "hex",
      showAlpha: options.showAlpha ?? false,
      sliderMode: options.sliderMode ?? false,
      eyeDropper: options.eyeDropper ?? false,
      presetColors: options.presetColors || presetsFromAttr || [
        "#ef4444",
        "#f59e0b",
        "#10b981",
        "#3b82f6",
        "#8b5cf6",
        "#ec4899",
        "#000000",
        "#ffffff",
      ],
      presetLabels: options.presetLabels || [],
      presetsOnly: options.presetsOnly ?? false,
      listView: options.listView ?? false,
      inline: options.inline ?? false,
      compact: options.compact ?? false,
      inputPreview: options.inputPreview ?? false,
      previewTarget: options.previewTarget || "",
      previewProperty: options.previewProperty || "background-color",
      language: options.language || detectLanguage(),
      onChange: options.onChange || (() => {}),
      onOpen: options.onOpen || (() => {}),
      onClose: options.onClose || (() => {}),
      appendTo: options.appendTo || document.body,
      position: options.position || "auto",
      closeOnSelect: options.closeOnSelect ?? true,
      ariaLabels: {
        hue: options.ariaLabels?.hue || translations[options.language || detectLanguage()].hue,
        saturation:
          options.ariaLabels?.saturation || translations[options.language || detectLanguage()].saturation,
        lightness: options.ariaLabels?.lightness || translations[options.language || detectLanguage()].lightness,
        alpha: options.ariaLabels?.alpha || translations[options.language || detectLanguage()].alpha,
        presets: options.ariaLabels?.presets || translations[options.language || detectLanguage()].presets,
      },
    };

    this.init();
    ColorPicker.instances.set(this.input, this);
  }

  private init(): void {
    // Parse initial color
    const initialColor = this.input.value || this.options.defaultColor;
    this.currentColor = this.parseColor(initialColor);

    // Create compact button if needed
    if (this.options.compact) {
      this.createCompactButton();
    }
    
    // Create input preview if needed
    if (this.options.inputPreview && !this.options.compact) {
      this.createInputPreview();
    }

    // Build UI
    this.buildColorPicker();

    // Setup event listeners
    this.setupEventListeners();

    // Update display
    this.updateColorDisplay();

    // Open if inline (without scrolling)
    if (this.options.inline && this.container) {
      this.isOpen = true;
      this.container.style.display = "block";
      this.options.onOpen();
    }
  }

  private buildColorPicker(): void {
    this.container = document.createElement("div");
    this.container.className = "colorpicker-container";
    if (this.options.presetsOnly) {
      this.container.classList.add("colorpicker-presets-only");
    }
    if (this.options.inline) {
      this.container.classList.add("colorpicker-inline");
    }
    this.container.setAttribute("role", "dialog");
    this.container.setAttribute("aria-label", "Color picker");
    this.container.style.display = "none";

    const content = `
      <div class="colorpicker-content">
        ${!this.options.presetsOnly ? `
        ${!this.options.sliderMode ? `
        <div class="colorpicker-saturation" 
             role="slider" 
             aria-label="${this.options.ariaLabels.saturation}"
             aria-valuemin="0"
             aria-valuemax="100"
             aria-valuenow="${this.currentColor.s}"
             tabindex="0">
          <div class="colorpicker-saturation-overlay"></div>
          <div class="colorpicker-saturation-pointer" role="presentation"></div>
        </div>
        ` : ''}
        
        <div class="colorpicker-controls">
          <div class="colorpicker-sliders${this.options.sliderMode ? ' colorpicker-sliders-only' : ''}">
            <div class="colorpicker-slider-group">
              <label for="colorpicker-hue">
                <span class="colorpicker-label">${
                  this.options.ariaLabels.hue
                }</span>
              </label>
              <input 
                type="range" 
                id="colorpicker-hue"
                class="colorpicker-slider colorpicker-hue-slider"
                min="0" 
                max="360" 
                value="${this.currentColor.h}"
                aria-label="${this.options.ariaLabels.hue}"
                tabindex="0"
              />
            </div>
            ${
              this.options.sliderMode
                ? `
            <div class="colorpicker-slider-group">
              <label for="colorpicker-saturation">
                <span class="colorpicker-label">${
                  this.options.ariaLabels.saturation
                }</span>
              </label>
              <input 
                type="range" 
                id="colorpicker-saturation"
                class="colorpicker-slider colorpicker-saturation-slider"
                min="0" 
                max="100" 
                value="${this.currentColor.s}"
                aria-label="${this.options.ariaLabels.saturation}"
                tabindex="0"
              />
            </div>
            <div class="colorpicker-slider-group">
              <label for="colorpicker-lightness">
                <span class="colorpicker-label">${
                  this.options.ariaLabels.lightness
                }</span>
              </label>
              <input 
                type="range" 
                id="colorpicker-lightness"
                class="colorpicker-slider colorpicker-lightness-slider"
                min="0" 
                max="100" 
                value="${this.currentColor.l}"
                aria-label="${this.options.ariaLabels.lightness}"
                tabindex="0"
              />
            </div>
            `
                : ""
            }
            ${
              this.options.showAlpha
                ? `
              <div class="colorpicker-slider-group">
                <label for="colorpicker-alpha">
                  <span class="colorpicker-label">${
                    this.options.ariaLabels.alpha
                  }</span>
                </label>
                <input 
                  type="range" 
                  id="colorpicker-alpha"
                  class="colorpicker-slider colorpicker-alpha-slider"
                  min="0" 
                  max="100" 
                  value="${this.currentColor.a * 100}"
                  aria-label="${this.options.ariaLabels.alpha}"
                  tabindex="0"
                />
              </div>
            `
                : ""
            }
          </div>
          
          <div class="colorpicker-preview">
            <div class="colorpicker-preview-color" role="presentation"></div>
          </div>
        </div>
        
        <div class="colorpicker-input-wrapper">
          <label for="colorpicker-hex">
            <span class="colorpicker-sr-only">Color value</span>
          </label>
          <div class="colorpicker-input-row">
            <input 
              type="text" 
              id="colorpicker-hex"
              class="colorpicker-input"
              placeholder="${this.getPlaceholder()}"
              aria-label="Color value in ${this.options.format} format"
            />
            ${
              this.options.eyeDropper
                ? `
            ${this.supportsEyeDropper() ? `
            <button 
              type="button"
              class="colorpicker-eyedropper-btn"
              aria-label="Pick color from screen"
              title="Pick color from screen"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M2 22l1-1"/>
                <path d="M8.5 16.5l-1-1"/>
                <path d="M17 3l4 4"/>
                <path d="M12 8l4 4"/>
                <path d="M3 21l9-9"/>
                <path d="M14.5 9.5l-1 1"/>
                <path d="M20 14l-8 8"/>
              </svg>
            </button>
            ` : `
            <button 
              type="button"
              class="colorpicker-system-picker-btn"
              aria-label="Open system color picker"
              title="Open system color picker"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 2v20"/>
                <path d="M2 12h20"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
            </button>
            <input 
              type="color"
              class="colorpicker-system-picker-input"
              style="position: absolute; opacity: 0; pointer-events: none; width: 0; height: 0;"
            />
            `}
            `
                : ""
            }
          </div>
        </div>
        ` : ''}
        
        ${
          this.options.presetColors.length > 0
            ? `
          <div class="colorpicker-presets${this.options.listView ? ' colorpicker-presets-list' : ''}" role="group" aria-label="${
            this.options.ariaLabels.presets
          }">
            ${this.options.presetColors
              .map(
                (color, index) => {
                  const label = this.options.presetLabels[index] || '';
                  return this.options.listView && label
                    ? `
              <button 
                type="button"
                class="colorpicker-preset colorpicker-preset-list-item" 
                data-color="${color}"
                aria-label="Select color ${label}"
                tabindex="${index === 0 ? '0' : '-1'}"
              >
                <span class="colorpicker-preset-color" style="background-color: ${color}"></span>
                <span class="colorpicker-preset-label">${label}</span>
              </button>
            `
                    : `
              <button 
                type="button"
                class="colorpicker-preset" 
                style="background-color: ${color}"
                data-color="${color}"
                aria-label="Select color ${label || color}"
                tabindex="${index === 0 ? '0' : '-1'}"
              ></button>
            `;
                }
              )
              .join("")}
          </div>
        `
            : ""
        }
      </div>
    `;

    this.container.innerHTML = content;

    // Cache element references
    this.colorBox = this.container.querySelector(".colorpicker-saturation");
    this.saturationPointer = this.container.querySelector(
      ".colorpicker-saturation-pointer"
    );
    this.hueSlider = this.container.querySelector(".colorpicker-hue-slider");
    this.saturationSlider = this.container.querySelector(".colorpicker-saturation-slider");
    this.lightnessSlider = this.container.querySelector(".colorpicker-lightness-slider");
    this.alphaSlider = this.container.querySelector(
      ".colorpicker-alpha-slider"
    );
    this.hexInput = this.container.querySelector(".colorpicker-input");

    // Append to DOM
    if (this.options.inline) {
      // For inline mode, insert after the input
      this.input.parentNode?.insertBefore(this.container, this.input.nextSibling);
      // Hide the original input
      this.input.style.display = "none";
    } else {
      // For popup mode, append to specified container
      this.options.appendTo.appendChild(this.container);
    }
  }

  private createCompactButton(): void {
    // Hide the original input
    this.input.style.position = "absolute";
    this.input.style.opacity = "0";
    this.input.style.pointerEvents = "none";
    this.input.style.width = "0";
    this.input.style.height = "0";

    // Create compact button
    this.compactButton = document.createElement("button") as HTMLButtonElement;
    this.compactButton.type = "button";
    this.compactButton.className = "colorpicker-compact-button";
    this.compactButton.setAttribute("aria-label", "Select color");
    this.compactButton.tabIndex = 0;
    
    // Compact Mode: Immer Farbvorschau
    const preview = document.createElement("span");
    preview.className = "colorpicker-compact-preview";
    preview.style.backgroundColor = this.input.value || this.options.defaultColor;
    
    this.compactButton.appendChild(preview);
    
    // Insert after input
    this.input.parentNode?.insertBefore(this.compactButton, this.input.nextSibling);
    
    // Click handler
    this.compactButton.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.toggle();
    });
    
    // Keyboard handler
    this.compactButton.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        e.stopPropagation();
        this.toggle();
      }
    });
  }

  private createInputPreview(): void {
    // Create wrapper
    const wrapper = document.createElement("div");
    wrapper.className = "colorpicker-input-group";
    
    // Create preview element
    this.inputPreview = document.createElement("span");
    this.inputPreview.className = "colorpicker-input-preview";
    this.inputPreview.style.backgroundColor = this.input.value || this.options.defaultColor;
    
    // Wrap input
    this.input.parentNode?.insertBefore(wrapper, this.input);
    wrapper.appendChild(this.inputPreview);
    wrapper.appendChild(this.input);
    
    // Add class to input for styling
    this.input.classList.add("colorpicker-has-preview");
  }

  private supportsEyeDropper(): boolean {
    return typeof window !== 'undefined' && 'EyeDropper' in window;
  }

  private async openEyeDropper(): Promise<void> {
    if (!this.supportsEyeDropper()) {
      return; // Silently fail if not supported
    }

    try {
      // @ts-ignore - EyeDropper API not yet in TypeScript lib
      const eyeDropper = new EyeDropper();
      const result = await eyeDropper.open();
      
      if (result.sRGBHex) {
        this.currentColor = this.parseColor(result.sRGBHex);
        this.input.value = result.sRGBHex;
        this.updateColorDisplay();
        this.options.onChange(result.sRGBHex);
      }
    } catch (error) {
      // User cancelled - do nothing
      if ((error as Error).name !== 'AbortError') {
        console.error('EyeDropper error:', error);
      }
    }
  }

  private setupEventListeners(): void {
    // Input click/keyboard to open (not in compact mode)
    if (!this.options.compact) {
      this.input.addEventListener("click", () => {
        if (!this.options.inline) {
          this.toggle();
        }
      });
      
      this.input.addEventListener("keydown", (e) => {
        if ((e.key === "Enter" || e.key === " ") && !this.options.inline) {
          e.preventDefault();
          this.toggle();
        }
      });
    }

    // Input change
    this.input.addEventListener("change", () => {
      this.currentColor = this.parseColor(this.input.value);
      this.updateColorDisplay();
    });

    // Hue slider
    if (this.hueSlider) {
      this.hueSlider.addEventListener("input", (e) => {
        this.currentColor.h = parseInt((e.target as HTMLInputElement).value);
        this.updateColorDisplay();
        this.announceColorChange();
      });
      this.hueSlider.addEventListener("touchstart", (e) => {
        this.handleSliderTouch(e, this.hueSlider!, 'h', 0, 360);
      });
    }

    // Saturation slider (sliderMode only)
    if (this.saturationSlider) {
      this.saturationSlider.addEventListener("input", (e) => {
        this.currentColor.s = parseInt((e.target as HTMLInputElement).value);
        this.updateColorDisplay();
        this.announceColorChange();
      });
      this.saturationSlider.addEventListener("touchstart", (e) => {
        this.handleSliderTouch(e, this.saturationSlider!, 's', 0, 100);
      });
    }

    // Lightness slider (sliderMode only)
    if (this.lightnessSlider) {
      this.lightnessSlider.addEventListener("input", (e) => {
        this.currentColor.l = parseInt((e.target as HTMLInputElement).value);
        this.updateColorDisplay();
        this.announceColorChange();
      });
      this.lightnessSlider.addEventListener("touchstart", (e) => {
        this.handleSliderTouch(e, this.lightnessSlider!, 'l', 0, 100);
      });
    }

    // Alpha slider
    if (this.alphaSlider) {
      this.alphaSlider.addEventListener("input", (e) => {
        this.currentColor.a =
          parseInt((e.target as HTMLInputElement).value) / 100;
        this.updateColorDisplay();
        this.announceColorChange();
      });
      this.alphaSlider.addEventListener("touchstart", (e) => {
        this.handleSliderTouch(e, this.alphaSlider!, 'a', 0, 100, true);
      });
    }

    // Saturation box
    if (this.colorBox) {
      this.colorBox.addEventListener("mousedown", (e) =>
        this.onSaturationMouseDown(e)
      );
      this.colorBox.addEventListener("touchstart", (e) =>
        this.onSaturationTouchStart(e)
      );
      this.colorBox.addEventListener("keydown", (e) =>
        this.onSaturationKeyDown(e)
      );
    }

    // Color value input (accepts all formats)
    if (this.hexInput) {
      this.hexInput.addEventListener("input", (e) => {
        const value = (e.target as HTMLInputElement).value.trim();
        if (this.isValidColor(value)) {
          this.currentColor = this.parseColor(value);
          this.updateColorDisplay(false);
        }
      });
    }

    // Preset colors - ensure they're in the DOM before binding
    const presets = this.container?.querySelectorAll(".colorpicker-preset");
    
    if (presets && presets.length > 0) {
      presets.forEach((preset, index) => {
        preset.addEventListener("click", (e) => {
          const color = (e.currentTarget as HTMLElement).dataset.color!;
          this.currentColor = this.parseColor(color);
          this.updateColorDisplay();
          if (this.options.closeOnSelect) {
            this.close();
          }
        });
        
        // Keyboard navigation for presets
        preset.addEventListener("keydown", ((e: KeyboardEvent) => {
          const key = e.key;
          let handled = false;
          let targetIndex = index;
          
          switch (key) {
            case "ArrowRight":
            case "ArrowDown":
              targetIndex = Math.min(presets.length - 1, index + 1);
              handled = true;
              break;
            case "ArrowLeft":
            case "ArrowUp":
              targetIndex = Math.max(0, index - 1);
              handled = true;
              break;
            case "Home":
              targetIndex = 0;
              handled = true;
              break;
            case "End":
              targetIndex = presets.length - 1;
              handled = true;
              break;
            case "Enter":
            case " ":
              const color = (e.currentTarget as HTMLElement).dataset.color!;
              this.currentColor = this.parseColor(color);
              this.updateColorDisplay();
              if (this.options.closeOnSelect) {
                this.close();
              }
              handled = true;
              break;
          }
          
          if (handled) {
            e.preventDefault();
            if (targetIndex !== index) {
              // Update tabindex for roving tabindex pattern
              presets.forEach((p, i) => {
                p.setAttribute("tabindex", i === targetIndex ? "0" : "-1");
              });
              // Focus target
              (presets[targetIndex] as HTMLElement).focus();
            }
          }
        }) as EventListener);
      });
    }

    // EyeDropper button
    const eyeDropperBtn = this.container?.querySelector(".colorpicker-eyedropper-btn");
    if (eyeDropperBtn) {
      eyeDropperBtn.addEventListener("click", async (e) => {
        e.preventDefault();
        e.stopPropagation();
        await this.openEyeDropper();
      });
    }

    // System Color Picker button (Safari fallback)
    const systemPickerBtn = this.container?.querySelector(".colorpicker-system-picker-btn");
    const systemPickerInput = this.container?.querySelector(".colorpicker-system-picker-input") as HTMLInputElement;
    if (systemPickerBtn && systemPickerInput) {
      // Set current color to system picker
      systemPickerInput.value = this.formatColor(this.currentColor).substring(0, 7); // HEX only
      
      systemPickerBtn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        systemPickerInput.click();
      });
      
      systemPickerInput.addEventListener("change", () => {
        const color = systemPickerInput.value;
        this.currentColor = this.parseColor(color);
        this.input.value = color;
        this.updateColorDisplay();
        this.options.onChange(color);
      });
    }

    // Close on outside click
    if (!this.options.inline) {
      document.addEventListener("mousedown", (e) => {
        if (
          this.isOpen &&
          !this.container?.contains(e.target as Node) &&
          e.target !== this.input
        ) {
          this.close();
        }
      });
    }

    // Escape key to close
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.isOpen && !this.options.inline) {
        this.close();
        this.input.focus();
      }
    });
  }

  private onSaturationMouseDown(e: MouseEvent): void {
    e.preventDefault();
    this.updateSaturationFromMouse(e);

    const onMouseMove = (e: MouseEvent) => {
      this.updateSaturationFromMouse(e);
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  }

  private onSaturationTouchStart(e: TouchEvent): void {
    e.preventDefault();
    const touch = e.touches[0];
    this.updateSaturationFromTouch(touch);

    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const touch = e.touches[0];
      this.updateSaturationFromTouch(touch);
    };

    const onTouchEnd = () => {
      document.removeEventListener("touchmove", onTouchMove);
      document.removeEventListener("touchend", onTouchEnd);
    };

    document.addEventListener("touchmove", onTouchMove, { passive: false });
    document.addEventListener("touchend", onTouchEnd);
  }

  private updateSaturationFromTouch(touch: Touch): void {
    if (!this.colorBox) return;

    const rect = this.colorBox.getBoundingClientRect();
    const x = Math.max(0, Math.min(touch.clientX - rect.left, rect.width));
    const y = Math.max(0, Math.min(touch.clientY - rect.top, rect.height));

    // Use HSV model for 2D color box
    const s = (x / rect.width) * 100;
    const v = 100 - (y / rect.height) * 100;
    const hsv: HSV = { h: this.currentColor.h, s, v, a: this.currentColor.a };
    this.currentColor = this.hsvToHsl(hsv);

    this.updateColorDisplay();
    this.announceColorChange();
  }

  private handleSliderTouch(
    e: TouchEvent, 
    slider: HTMLInputElement, 
    property: 'h' | 's' | 'l' | 'a',
    min: number,
    max: number,
    isAlpha: boolean = false
  ): void {
    const updateFromTouch = (touch: Touch) => {
      const rect = slider.getBoundingClientRect();
      const x = Math.max(0, Math.min(touch.clientX - rect.left, rect.width));
      const ratio = x / rect.width;
      const value = min + ratio * (max - min);
      
      if (isAlpha) {
        this.currentColor[property] = value / 100;
      } else {
        this.currentColor[property] = Math.round(value);
      }
      
      slider.value = String(Math.round(value));
      this.updateColorDisplay();
      this.announceColorChange();
    };

    const touch = e.touches[0];
    updateFromTouch(touch);

    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const touch = e.touches[0];
      updateFromTouch(touch);
    };

    const onTouchEnd = () => {
      document.removeEventListener("touchmove", onTouchMove);
      document.removeEventListener("touchend", onTouchEnd);
    };

    document.addEventListener("touchmove", onTouchMove, { passive: false });
    document.addEventListener("touchend", onTouchEnd);
  }

  private updateSaturationFromMouse(e: MouseEvent): void {
    if (!this.colorBox) return;

    const rect = this.colorBox.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const y = Math.max(0, Math.min(e.clientY - rect.top, rect.height));

    // Use HSV model for 2D color box
    const s = (x / rect.width) * 100;
    const v = 100 - (y / rect.height) * 100;
    const hsv: HSV = { h: this.currentColor.h, s, v, a: this.currentColor.a };
    this.currentColor = this.hsvToHsl(hsv);

    this.updateColorDisplay();
    this.announceColorChange();
  }

  private onSaturationKeyDown(e: KeyboardEvent): void {
    const step = e.shiftKey ? 10 : 1;
    let handled = false;

    // Use HSV model for keyboard navigation in 2D color box
    const hsv = this.hslToHsv(this.currentColor);

    switch (e.key) {
      case "ArrowRight":
        hsv.s = Math.min(100, hsv.s + step);
        handled = true;
        break;
      case "ArrowLeft":
        hsv.s = Math.max(0, hsv.s - step);
        handled = true;
        break;
      case "ArrowUp":
        hsv.v = Math.min(100, hsv.v + step);
        handled = true;
        break;
      case "ArrowDown":
        hsv.v = Math.max(0, hsv.v - step);
        handled = true;
        break;
    }

    if (handled) {
      e.preventDefault();
      this.currentColor = this.hsvToHsl(hsv);
      this.updateColorDisplay();
      this.announceColorChange();
    }
  }

  private updateColorDisplay(updateInput = true): void {
    // Update saturation box background
    if (this.colorBox) {
      this.colorBox.style.backgroundColor = `hsl(${this.currentColor.h}, 100%, 50%)`;
    }

    // Update saturation pointer position (using HSV model)
    if (this.saturationPointer && this.colorBox) {
      const hsv = this.hslToHsv(this.currentColor);
      const x = hsv.s;
      const y = 100 - hsv.v;
      this.saturationPointer.style.left = `${x}%`;
      this.saturationPointer.style.top = `${y}%`;
    }

    // Update slider backgrounds (sliderMode)
    if (this.saturationSlider) {
      this.saturationSlider.style.background = `linear-gradient(to right, hsl(${this.currentColor.h}, 0%, 50%), hsl(${this.currentColor.h}, 100%, 50%))`;
    }
    if (this.lightnessSlider) {
      this.lightnessSlider.style.background = `linear-gradient(to right, hsl(${this.currentColor.h}, ${this.currentColor.s}%, 0%), hsl(${this.currentColor.h}, ${this.currentColor.s}%, 50%), hsl(${this.currentColor.h}, ${this.currentColor.s}%, 100%))`;
    }

    // Update preview
    const preview = this.container?.querySelector(
      ".colorpicker-preview-color"
    ) as HTMLElement;
    if (preview) {
      preview.style.backgroundColor = this.toHSLString(this.currentColor);
    }

    // Update color value input (shows current format)
    if (this.hexInput && updateInput) {
      this.hexInput.value = this.formatColor(this.currentColor);
    }

    // Update sliders
    if (this.hueSlider) {
      this.hueSlider.value = String(this.currentColor.h);
    }
    if (this.saturationSlider) {
      this.saturationSlider.value = String(this.currentColor.s);
    }
    if (this.lightnessSlider) {
      this.lightnessSlider.value = String(this.currentColor.l);
    }
    if (this.alphaSlider) {
      this.alphaSlider.value = String(this.currentColor.a * 100);
    }

    // Update input field
    if (updateInput) {
      this.input.value = this.formatColor(this.currentColor);
      this.options.onChange(this.input.value);
      
      // Update preview target if configured
      if (this.options.previewTarget) {
        const target = document.querySelector(this.options.previewTarget) as HTMLElement;
        if (target) {
          const property = this.options.previewProperty || 'background-color';
          target.style.setProperty(property, this.input.value);
        }
      }
      
      // Update compact button preview
      if (this.compactButton) {
        const preview = this.compactButton.querySelector('.colorpicker-compact-preview') as HTMLElement;
        if (preview) {
          preview.style.backgroundColor = this.toHSLString(this.currentColor);
        }
      }
      
      // Update input preview
      if (this.inputPreview) {
        this.inputPreview.style.backgroundColor = this.toHSLString(this.currentColor);
      }
    }
  }

  private formatColor(color: HSL): string {
    switch (this.options.format) {
      case "hsl":
        return this.toHSLString(color);
      case "rgb":
        return this.toRGBString(this.hslToRgb(color));
      case "hex":
      default:
        return this.toHex(color);
    }
  }

  private getPlaceholder(): string {
    switch (this.options.format) {
      case "hsl":
        return this.options.showAlpha ? "hsla(0, 0%, 0%, 1)" : "hsl(0, 0%, 0%)";
      case "rgb":
        return this.options.showAlpha ? "rgba(0, 0, 0, 1)" : "rgb(0, 0, 0)";
      case "hex":
      default:
        return "#000000";
    }
  }

  private parseColor(colorString: string): HSL {
    colorString = colorString.trim();

    // Try hex
    if (colorString.startsWith("#")) {
      return this.hexToHsl(colorString);
    }

    // Try rgb/rgba
    const rgbMatch = colorString.match(
      /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/
    );
    if (rgbMatch) {
      const rgb: RGB = {
        r: parseInt(rgbMatch[1]),
        g: parseInt(rgbMatch[2]),
        b: parseInt(rgbMatch[3]),
        a: rgbMatch[4] ? parseFloat(rgbMatch[4]) : 1,
      };
      return this.rgbToHsl(rgb);
    }

    // Try hsl/hsla
    const hslMatch = colorString.match(
      /hsla?\((\d+),\s*(\d+)%,\s*(\d+)%(?:,\s*([\d.]+))?\)/
    );
    if (hslMatch) {
      return {
        h: parseInt(hslMatch[1]),
        s: parseInt(hslMatch[2]),
        l: parseInt(hslMatch[3]),
        a: hslMatch[4] ? parseFloat(hslMatch[4]) : 1,
      };
    }

    // Default to current color
    return this.currentColor;
  }

  private hexToHsl(hex: string): HSL {
    hex = hex.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16) / 255;
    const g = parseInt(hex.substring(2, 4), 16) / 255;
    const b = parseInt(hex.substring(4, 6), 16) / 255;
    const a = hex.length === 8 ? parseInt(hex.substring(6, 8), 16) / 255 : 1;

    return this.rgbToHsl({ r: r * 255, g: g * 255, b: b * 255, a });
  }

  private rgbToHsl(rgb: RGB): HSL {
    const r = rgb.r / 255;
    const g = rgb.g / 255;
    const b = rgb.b / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r:
          h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
          break;
        case g:
          h = ((b - r) / d + 2) / 6;
          break;
        case b:
          h = ((r - g) / d + 4) / 6;
          break;
      }
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
      a: rgb.a,
    };
  }

  private hslToRgb(hsl: HSL): RGB {
    const h = hsl.h / 360;
    const s = hsl.s / 100;
    const l = hsl.l / 100;

    let r, g, b;

    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };

      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;

      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }

    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255),
      a: hsl.a,
    };
  }

  private hsvToHsl(hsv: HSV): HSL {
    const h = hsv.h;
    const s = hsv.s / 100;
    const v = hsv.v / 100;
    const a = hsv.a;

    const l = v * (1 - s / 2);
    const sl = l === 0 || l === 1 ? 0 : (v - l) / Math.min(l, 1 - l);

    return {
      h: h,
      s: sl * 100,
      l: l * 100,
      a: a,
    };
  }

  private hslToHsv(hsl: HSL): HSV {
    const h = hsl.h;
    const s = hsl.s / 100;
    const l = hsl.l / 100;
    const a = hsl.a;

    const v = l + s * Math.min(l, 1 - l);
    const sv = v === 0 ? 0 : 2 * (1 - l / v);

    return {
      h: h,
      s: sv * 100,
      v: v * 100,
      a: a,
    };
  }

  private toHex(hsl: HSL): string {
    const rgb = this.hslToRgb(hsl);
    const toHex = (n: number) => n.toString(16).padStart(2, "0");
    
    // Include alpha channel if showAlpha is enabled and alpha < 1
    if (this.options.showAlpha && hsl.a < 1) {
      const alpha = Math.round(hsl.a * 255);
      return `#${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}${toHex(alpha)}`;
    }
    
    return `#${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}`;
  }

  private toHSLString(hsl: HSL): string {
    if (this.options.showAlpha && hsl.a < 1) {
      return `hsla(${hsl.h}, ${hsl.s}%, ${hsl.l}%, ${hsl.a})`;
    }
    return `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
  }

  private toRGBString(rgb: RGB): string {
    if (this.options.showAlpha && rgb.a < 1) {
      return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a})`;
    }
    return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
  }

  private isValidHex(hex: string): boolean {
    return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{8})$/.test(hex);
  }

  private isValidColor(value: string): boolean {
    // Check if valid HEX
    if (this.isValidHex(value)) return true;
    
    // Check if valid RGB/RGBA
    if (/^rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*(,\s*[\d.]+\s*)?\)$/.test(value)) return true;
    
    // Check if valid HSL/HSLA
    if (/^hsla?\(\s*\d+\s*,\s*\d+%\s*,\s*\d+%\s*(,\s*[\d.]+\s*)?\)$/.test(value)) return true;
    
    return false;
  }

  private announceColorChange(): void {
    // Throttled ARIA live region announcement
    if (!this.announceTimeout) {
      this.announceTimeout = setTimeout(() => {
        const announcement = document.createElement("div");
        announcement.setAttribute("role", "status");
        announcement.setAttribute("aria-live", "polite");
        announcement.className = "colorpicker-sr-only";
        announcement.textContent = `Color changed to ${this.formatColor(
          this.currentColor
        )}`;
        this.container?.appendChild(announcement);
        setTimeout(() => announcement.remove(), 1000);
        this.announceTimeout = null;
      }, 500);
    }
  }
  private announceTimeout: ReturnType<typeof setTimeout> | null = null;

  public open(): void {
    if (this.isOpen || !this.container) return;

    this.isOpen = true;
    this.container.style.display = "block";

    if (!this.options.inline) {
      this.positionPicker();
    }

    this.options.onOpen();

    // Auto-focus only for popup mode, not inline
    if (!this.options.inline) {
      setTimeout(() => {
        let focusTarget: HTMLElement | null = null;
        
        if (this.options.presetsOnly) {
          // In presets-only mode, focus first preset
          focusTarget = this.container?.querySelector('.colorpicker-preset') as HTMLElement;
        } else if (this.options.sliderMode) {
          // In slider mode, focus first slider (hue)
          focusTarget = this.hueSlider;
        } else {
          // In standard mode, focus saturation box
          focusTarget = this.colorBox;
        }
        
        if (focusTarget) {
          focusTarget.focus();
        }
      }, 0);
    }
  }

  public close(): void {
    if (!this.isOpen || !this.container) return;

    this.isOpen = false;
    if (!this.options.inline) {
      this.container.style.display = "none";
    }

    this.options.onClose();
  }

  public toggle(): void {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  private positionPicker(): void {
    if (!this.container) return;

    const inputRect = this.input.getBoundingClientRect();
    const containerRect = this.container.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    let top = inputRect.bottom + window.scrollY + 4;
    const left = inputRect.left + window.scrollX;

    // Check if there's enough space below
    if (this.options.position === "auto") {
      const spaceBelow = viewportHeight - inputRect.bottom;
      const spaceAbove = inputRect.top;

      if (spaceBelow < containerRect.height && spaceAbove > spaceBelow) {
        top = inputRect.top + window.scrollY - containerRect.height - 4;
      }
    } else if (this.options.position === "above") {
      top = inputRect.top + window.scrollY - containerRect.height - 4;
    }

    this.container.style.position = "absolute";
    this.container.style.top = `${top}px`;
    this.container.style.left = `${left}px`;
    this.container.style.zIndex = "9999";
  }

  public setColor(color: string): void {
    this.currentColor = this.parseColor(color);
    this.updateColorDisplay();
  }

  public getColor(): string {
    return this.formatColor(this.currentColor);
  }

  public destroy(): void {
    this.container?.remove();
    this.compactButton?.remove();
    
    // Restore input if it was hidden for compact mode
    if (this.options.compact && this.input) {
      this.input.style.position = "";
      this.input.style.opacity = "";
      this.input.style.pointerEvents = "";
      this.input.style.width = "";
      this.input.style.height = "";
    }
    
    // Restore input if it had preview
    if (this.options.inputPreview && this.input) {
      this.input.classList.remove("colorpicker-has-preview");
      const wrapper = this.input.parentElement;
      if (wrapper && wrapper.classList.contains("colorpicker-input-group")) {
        wrapper.parentNode?.insertBefore(this.input, wrapper);
        wrapper.remove();
      }
    }
    
    ColorPicker.instances.delete(this.input);
  }

  public static getInstance(element: HTMLElement): ColorPicker | undefined {
    return ColorPicker.instances.get(element);
  }
}

// Factory function
export default function colorpicker(
  selector: string | HTMLInputElement,
  options?: ColorPickerOptions
): ColorPicker {
  return new ColorPicker(selector, options);
}

// Auto-initialization helper
export function initColorPickers(root: Document | HTMLElement = document): ColorPicker[] {
  const pickers: ColorPicker[] = [];
  const elements = root.querySelectorAll<HTMLInputElement>(
    '[data-colorpicker], .colorpicker, input[type="color"][data-format]'
  );

  elements.forEach((element) => {
    // Skip if already initialized
    if (ColorPicker.getInstance(element)) {
      return;
    }

    const dataset = element.dataset;
    const options: ColorPickerOptions = {};

    // Parse data-colorpicker attribute
    if (dataset.colorpicker) {
      const config = dataset.colorpicker;
      const parts = config.split(/[,;]/);
      
      parts.forEach((part) => {
        const [key, value] = part.split(':').map(s => s.trim());
        
        switch (key) {
          case 'format':
            if (value === 'hex' || value === 'rgb' || value === 'hsl') {
              options.format = value;
            }
            break;
          case 'alpha':
          case 'showAlpha':
            options.showAlpha = value === 'true' || value === '1';
            break;
          case 'compact':
            options.compact = value === 'true' || value === '1';
            break;
          case 'inline':
            options.inline = value === 'true' || value === '1';
            break;
          case 'presets':
            options.presetsOnly = value === 'true' || value === '1';
            break;
          case 'list':
            options.listView = value === 'true' || value === '1';
            break;
          case 'sliderMode':
            options.sliderMode = value === 'true' || value === '1';
            break;
          case 'eyeDropper':
            options.eyeDropper = value === 'true' || value === '1';
            break;
          case 'inputPreview':
            options.inputPreview = value === 'true' || value === '1';
            break;
          case 'target':
          case 'previewTarget':
            options.previewTarget = value;
            break;
          case 'property':
          case 'previewProperty':
            options.previewProperty = value;
            break;
          case 'lang':
          case 'language':
            options.language = value;
            break;
        }
      });
    }

    // Parse individual data attributes
    if (dataset.format && (dataset.format === 'hex' || dataset.format === 'rgb' || dataset.format === 'hsl')) {
      options.format = dataset.format as "hex" | "rgb" | "hsl";
    }
    if (dataset.alpha !== undefined) {
      options.showAlpha = dataset.alpha === 'true' || dataset.alpha === '1';
    }
    if (dataset.compact !== undefined) {
      options.compact = dataset.compact === 'true' || dataset.compact === '1';
    }
    if (dataset.inline !== undefined) {
      options.inline = dataset.inline === 'true' || dataset.inline === '1';
    }
    if (dataset.presetsOnly !== undefined) {
      options.presetsOnly = dataset.presetsOnly === 'true' || dataset.presetsOnly === '1';
    }
    if (dataset.listView !== undefined) {
      options.listView = dataset.listView === 'true' || dataset.listView === '1';
    }
    if (dataset.defaultColor) {
      options.defaultColor = dataset.defaultColor;
    }

    // Create picker instance
    const picker = new ColorPicker(element, options);
    pickers.push(picker);
  });

  return pickers;
}

// Export language modules for external use
export * as languages from './l10n';

// Auto-init on DOMContentLoaded
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initColorPickers());
  } else {
    // DOM already loaded
    initColorPickers();
  }
}
