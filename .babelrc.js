module.exports = {
  "env": {
    "development": {
      "presets": [
        ["next/babel", {
          "preset-env": {
            targets: {
              chrome: 55,
              node: "8.10",
            },
          },
        }],
      ],
      "plugins": [
        "@babel/plugin-transform-flow-strip-types",
        [
          "styled-components", {
            "ssr": true,
            "displayName": true,
            "preprocess": false
          }
        ],
        "react-intl"
      ]
    },
    "production": {
      "presets": [
        ["next/babel", {
          "preset-env": {
            targets: {
              chrome: 55,
              node: "8.10",
            },
          },
        }],
      ],
      "plugins": [
        "@babel/plugin-transform-flow-strip-types",
        [
          "styled-components", {
            "ssr": true,
            "displayName": false,
            "preprocess": false,
            "pure": true,
            "transpileTemplateLiterals": true
          }
        ],
        "react-intl"
      ]
    },
    "test": {
      "presets": [
        ["next/babel", {
          "preset-env": {
            targets: {
              chrome: 55,
              node: "8.10",
            },
          },
        }],
      ],
      "plugins": [
        "@babel/plugin-transform-flow-strip-types",
        [
          "styled-components", {
            "ssr": true,
            "displayName": true,
            "preprocess": false
          }
        ],
        "react-intl"
      ]
    }
  }
}
