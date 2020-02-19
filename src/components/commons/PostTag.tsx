import Vue, { VNode } from "vue"
import * as tsx from "vue-tsx-support"

export const PostTag = tsx.component({
  name: "PostTag",
  props: {
    tag: {
      type: String,
    },
  },
  render(): VNode {
    return (
      <button
        aria-label={`${this.tag} の投稿一覧`}
        type="button"
        onClick={(event: Event) => {
          event.preventDefault()
          event.stopPropagation()
          this.$emit("click", this.tag)
        }}
        class="inline-block bg-gray-700 p-3 py-1 text-xs font-semibold mr-2 rounded"
      >
        #{this.tag}
      </button>
    )
  },
})
