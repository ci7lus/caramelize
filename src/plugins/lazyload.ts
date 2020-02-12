import Vue from "vue"
import { Plugin } from "@nuxt/types"
import VueLazyload from "vue-lazyload"

const RegisterPlugin: Plugin = () => {
  Vue.use(VueLazyload)
}

export default RegisterPlugin
