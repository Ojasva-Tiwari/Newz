/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["Newsreader", "Georgia", "serif"],
      },
      colors: {
        ink: "#12151a",
        paper: "#f7f6f2",
        signal: "#d85b39",
        muted: "#777873",
        midnight: "#11151b",
      },
      boxShadow: {
        soft: "0 20px 70px rgba(19, 23, 30, .10)",
        card: "0 12px 35px rgba(19, 23, 30, .08)",
      },
      animation: {
        "fade-up": "fadeUp .5s ease-out both",
        "fade-in": "fadeIn .4s ease-out both",
        shimmer: "shimmer 1.8s infinite linear",
        "pulse-soft": "pulseSoft 2.4s infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: ".45" },
          "50%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
