import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      // ⛔ stop showing "defined but not used"
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      // 👻 allow unused vars starting with _
      "no-unused-vars": "off",

      // 🛑 Disable spell checker noise if it's set via lint rule
      "spellcheck/spell-checker": "off",
    },
  },
];

export default eslintConfig;