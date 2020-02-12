<template>
  <TheTaggedPost :posts="posts" :page="page" :tag="tag" />
</template>

<script lang="ts">
import Vue from "vue"
import TheTaggedPost from "~/components/pages/tags/TheTaggedPost.vue"
import { getPost, getPosts } from "~/utils/scrapbox"
import { Post } from "~/types/struct"

export default Vue.extend({
  components: { TheTaggedPost },
  watchQuery: ["p"],
  async asyncData({ params, query, error }) {
    const routeParams = params || {}
    const { tag } = routeParams

    if (!tag || tag.length === 0) {
      return error({ statusCode: 404 })
    }

    const page = parseInt(query.p as string) || 0

    try {
      const posts = await getPosts(`#${tag}`, page)

      if (posts.length === 0) {
        return error({ statusCode: 404 })
      }

      return { posts, page, tag }
    } catch (e) {
      return error({ statusCode: 500 })
    }
  },
})
</script>

<style lang="scss"></style>
