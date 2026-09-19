// @ts-check
import { defineConfig, fontProviders, svgoOptimizer } from "astro/config";
import starlight from "@astrojs/starlight";

import { sidebarConfig } from "./src/config/sidebar";
import markdocGrammar from './grammars/markdoc.tmLanguage.json'
import { Overrides } from "./src/components/overrides";
import { satteri } from "@astrojs/markdown-satteri";
import { hastExternalLink } from "./src/lib/plugins/satteri/hast/hast-external-link";
import { hastTable } from "./src/lib/plugins/satteri/hast/hast-table";
import { mdastStradocsAside } from './src/lib/plugins/satteri/mdast/mdast-stradocs-aside'
import { mermaidPlugin } from "./src/lib/plugins/satteri/mdast/satteri-plugin-mermaid";

const site = "https://c0desk1.my.id/";
const siteName = "c0desk1";
const siteDesc = "A custom starlight themes for you.";
const siteLocale = {
  root: {
    label: "Indonesia",
    lang: "id",
  },
//  en: { label: "English", lang: "en" }
};

// https://astro.build/config
export default defineConfig({
  site,
  fonts: [
    {
      provider: fontProviders.local(),
      name: "Montserrat",
      cssVariable: "--font-montserrat",
      options: {
        variants: [
          {
            weight: "100 900",
            style: "normal",
            src: ["./src/assets/fonts/Montserrat.woff2"],
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: "Inter",
      cssVariable: "--font-inter",
      options: {
        variants: [
          {
            weight: "100 900",
            style: "normal",
            src: ["./src/assets/fonts/Inter.woff2"],
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: "FiraCode",
      cssVariable: "--font-firaCode",
      options: {
        variants: [
          {
            weight: "normal",
            style: "normal",
            src: ["./src/assets/fonts/FiraCode.woff2"],
          },
        ],
      },
    },
  ],
  markdown: {
    processor: satteri({
      hastPlugins: [
        hastExternalLink,
        hastTable
      ],
      mdastPlugins: [
        mdastStradocsAside,
        mermaidPlugin,
      ],
      features: {
        frontmatter: true,
        headingAttributes: true,
        directive: true,
        definitionList: true,
        superscript: true,
        subscript: true,
        wikilinks: true,
        smartPunctuation: true,
        math: { singleDollarTextMath: false },
        rawHtml: false
      },
    }),
  },
  integrations: [
    starlight({
      title: siteName,
      titleDelimiter: '|',
      description: siteDesc,
      logo: {
        light: "./src/assets/images/author/bimaakbar.svg",
        dark: "./src/assets/images/author/bimaakbar.svg",
        replacesTitle: false,
      },
      favicon: "/images/favicons/favicon.svg",
      defaultLocale: "root",
      locales: siteLocale,
      customCss: ["./src/styles/global.css"],
      expressiveCode: { 
        themes: ["github-dark", "github-light"],
        shiki: {
          langs: [markdocGrammar] 
        }
      },
      components: Overrides,
      social: [
        {
          icon: "github",
          label: "Github",
          href: "https://github.com/c0desk1",
        },
      ],
      lastUpdated: true,
      editLink: {
        baseUrl:
          "https://github.com/bimaakbar-dev/bimaakbar-dev.github.io/edit/main/",
      },
      routeMiddleware: "./src/routeData.ts",
      credits: true,
      sidebar: sidebarConfig,
      pagefind: true
    }),
  ],
  experimental: {
    incrementalBuild: true,
    svgOptimizer: svgoOptimizer(),
  },
});
