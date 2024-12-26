import path from "node:path";
import { fileURLToPath } from "node:url";

import typescriptEslint from "@typescript-eslint/eslint-plugin";
import unusedImports from "eslint-plugin-unused-imports";
import _import from "eslint-plugin-import";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  ...compat.extends("next/core-web-vitals"),
  {
    plugins: {
      "@typescript-eslint": typescriptEslint,
      "unused-imports": unusedImports,
      // import: fixupPluginRules(_import),
    },

    settings: {
      "import/internal-regex": "^@/",
    },

    rules: {
      "@next/next/no-img-element": "off",

      "max-lines": "error",
      "unused-imports/no-unused-imports": "error",

      "import/order": [
        "error",
        {
          groups: ["builtin", "external", "internal", "object", "type"],

          pathGroups: [
            {
              pattern: "**/*.{svg,png,jpg,json}",
              group: "internal",
              position: "after",
            },
            {
              pattern: "**/*.{css}",
              group: "internal",
              position: "after",
            },
          ],

          "newlines-between": "always",

          alphabetize: {
            order: "asc",
          },
        },
      ],
    },
  },
  {
    files: ["**/*.{ts,tsx}"],

    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          ignoreRestSiblings: true,
        },
      ],

      "@typescript-eslint/consistent-type-imports": "error",
    },
  },
];
