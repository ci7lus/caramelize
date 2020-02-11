<template>
  <ThePostList :page="page" :posts="posts" />
</template>

<script lang="ts">
import Vue, { VNode } from "vue"
import { Post } from "~/types/struct"
import { ThePostList } from "~/components/partials/index/ThePostList"

export default Vue.extend({
  props: {
    page: Number,
    posts: Array as () => Omit<Post, "content">[],
  },
  components: { ThePostList },
  head() {
    return {
      meta:
        0 < this.posts.length
          ? [
              {
                hid: "description",
                name: "description",
                content: `最新の記事は "${this.posts[0].title}" です`,
              },
              {
                hid: "og:description",
                name: "og:description",
                content: `最新の記事は "${this.posts[0].title}" です`,
              },
            ]
          : [],
    }
  },
})
</script>
