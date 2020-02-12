import fetch from "node-fetch"
import {
  ScrapboxError,
  ScrapboxPage,
  ScrapboxSearchResult,
} from "~/types/scrapbox"
import { Post } from "~/types/struct"
import { parse } from "@tosuke/scrapbox-parser"
import querystring from "querystring"
import moment from "moment"
import "moment-timezone"
import { SCRAPBOX_PROJECT, SCRAPBOX_TAG } from "~/config"

export const getPageMeta = async (projectName: string, pageName: string) => {
  const url = process.server
    ? `https://scrapbox.io/api/pages/${projectName}/${encodeURIComponent(
        pageName
      )}?followRename=true`
    : `/api/${encodeURIComponent(pageName)}?followRename=true`

  const res = await fetch(url)
  if (res.status !== 200) {
    const body: ScrapboxError = await res.json()
    if (body.statusCode === 404) {
      return null
    } else {
      throw new Error(body.statusCode.toString())
    }
  }
  const body: ScrapboxPage = await res.json()
  return body
}

export const getPost = async (slug: string) => {
  const meta = await getPageMeta(SCRAPBOX_PROJECT, slug)
  if (meta === null) {
    return null
  }
  const text = meta.lines.map(line => line.text).join(" \n")
  if (!text.toLowerCase().includes(`${SCRAPBOX_TAG.toLowerCase()} `)) {
    return null
  }
  const parsed = parse(text)
  const tags = meta.links
    .filter(link => text.includes(`#${link}`))
    .filter(tag => tag.toLowerCase() !== "blog")
  const data: Post = {
    id: meta.id,
    title: meta.title,
    description: meta.descriptions.join(" "),
    image: meta.image,
    content: parsed,
    user: meta.user,
    tags,
    createdAt: moment(meta.created * 1000)
      .tz("Asia/Tokyo")
      .format(),
    updatedAt: moment(meta.updated * 1000)
      .tz("Asia/Tokyo")
      .format(),
  }
  return data
}

export const getPostsMaster = async (
  skip: number,
  limit: number,
  sort: "updated",
  q: string
) => {
  const qs = querystring.stringify({
    skip,
    limit,
    sort,
    q,
  })

  const url = process.server
    ? `https://scrapbox.io/api/pages/${SCRAPBOX_PROJECT}/search/query?${qs}`
    : `/api/search/query?${qs}`

  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(res.status.toString())
  }
  const body: ScrapboxSearchResult = await res.json()
  return body
}

export const getPosts = async (
  query: string = SCRAPBOX_TAG,
  page: number = 0,
  limit: number = 10
) => {
  // 現時点で skip が無視されてしまうので擬似的な　skip の実装
  if (100 < page * limit) {
    return []
  }
  const body = await getPostsMaster(0, 100, "updated", query)

  if (body.count < page * limit) {
    return []
  }

  return body.pages
    .filter(page =>
      page.snipet[0]
        .replace(/\<(\/|).+?\>/g, "")
        .toLowerCase()
        .includes(`${SCRAPBOX_TAG.toLowerCase()} `)
    )
    .slice(page * limit, page * limit + limit)
    .map(page => {
      const tags =
        page.snipet.length !== 0
          ? page.snipet[0]
              .replace(/\<(\/|).+?\>/g, "")
              .split(" ")
              .filter(tag => tag.includes("#"))
              .join(" ")
              .replace(/#/g, "")
              .split(" ")
              .filter(tag => tag.toLowerCase() !== "blog")
          : []
      const p: Omit<Post, "content"> = {
        id: page.id,
        title: page.title,
        description: page.descriptions.join(" ").slice(0, 100),
        image: page.image,
        user: page.user,
        tags,
        createdAt: moment(page.created * 1000)
          .tz("Asia/Tokyo")
          .format(),
        updatedAt: moment(page.updated * 1000)
          .tz("Asia/Tokyo")
          .format(),
      }
      return p
    })
}
