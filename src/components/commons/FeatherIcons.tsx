import Vue, { VNode } from "vue"
import * as tsx from "vue-tsx-support"

import {
  HeartIcon,
  ClockIcon,
  EditIcon,
  TwitterIcon,
  BookmarkIcon,
  LinkIcon,
  PenToolIcon,
  // @ts-ignore
} from "vue-feather-icons"

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

export const FeatherTwitterIcon = tsx.component({
  name: "FeatherTwitterIcon",
  props: {
    size: {
      type: Number,
      required: false,
      default: 16,
    },
  },
  render(): VNode {
    return <TwitterIcon class="inline" size={this.size.toString()} />
  },
})

export const FeatherBookmarkIcon = tsx.component({
  name: "FeatherBookmarkIcon",
  props: {
    size: {
      type: Number,
      required: false,
      default: 16,
    },
  },
  render(): VNode {
    return <BookmarkIcon class="inline" size={this.size.toString()} />
  },
})

export const FeatherLinkIcon = tsx.component({
  name: "FeatherLinkIcon",
  props: {
    size: {
      type: Number,
      required: false,
      default: 16,
    },
  },
  render(): VNode {
    return <LinkIcon class="inline" size={this.size.toString()} />
  },
})

export const FeatherPenToolIcon = tsx.component({
  name: "FeatherPenToolIcon",
  props: {
    size: {
      type: Number,
      required: false,
      default: 16,
    },
  },
  render(): VNode {
    return <PenToolIcon class="inline" size={this.size.toString()} />
  },
})
