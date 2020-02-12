import { PageType } from "@tosuke/scrapbox-parser"
import { ScrapboxUser } from "./scrapbox"

export type Post = {
  id: string
  title: string
  description: string
  image: string | null
  content?: PageType
  user: ScrapboxUser
  tags: string[]
  createdAt: string
  updatedAt: string
}
