<template>
  <TheError :error="error" :statusCode="statusCode" />
</template>

<script lang="ts">
import Vue from "vue"
import { TheHeader } from "~/components/partials/global/TheHeader"
import { TheFooter } from "~/components/partials/global/TheFooter"
import { TheError } from "~/components/partials/global/TheError"

export default Vue.extend({
  name: "Error",
  components: { TheHeader, TheFooter, TheError },
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  computed: {
    statusCode() {
      return (this.error && this.error.statusCode) || 500
    },
  },
  head() {
    return {
      title: this.error.message,
    }
  },
})
</script>
