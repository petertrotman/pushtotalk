module.exports = {
  "parser": "babel-eslint",
  "env": {
    "browser": true,
    "node": true
  },
  "extends": "airbnb",
  "plugins": ["react"],
  "rules": {
    "strict": 0,
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "react/prefer-stateless-function": [2, { "ignorePureComponents": true }],
    "jsx-a11y/anchor-is-valid": [ "error", {
      "components": [ "Link" ],
      "specialLink": [ "to", "hrefLeft", "hrefRight" ],
      "aspects": [ "noHref", "invalidHref", "preferButton" ]
    }]
  },
};
