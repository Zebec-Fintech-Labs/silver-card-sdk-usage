/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      minWidth: {
        7: "28px",
        21: "66px",
        31.25: "125px",
        33.5: "134px",
        39.4: "157.5px",
        48: "195px",
        50: "200px",
        51: "203px",
        55.5: "222px",
        59.5: "238px",
        60: "240px",
        61: "244px",
        70: "280px",
        84: "335px",
        85: "340px",
        175: "706px",
      },
      colors: {
        "zebec-card": {
          // Background
          background: {
            primary: "var(--zebec-card-bg-primary)",
            secondary: "var(--zebec-card-bg-secondary)",
            tertiary: "var(--zebec-card-bg-tertiary)",
            light: "var(--zebec-card-bg-light)",
            muted: "var(--zebec-card-bg-muted)",
            backdrop: "var(--zebec-card-bg-backdrop)",
            contrast: "var(--zebec-card-bg-contrast)",
            tooltip: "var(--zebec-card-toltip-background)",
            debitProgress: "var(--zebec-card-debit-card-progress)",
          },
          // Primary
          primary: {
            DEFAULT: "var(--zebec-card-primary-main)",
            dark: "var(--zebec-card-primary-dark)",
            accessible: "var(--zebec-card-primary-accessible)",
            light: "var(--zebec-card-primary-light)",
            contrast: "var(--zebec-card-primary-contrast)",
            gradient: {
              DEFAULT: "var(--zebec-card-primary-gradient)",
              hover: "var(--zebec-card-primary-gradient-hover)",
            },
          },
          // Content
          content: {
            primary: "var(--zebec-card-content-primary)",
            secondary: "var(--zebec-card-content-secondary)",
            tertiary: "var(--zebec-card-content-tertiary)",
            contrast: "var(--zebec-card-content-contrast)",
            success: "var(--zebec-card-success-content)",
            error: "var(--zebec-card-error-content)",
          },
          // Success
          success: {
            DEFAULT: "var(--zebec-card-success-main)",
            content: "var(--zebec-card-success-content)",
          },
          // Error
          error: {
            DEFAULT: "var(--zebec-card-error-main)",
            content: "var(--zebec-card-error-content)",
            light: "var(--zebec-card-error-light-bg)",
          },
          // Warning
          warning: "var(--zebec-card-warning-main)",
          // Outline
          outline: {
            border: "var(--zebec-card-outline-border)",
            DEFAULT: "var(--zebec-card-outline-main)",
            secondary: "var(--zebec-card-outline-secondary)",
            icon: "var(--zebec-card-outline-icon)",
            dark: "var(--zebec-card-outline-dark)",
          },
        },
      },
      fontFamily: {
        inter: "'Inter', sans-serif",
      },
      fontSize: {
        "heading-3": [
          "var(--zebec-card-fs-2xl)",
          {
            lineHeight: "var(--zebec-card-lh-leading-10)",
            letterSpacing: "var(--zebec-card--ls-tracking-1)",
          },
        ],
        "heading-4": [
          "var(--zebec-card-fs-xl)",
          {
            lineHeight: "var(--zebec-card-lh-leading-8)",
            letterSpacing: "var(--zebec-card--ls-tracking-1)",
          },
        ],
        "heading-5": [
          "var(--zebec-card-fs-lg)",
          {
            lineHeight: "var(--zebec-card-lh-leading-7)",
            letterSpacing: "var(--zebec-card--ls-tracking-1)",
          },
        ],
        subtitle: [
          "var(--zebec-card-fs-base)",
          {
            lineHeight: "var(--zebec-card-lh-leading-6)",
            letterSpacing: "var(--zebec-card-ls-tracking-1)",
          },
        ],
        body: [
          "var(--zebec-card-fs-sm)",
          {
            lineHeight: "var(--zebec-card-lh-leading-5)",
          },
        ],
        "subtitle-sm": [
          "var(--zebec-card-fs-sm)",
          {
            lineHeight: "var(--zebec-card-lh-leading-6)",
            letterSpacing: "var(--zebec-card--ls-tracking-2)",
          },
        ],
        "avatar-title": [
          "var(--zebec-card-fs-sm)",
          {
            lineHeight: "var(--zebec-card-lh-leading-4)",
            letterSpacing: "var(--zebec-card--ls-tracking-2)",
          },
        ],
        button: [
          "var(--zebec-card-fs-sm)",
          {
            lineHeight: "var(--zebec-card-lh-leading-6)",
          },
        ],
        caption: [
          "var(--zebec-card-fs-xs)",
          {
            lineHeight: "var(--zebec-card-lh-leading-4)",
          },
        ],
        "button-sm": [
          "var(--zebec-card-fs-xs)",
          {
            lineHeight: "var(--zebec-card-lh-leading-3)",
          },
        ],
        "caption-sm": [
          "var(--zebec-card-fs-xxs)",
          {
            lineHeight: "var(--zebec-card-lh-leading-3)",
          },
        ],
      },
      boxShadow: {
        2: "var(--zebec-card-bs-shadow-2)",
        3: "var(--zebec-card-bs-shadow-3)",
        backdrop: "var(--zebec-card-bs-shadow-backdrop)",
        toaster: "var(--zebec-card-bs-shadow-toaster)",
      },
      letterSpacing: {
        1: "var(--zebec-card-ls-tracking-1)",
      },
      spacing: {
        3.5: "14px",
        4.5: "18px",
      },
      container: {
        center: true,
      },
      keyframes: {
        progress: {
          "0%": { width: "100%" },
          "100%": { width: "0" },
        },
      },
      animation: {
        progress: "progress linear",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    function ({ addComponents }: any) {
      addComponents({
        ".container": {
          maxWidth: "100%",
          marginLeft: "auto",
          marginRight: "auto",
          paddingLeft: "16px",
          paddingRight: "16px",
          "@screen sm": {
            maxWidth: "100%",
          },
          "@screen md": {
            maxWidth: "100%",
          },
          "@screen lg": {
            maxWidth: "1024px",
          },
          "@screen xl": {
            maxWidth: "1280px",
            paddingLeft: "5rem",
            paddingRight: "5rem",
          },
          "@screen 2xl": {
            maxWidth: "1536px",
            paddingLeft: "5rem",
            paddingRight: "5rem",
          },
        },
      });
    },
  ],
};
