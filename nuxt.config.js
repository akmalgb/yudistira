import colors from "vuetify/es5/util/colors";

export default {
  // server: {
  //   host: '0.0.0.0',
  //   port: 8000,
  // },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: "%s",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [
      {
        href: "https://fonts.googleapis.com/css?family=Open+Sans",
        href: "https://fonts.googleapis.com/css?family=Noto+Sans",
        href: "https://fonts.googleapis.com/css?family=Delius",
      },
      {
        rel: "icon",
        type: "image/x-icon",
        href: process.env.SIDIGS_PARENT_FAVICON,
      },
    ],
  },

  loading: {
    color: "green",
    height: "5px",
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["vue-multiselect/dist/vue-multiselect.min.css"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: "~/plugins/persistedState.client.js" },
    { src: "~/plugins/format-date.js" },
    { src: "~/plugins/iconCode.js" },
    { src: "~/filters/formatNumber.js" },
    { src: "~/plugins/gtag.js" },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ["@nuxtjs/vuetify", "@nuxtjs/moment"],
  moment: {
    defaultLocale: "id",
    locales: ["id"],
  },

  // Modules: https://go.nuxtjs.dev/config-modules

  ssr: false,
  // target: 'server',

  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    "@nuxt/image",
    "cookie-universal-nuxt",
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: process.env.SIDIGS_ENDPOINT_URL,
    // proxy: true,
  },

  publicRuntimeConfig: {
    mainColor: process.env.SIDIGS_PARENT_MAIN_COLOR,
    textColor: process.env.SIDIGS_PARENT_TEXT_COLOR,
    cardColor: process.env.SIDIGS_PARENT_CARD_COLOR,
    logo: process.env.SIDIGS_PARENT_LOGO,
    icon: process.env.SIDIGS_PARENT_FAVICON,
  },

  env: {
    GOOGLE_TAG_ID: process.env.GOOGLE_TAG_ID,
  },

  // proxy: {
  //   "/api/": {
  //     target: "https://demo.sidigs.com/api/parent/",
  //     pathRewrite: { "^/api/": "" }
  //   }
  // },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: [
      // '~/assets/variables.scss',
      "~/assets/style.css",
    ],
    treeShake: true,
    defaultAssets: {
      font: {
        family: "Open Sans",
      },
    },
    theme: {
      themes: {
        light: {
          primary: "#00887A",
          // secondary: '#424242',
          // accent: '#82B1FF',
          // error: '#FF5252',
          // info: '#2196F3',
          // success: '#4CAF50',
          // warning: '#FFC107',
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
};
