import Slug from "./slug"

const Breadcrumb = {
  createDataForBook(_slug) {
    const slug = new Slug(_slug)
    const category = slug.category
    return [
      { caption: "Books", to: "/books" },
      { caption: Names.category(category), to: `/books#${category}` },
    ]
  },

  craeteDataForNote(_slug, book) {
    const slug = new Slug(_slug)
    return [
      { caption: "Books", to: "/books" },
      { caption: Names.category(slug.category), to: `/books#${slug.category}` },
      { caption: book.title, to: slug.raw },
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
export { Slug, Breadcrumb, Names }
