import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          0: "var(--bg0)",
          1: "var(--bg1)",
          2: "var(--bg2)",
          3: "var(--bg3)",
        },
        border: {
          1: "var(--b1)",
          2: "var(--b2)",
          DEFAULT: "var(--b1)",
        },
        text: {
          1: "var(--t1)",
          2: "var(--t2)",
          3: "var(--t3)",
          4: "var(--t4)",
        },
        rise: {
          DEFAULT: "var(--rise)",
          light: "var(--rise-l)",
        },
        fall: {
          DEFAULT: "var(--fall)",
          light: "var(--fall-l)",
        },
        brand: {
          blue: "var(--blue)",
          "blue-light": "var(--blue-l)",
          "blue-medium": "var(--blue-m)",
          "blue-dark": "var(--blue-d)",
          green: "var(--green)",
          "green-light": "var(--green-l)",
          orange: "var(--orange)",
          "orange-light": "var(--orange-l)",
          purple: "var(--purple)",
          "purple-light": "var(--purple-l)",
          red: "var(--red)",
          "red-light": "var(--red-l)",
        },
      },
      fontFamily: {
        sans: ["var(--font-dm-sans)", "var(--font-noto-sc)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      borderRadius: {
        sm: "var(--rs)",
        DEFAULT: "var(--rm)",
        md: "var(--rm)",
        lg: "var(--rl)",
      },
      boxShadow: {
        ss: "var(--ss)",
        sm: "var(--sm)",
        sl: "var(--sl)",
      },
      transitionTimingFunction: {
        vane: "cubic-bezier(.25,.1,.25,1)",
      },
      transitionDuration: {
        vane: "160ms",
      },
      spacing: {
        sidebar: "var(--sw)",
        header: "var(--hh)",
      },
    },
  },
  plugins: [],
} satisfies Config;
