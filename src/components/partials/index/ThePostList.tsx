import Vue, { VNode } from "vue"
import * as tsx from "vue-tsx-support"
import { Post } from "~/types/struct"
import { PostCard } from "~/components/partials/index/PostCard"

export const ThePostList = tsx.component({
  name: "ThePostList",
  props: {
    page: {
      type: Number,
      required: true,
    },
    posts: {
      type: Array as () => Omit<Post, "content">[],
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
          {this.posts.map(post => (
            <PostCard post={post} key={post.title} />
          ))}
          <div class="flex justify-center p-4">
            <nuxt-link
              to={`/?p=${this.page === 0 ? this.page : this.page - 1}`}
              tag="button"
              class={`bg-gray-600 hover:bg-gray-500 text-gray-200 font-bold py-2 px-4 rounded-l ${this
                .page === 0 &&
                "cursor-not-allowed bg-gray-500 hover:bg-gray-500"}`}
            >
              Prev
            </nuxt-link>
            <nuxt-link
              to={`/?p=${this.posts.length < 10 ? this.page : this.page + 1}`}
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
