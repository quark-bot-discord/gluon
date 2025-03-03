// import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginPromise from "eslint-plugin-promise";
import pluginSecurity from "eslint-plugin-security";
import pluginUnusedImports from "eslint-plugin-unused-imports";

/** @type {import('eslint').Linter.Config[]} */
export default tseslint.config(
  // { files: ["**/*.{js,mjs,cjs,ts}"] },
  // {
  //   languageOptions: {
  //     globals: globals.browser,
  //     parser: tsParser,
  //     parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  //   },
  //   // rules: {
  //   //   "no-unused-vars": "warn",
  //   //   "no-undef": "warn",
  //   // },
  // },
  pluginJs.configs.recommended,
  tseslint.configs.strict,
  pluginPromise.configs["flat/recommended"],
  pluginSecurity.configs.recommended,
);
