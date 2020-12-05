<template>
  <Index :page="page" :posts="posts" />
</template>

<script lang="ts">
import Vue from "vue"
import Index from "~/components/pages/Index.vue"
import { getPosts } from "~/utils/scrapbox"
import { SITE_NAME } from "../config"

export default Vue.extend({
  components: { Index },
  watchQuery: ["p"],
  async asyncData({ query, error }) {
    try {
      const page = parseInt(query.p as string) || 0

      const posts = await getPosts(undefined, page)

      return { page, posts }
    } catch (e) {
      console.error(e)
      return error({ statusCode: 500 })
    }
  },
  head: {
    title: SITE_NAME,
    titleTemplate: "",
  },
})
</script>

<style lang="scss"></style>
