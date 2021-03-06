import Vue, { VNode, CreateElement } from "vue"
import * as tsx from "vue-tsx-support"
import { Post } from "~/types/struct"
import { formatString } from "~/constants"
import { PageType, LineNodeType } from "@tosuke/scrapbox-parser"
import {
  SCRAPBOX_PROJECT,
  TWITTER_ID,
  SITE_NAME,
  GITHUB_ID,
  SITE_ROOT,
} from "~/config"
import {
  FeatherEditIcon,
  FeatherClockIcon,
  FeatherTwitterIcon,
  FeatherPenToolIcon,
  FeatherGithubIcon,
} from "~/components/commons/FeatherIcons"
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import { languages } from "~/plugins/highlight"

dayjs.extend(utc)

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
          {dayjs(this.post.createdAt).utc().add(9, "hour").format(formatString)}
          <span class="px-2">
            <FeatherClockIcon />
          </span>
          {dayjs(this.post.updatedAt).utc().add(9, "hour").format(formatString)}
        </p>
        <div class="content leading-loose break-words">
          {contentRender(this.post.content!, h)}
        </div>
        <div class="flex items-center justify-center p-2 text-center text-sm">
          <p>
            Generated from
            <br />
            <a
              class="text-blue-500"
              href={`https://scrapbox.io/${SCRAPBOX_PROJECT}/${this.post.title}`}
              target="_blank"
              rel="noopener"
            >
              {this.post.title}
            </a>
          </p>
        </div>
        <div class="flex items-center justify-center flex-col md:flex-row">
          <div class="flex items-center justify-center p-2 text-center text-sm">
            <button
              aria-label="Twitter シェアボタン "
              class="bg-twitter text-white font-bold py-2 px-3 rounded-md m-2 text-sm"
              onClick={(e: any) => {
                window.open(
                  `https://twitter.com/intent/tweet?url=${encodeURIComponent(
                    SITE_ROOT
                      ? `https://${SITE_ROOT}${window.location.pathname}`
                      : window.location.href
                  )}&text=${encodeURIComponent(
                    `${this.post.title} | ${SITE_NAME}`
                  )}${TWITTER_ID ? `&via=${TWITTER_ID}` : ""}`,
                  "github_share",
                  "width=600, height=500, menubar=no, toolbar=no, scrollbars=yes"
                )
              }}
            >
              <FeatherTwitterIcon />
              &nbsp;Tweet
            </button>
          </div>
          <div class="hidden md:block py-6 px-1 bg-gray-800 light:bg-gray-400" />
          <div class="flex items-center justify-center p-4 m-2">
            <div class="pr-4">
              <FeatherPenToolIcon />
            </div>
            <img
              class="w-10 h-10 mr-2 bg-gray-600 rounded light:bg-gray-400"
              src={this.post.user.photo}
              alt="著者の画像"
              loading="lazy"
            />
            <div class="text-sm">
              <p class="leading-none">{this.post.user.displayName}</p>
              <p class="text-xs">@{this.post.user.name}</p>
            </div>
            {TWITTER_ID && (
              <div class="pl-2">
                <a
                  href={`https://twitter.com/${TWITTER_ID}`}
                  target="_blank"
                  rel="noopener"
                >
                  <button aria-label="著者の Twitter">
                    <div class="p-2 flex items-center justify-center leading-none rounded-md bg-gray-800 light:bg-blue-300 light:text-gray-100">
                      <FeatherTwitterIcon size={14} />
                    </div>
                  </button>
                </a>
              </div>
            )}
            {GITHUB_ID && (
              <div class="pl-2">
                <a
                  href={`https://github.com/${GITHUB_ID}`}
                  target="_blank"
                  rel="noopener"
                >
                  <button aria-label="著者の GitHub">
                    <div class="p-2 flex items-center justify-center leading-none rounded-md bg-gray-800 light:bg-gray-800 light:text-gray-100">
                      <FeatherGithubIcon size={14} />
                    </div>
                  </button>
                </a>
              </div>
            )}
          </div>
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
      node.decos.map((deco) => {
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
                if (8 <= size) {
                  decorationTags.push("text-6xl")
                } else if (7 <= size) {
                  decorationTags.push("text-5xl")
                } else if (6 <= size) {
                  decorationTags.push("text-4xl")
                } else if (5 <= size) {
                  decorationTags.push("text-3xl")
                } else if (4 <= size) {
                  decorationTags.push("text-2xl")
                } else if (3 <= size) {
                  decorationTags.push("text-xl")
                } else if (2 <= size) {
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
        <nuxt-link to={`/tags/${node.href}`}>
          <button
            key={key}
            type="button"
            class="inline-block bg-gray-600 p-2 py-1 text-xs font-semibold mr-2 rounded light:bg-gray-300"
            aria-label={`${node.href} の投稿一覧`}
          >
            #{node.href}
          </button>
        </nuxt-link>
      )
    case "link":
      if (node.href.startsWith("http")) {
        return (
          <a
            class="text-blue-500"
            key={key}
            href={node.href}
            target="_blank"
            rel="noopener"
          >
            {node.content.length === 0 ? node.href : node.content}
          </a>
        )
      } else {
        return (
          <nuxt-link
            key={key}
            to={`/posts/${encodeURIComponent(node.href)}`}
            class="text-blue-500"
          >
            {node.href}
          </nuxt-link>
        )
      }
    case "icon":
      if (node.path.includes("[")) {
        return
      }
      switch (node.pathType) {
        case "relative":
          return (
            <img
              class="w-6 inline"
              src={`https://scrapbox.io/api/pages/${SCRAPBOX_PROJECT}/${encodeURIComponent(
                node.path
              )}/icon`}
              loading="lazy"
              key={key}
              alt={`${node.path} のアイコン`}
            />
          )
        case "root":
          return (
            <a
              key={key}
              href={`https://scrapbox.io${node.path}`}
              target="_blank"
              rel="noopener"
            >
              <img
                class="w-6 inline"
                src={`https://scrapbox.io/api/pages${node.path}/icon`}
                loading="lazy"
                alt={`${node.path} のアイコン`}
              />
            </a>
          )
        default:
          return (
            <p class="text-gray-600 text-sm light:texr-gray-400" key={key}>
              not supported icon
            </p>
          )
      }
    case "image":
      return (
        <div key={key}>
          {0 < node.link.length ? (
            <a href={node.link} target="_blank" rel="noopener">
              <img src={node.src} loading="lazy" alt="" />
            </a>
          ) : (
            <img src={node.src} loading="lazy" alt="" />
          )}
        </div>
      )
    case "plain":
      return <span key={key}>{node.text}</span>
    case "quote":
      return (
        <p
          key={key}
          class="border-l-4 pl-2 border-gray-600 bg-gray-900 light:bg-gray-200 light:border-gray-400"
        >
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
        <p class="text-gray-600 text-sm light:text-gray-400" key={key}>
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
            <div style={{ paddingLeft: `${line.indent}rem` }} key={`line-${l}`}>
              {line.nodes.map((node, k) => lineNodeTypeRender(node, k, h))}
            </div>
          )
        } else {
          return (
            <ul style={{ paddingLeft: `${line.indent}rem` }} key={`line-${l}`}>
              <li>
                {line.nodes.map((node, k) => lineNodeTypeRender(node, k, h))}
              </li>
            </ul>
          )
        }
      case "codeBlock":
        const ext = line.fileName.trim().split(".").pop()!
        return (
          <div class="text-sm leading-relaxed py-2">
            <code class="bg-gray-800 light:bg-gray-200">{line.fileName}</code>
            <highlight-code lang={languages[ext] && ext}>
              <pre>{line.content}</pre>
            </highlight-code>
          </div>
        )
      default:
        break
    }
  })
}
