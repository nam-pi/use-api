import peerDepsExternal from "rollup-plugin-peer-deps-external";
import { terser } from "rollup-plugin-terser";
import typescript from "rollup-plugin-typescript2";
import pkg from "./package.json";

export default {
  input: "src/index.ts",
  output: [
    {
    file: pkg.main,
    format: "cjs",
    sourcemap: true,
    },
    //  {
      //  file: pkg.module,
      //  format: "es",
      //  sourcemap: true,
    //  },
    //  {
      //  file: pkg.browser,
      //  format: "iife",
      //  name: "UseNampiApi",
      //  sourcemap: true,
    //  },
  ],
  //  external: [...Object.keys(pkg.dependencies || {})],
  plugins: [peerDepsExternal(), typescript(), terser()],
};
