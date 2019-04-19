import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layouts/Standard"
import ContentsBox from "../components/organisms/ContentsBox"
import "./index.scss"
export default class Index extends React.Component {
  /**
   * 初心者向けBookリスト
   */
  static beginnerBooks = ["/books/misc/before-the-program/"]

  constructor(props) {
    super(props)
    this.bookNames = {}
    this.booksForBeginner = {}
    this.init()
  }

  /**
   * 初期処理
   */
  init() {
    const { edges } = this.props.data.allMarkdownRemark
    this.bookNames = this.extractBookNames(edges)
    this.booksForBeginner = this.extractBeginnerBooks(edges)
  }

  /**
   * fieldsの持つ情報から本の名前を取得する
   */
  getBookNames(fields) {
    const slug = `/books/${fields.category}/${fields.varity}/`
    return this.bookNames[slug]
  }

  /**
   * データの中から初心者向けの本だけを抽出する
   */
  extractBeginnerBooks(edges) {
    const books = []
    edges.map(data => {
      const { slug } = data.node.fields
      if (Index.beginnerBooks.indexOf(slug) < 0) return

      books.push(data.node)
    })
    return books
  }

  /**
   * データの中から本の名前だけを抽出する
   */
  extractBookNames(edges) {
    const names = {}

    edges.map(data => {
      const { name, slug } = data.node.fields
      if (name !== "index") return

      names[slug] = data.node.frontmatter.title
    })
    return names
  }

  render() {
    return (
      <Layout>
        <div className="p-index">
          <div className="about">
            <p>
              小学校が勉強するところと知ったのは小学５年生になってからだった
            </p>
            <p>そんな奴でもプログラミングができるようになった</p>
            <p>その感動と技術を届けたい</p>
          </div>
          <h2>初心者へ</h2>
          <div className="contents">
            {this.booksForBeginner.map((book, key) => {
              const props = {
                key,
                title: book.frontmatter.title,
                date: book.frontmatter.date,
                img: book.frontmatter.img,
                description: book.frontmatter.desc,
                to: book.fields.slug,
              }
              return <ContentsBox {...props} />
            })}
          </div>
          <h2>新着</h2>
          <div className="contents">
            {this.props.data.allMarkdownRemark.edges.map(({ node }, key) => {
              if (node.fields.name === "index") return null
              return (
                <ContentsBox
                  key={key}
                  to={node.fields.slug}
                  title={node.frontmatter.title}
                  date={node.frontmatter.date}
                  img={node.frontmatter.img}
                  label={this.getBookNames(node.fields)}
                />
              )
            })}
          </div>
        </div>
      </Layout>
    )
  }
}
export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "YYYY.MM.DD")
            img
            desc
          }
          fields {
            slug
            group
            category
            varity
            name
          }
          excerpt
        }
      }
    }
  }
`
