import Vue, { CreateElement, VNode } from "vue"
import * as tsx from "vue-tsx-support"

export const Index = tsx.component({
  name: "Index",
  props: {},
  render(): VNode {
    return (
      <div class="m-auto">
        <div class="text-center">Hello! TSX Element in Nuxt.js!</div>
      </div>
    )
  },
})
