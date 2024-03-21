import { nodeResolve } from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";

export default {
  input: "./src/index.ts",
  output: {
    dir: "./dist",
    format: "umd",
    name: "gopasswordless",
  },
  plugins: [
    nodeResolve({ extensions: [".ts"] }),
    typescript({
      include: ["**/*.ts", "**/*.mts", "**/*.cts"],
      tsconfig: "tsconfig.json",
    }),
  ],
};
