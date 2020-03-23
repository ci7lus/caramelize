import Vue, { VNode } from "vue"
import * as tsx from "vue-tsx-support"
import { Post } from "~/types/struct"
import { PostCard } from "~/components/commons/PostCard"

export const ThePostList = tsx.component({
  name: "ThePostList",
  props: {
    page: {
      type: Number,
      required: true,
    },
    posts: {
      type: Array as () => Post[],
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
              class={`bg-gray-600 hover:bg-gray-500 text-gray-200 font-bold py-2 px-4 rounded-l light:bg-gray-100 light:text-gray-800 ${this
                .page === 0 &&
                "cursor-not-allowed bg-gray-500 hover:bg-gray-500 light:bg-gray-300 light:hover:bg-gray-300"}`}
            >
              Prev
            </nuxt-link>
            <nuxt-link
              to={`/?p=${this.posts.length < 10 ? this.page : this.page + 1}`}
              tag="button"
              class="bg-gray-600 hover:bg-gray-500 text-gray-200 font-bold py-2 px-4 rounded-r light:bg-gray-100 light:text-gray-800"
            >
              Next
            </nuxt-link>
          </div>
        </div>
      </div>
    )
  },
})
