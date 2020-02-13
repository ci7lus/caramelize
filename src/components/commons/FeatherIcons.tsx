import Vue, { VNode } from "vue"
import * as tsx from "vue-tsx-support"

// @ts-ignore
import { HeartIcon, ClockIcon, EditIcon } from "vue-feather-icons"

export const FeatherHeartIcon = tsx.component({
  name: "FeatherHeartIcon",
  props: {
    size: {
      type: Number,
      required: false,
      default: 16,
    },
  },
  render(): VNode {
    return <HeartIcon class="inline" size={this.size.toString()} />
  },
})

export const FeatherClockIcon = tsx.component({
  name: "FeatherClockIcon",
  props: {
    size: {
      type: Number,
      required: false,
      default: 16,
    },
  },
  render(): VNode {
    return <ClockIcon class="inline" size={this.size.toString()} />
  },
})

export const FeatherEditIcon = tsx.component({
  name: "FeatherEditIcon",
  props: {
    size: {
      type: Number,
      required: false,
      default: 16,
    },
  },
  render(): VNode {
    return <EditIcon class="inline" size={this.size.toString()} />
  },
})
