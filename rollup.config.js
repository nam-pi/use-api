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
    {
      file: pkg.browser,
      format: "iife",
      name: "UseNampiApi",
      sourcemap: true,
      globals: {
        "react/jsx-runtime": "jsxRuntime",
        "keycloak-js": "Keycloak",
        react: "react",
        jsonld: "jsonld",
        uuid: "uuid",
      },
    },
  ],
  external: [
    "react/jsx-runtime",
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ],
  plugins: [typescript(), terser()],
};
