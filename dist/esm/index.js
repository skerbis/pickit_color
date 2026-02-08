var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import * as languages from './l10n';
var translations = {
    en: languages.en,
    de: languages.de,
    si: languages.si
};
function detectLanguage() {
    var htmlLang = document.documentElement.lang;
    if (htmlLang) {
        var lang = htmlLang.split('-')[0].toLowerCase();
        if (translations[lang])
            return lang;
    }
    var browserLang = navigator.language.split('-')[0].toLowerCase();
    if (translations[browserLang])
        return browserLang;
    return 'en';
}
var ColorPicker = (function () {
    function ColorPicker(element, options) {
        if (options === void 0) { options = {}; }
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
        this.container = null;
        this.colorBox = null;
        this.hueSlider = null;
        this.saturationSlider = null;
        this.lightnessSlider = null;
        this.alphaSlider = null;
        this.hexInput = null;
        this.currentColor = { h: 0, s: 100, l: 50, a: 1 };
        this.isOpen = false;
        this.saturationPointer = null;
        this.compactButton = null;
        this.inputPreview = null;
        this.announceTimeout = null;
        this.input =
            typeof element === "string"
                ? document.querySelector(element)
                : element;
        if (!this.input) {
            throw new Error("ColorPicker: Invalid element selector");
        }
        var dataPresets = this.input.getAttribute("data-preset-colors");
        var presetsFromAttr = dataPresets ? dataPresets.split(",").map(function (c) { return c.trim(); }) : null;
        this.options = {
            defaultColor: options.defaultColor || "#3b82f6",
            format: options.format || "hex",
            showAlpha: (_a = options.showAlpha) !== null && _a !== void 0 ? _a : false,
            sliderMode: (_b = options.sliderMode) !== null && _b !== void 0 ? _b : false,
            eyeDropper: (_c = options.eyeDropper) !== null && _c !== void 0 ? _c : false,
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
            presetsOnly: (_d = options.presetsOnly) !== null && _d !== void 0 ? _d : false,
            listView: (_e = options.listView) !== null && _e !== void 0 ? _e : false,
            inline: (_f = options.inline) !== null && _f !== void 0 ? _f : false,
            compact: (_g = options.compact) !== null && _g !== void 0 ? _g : false,
            inputPreview: (_h = options.inputPreview) !== null && _h !== void 0 ? _h : false,
            previewTarget: options.previewTarget || "",
            previewProperty: options.previewProperty || "background-color",
            language: options.language || detectLanguage(),
            onChange: options.onChange || (function () { }),
            onOpen: options.onOpen || (function () { }),
            onClose: options.onClose || (function () { }),
            appendTo: options.appendTo || document.body,
            position: options.position || "auto",
            closeOnSelect: (_j = options.closeOnSelect) !== null && _j !== void 0 ? _j : true,
            ariaLabels: {
                hue: ((_k = options.ariaLabels) === null || _k === void 0 ? void 0 : _k.hue) || translations[options.language || detectLanguage()].hue,
                saturation: ((_l = options.ariaLabels) === null || _l === void 0 ? void 0 : _l.saturation) || translations[options.language || detectLanguage()].saturation,
                lightness: ((_m = options.ariaLabels) === null || _m === void 0 ? void 0 : _m.lightness) || translations[options.language || detectLanguage()].lightness,
                alpha: ((_o = options.ariaLabels) === null || _o === void 0 ? void 0 : _o.alpha) || translations[options.language || detectLanguage()].alpha,
                presets: ((_p = options.ariaLabels) === null || _p === void 0 ? void 0 : _p.presets) || translations[options.language || detectLanguage()].presets,
            },
        };
        this.init();
        ColorPicker.instances.set(this.input, this);
    }
    ColorPicker.addTranslation = function (langCode, translation) {
        translations[langCode.toLowerCase()] = translation;
    };
    ColorPicker.getAvailableLanguages = function () {
        return Object.keys(translations);
    };
    ColorPicker.prototype.init = function () {
        var initialColor = this.input.value || this.options.defaultColor;
        this.currentColor = this.parseColor(initialColor);
        if (this.options.compact) {
            this.createCompactButton();
        }
        if (this.options.inputPreview && !this.options.compact) {
            this.createInputPreview();
        }
        this.buildColorPicker();
        this.setupEventListeners();
        this.updateColorDisplay();
        if (this.options.inline && this.container) {
            this.isOpen = true;
            this.container.style.display = "block";
            this.options.onOpen();
        }
    };
    ColorPicker.prototype.buildColorPicker = function () {
        var _this = this;
        var _a;
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
        var content = "\n      <div class=\"colorpicker-content\">\n        ".concat(!this.options.presetsOnly ? "\n        ".concat(!this.options.sliderMode ? "\n        <div class=\"colorpicker-saturation\" \n             role=\"slider\" \n             aria-label=\"".concat(this.options.ariaLabels.saturation, "\"\n             aria-valuemin=\"0\"\n             aria-valuemax=\"100\"\n             aria-valuenow=\"").concat(this.currentColor.s, "\"\n             tabindex=\"0\">\n          <div class=\"colorpicker-saturation-overlay\"></div>\n          <div class=\"colorpicker-saturation-pointer\" role=\"presentation\"></div>\n        </div>\n        ") : '', "\n        \n        <div class=\"colorpicker-controls\">\n          <div class=\"colorpicker-sliders").concat(this.options.sliderMode ? ' colorpicker-sliders-only' : '', "\">\n            <div class=\"colorpicker-slider-group\">\n              <label for=\"colorpicker-hue\">\n                <span class=\"colorpicker-label\">").concat(this.options.ariaLabels.hue, "</span>\n              </label>\n              <input \n                type=\"range\" \n                id=\"colorpicker-hue\"\n                class=\"colorpicker-slider colorpicker-hue-slider\"\n                min=\"0\" \n                max=\"360\" \n                value=\"").concat(this.currentColor.h, "\"\n                aria-label=\"").concat(this.options.ariaLabels.hue, "\"\n                tabindex=\"0\"\n              />\n            </div>\n            ").concat(this.options.sliderMode
            ? "\n            <div class=\"colorpicker-slider-group\">\n              <label for=\"colorpicker-saturation\">\n                <span class=\"colorpicker-label\">".concat(this.options.ariaLabels.saturation, "</span>\n              </label>\n              <input \n                type=\"range\" \n                id=\"colorpicker-saturation\"\n                class=\"colorpicker-slider colorpicker-saturation-slider\"\n                min=\"0\" \n                max=\"100\" \n                value=\"").concat(this.currentColor.s, "\"\n                aria-label=\"").concat(this.options.ariaLabels.saturation, "\"\n                tabindex=\"0\"\n              />\n            </div>\n            <div class=\"colorpicker-slider-group\">\n              <label for=\"colorpicker-lightness\">\n                <span class=\"colorpicker-label\">").concat(this.options.ariaLabels.lightness, "</span>\n              </label>\n              <input \n                type=\"range\" \n                id=\"colorpicker-lightness\"\n                class=\"colorpicker-slider colorpicker-lightness-slider\"\n                min=\"0\" \n                max=\"100\" \n                value=\"").concat(this.currentColor.l, "\"\n                aria-label=\"").concat(this.options.ariaLabels.lightness, "\"\n                tabindex=\"0\"\n              />\n            </div>\n            ")
            : "", "\n            ").concat(this.options.showAlpha
            ? "\n              <div class=\"colorpicker-slider-group\">\n                <label for=\"colorpicker-alpha\">\n                  <span class=\"colorpicker-label\">".concat(this.options.ariaLabels.alpha, "</span>\n                </label>\n                <input \n                  type=\"range\" \n                  id=\"colorpicker-alpha\"\n                  class=\"colorpicker-slider colorpicker-alpha-slider\"\n                  min=\"0\" \n                  max=\"100\" \n                  value=\"").concat(this.currentColor.a * 100, "\"\n                  aria-label=\"").concat(this.options.ariaLabels.alpha, "\"\n                  tabindex=\"0\"\n                />\n              </div>\n            ")
            : "", "\n          </div>\n          \n          <div class=\"colorpicker-preview\">\n            <div class=\"colorpicker-preview-color\" role=\"presentation\"></div>\n          </div>\n        </div>\n        \n        <div class=\"colorpicker-input-wrapper\">\n          <label for=\"colorpicker-hex\">\n            <span class=\"colorpicker-sr-only\">Color value</span>\n          </label>\n          <div class=\"colorpicker-input-row\">\n            <input \n              type=\"text\" \n              id=\"colorpicker-hex\"\n              class=\"colorpicker-input\"\n              placeholder=\"").concat(this.getPlaceholder(), "\"\n              aria-label=\"Color value in ").concat(this.options.format, " format\"\n            />\n            ").concat(this.options.eyeDropper
            ? "\n            ".concat(this.supportsEyeDropper() ? "\n            <button \n              type=\"button\"\n              class=\"colorpicker-eyedropper-btn\"\n              aria-label=\"Pick color from screen\"\n              title=\"Pick color from screen\"\n            >\n              <svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\n                <path d=\"M2 22l1-1\"/>\n                <path d=\"M8.5 16.5l-1-1\"/>\n                <path d=\"M17 3l4 4\"/>\n                <path d=\"M12 8l4 4\"/>\n                <path d=\"M3 21l9-9\"/>\n                <path d=\"M14.5 9.5l-1 1\"/>\n                <path d=\"M20 14l-8 8\"/>\n              </svg>\n            </button>\n            " : "\n            <button \n              type=\"button\"\n              class=\"colorpicker-system-picker-btn\"\n              aria-label=\"Open system color picker\"\n              title=\"Open system color picker\"\n            >\n              <svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\n                <circle cx=\"12\" cy=\"12\" r=\"10\"/>\n                <path d=\"M12 2v20\"/>\n                <path d=\"M2 12h20\"/>\n                <circle cx=\"12\" cy=\"12\" r=\"3\"/>\n              </svg>\n            </button>\n            <input \n              type=\"color\"\n              class=\"colorpicker-system-picker-input\"\n              style=\"position: absolute; opacity: 0; pointer-events: none; width: 0; height: 0;\"\n            />\n            ", "\n            ")
            : "", "\n          </div>\n        </div>\n        ") : '', "\n        \n        ").concat(this.options.presetColors.length > 0
            ? "\n          <div class=\"colorpicker-presets".concat(this.options.listView ? ' colorpicker-presets-list' : '', "\" role=\"group\" aria-label=\"").concat(this.options.ariaLabels.presets, "\">\n            ").concat(this.options.presetColors
                .map(function (color, index) {
                var label = _this.options.presetLabels[index] || '';
                return _this.options.listView && label
                    ? "\n              <button \n                type=\"button\"\n                class=\"colorpicker-preset colorpicker-preset-list-item\" \n                data-color=\"".concat(color, "\"\n                aria-label=\"Select color ").concat(label, "\"\n                tabindex=\"").concat(index === 0 ? '0' : '-1', "\"\n              >\n                <span class=\"colorpicker-preset-color\" style=\"background-color: ").concat(color, "\"></span>\n                <span class=\"colorpicker-preset-label\">").concat(label, "</span>\n              </button>\n            ")
                    : "\n              <button \n                type=\"button\"\n                class=\"colorpicker-preset\" \n                style=\"background-color: ".concat(color, "\"\n                data-color=\"").concat(color, "\"\n                aria-label=\"Select color ").concat(label || color, "\"\n                tabindex=\"").concat(index === 0 ? '0' : '-1', "\"\n              ></button>\n            ");
            })
                .join(""), "\n          </div>\n        ")
            : "", "\n      </div>\n    ");
        this.container.innerHTML = content;
        this.colorBox = this.container.querySelector(".colorpicker-saturation");
        this.saturationPointer = this.container.querySelector(".colorpicker-saturation-pointer");
        this.hueSlider = this.container.querySelector(".colorpicker-hue-slider");
        this.saturationSlider = this.container.querySelector(".colorpicker-saturation-slider");
        this.lightnessSlider = this.container.querySelector(".colorpicker-lightness-slider");
        this.alphaSlider = this.container.querySelector(".colorpicker-alpha-slider");
        this.hexInput = this.container.querySelector(".colorpicker-input");
        if (this.options.inline) {
            (_a = this.input.parentNode) === null || _a === void 0 ? void 0 : _a.insertBefore(this.container, this.input.nextSibling);
            this.input.style.display = "none";
        }
        else {
            this.options.appendTo.appendChild(this.container);
        }
    };
    ColorPicker.prototype.createCompactButton = function () {
        var _this = this;
        var _a;
        this.input.style.position = "absolute";
        this.input.style.opacity = "0";
        this.input.style.pointerEvents = "none";
        this.input.style.width = "0";
        this.input.style.height = "0";
        this.compactButton = document.createElement("button");
        this.compactButton.type = "button";
        this.compactButton.className = "colorpicker-compact-button";
        this.compactButton.setAttribute("aria-label", "Select color");
        this.compactButton.tabIndex = 0;
        var preview = document.createElement("span");
        preview.className = "colorpicker-compact-preview";
        preview.style.backgroundColor = this.input.value || this.options.defaultColor;
        this.compactButton.appendChild(preview);
        (_a = this.input.parentNode) === null || _a === void 0 ? void 0 : _a.insertBefore(this.compactButton, this.input.nextSibling);
        this.compactButton.addEventListener("click", function (e) {
            e.preventDefault();
            e.stopPropagation();
            _this.toggle();
        });
        this.compactButton.addEventListener("keydown", function (e) {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                e.stopPropagation();
                _this.toggle();
            }
        });
    };
    ColorPicker.prototype.createInputPreview = function () {
        var _a;
        var wrapper = document.createElement("div");
        wrapper.className = "colorpicker-input-group";
        this.inputPreview = document.createElement("span");
        this.inputPreview.className = "colorpicker-input-preview";
        this.inputPreview.style.backgroundColor = this.input.value || this.options.defaultColor;
        (_a = this.input.parentNode) === null || _a === void 0 ? void 0 : _a.insertBefore(wrapper, this.input);
        wrapper.appendChild(this.inputPreview);
        wrapper.appendChild(this.input);
        this.input.classList.add("colorpicker-has-preview");
    };
    ColorPicker.prototype.supportsEyeDropper = function () {
        return typeof window !== 'undefined' && 'EyeDropper' in window;
    };
    ColorPicker.prototype.openEyeDropper = function () {
        return __awaiter(this, void 0, void 0, function () {
            var eyeDropper, result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.supportsEyeDropper()) {
                            return [2];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        eyeDropper = new EyeDropper();
                        return [4, eyeDropper.open()];
                    case 2:
                        result = _a.sent();
                        if (result.sRGBHex) {
                            this.currentColor = this.parseColor(result.sRGBHex);
                            this.input.value = result.sRGBHex;
                            this.updateColorDisplay();
                            this.options.onChange(result.sRGBHex);
                        }
                        return [3, 4];
                    case 3:
                        error_1 = _a.sent();
                        if (error_1.name !== 'AbortError') {
                            console.error('EyeDropper error:', error_1);
                        }
                        return [3, 4];
                    case 4: return [2];
                }
            });
        });
    };
    ColorPicker.prototype.setupEventListeners = function () {
        var _this = this;
        var _a, _b, _c, _d;
        if (!this.options.compact) {
            this.input.addEventListener("click", function () {
                if (!_this.options.inline) {
                    _this.toggle();
                }
            });
            this.input.addEventListener("keydown", function (e) {
                if ((e.key === "Enter" || e.key === " ") && !_this.options.inline) {
                    e.preventDefault();
                    _this.toggle();
                }
            });
        }
        this.input.addEventListener("change", function () {
            _this.currentColor = _this.parseColor(_this.input.value);
            _this.updateColorDisplay();
        });
        if (this.hueSlider) {
            this.hueSlider.addEventListener("input", function (e) {
                _this.currentColor.h = parseInt(e.target.value);
                _this.updateColorDisplay();
                _this.announceColorChange();
            });
            this.hueSlider.addEventListener("touchstart", function (e) {
                _this.handleSliderTouch(e, _this.hueSlider, 'h', 0, 360);
            });
        }
        if (this.saturationSlider) {
            this.saturationSlider.addEventListener("input", function (e) {
                _this.currentColor.s = parseInt(e.target.value);
                _this.updateColorDisplay();
                _this.announceColorChange();
            });
            this.saturationSlider.addEventListener("touchstart", function (e) {
                _this.handleSliderTouch(e, _this.saturationSlider, 's', 0, 100);
            });
        }
        if (this.lightnessSlider) {
            this.lightnessSlider.addEventListener("input", function (e) {
                _this.currentColor.l = parseInt(e.target.value);
                _this.updateColorDisplay();
                _this.announceColorChange();
            });
            this.lightnessSlider.addEventListener("touchstart", function (e) {
                _this.handleSliderTouch(e, _this.lightnessSlider, 'l', 0, 100);
            });
        }
        if (this.alphaSlider) {
            this.alphaSlider.addEventListener("input", function (e) {
                _this.currentColor.a =
                    parseInt(e.target.value) / 100;
                _this.updateColorDisplay();
                _this.announceColorChange();
            });
            this.alphaSlider.addEventListener("touchstart", function (e) {
                _this.handleSliderTouch(e, _this.alphaSlider, 'a', 0, 100, true);
            });
        }
        if (this.colorBox) {
            this.colorBox.addEventListener("mousedown", function (e) {
                return _this.onSaturationMouseDown(e);
            });
            this.colorBox.addEventListener("touchstart", function (e) {
                return _this.onSaturationTouchStart(e);
            });
            this.colorBox.addEventListener("keydown", function (e) {
                return _this.onSaturationKeyDown(e);
            });
        }
        if (this.hexInput) {
            this.hexInput.addEventListener("input", function (e) {
                var value = e.target.value.trim();
                if (_this.isValidColor(value)) {
                    _this.currentColor = _this.parseColor(value);
                    _this.updateColorDisplay(false);
                }
            });
        }
        var presets = (_a = this.container) === null || _a === void 0 ? void 0 : _a.querySelectorAll(".colorpicker-preset");
        if (presets && presets.length > 0) {
            presets.forEach(function (preset, index) {
                preset.addEventListener("click", function (e) {
                    var color = e.currentTarget.dataset.color;
                    _this.currentColor = _this.parseColor(color);
                    _this.updateColorDisplay();
                    if (_this.options.closeOnSelect) {
                        _this.close();
                    }
                });
                preset.addEventListener("keydown", (function (e) {
                    var key = e.key;
                    var handled = false;
                    var targetIndex = index;
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
                            var color = e.currentTarget.dataset.color;
                            _this.currentColor = _this.parseColor(color);
                            _this.updateColorDisplay();
                            if (_this.options.closeOnSelect) {
                                _this.close();
                            }
                            handled = true;
                            break;
                    }
                    if (handled) {
                        e.preventDefault();
                        if (targetIndex !== index) {
                            presets.forEach(function (p, i) {
                                p.setAttribute("tabindex", i === targetIndex ? "0" : "-1");
                            });
                            presets[targetIndex].focus();
                        }
                    }
                }));
            });
        }
        var eyeDropperBtn = (_b = this.container) === null || _b === void 0 ? void 0 : _b.querySelector(".colorpicker-eyedropper-btn");
        if (eyeDropperBtn) {
            eyeDropperBtn.addEventListener("click", function (e) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            e.preventDefault();
                            e.stopPropagation();
                            return [4, this.openEyeDropper()];
                        case 1:
                            _a.sent();
                            return [2];
                    }
                });
            }); });
        }
        var systemPickerBtn = (_c = this.container) === null || _c === void 0 ? void 0 : _c.querySelector(".colorpicker-system-picker-btn");
        var systemPickerInput = (_d = this.container) === null || _d === void 0 ? void 0 : _d.querySelector(".colorpicker-system-picker-input");
        if (systemPickerBtn && systemPickerInput) {
            systemPickerInput.value = this.formatColor(this.currentColor).substring(0, 7);
            systemPickerBtn.addEventListener("click", function (e) {
                e.preventDefault();
                e.stopPropagation();
                systemPickerInput.click();
            });
            systemPickerInput.addEventListener("change", function () {
                var color = systemPickerInput.value;
                _this.currentColor = _this.parseColor(color);
                _this.input.value = color;
                _this.updateColorDisplay();
                _this.options.onChange(color);
            });
        }
        if (!this.options.inline) {
            document.addEventListener("mousedown", function (e) {
                var _a;
                if (_this.isOpen &&
                    !((_a = _this.container) === null || _a === void 0 ? void 0 : _a.contains(e.target)) &&
                    e.target !== _this.input) {
                    _this.close();
                }
            });
        }
        document.addEventListener("keydown", function (e) {
            if (e.key === "Escape" && _this.isOpen && !_this.options.inline) {
                _this.close();
                _this.input.focus();
            }
        });
    };
    ColorPicker.prototype.onSaturationMouseDown = function (e) {
        var _this = this;
        e.preventDefault();
        this.updateSaturationFromMouse(e);
        var onMouseMove = function (e) {
            _this.updateSaturationFromMouse(e);
        };
        var onMouseUp = function () {
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);
        };
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
    };
    ColorPicker.prototype.onSaturationTouchStart = function (e) {
        var _this = this;
        e.preventDefault();
        var touch = e.touches[0];
        this.updateSaturationFromTouch(touch);
        var onTouchMove = function (e) {
            e.preventDefault();
            var touch = e.touches[0];
            _this.updateSaturationFromTouch(touch);
        };
        var onTouchEnd = function () {
            document.removeEventListener("touchmove", onTouchMove);
            document.removeEventListener("touchend", onTouchEnd);
        };
        document.addEventListener("touchmove", onTouchMove, { passive: false });
        document.addEventListener("touchend", onTouchEnd);
    };
    ColorPicker.prototype.updateSaturationFromTouch = function (touch) {
        if (!this.colorBox)
            return;
        var rect = this.colorBox.getBoundingClientRect();
        var x = Math.max(0, Math.min(touch.clientX - rect.left, rect.width));
        var y = Math.max(0, Math.min(touch.clientY - rect.top, rect.height));
        var s = (x / rect.width) * 100;
        var v = 100 - (y / rect.height) * 100;
        var hsv = { h: this.currentColor.h, s: s, v: v, a: this.currentColor.a };
        this.currentColor = this.hsvToHsl(hsv);
        this.updateColorDisplay();
        this.announceColorChange();
    };
    ColorPicker.prototype.handleSliderTouch = function (e, slider, property, min, max, isAlpha) {
        var _this = this;
        if (isAlpha === void 0) { isAlpha = false; }
        var updateFromTouch = function (touch) {
            var rect = slider.getBoundingClientRect();
            var x = Math.max(0, Math.min(touch.clientX - rect.left, rect.width));
            var ratio = x / rect.width;
            var value = min + ratio * (max - min);
            if (isAlpha) {
                _this.currentColor[property] = value / 100;
            }
            else {
                _this.currentColor[property] = Math.round(value);
            }
            slider.value = String(Math.round(value));
            _this.updateColorDisplay();
            _this.announceColorChange();
        };
        var touch = e.touches[0];
        updateFromTouch(touch);
        var onTouchMove = function (e) {
            e.preventDefault();
            var touch = e.touches[0];
            updateFromTouch(touch);
        };
        var onTouchEnd = function () {
            document.removeEventListener("touchmove", onTouchMove);
            document.removeEventListener("touchend", onTouchEnd);
        };
        document.addEventListener("touchmove", onTouchMove, { passive: false });
        document.addEventListener("touchend", onTouchEnd);
    };
    ColorPicker.prototype.updateSaturationFromMouse = function (e) {
        if (!this.colorBox)
            return;
        var rect = this.colorBox.getBoundingClientRect();
        var x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
        var y = Math.max(0, Math.min(e.clientY - rect.top, rect.height));
        var s = (x / rect.width) * 100;
        var v = 100 - (y / rect.height) * 100;
        var hsv = { h: this.currentColor.h, s: s, v: v, a: this.currentColor.a };
        this.currentColor = this.hsvToHsl(hsv);
        this.updateColorDisplay();
        this.announceColorChange();
    };
    ColorPicker.prototype.onSaturationKeyDown = function (e) {
        var step = e.shiftKey ? 10 : 1;
        var handled = false;
        var hsv = this.hslToHsv(this.currentColor);
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
    };
    ColorPicker.prototype.updateColorDisplay = function (updateInput) {
        var _a;
        if (updateInput === void 0) { updateInput = true; }
        if (this.colorBox) {
            this.colorBox.style.backgroundColor = "hsl(".concat(this.currentColor.h, ", 100%, 50%)");
        }
        if (this.saturationPointer && this.colorBox) {
            var hsv = this.hslToHsv(this.currentColor);
            var x = hsv.s;
            var y = 100 - hsv.v;
            this.saturationPointer.style.left = "".concat(x, "%");
            this.saturationPointer.style.top = "".concat(y, "%");
        }
        if (this.saturationSlider) {
            this.saturationSlider.style.background = "linear-gradient(to right, hsl(".concat(this.currentColor.h, ", 0%, 50%), hsl(").concat(this.currentColor.h, ", 100%, 50%))");
        }
        if (this.lightnessSlider) {
            this.lightnessSlider.style.background = "linear-gradient(to right, hsl(".concat(this.currentColor.h, ", ").concat(this.currentColor.s, "%, 0%), hsl(").concat(this.currentColor.h, ", ").concat(this.currentColor.s, "%, 50%), hsl(").concat(this.currentColor.h, ", ").concat(this.currentColor.s, "%, 100%))");
        }
        var preview = (_a = this.container) === null || _a === void 0 ? void 0 : _a.querySelector(".colorpicker-preview-color");
        if (preview) {
            preview.style.backgroundColor = this.toHSLString(this.currentColor);
        }
        if (this.hexInput && updateInput) {
            this.hexInput.value = this.formatColor(this.currentColor);
        }
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
        if (updateInput) {
            this.input.value = this.formatColor(this.currentColor);
            this.options.onChange(this.input.value);
            if (this.options.previewTarget) {
                var target = document.querySelector(this.options.previewTarget);
                if (target) {
                    var property = this.options.previewProperty || 'background-color';
                    target.style.setProperty(property, this.input.value);
                }
            }
            if (this.compactButton) {
                var preview_1 = this.compactButton.querySelector('.colorpicker-compact-preview');
                if (preview_1) {
                    preview_1.style.backgroundColor = this.toHSLString(this.currentColor);
                }
            }
            if (this.inputPreview) {
                this.inputPreview.style.backgroundColor = this.toHSLString(this.currentColor);
            }
        }
    };
    ColorPicker.prototype.formatColor = function (color) {
        switch (this.options.format) {
            case "hsl":
                return this.toHSLString(color);
            case "rgb":
                return this.toRGBString(this.hslToRgb(color));
            case "hex":
            default:
                return this.toHex(color);
        }
    };
    ColorPicker.prototype.getPlaceholder = function () {
        switch (this.options.format) {
            case "hsl":
                return this.options.showAlpha ? "hsla(0, 0%, 0%, 1)" : "hsl(0, 0%, 0%)";
            case "rgb":
                return this.options.showAlpha ? "rgba(0, 0, 0, 1)" : "rgb(0, 0, 0)";
            case "hex":
            default:
                return "#000000";
        }
    };
    ColorPicker.prototype.parseColor = function (colorString) {
        colorString = colorString.trim();
        if (colorString.startsWith("#")) {
            return this.hexToHsl(colorString);
        }
        var rgbMatch = colorString.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
        if (rgbMatch) {
            var rgb = {
                r: parseInt(rgbMatch[1]),
                g: parseInt(rgbMatch[2]),
                b: parseInt(rgbMatch[3]),
                a: rgbMatch[4] ? parseFloat(rgbMatch[4]) : 1,
            };
            return this.rgbToHsl(rgb);
        }
        var hslMatch = colorString.match(/hsla?\((\d+),\s*(\d+)%,\s*(\d+)%(?:,\s*([\d.]+))?\)/);
        if (hslMatch) {
            return {
                h: parseInt(hslMatch[1]),
                s: parseInt(hslMatch[2]),
                l: parseInt(hslMatch[3]),
                a: hslMatch[4] ? parseFloat(hslMatch[4]) : 1,
            };
        }
        return this.currentColor;
    };
    ColorPicker.prototype.hexToHsl = function (hex) {
        hex = hex.replace("#", "");
        var r = parseInt(hex.substring(0, 2), 16) / 255;
        var g = parseInt(hex.substring(2, 4), 16) / 255;
        var b = parseInt(hex.substring(4, 6), 16) / 255;
        var a = hex.length === 8 ? parseInt(hex.substring(6, 8), 16) / 255 : 1;
        return this.rgbToHsl({ r: r * 255, g: g * 255, b: b * 255, a: a });
    };
    ColorPicker.prototype.rgbToHsl = function (rgb) {
        var r = rgb.r / 255;
        var g = rgb.g / 255;
        var b = rgb.b / 255;
        var max = Math.max(r, g, b);
        var min = Math.min(r, g, b);
        var h = 0;
        var s = 0;
        var l = (max + min) / 2;
        if (max !== min) {
            var d = max - min;
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
    };
    ColorPicker.prototype.hslToRgb = function (hsl) {
        var h = hsl.h / 360;
        var s = hsl.s / 100;
        var l = hsl.l / 100;
        var r, g, b;
        if (s === 0) {
            r = g = b = l;
        }
        else {
            var hue2rgb = function (p, q, t) {
                if (t < 0)
                    t += 1;
                if (t > 1)
                    t -= 1;
                if (t < 1 / 6)
                    return p + (q - p) * 6 * t;
                if (t < 1 / 2)
                    return q;
                if (t < 2 / 3)
                    return p + (q - p) * (2 / 3 - t) * 6;
                return p;
            };
            var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            var p = 2 * l - q;
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
    };
    ColorPicker.prototype.hsvToHsl = function (hsv) {
        var h = hsv.h;
        var s = hsv.s / 100;
        var v = hsv.v / 100;
        var a = hsv.a;
        var l = v * (1 - s / 2);
        var sl = l === 0 || l === 1 ? 0 : (v - l) / Math.min(l, 1 - l);
        return {
            h: h,
            s: sl * 100,
            l: l * 100,
            a: a,
        };
    };
    ColorPicker.prototype.hslToHsv = function (hsl) {
        var h = hsl.h;
        var s = hsl.s / 100;
        var l = hsl.l / 100;
        var a = hsl.a;
        var v = l + s * Math.min(l, 1 - l);
        var sv = v === 0 ? 0 : 2 * (1 - l / v);
        return {
            h: h,
            s: sv * 100,
            v: v * 100,
            a: a,
        };
    };
    ColorPicker.prototype.toHex = function (hsl) {
        var rgb = this.hslToRgb(hsl);
        var toHex = function (n) { return n.toString(16).padStart(2, "0"); };
        if (this.options.showAlpha && hsl.a < 1) {
            var alpha = Math.round(hsl.a * 255);
            return "#".concat(toHex(rgb.r)).concat(toHex(rgb.g)).concat(toHex(rgb.b)).concat(toHex(alpha));
        }
        return "#".concat(toHex(rgb.r)).concat(toHex(rgb.g)).concat(toHex(rgb.b));
    };
    ColorPicker.prototype.toHSLString = function (hsl) {
        if (this.options.showAlpha && hsl.a < 1) {
            return "hsla(".concat(hsl.h, ", ").concat(hsl.s, "%, ").concat(hsl.l, "%, ").concat(hsl.a, ")");
        }
        return "hsl(".concat(hsl.h, ", ").concat(hsl.s, "%, ").concat(hsl.l, "%)");
    };
    ColorPicker.prototype.toRGBString = function (rgb) {
        if (this.options.showAlpha && rgb.a < 1) {
            return "rgba(".concat(rgb.r, ", ").concat(rgb.g, ", ").concat(rgb.b, ", ").concat(rgb.a, ")");
        }
        return "rgb(".concat(rgb.r, ", ").concat(rgb.g, ", ").concat(rgb.b, ")");
    };
    ColorPicker.prototype.isValidHex = function (hex) {
        return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{8})$/.test(hex);
    };
    ColorPicker.prototype.isValidColor = function (value) {
        if (this.isValidHex(value))
            return true;
        if (/^rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*(,\s*[\d.]+\s*)?\)$/.test(value))
            return true;
        if (/^hsla?\(\s*\d+\s*,\s*\d+%\s*,\s*\d+%\s*(,\s*[\d.]+\s*)?\)$/.test(value))
            return true;
        return false;
    };
    ColorPicker.prototype.announceColorChange = function () {
        var _this = this;
        if (!this.announceTimeout) {
            this.announceTimeout = setTimeout(function () {
                var _a;
                var announcement = document.createElement("div");
                announcement.setAttribute("role", "status");
                announcement.setAttribute("aria-live", "polite");
                announcement.className = "colorpicker-sr-only";
                announcement.textContent = "Color changed to ".concat(_this.formatColor(_this.currentColor));
                (_a = _this.container) === null || _a === void 0 ? void 0 : _a.appendChild(announcement);
                setTimeout(function () { return announcement.remove(); }, 1000);
                _this.announceTimeout = null;
            }, 500);
        }
    };
    ColorPicker.prototype.open = function () {
        var _this = this;
        if (this.isOpen || !this.container)
            return;
        this.isOpen = true;
        this.container.style.display = "block";
        if (!this.options.inline) {
            this.positionPicker();
        }
        this.options.onOpen();
        if (!this.options.inline) {
            setTimeout(function () {
                var _a;
                var focusTarget = null;
                if (_this.options.presetsOnly) {
                    focusTarget = (_a = _this.container) === null || _a === void 0 ? void 0 : _a.querySelector('.colorpicker-preset');
                }
                else if (_this.options.sliderMode) {
                    focusTarget = _this.hueSlider;
                }
                else {
                    focusTarget = _this.colorBox;
                }
                if (focusTarget) {
                    focusTarget.focus();
                }
            }, 0);
        }
    };
    ColorPicker.prototype.close = function () {
        if (!this.isOpen || !this.container)
            return;
        this.isOpen = false;
        if (!this.options.inline) {
            this.container.style.display = "none";
        }
        this.options.onClose();
    };
    ColorPicker.prototype.toggle = function () {
        if (this.isOpen) {
            this.close();
        }
        else {
            this.open();
        }
    };
    ColorPicker.prototype.positionPicker = function () {
        if (!this.container)
            return;
        var inputRect = this.input.getBoundingClientRect();
        var containerRect = this.container.getBoundingClientRect();
        var viewportHeight = window.innerHeight;
        var top = inputRect.bottom + window.scrollY + 4;
        var left = inputRect.left + window.scrollX;
        if (this.options.position === "auto") {
            var spaceBelow = viewportHeight - inputRect.bottom;
            var spaceAbove = inputRect.top;
            if (spaceBelow < containerRect.height && spaceAbove > spaceBelow) {
                top = inputRect.top + window.scrollY - containerRect.height - 4;
            }
        }
        else if (this.options.position === "above") {
            top = inputRect.top + window.scrollY - containerRect.height - 4;
        }
        this.container.style.position = "absolute";
        this.container.style.top = "".concat(top, "px");
        this.container.style.left = "".concat(left, "px");
        this.container.style.zIndex = "9999";
    };
    ColorPicker.prototype.setColor = function (color) {
        this.currentColor = this.parseColor(color);
        this.updateColorDisplay();
    };
    ColorPicker.prototype.getColor = function () {
        return this.formatColor(this.currentColor);
    };
    ColorPicker.prototype.destroy = function () {
        var _a, _b, _c;
        (_a = this.container) === null || _a === void 0 ? void 0 : _a.remove();
        (_b = this.compactButton) === null || _b === void 0 ? void 0 : _b.remove();
        if (this.options.compact && this.input) {
            this.input.style.position = "";
            this.input.style.opacity = "";
            this.input.style.pointerEvents = "";
            this.input.style.width = "";
            this.input.style.height = "";
        }
        if (this.options.inputPreview && this.input) {
            this.input.classList.remove("colorpicker-has-preview");
            var wrapper = this.input.parentElement;
            if (wrapper && wrapper.classList.contains("colorpicker-input-group")) {
                (_c = wrapper.parentNode) === null || _c === void 0 ? void 0 : _c.insertBefore(this.input, wrapper);
                wrapper.remove();
            }
        }
        ColorPicker.instances.delete(this.input);
    };
    ColorPicker.getInstance = function (element) {
        return ColorPicker.instances.get(element);
    };
    ColorPicker.instances = new Map();
    return ColorPicker;
}());
export { ColorPicker };
export default function colorpicker(selector, options) {
    return new ColorPicker(selector, options);
}
export function initColorPickers(root) {
    if (root === void 0) { root = document; }
    var pickers = [];
    var elements = root.querySelectorAll('[data-colorpicker], .colorpicker, input[type="color"][data-format]');
    elements.forEach(function (element) {
        if (ColorPicker.getInstance(element)) {
            return;
        }
        var dataset = element.dataset;
        var options = {};
        if (dataset.colorpicker) {
            var config = dataset.colorpicker;
            var parts = config.split(/[,;]/);
            parts.forEach(function (part) {
                var _a = part.split(':').map(function (s) { return s.trim(); }), key = _a[0], value = _a[1];
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
        if (dataset.format && (dataset.format === 'hex' || dataset.format === 'rgb' || dataset.format === 'hsl')) {
            options.format = dataset.format;
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
        var picker = new ColorPicker(element, options);
        pickers.push(picker);
    });
    return pickers;
}
import * as languages_1 from './l10n';
export { languages_1 as languages };
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () { return initColorPickers(); });
    }
    else {
        initColorPickers();
    }
}
