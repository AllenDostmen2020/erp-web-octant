module.exports = {
    content: [

      "./src/**/*.{html,ts}",
      "./src/**/**/*.{html,ts}",
      "./src/**/**/**/*.{html,ts}",
      "./src/**/**/**/**/*.{html,ts}",
      "./src/**/**/**/**/**/*.{html,ts}",
      "./src/**/**/**/**/**/**/*.{html,ts}",
      "./src/**/**/**/**/**/**/**/*.{html,ts}",



    ],
    darkMode: "class",

    theme: {
      extend: {
        zIndex: {
          "-1": "-1",
        },
        colors: {
          "primary": 'rgb(var(--rgb-primary), <alpha-value>)',
          "on-primary": 'rgb(var(--rgb-on-primary), <alpha-value>)',
          "primary-container": 'rgb(var(--rgb-primary-container), <alpha-value>)',
          "on-primary-container": 'rgb(var(--rgb-on-primary-container), <alpha-value>)',

          "secondary": 'rgb(var(--rgb-secondary), <alpha-value>)',
          "on-secondary": 'rgb(var(--rgb-on-secondary), <alpha-value>)',
          "secondary-container": 'rgb(var(--rgb-secondary-container), <alpha-value>)',
          "on-secondary-container": 'rgb(var(--rgb-on-secondary-container), <alpha-value>)',

          "tertiary": 'rgb(var(--rgb-tertiary), <alpha-value>)',
          "on-tertiary": 'rgb(var(--rgb-on-tertiary), <alpha-value>)',
          "tertiary-container": 'rgb(var(--rgb-tertiary-container), <alpha-value>)',
          "on-tertiary-container": 'rgb(var(--rgb-on-tertiary-container), <alpha-value>)',

          "error": 'rgb(var(--rgb-error), <alpha-value>)',
          "on-error": 'rgb(var(--rgb-on-error), <alpha-value>)',
          "error-container": 'rgb(var(--rgb-error-container), <alpha-value>)',
          "on-error-container": 'rgb(var(--rgb-on-error-container), <alpha-value>)',

          "background": 'rgb(var(--rgb-background), <alpha-value>)',
          "on-background": 'rgb(var(--rgb-on-background), <alpha-value>)',

          "surface": 'rgb(var(--rgb-surface), <alpha-value>)',
          "on-surface": 'rgb(var(--rgb-on-surface), <alpha-value>)',

          "surface-variant": 'rgb(var(--rgb-surface-variant), <alpha-value>)',
          "on-surface-variant": 'rgb(var(--rgb-on-surface-variant), <alpha-value>)',

          "outline": 'rgb(var(--rgb-outline), <alpha-value>)',

          "inverse-primary": 'rgb(var(--rgb-inverse-primary), <alpha-value>)',
          "inverse-surface": 'rgb(var(--rgb-inverse-surface), <alpha-value>)',
          "inverse-on-surface": 'rgb(var(--rgb-inverse-on-surface), <alpha-value>)',
          "surface-tint": 'rgb(var(--rgb-surface-tint), <alpha-value>)',
          "outline-variant": 'rgb(var(--rgb-outline-variant), <alpha-value>)',
          "scrim": 'rgb(var(--rgb-scrim), <alpha-value>)',
        },
        borderRadius: {
          DEFAULT: "var(--border-radius-default, 4px)",
        },
        boxShadow: {
          'line': '0px 0px 0px 1px rgba(var(--rgb-outline), 1)',
          'line-inset': '0px 0px 0px 1px rgba(var(--rgb-outline), 1) inset',
          'level-1': 'var(--box-shadow-level-1)',
          'level-2': 'var(--box-shadow-level-2)',
          'level-3': 'var(--box-shadow-level-3)',
          'level-4': 'var(--box-shadow-level-4)',
          'level-5': 'var(--box-shadow-level-5)',
        },
        fontFamily: {
          'title': ['RNS Camelia'],
          'subtitle': ['Articulat CF'],
          'body': ['Roboto']
        },
        overflow: {
          overlay: "overlay",
        },
      },
    },
    plugins: [
      require('@tailwindcss/container-queries'),
    ],
  };
