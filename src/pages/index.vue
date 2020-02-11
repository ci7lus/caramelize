<template>
  <Index :page="page" :posts="posts" />
</template>

<script lang="ts">
import Vue from "vue"
import { Index } from "~/components/pages/index"
import { getPosts } from "~/utils/scrapbox"

export default Vue.extend({
  components: { Index },
  watchQuery: ["p"],
  async asyncData({ query, error }) {
    try {
      const page = parseInt(query.p as string) || 0

      const posts = await getPosts(undefined, page)

      return { page, posts }
    } catch (e) {
      return error({ statusCode: 500 })
    }
  },
  head: {
    title: "Caramelize",
    titleTemplate: "",
  },
})
</script>

<style lang="scss"></style>
