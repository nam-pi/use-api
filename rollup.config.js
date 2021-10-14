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
    {
      file: pkg.module,
      format: "es",
      sourcemap: true,
    },
    //  {
      //  file: pkg.browser,
      //  format: "iife",
      //  name: "UseNampiApi",
      //  sourcemap: true,
      //  globals: {
        //  "keycloak-js": "Keycloak",
        //  jsonld: "jsonld",
        //  uuid: "uuid",
      //  },
    //  },
  ],
  external: [...Object.keys(pkg.dependencies || {})],
  plugins: [typescript(), terser()],
};
