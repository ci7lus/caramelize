<template>
  <div v-lazy:background-image="img" class="has-background" />
</template>

<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  props: {
    img: String,
  },
})
</script>
