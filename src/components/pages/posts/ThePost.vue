<template>
  <ThePostDetail :post="post" />
</template>

<script lang="ts">
import Vue, { VNode } from "vue"
import { Post } from "~/types/struct"
import { ThePostDetail } from "~/components/partials/posts/ThePostDetail"

export default Vue.extend({
  props: {
    post: {
      type: Object as () => Post,
      required: true,
    },
  },
  components: { ThePostDetail },
  head() {
    return {
      title: this.post.title,
      meta: [
        {
          hid: "og:title",
          name: "og:title",
          content: this.post.title,
        },
        {
          hid: "description",
          name: "description",
          content: `"${this.post.description}"`,
        },
        {
          hid: "og:description",
          name: "og:description",
          content: `"${this.post.description}"`,
        },
      ],
    }
  },
})
</script>
