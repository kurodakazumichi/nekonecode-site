import { get } from "lodash"

export default class Slug {
  constructor(slug) {
    const info = this.analyze(slug)
    this.raw = slug
    this.group = get(info, "0", "")
    this.category = get(info, "1", "")
    this.varity = get(info, "2", "")
    this.count = get(info, "length", 0)
  }

  analyze(slug) {
    const splited = slug
      .substring(1)
      .slice(0, -1)
      .split("/")

    return splited
  }
}
