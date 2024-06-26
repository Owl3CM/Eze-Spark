import typescript from "rollup-plugin-typescript2";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import postcss from "rollup-plugin-postcss";
import { terser } from "rollup-plugin-terser";
import packageJson from "./package.json";

const config = {
  input: "lib/index.ts",
  plugins: [
    peerDepsExternal(),
    resolve(),
    commonjs(),
    typescript(),
    postcss({
      plugins: [],
      minimize: true,
    }),
    terser(),
  ],
  output: {
    file: packageJson.main,
    format: "cjs",
    sourcemap: false,
  },
};

export default config;
