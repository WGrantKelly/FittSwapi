module.exports = {
  "parser": "babel-eslint",
  "extends": "airbnb",
  "plugins": [
    "react-hooks"
  ],
  rules: {
    "linebreak-style": 0,
    "max-len": 0,
    "no-underscore-dangle": 1,
    "no-use-before-define": 0,
    "jsx-a11y/label-has-associated-control": 0,
    "jsx-a11y/label-has-for": 0,
    "no-unused-vars": [2, {
      "argsIgnorePattern": "^_"
    }],
    "object-curly-newline": [2, { "ImportDeclaration": "never" }],
    "no-param-reassign": ["error", { "props": false }],
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    // this is v.dumb next/link is v.dumb
    "jsx-a11y/anchor-is-valid": [ "error", {
      "components": [ "Link" ],
      "specialLink": [ "hrefLeft", "hrefRight" ],
      "aspects": [ "invalidHref", "preferButton" ]
    }],
    "react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
    "react-hooks/exhaustive-deps": "warn" // Checks effect dependencies
  },
  "globals": {
    "document": true,
    "window": true,
    "navigator": true,
  }
};
