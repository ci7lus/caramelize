import Vue, { VNode } from "vue"
import * as tsx from "vue-tsx-support"
import { SITE_NAME } from "~/config"

export const TheHeader = tsx.component({
  name: "TheHeader",
  render(): VNode {
    return (
      <div class="bg-gray-900">
        <div class="container mx-auto flex justify-between max-w-screen-md">
          <nuxt-link to="/" tag="a">
            <div class="flex items-center justify-start mx-4 my-3">
              {SITE_NAME === "Caramelize" ? (
                <img alt="Caramelize" src="/logo.svg" width="100" />
              ) : (
                <h1
                  class="font-bold text-lg"
                  style={{ fontFamily: "Avenir Next" }}
                >
                  {SITE_NAME}
                </h1>
              )}
            </div>
          </nuxt-link>
        </div>
      </div>
    )
  },
})
