import globals from "globals";
import pluginJs from "@eslint/js";
import { defineFlatConfig } from "eslint-define-config";
import configPrettier from "eslint-config-prettier";
import pluginPrettier from "eslint-plugin-prettier/recommended";
export default defineFlatConfig([
  {
    ignores: ["**/node_modules", "**/assets", "**/public", "**/bin"],
    files: ["**/*.{js,mjs,cjs,jsx,vue}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        process: true
      }
    }
  },
  pluginJs.configs.recommended,
  {
    name: "global-config",
    rules: {
      ...configPrettier.rules
    }
  },
  pluginPrettier
]);
