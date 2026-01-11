import typescript from "rollup-plugin-typescript";
import { resolve } from "path";
import * as pkg from "../package.json";
import { RollupOptions } from "rollup";

export const getColorPickerConfig = (): RollupOptions => ({
  input: "./src/index.ts",
  output: {
    file: "dist/colorpicker.js",
    name: "colorpicker",
    format: "umd",
    exports: "named",
    banner: `/* Pickit Color v${pkg.version}, @license Donationware */`,
  },
  onwarn(warning) {
    if (typeof warning === "string") throw Error(warning);
    else if (warning.code !== "CIRCULAR_DEPENDENCY") {
      throw Error(warning.message);
    }
  },

  plugins: [
    typescript({ tsconfig: resolve("./tsconfig.json", __dirname) }),
  ],
});

export default getColorPickerConfig();
