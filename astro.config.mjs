import { defineConfig } from "astro/config";
import icon from "astro-icon";
import sitemap from "@astrojs/sitemap";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
	site: "https://example.com",
	trailingSlash: "always",
	server:{
		host:true
	  },
	integrations: [icon(), sitemap()],
	vite: {
		plugins: [tailwindcss()],
	},
});
