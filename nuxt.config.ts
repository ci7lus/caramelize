import { Configuration } from "@nuxt/types"
import {
  SITE_NAME,
  TWITTER_ID,
  SCRAPBOX_PROJECT,
  SCRAPBOX_TAG,
} from "./src/config"

const config: Configuration = {
  mode: "universal",
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: `%s | ${SITE_NAME}`,
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "My Blog",
      },
      {
        hid: "og:description",
        name: "og:description",
        content: "My Blog",
      },
      {
        hid: "og:site_name",
        name: "og:site_name",
        content: SITE_NAME,
      },
    ],
    link: [{ rel: "icon", type: "image/jpeg", href: "/favicon.jpg" }],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/axios",
    "@nuxtjs/proxy",
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {},
    parallel: true,
  },
  buildModules: ["@nuxtjs/tailwindcss", "@nuxt/typescript-build"],
  purgeCSS: {
    enabled: false,
  },
  srcDir: "./src",
  proxy: {
    "/api": {
      target: `https://scrapbox.io`,
      pathRewrite: {
        "/api": `/api/pages/${SCRAPBOX_PROJECT}`,
      },
    },
  },
  env: {
    SCRAPBOX_PROJECT: SCRAPBOX_PROJECT,
    SCRAPBOX_TAG: SCRAPBOX_TAG,
  },
}

if (TWITTER_ID) {
  config.head!.meta!.push({
    hid: "twitter:site",
    name: "twitter:site",
    content: `@${TWITTER_ID}`,
  })
  config.head!.meta!.push({
    hid: "twitter:card",
    name: "twitter:card",
    content: "summary",
  })
}

export default config
