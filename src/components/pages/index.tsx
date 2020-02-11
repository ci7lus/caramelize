import Vue, { VNode } from "vue"
import * as tsx from "vue-tsx-support"

export const Index = tsx.component({
  name: "Index",
  props: {},
  render(): VNode {
    return (
      <div class="container mx-auto max-w-screen-md">
        <div class="p-4">
          <p>Hello! TSX Element in Nuxt.js!</p>
          <div class="text-center">Hello! TSX Element in Nuxt.js!</div>
        </div>
      </div>
    )
  },
})
