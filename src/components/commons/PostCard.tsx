import Vue, { VNode } from "vue"
import * as tsx from "vue-tsx-support"
import { Post } from "~/types/struct"
import {
  FeatherClockIcon,
  FeatherEditIcon,
} from "~/components/commons/FeatherIcons"
import { formatString } from "~/constants"
import moment from "moment"
import "moment-timezone"
import { PostTag } from "./PostTag"
import BackgroundImage from "~/components/commons/BackgroundImage.vue"

export const PostCard = tsx.component({
  name: "PostCard",
  props: {
    post: {
      type: Object as () => Post,
      required: true,
    },
  },
  components: {
    PostTag,
    BackgroundImage,
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
              <BackgroundImage
                class="h-48 md:h-auto md:w-1/4 flex-none bg-cover text-center bg-gray-700 rounded-t lg:rounded-t-none lg:rounded-l bg-cover bg-center"
                img={this.post.image}
              />
            ) : (
              <div class="h-48 md:h-auto md:w-1/4 flex-none bg-cover text-center bg-gray-700 rounded-t lg:rounded-t-none lg:rounded-l bg-cover bg-center" />
            )}
            <div class="bg-gray-800 p-4 flex flex-col justify-between leading-normal rounded-b lg:rounded-b-none lg:rounded-r md:w-3/4">
              <div class="mb-4">
                <div class="pb-2">
                  {this.post.tags.map(tag => (
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
                <div class="pb-2 align-middle">
                  <span class="pr-2">
                    <FeatherEditIcon />
                  </span>
                  {moment(this.post.createdAt)
                    .tz("Asia/Tokyo")
                    .format(formatString)}
                  <span class="px-2">
                    <FeatherClockIcon />
                  </span>
                  {moment(this.post.updatedAt)
                    .tz("Asia/Tokyo")
                    .format(formatString)}
                </div>
                <div class="break-words">{this.post.description}…</div>
              </div>
            </div>
          </div>
        </nuxt-link>
      </div>
    )
  },
})
