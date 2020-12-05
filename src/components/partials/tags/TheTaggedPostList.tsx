import Vue, { VNode } from "vue"
import * as tsx from "vue-tsx-support"
import { Post } from "~/types/struct"
import { PostCard } from "~/components/commons/PostCard"
import xss from "xss"

export const TheTaggedPostList = tsx.component({
  name: "TheTaggedPostList",
  props: {
    page: {
      type: Number,
      required: true,
    },
    posts: {
      type: Array as () => Post[],
      required: true,
    },
    tag: {
      type: String,
      required: true,
    },
  },
  components: {
    PostCard,
  },
  render(): VNode {
    return (
      <div class="container mx-auto max-w-screen-md">
        <div class="p-4">
          <h1 class="border-b border-l-4 border-gray-400 pl-2 py-1 font-bold">
            #{xss(this.tag)} のついた投稿 ({this.page + 1}ページ目)
          </h1>
          {this.posts.map((post) => (
            <PostCard post={post} key={post.title} />
          ))}
          <div class="flex justify-center p-4">
            <nuxt-link
              to={`/tags/${this.tag}/?p=${
                this.page === 0 ? this.page : this.page - 1
              }`}
              tag="button"
              class={`bg-gray-600 hover:bg-gray-500 text-gray-200 font-bold py-2 px-4 rounded-l ${
                this.page === 0 &&
                "cursor-not-allowed bg-gray-500 hover:bg-gray-500"
              }`}
            >
              Prev
            </nuxt-link>
            <nuxt-link
              to={`/tags/${this.tag}/?p=${
                this.posts.length < 10 ? this.page : this.page + 1
              }`}
              tag="button"
              class="bg-gray-600 hover:bg-gray-500 text-gray-200 font-bold py-2 px-4 rounded-r"
            >
              Next
            </nuxt-link>
          </div>
        </div>
      </div>
    )
  },
})
