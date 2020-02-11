import Vue, { VNode } from "vue"
import * as tsx from "vue-tsx-support"
import { Post } from "~/types/struct"
import dayjs from "dayjs"
import {
  FeatherClockIcon,
  FeatherEditIcon,
} from "~/components/commons/FeatherIcons"
import { formatString } from "~/constants"

export const PostCard = tsx.component({
  name: "PostCard",
  props: {
    post: {
      type: Object as () => Post,
      required: true,
    },
  },
  render(): VNode {
    return (
      <div class="md:max-w-full md:flex py-4">
        <nuxt-link
          to={`/posts/${this.post.title}`}
          tag="div"
          class="h-48 md:h-auto md:w-1/4 flex-none bg-cover text-center bg-gray-700 rounded-t lg:rounded-t-none lg:rounded-l"
          style={{
            backgroundImage: this.post.image ? `url("${this.post.image}")` : "",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div class="bg-gray-800 p-4 flex flex-col justify-between leading-normal rounded-b lg:rounded-b-none lg:rounded-r md:w-3/4">
          <div class="mb-4">
            <div class="pb-2">
              {this.post.tags.map((tag, tagK) => (
                <nuxt-link
                  to={`/tags/${tag}`}
                  tag="a"
                  key={tagK}
                  class="inline-block bg-gray-700 p-3 py-1 text-xs font-semibold mr-2 rounded"
                >
                  #{tag}
                </nuxt-link>
              ))}
            </div>
            <div class="font-bold text-xl mb-2 truncate">
              <nuxt-link to={`/posts/${this.post.title}`} tag="a">
                {this.post.title}
              </nuxt-link>
            </div>
            <p class="pb-2 align-middle">
              <span class="pr-2">
                <FeatherEditIcon />
              </span>
              {dayjs(this.post.createdAt).format(formatString)}
              <span class="px-2">
                <FeatherClockIcon />
              </span>
              {dayjs(this.post.updatedAt).format(formatString)}
            </p>
            <p class="break-words">{this.post.description}…</p>
          </div>
        </div>
      </div>
    )
  },
})
