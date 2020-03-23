import Vue, { VNode } from "vue"
import * as tsx from "vue-tsx-support"

export const TheError = tsx.component({
  name: "TheError",
  props: {
    error: {
      type: Object,
    },
    statusCode: {
      type: Number,
    },
  },
  render(): VNode {
    return (
      <div class="flex-1 bg-black m-auto light:bg-gray-200">
        <div class="container max-w-screen-md m-auto p-4">
          <div class="text-6xl">{this.statusCode}</div>
          <p>{this.error.message}</p>
        </div>
      </div>
    )
  },
})
