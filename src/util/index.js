import Slug from "./slug"

const Breadcrumb = {
  createDataForBook(_slug) {
    const slug = new Slug(_slug)
    const category = slug.category
    return [
      { caption: "Books", to: "/books" },
      { caption: category, to: `/books#${category}` },
    ]
  },

  craeteDataForNote(_slug, book) {
    const slug = new Slug(_slug)
    return [
      { caption: "Books", to: "/books" },
      { caption: slug.category, to: `/books#${slug.category}` },
      { caption: book.title, to: slug.raw },
    ]
  },
}

export { Slug, Breadcrumb }
