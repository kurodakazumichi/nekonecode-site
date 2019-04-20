import React from "react"
import { graphql } from "gatsby"
import * as Util from "../util"
import Layout from "../components/layouts/Standard"
import ContentsBox from "../components/organisms/ContentsBox"
import Icon from "../components/atoms/Icon"
import "./books.scss"

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.categorized = this.categorize(props.data.allMarkdownRemark.edges)
  }

  categorize(edges) {
    const categorized = {}

    edges.map((data, key) => {
      const category = data.node.fields.category

      // 初めてのカテゴリなら配列を用意する
      if (!categorized[category]) {
        categorized[category] = []
      }

      categorized[category].push(data.node)
    })

    return categorized
  }

  render() {
    return (
      <Layout>
        <article className="p-books">
          <h1>
            <Icon type="book" />
            &nbsp;Books&nbsp;
            <Icon type="book" />
          </h1>

          {Object.keys(this.categorized).map(category => {
            return (
              <section key={category}>
                <h2>{Util.Names.category(category)}</h2>
                {this.Books(category)}
              </section>
            )
          })}
        </article>
      </Layout>
    )
  }

  Books(category) {
    const books = this.categorized[category]
    return (
      <div className="books">
        {books.map((book, key) => {
          const props = {
            key,
            img: book.frontmatter.img,
            title: book.frontmatter.title,
            description: book.frontmatter.desc,
            date: book.frontmatter.date,
            slug: book.fields.slug,
          }
          return <ContentsBox {...props} />
        })}
      </div>
    )
  }
}
export const query = graphql`
  query {
    allMarkdownRemark(
      filter: { fields: { group: { eq: "books" }, name: { eq: "index" } } }
      sort: { fields: fields___slug, order: ASC }
    ) {
      edges {
        node {
          fields {
            slug
            group
            category
            name
            template
          }
          frontmatter {
            title
            date
            desc
            img
          }
        }
      }
    }
  }
`
