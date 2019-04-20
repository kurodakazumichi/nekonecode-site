import Slug from "./slug"
import * as Service from "./service"

const Breadcrumb = {
  createDataForBook(node) {
    return [
      { caption: "Books", to: "/books" },
      { caption: Names.category(node.category), to: `/books#${node.category}` },
    ]
  },

  craeteDataForNote(node) {
    return [
      { caption: "Books", to: "/books" },
      { caption: Names.category(node.category), to: `/books#${node.category}` },
      { caption: node.title, to: node.slug },
    ]
  },
}

const Names = {
  category(category) {
    switch (category) {
      case "html":
        return "HTML"
      case "misc":
        return "雑多なもの"
      case "zzz":
        return "ネタ帳"
    }
    return ""
  },
}
export { Slug, Breadcrumb, Names, Service }
