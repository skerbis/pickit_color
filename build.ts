import * as fs from "fs-extra";
import glob from "glob";
import terser from "terser";
import stylus from "stylus";
import stylusAutoprefixer from "autoprefixer-stylus";
import * as rollup from "rollup";
import * as path from "path";
import colorpickerConfig from "./config/rollup.colorpicker";
import * as pkg from "./package.json";

const version = `/* Pickit Color v${pkg.version}, @license Donationware */`;

const paths = {
  colorpicker: "./src/colorpicker.styl",
};

function logErr(e: Error | string) {
  console.error(e);
}

async function readFileAsync(path: string): Promise<string> {
  try {
    const buf = await fs.readFile(path);
    return buf.toString();
  } catch (e) {
    logErr(e);
    return e.toString();
  }
}

async function uglify(src: string) {
  try {
    const { code } = await terser.minify(src, {
      output: {
        preamble: version,
        comments: false,
      },
    });
    return code;
  } catch (err) {
    logErr(err);
  }
}

async function transpileStyle(src: string, compress = false) {
  return new Promise<string>((resolve, reject) => {
    stylus(src, {
      compress,
    })
      .use(
        stylusAutoprefixer({
          browsers: ["last 2 versions"],
        })
      )
      .render((err, css) => (err ? reject(err) : resolve(css)));
  });
}

async function buildColorPicker() {
  try {
    console.log("Building ColorPicker JavaScript...");
    const bundle = await rollup.rollup(colorpickerConfig);
    await bundle.write(colorpickerConfig.output as rollup.OutputOptions);

    const transpiled = await readFileAsync("./dist/colorpicker.js");
    await fs.writeFile("./dist/colorpicker.min.js", await uglify(transpiled));

    console.log("Building ColorPicker styles...");
    const src = await readFileAsync(paths.colorpicker);
    await Promise.all([
      fs.writeFile("./dist/colorpicker.css", await transpileStyle(src)),
      fs.writeFile(
        "./dist/colorpicker.min.css",
        await transpileStyle(src, true)
      ),
    ]);

    console.log("✅ Build complete!");
  } catch (e) {
    logErr(e);
    process.exit(1);
  }
}

buildColorPicker();
