import typography from "@tailwindcss/typography";
import { family as IBMPlexSansJP } from "@fontsource/ibm-plex-sans-jp/metadata.json" assert { type: "json" };
import { addDynamicIconSelectors } from "@iconify/tailwind";

/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{svelte,ts,html}"],
  theme: {
    fontFamily: {
      body: [IBMPlexSansJP, "sans-serif"],
    },
    extend: {
      colors: {
        base: {
          DEFAULT: "#071422",
          profile: "#0B1B2B",
          post: "#112131",
        },
        prose: {
          body: "#AFC2D4",
          title: "#E7EDF4",
          subtitle: "#C4D4E3",
        },
        label: "#3A536B",
        brand: "#3294F8",
      },
    },
  },
  plugins: [typography, addDynamicIconSelectors()],
};

export default config;
