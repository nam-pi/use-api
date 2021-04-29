import ts from "@wessberg/rollup-plugin-ts";

export default {
  input: "src/index.ts",
  output: {
    file: "dist/bundle.js",
    format: "cjs",
    // name: "main"
    sourcemap: true,
  },
  plugins: [ts()],
};
