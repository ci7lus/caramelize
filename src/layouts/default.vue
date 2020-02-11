<template>
  <div class="min-h-screen w-full flex flex-col text-gray-200">
    <TheHeader />
    <div class="flex-1 bg-black">
      <nuxt />
    </div>
    <TheFooter />
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import { TheHeader } from "~/components/partials/global/TheHeader"
import { TheFooter } from "~/components/partials/global/TheFooter"

export default Vue.extend({
  components: {
    TheHeader,
    TheFooter,
  },
})
</script>

<style lang="scss"></style>
