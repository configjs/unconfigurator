import { defineConfig, presetIcons, presetTypography, presetUno } from "unocss";

export default defineConfig({
  presets: [presetUno(), presetIcons(), presetTypography()],
  content: {
    pipeline: {
      include: [/\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html|ts)($|\?)/],
    },
  },
});
