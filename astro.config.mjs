import path from "path";
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import Compress from "@playform/compress";
import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
// Markdown 配置================
import remarkMath from "remark-math";
import rehypeSlug from "rehype-slug";
import rehypeKatex from "rehype-katex";
import remarkDirective from "remark-directive";
import { remarkNote, addClassNames } from './src/plugins/markdown.custom'
// Markdown 配置================
import SITE_INFO from './src/config';
import swup from '@swup/astro';

// const {VITE_BASE_URL} = loadEnv(process.env.NODE_ENV, process.cwd(), "");

// https://astro.build/config
export default defineConfig({
	site: 'http://blog.800800.top',
	// base: VITE_BASE_URL,
	integrations: [
		swup({
			theme: false,
			animationClass: "vh-animation-",
			containers: [".vh-animation"],
			smoothScrolling: true,
			progress: true,
			cache: true,
			preload: true,
			accessibility: true,
			updateHead: true,
			updateBodyClass: false,
			globalInstance: true
		}),
		Compress({
			CSS: false,
			Image: false,
			Action: { Passed: async () => true },
		}),
		sitemap({
			changefreq: 'weekly',
			priority: 0.7,
			lastmod: new Date(),
			// 处理末尾带 / 的 url
			serialize: (item) => ({ ...item, url: item.url.endsWith('/') ? item.url.slice(0, -1) : item.url })
		}),
		mdx({ extendMarkdownConfig: false })
	],
	markdown: {
		remarkPlugins: [remarkMath, remarkDirective, remarkNote,],
		rehypePlugins: [rehypeKatex, rehypeSlug, addClassNames],
		syntaxHighlight: 'shiki',
		shikiConfig: { theme: 'github-light' },
	},
	vite: { resolve: { alias: { "@": path.resolve(__dirname, "./src"), "@public": path.resolve(__dirname, "./public") } } },
	server: { host: '0.0.0.0' }
});