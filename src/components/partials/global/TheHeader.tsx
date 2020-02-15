import Vue, { VNode } from "vue"
import * as tsx from "vue-tsx-support"
import { SITE_NAME, TWITTER_ID, GITHUB_ID } from "~/config"
import {
  FeatherGithubIcon,
  FeatherTwitterIcon,
} from "~/components/commons/FeatherIcons"

export const TheHeader = tsx.component({
  name: "TheHeader",
  render(): VNode {
    return (
      <div class="bg-gray-900">
        <div class="flex items-center container mx-auto flex justify-between max-w-screen-md">
          <div class="flex items-center justify-start">
            <nuxt-link to="/" tag="a">
              <div class="flex items-center justify-start mx-4 my-3">
                {SITE_NAME === "Caramelize" ? (
                  <img
                    alt="Caramelize"
                    src="/logo.svg"
                    loading="auto"
                    width="100"
                    height="30"
                  />
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
          <div class="flex items-center justify-end">
            <div class="mx-4">
              {TWITTER_ID && (
                <a href={`https://twitter.com/${TWITTER_ID}`} target="_blank">
                  <button class="ml-2">
                    <div class="flex items-center justify-center rounded-md p-2 bg-gray-800">
                      <FeatherTwitterIcon size={14} />
                    </div>
                  </button>
                </a>
              )}
              {GITHUB_ID && (
                <a href={`https://github.com/${GITHUB_ID}`} target="_blank">
                  <button class="ml-2">
                    <div class="flex items-center justify-center rounded-md p-2 bg-gray-800">
                      <FeatherGithubIcon size={14} />
                    </div>
                  </button>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  },
})
