import $ from "transform-ts"
import config from "../caramelize.config.json"

export const SCRAPBOX_PROJECT = $.string.transformOrThrow(
  config.SCRAPBOX_PROJECT
)
export const SCRAPBOX_TAG = $.string.transformOrThrow(config.SCRAPBOX_TAG)
