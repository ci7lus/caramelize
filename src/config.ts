import $ from "transform-ts"
import config from "../caramelize.config.json"

export const SCRAPBOX_PROJECT = $.string.transformOrThrow(
  config.SCRAPBOX_PROJECT
)
export const SCRAPBOX_TAG = $.string.transformOrThrow(config.SCRAPBOX_TAG)

export const TWITTER_ID = config.TWITTER_ID || null

export const SITE_NAME = config.SITE_NAME || "Caramelize"

export const SITE_ROOT = config.SITE_ROOT || null
