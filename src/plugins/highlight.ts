import Vue from "vue"
import { Plugin } from "@nuxt/types"

// @ts-ignore
import hljs from "highlight.js/lib/highlight"
import VueHighlightJS from "vue-highlight.js"

const bash = require("highlight.js/lib/languages/bash")
const coffeescript = require("highlight.js/lib/languages/coffeescript")
const cpp = require("highlight.js/lib/languages/cpp")
const cs = require("highlight.js/lib/languages/cs")
const crystal = require("highlight.js/lib/languages/crystal")
const css = require("highlight.js/lib/languages/css")
const d = require("highlight.js/lib/languages/d")
const dockerfile = require("highlight.js/lib/languages/dockerfile")
const elixir = require("highlight.js/lib/languages/elixir")
const elm = require("highlight.js/lib/languages/elm")
const erlang = require("highlight.js/lib/languages/erlang")
const glsl = require("highlight.js/lib/languages/glsl")
const go = require("highlight.js/lib/languages/go")
const haskell = require("highlight.js/lib/languages/haskell")
const java = require("highlight.js/lib/languages/java")
const javascript = require("highlight.js/lib/languages/javascript")
const json = require("highlight.js/lib/languages/json")
const kotlin = require("highlight.js/lib/languages/kotlin")
const less = require("highlight.js/lib/languages/less")
const lua = require("highlight.js/lib/languages/lua")
const markdown = require("highlight.js/lib/languages/markdown")
const matlab = require("highlight.js/lib/languages/matlab")
const perl = require("highlight.js/lib/languages/perl")
const php = require("highlight.js/lib/languages/php")
const powershell = require("highlight.js/lib/languages/powershell")
const python = require("highlight.js/lib/languages/python")
const r = require("highlight.js/lib/languages/r")
const ruby = require("highlight.js/lib/languages/ruby")
const rust = require("highlight.js/lib/languages/rust")
const scala = require("highlight.js/lib/languages/scala")
const scss = require("highlight.js/lib/languages/scss")
const sql = require("highlight.js/lib/languages/sql")
const stylus = require("highlight.js/lib/languages/stylus")
const swift = require("highlight.js/lib/languages/swift")
const tex = require("highlight.js/lib/languages/tex")
const typescript = require("highlight.js/lib/languages/typescript")
const yaml = require("highlight.js/lib/languages/yaml")
// @ts-ignore
import { definer as vue } from "highlightjs-vue/dist/highlightjs-vue.esm"
const xml = require("highlight.js/lib/languages/xml")

export const languages: { [k: string]: any } = {
  sh: bash,
  bash: bash,
  coffee: coffeescript,
  cpp: cpp,
  cs: cs,
  crystal: crystal,
  css: css,
  d: d,
  dockerfile: dockerfile,
  el: elixir,
  elixir: elixir,
  elm: elm,
  er: erlang,
  erlang: erlang,
  glsl: glsl,
  go: go,
  hs: haskell,
  java: java,
  js: javascript,
  javascript: javascript,
  jsx: javascript,
  json: json,
  kt: kotlin,
  kotlin: kotlin,
  less: less,
  lua: lua,
  md: markdown,
  markdown: markdown,
  m: matlab,
  matlab: matlab,
  perl: perl,
  php: php,
  powershell: powershell,
  python: python,
  py: python,
  ipynb: python,
  r: r,
  rb: ruby,
  ruby: ruby,
  rs: rust,
  rust: rust,
  scala: scala,
  scss: scss,
  sql: sql,
  stylus: stylus,
  swift: swift,
  tex: tex,
  typescript: typescript,
  ts: typescript,
  tsx: javascript,
  yml: yaml,
  vue: vue,
  xml: xml,
}

const RegisterPlugin: Plugin = () => {
  Object.entries(languages).map(([language, parser]) => {
    hljs.registerLanguage(language, parser)
  })

  Vue.use(VueHighlightJS, {
    languages,
  })
}

export default RegisterPlugin
