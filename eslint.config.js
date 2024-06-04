// @ts-check

const antfu = require("@antfu/eslint-config");

module.exports = antfu.default({
  rules: {
    "no-console": "off",
    "ts/no-namespace": "off",
  },
});
