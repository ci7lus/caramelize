<template>
  <ThePostDetail :post="post" />
</template>

<script lang="ts">
import Vue, { VNode } from "vue"
import { Post } from "~/types/struct"
import { ThePostDetail } from "~/components/partials/posts/ThePostDetail"
import { SITE_ROOT } from "~/config"
import type { MetaInfo } from "vue-meta"

export default Vue.extend({
  props: {
    post: {
      type: Object as () => Post,
      required: true,
    },
  },
  components: { ThePostDetail },
  head() {
    const meta: MetaInfo["meta"] = [
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
    ]
    if (this.post.image) {
      meta.push({
        hid: "og:image",
        name: "og:image",
        content: this.post.image,
      })
    }
    const link: MetaInfo["link"] = []
    if (SITE_ROOT) {
      link.push({
        rel: "canonical",
        href: `https://${SITE_ROOT}/posts/${encodeURIComponent(
          this.post.title
        )}`,
      })
    }
    return {
      title: this.post.title,
      meta,
      link,
    }
  },
})
</script>
