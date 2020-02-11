<template>
  <ThePost :post="post" />
</template>

<script lang="ts">
import Vue from "vue"
import ThePost from "~/components/pages/posts/ThePost.vue"
import { getPost } from "~/utils/scrapbox"
import { Post } from "../../types/struct"

export default Vue.extend({
  components: { ThePost },
  async asyncData({ params, query, error }) {
    const routeParams = params || {}
    const { title } = routeParams

    if (!title) {
      return error({ statusCode: 404 })
    }

    try {
      const post = await getPost(title)

      if (post === null) {
        return error({ statusCode: 404 })
      }

      return { post }
    } catch (e) {
      return error({ statusCode: 500 })
    }
  },
})
</script>

<style lang="scss"></style>
