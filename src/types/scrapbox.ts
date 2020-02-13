export type ScrapboxError = {
  name: string
  message: string
  linkTo: string
  statusCode: number
}

export type ScrapboxUser = {
  id: string
  name: string
  displayName: string
  photo: string
}

export type ScrapboxLine = {
  id: string
  text: string
  userId: string
  created: number
  updated: number
}

export type ScrapboxPage = {
  id: string
  title: string
  image: string | null
  descriptions: string[]
  user: ScrapboxUser
  pin: number
  views: number
  linked: number
  commitId: string
  created: number
  updated: number
  snapshotCreated: number
  president: boolean
  lines: ScrapboxLine[]
  links: string[]
  icons: { [key: string]: number }
  relatedPages: {
    [key: string]: {
      id: string
      title: string
      titleLc: string
      image: string | null
      descriptions: string[]
      linksLc: string[]
      updated: number
      accessed: number
    }[]
  }
}

export type ScrapboxSearchResult = {
  projectName: string
  searchQuery: string
  limit: number
  count: number
  pages: (Omit<ScrapboxPage, "content"> & { snipet: string[] })[]
  existsExactTitleMatch: boolean
  query: {
    words: string[]
    excludes: string[]
  }
}
