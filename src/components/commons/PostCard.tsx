import Vue, { VNode } from "vue"
import * as tsx from "vue-tsx-support"
import { PostSummary } from "~/types/struct"
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import { PostTag } from "./PostTag"

dayjs.extend(utc)

export const PostCard = tsx.component({
  name: "PostCard",
  props: {
    post: {
      type: Object as () => PostSummary,
      required: true,
    },
  },
  components: {
    PostTag,
  },
  methods: {
    handleClickTag(tag: string) {
      this.$router.push(`/tags/${encodeURIComponent(tag)}`)
    },
  },
  render(): VNode {
    return (
      <div>
        <nuxt-link
          key={this.post.title}
          to={`/posts/${encodeURIComponent(this.post.title)}`}
          class="md:max-w-full block"
        >
          <div class="md:max-w-full md:flex items-stretch py-4 block">
            {this.post.image ? (
              <div
                class="h-48 md:h-auto md:w-1/4 flex-none bg-cover text-center bg-gray-700 rounded-t lg:rounded-t-none lg:rounded-l bg-center light:bg-gray-400"
                style={{ backgroundImage: `url("${this.post.image}")` }}
              />
            ) : (
              <div class="h-48 md:h-auto md:w-1/4 flex-none bg-cover text-center bg-gray-700 rounded-t lg:rounded-t-none lg:rounded-l bg-center light:bg-gray-400" />
            )}
            <div class="bg-gray-800 p-4 flex flex-col justify-between leading-normal rounded-b lg:rounded-b-none lg:rounded-r md:w-3/4 light:bg-gray-100">
              <div class="mb-4">
                <div class="pb-2">
                  {this.post.tags.map((tag) => (
                    <PostTag
                      tag={tag}
                      key={tag}
                      onClick={this.handleClickTag}
                    />
                  ))}
                </div>
                <div class="font-bold text-xl mb-2 break-words">
                  {this.post.title}
                </div>
              </div>
            </div>
          </div>
        </nuxt-link>
      </div>
    )
  },
})
