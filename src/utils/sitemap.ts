import { getPosts } from "./scrapbox"

export const routesGenerator = async () => {
  const posts = await getPosts(undefined, 0, 100)
  return posts.map(post => {
    return {
      url: `/posts/${encodeURIComponent(post.title)}`,
      lastmod: post.updatedAt,
    }
  })
}
