import Vue, { VNode, CreateElement } from "vue"
import * as tsx from "vue-tsx-support"
import { Post } from "~/types/struct"
import { formatString } from "~/constants"
import { PageType, LineNodeType } from "@tosuke/scrapbox-parser"
import { SCRAPBOX_PROJECT } from "~/config"
import {
  FeatherEditIcon,
  FeatherClockIcon,
} from "~/components/commons/FeatherIcons"
import dayjs from "dayjs"
import { languages } from "~/plugins/highlight"

export const ThePostDetail = tsx.component({
  name: "ThePostDetail",
  props: {
    post: {
      type: Object as () => Post,
      required: true,
    },
  },
  render(h: CreateElement): VNode {
    return (
      <div class="container mx-auto max-w-screen-md p-4">
        <h1 class="border-b border-l-4 border-gray-400 pl-2 py-1 mb-1">
          <p class="font-bold text-xl">{this.post.title}</p>
        </h1>

        <p class="text-right mb-2 text-sm pb-2 align-middle">
          <span class="pr-2">
            <FeatherEditIcon />
          </span>
          {dayjs(this.post.createdAt).format(formatString)}
          <span class="px-2">
            <FeatherClockIcon />
          </span>
          {dayjs(this.post.updatedAt).format(formatString)}
        </p>
        <div class="content leading-loose break-words">
          {contentRender(this.post.content!, h)}
        </div>
        <div class="flex items-center justify-center py-4">
          <p class="mr-4">Author:</p>
          <img
            class="w-10 h-10 mr-4 bg-gray-600 rounded"
            v-lazy={this.post.user.photo}
          />
          <div class="text-sm">
            <p class="leading-none">{this.post.user.displayName}</p>
            <p class="text-xs">@{this.post.user.name}</p>
          </div>
        </div>
        <div class="bg-gray-800 p-1" />
        <div class="flex items-center justify-center p-4 text-center text-sm">
          <p>
            Generated from
            <br />
            <a
              class="text-blue-500"
              href={`https://scrapbox.io/${SCRAPBOX_PROJECT}/${this.post.title}`}
              target="_blank"
            >
              {this.post.title}
            </a>
          </p>
        </div>
      </div>
    )
  },
})

export const lineNodeTypeRender = (
  node: LineNodeType,
  key: string | number,
  h: CreateElement
) => {
  switch (node.type) {
    case "blank":
      return <p key={key}></p>
    case "code":
      return (
        <code key={key} class="text-sm bg-gray-700">
          <highlight-code auto={true} inline>
            {node.text}
          </highlight-code>
        </code>
      )
    case "decoration":
      const decorationTags: string[] = []
      node.decos.map(deco => {
        switch (deco) {
          case "/":
            decorationTags.push("italic")
            break
          case "-":
            decorationTags.push("line-through")
            break
          default:
            if (deco.includes("*")) {
              decorationTags.push("font-bold")
              const size = parseInt(deco.replace("*-", ""))
              if (!Number.isNaN(size)) {
                if (9 <= size) {
                  decorationTags.push("text-6xl")
                } else if (8 <= size) {
                  decorationTags.push("text-5xl")
                } else if (7 <= size) {
                  decorationTags.push("text-4xl")
                } else if (6 <= size) {
                  decorationTags.push("text-3xl")
                } else if (5 <= size) {
                  decorationTags.push("text-2xl")
                } else if (4 <= size) {
                  decorationTags.push("text-xl")
                } else if (3 <= size) {
                  decorationTags.push("text-lg")
                }
              }
            }
        }
      })
      return (
        <span class={decorationTags.join(" ")} key={key}>
          {node.nodes.map((childNode, k) =>
            lineNodeTypeRender(childNode, k, h)
          )}
        </span>
      )
    case "hashTag":
      return (
        <nuxt-link
          key={key}
          tag="a"
          to={`/tags/${node.href}`}
          class="inline-block bg-gray-600 p-2 py-1 text-xs font-semibold mr-2 rounded"
        >
          #{node.href}
        </nuxt-link>
      )
    case "link":
      return (
        <a class="text-blue-500" key={key} href={node.href} target="_blank">
          {node.content.length === 0 ? node.href : node.content}
        </a>
      )
    case "icon":
      if (node.path.includes("[")) {
        return <img class="icon" key={key} />
      }
      switch (node.pathType) {
        case "relative":
          return (
            <img
              class="w-6 inline"
              v-lazy={`https://scrapbox.io/api/pages/${SCRAPBOX_PROJECT}/${encodeURIComponent(
                node.path
              )}/icon`}
              key={key}
            />
          )
        case "root":
          return (
            <img
              class="w-6 inline"
              v-lazy={`https://scrapbox.io/api/pages${node.path}/icon`}
              key={key}
            />
          )
        default:
          return (
            <p class="text-gray-600 text-sm" key={key}>
              not supported icon ({node!.pathType})
            </p>
          )
      }
    case "image":
      return (
        <div key={key}>
          <img v-lazy={node.src}></img>
        </div>
      )
    case "plain":
      return <span key={key}>{node.text}</span>
    case "quote":
      return (
        <p key={key} class="border-l-4 pl-2 border-gray-600 bg-gray-900">
          {node.nodes.map((childNode, k) =>
            lineNodeTypeRender(childNode, k, h)
          )}
        </p>
      )
    case "strong":
      return (
        <b key={key}>
          {node.nodes.map((childNode, k) =>
            lineNodeTypeRender(childNode, k, h)
          )}
        </b>
      )
    default:
      return (
        <p class="text-gray-600 text-sm" key={key}>
          not supported ({node!.type})
        </p>
      )
  }
}

export const contentRender = (content: PageType, h: CreateElement) => {
  return content.map((line, l) => {
    switch (line.type) {
      case "title":
        return
      case "line":
        if (line.nodes.length === 0) {
          return <br key={`line-${l}`} />
        }
        if (line.indent === 0) {
          return (
            <div class={`pl-${line.indent * 4}`} key={`line-${l}`}>
              {line.nodes.map((node, k) => lineNodeTypeRender(node, k, h))}
            </div>
          )
        } else {
          return (
            <ul
              class={`pl-${line.indent * 4}`}
              key={`line-${l}`}
              style={{ listStyleType: "circle" }}
            >
              <li>
                {line.nodes.map((node, k) => lineNodeTypeRender(node, k, h))}
              </li>
            </ul>
          )
        }
      case "codeBlock":
        const ext = line.fileName
          .trim()
          .split(".")
          .pop()!
        return (
          <div>
            <code class="bg-gray-800 text-sm">{line.fileName}</code>
            <div class="text-sm">
              <highlight-code lang={languages[ext] && ext}>
                {line.content}
              </highlight-code>
            </div>
          </div>
        )
      default:
        break
    }
  })
}
