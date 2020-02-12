<template>
  <TheTaggedPostList :page="page" :posts="posts" :tag="tag" />
</template>

<script lang="ts">
import Vue, { VNode } from "vue"
import { Post } from "~/types/struct"
import { TheTaggedPostList } from "~/components/partials/tags/TheTaggedPostList"

export default Vue.extend({
  props: {
    tag: String,
    page: Number,
    posts: Array as () => Omit<Post, "content">[],
  },
  components: { TheTaggedPostList },
  head() {
    return {
      title: `#${this.tag} がついた投稿`,
      meta: [
        {
          hid: "description",
          name: "description",
          content: `#${this.tag} がついた投稿の一覧です`,
        },
        {
          hid: "og:description",
          name: "og:description",
          content: `#${this.tag} がついた投稿の一覧です`,
        },
      ],
    }
  },
})
</script>
