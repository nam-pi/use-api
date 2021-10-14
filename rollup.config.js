import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import external from "rollup-plugin-peer-deps-external";
import { terser } from "rollup-plugin-terser";
import pkg from "./package.json";

export default {
  input: "src/index.ts",
  output: [
    {
      file: pkg.main,
      format: "cjs",
      sourcemap: true,
      name: "use-nampi-api",
    },
    {
      file: pkg.module,
      format: "esm",
      sourcemap: true,
    },
    //  {
    //  file: pkg.browser,
    //  format: "iife",
    //  name: "UseNampiApi",
    //  sourcemap: true,
    //  },
  ],
  //  external: [...Object.keys(pkg.dependencies || {})],
  plugins: [
    external(),
    resolve(),
    commonjs(),
    typescript({ tsconfig: "./tsconfig.json" }),
    terser(),
  ],
};
