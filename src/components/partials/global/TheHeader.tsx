import Vue, { VNode } from "vue"
import * as tsx from "vue-tsx-support"

export const TheHeader = tsx.component({
  name: "TheHeader",
  render(): VNode {
    return (
      <div class="bg-gray-900">
        <div class="container mx-auto flex justify-between max-w-screen-md">
          <nuxt-link to="/" tag="a">
            <div class="flex items-center justify-start mx-4 my-3">
              <img src="/caramelize.svg" width="100" />
            </div>
          </nuxt-link>
        </div>
      </div>
    )
  },
})
