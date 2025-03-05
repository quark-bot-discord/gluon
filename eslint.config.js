// import globals from "globals";
import pluginJs from "@eslint/js";
// import tseslint from "@typescript-eslint/eslint-plugin";
import tseslint from "typescript-eslint";
// import tsParser from "@typescript-eslint/parser";
import pluginPromise from "eslint-plugin-promise";
import pluginSecurity from "eslint-plugin-security";
import mochaPlugin from "eslint-plugin-mocha";
import pluginUnusedImports from "eslint-plugin-unused-imports";

// /** @type {import('eslint').Linter.Config} */
// export default {
//   extends: [
//     "plugin:mocha/recommended",
//     "plugin:@eslint/recommended",
//     "plugin:@typescript-eslint/strict",
//     "plugin:promise/recommended",
//     "plugin:security/recommended",
//   ],
//   plugins: [
//     "promise",
//     "security",
//     "mocha",
//     "unused-imports",
//   ],
//   rules: {
//     // Add any custom rules here
//   },
//   overrides: [
//     {
//       files: ["**/*.{js,mjs,cjs,ts}"],
//       languageOptions: {
//         globals: {
//           ...pluginJs.configs.recommended.languageOptions?.globals,
//           ...tseslint.configs.strict.languageOptions?.globals,
//         },
//         parser: tsParser,
//         parserOptions: {
//           ...pluginJs.configs.recommended.languageOptions?.parserOptions,
//           ...tseslint.configs.strict.languageOptions?.parserOptions,
//         },
//       },
//       rules: {
//         ...pluginJs.configs.recommended.rules,
//         ...tseslint.configs.strict.rules,
//         ...pluginPromise.configs["flat/recommended"].rules,
//         ...pluginSecurity.configs.recommended.rules,
//         ...mochaPlugin.configs.recommended.rules,
//         "unused-imports/no-unused-imports": "error",
//         "unused-imports/no-unused-vars": [
//           "warn",
//           { vars: "all", varsIgnorePattern: "^_", args: "after-used", argsIgnorePattern: "^_" },
//         ],
//       },
//     },
//   ],
// };

// /** @type {import('eslint').Linter.Config[]} */
// export default [
//   // { languageOptions: { globals: globals.browser, parser: tsParser } },
//   pluginJs.configs.recommended,
//   tseslint.configs.strict,
//   // pluginPromise.configs["flat/recommended"],
//   // pluginSecurity.configs.recommended,
//   // mochaPlugin.configs.recommended,
//   // pluginUnusedImports.configs.recommended,
// ];

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
  mochaPlugin.configs.flat.recommended,
  pluginJs.configs.recommended,
  tseslint.configs.strict,
  pluginPromise.configs["flat/recommended"],
  pluginSecurity.configs.recommended,
  {
    plugins: {
      "unused-imports": pluginUnusedImports,
    },
  },
);
