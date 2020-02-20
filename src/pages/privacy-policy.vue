<template>
  <ThePrivacyPolicy />
</template>

<script lang="ts">
import Vue from "vue"
import { GA } from "~/config"
import { ThePrivacyPolicy } from "~/components/pages/ThePrivacyPolicy"

export default Vue.extend({
  head: {
    title: "プライバシーポリシー",
  },
  components: { ThePrivacyPolicy },
  async asyncData({ error }) {
    if (!GA) {
      return error({ statusCode: 404 })
    }
  },
})
</script>
