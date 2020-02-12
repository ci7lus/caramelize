import $ from "transform-ts"

export const SCRAPBOX_PROJECT = $.string.transformOrThrow(
  process.env.SCRAPBOX_PROJECT
)
export const SCRAPBOX_TAG = $.string.transformOrThrow(process.env.SCRAPBOX_TAG)

export const TWITTER_ID =
  !!process.env.TWITTER_ID && process.env.TWITTER_ID !== "null"
    ? $.string.transformOrThrow(process.env.TWITTER_ID)
    : null

export const SITE_NAME =
  !!process.env.SITE_NAME && process.env.SITE_NAME !== "null"
    ? $.string.transformOrThrow(process.env.SITE_NAME)
    : "Caramelize"

export const SITE_ROOT =
  !!process.env.SITE_ROOT && process.env.SITE_ROOT !== "null"
    ? $.string.transformOrThrow(process.env.SITE_ROOT)
    : null
