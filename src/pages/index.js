/******************************************************************************
 * import area
 *****************************************************************************/
import React from "react"
import { graphql } from "gatsby"
import * as Util from '../util'
import Layout from "../components/layouts/Standard"
import ContentsBox from "../components/organisms/ContentsBox"
import "./index.scss"

/******************************************************************************
 * トップページ
 *****************************************************************************/
export default class Index extends React.Component {
  /**
   * 初心者向けBookリスト
   */
  static beginnerBooks = ["/books/misc/before-the-program/"]

  constructor(props) {
    super(props)
    const { edges } = this.props.data.allMarkdownRemark

    // 本の名称リストを取得
    this.bookNames = Util.Service.getBookNames(edges)

    // 初心者向けの本を取得
    this.booksForBeginner = Util
      .Service
      .getNodesAtSlug(edges, Index.beginnerBooks);

    // 新着ノートを取得
    this.notesOfNew = Util.Service.getNotes(edges);
  }

  /**
   * fieldsの持つ情報から本の名前を取得する
   */
  getBookNames(node) {
    const slug = `/books/${node.category}/${node.varity}/`
    return this.bookNames[slug]
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
          {/* <h2>初心者へ</h2>
          <div className="contents">
            {this.booksForBeginner.map((book, key) => {
              const props = {
                key,
                title: book.title,
                date: book.date,
                img: book.img,
                description: book.desc,
                slug: book.slug,
              }
              return <ContentsBox {...props} />
            })}
          </div> */}
          <h2>新着記事</h2>
          <div className="contents">
            {this.notesOfNew.map((node , key) => {
              
              return (
                <ContentsBox
                  key={key}
                  slug={node.slug}
                  title={node.title}
                  date={node.date}
                  img={node.img}
                  label={this.getBookNames(node)}
                />
              )
            })}
          </div>
        </div>
      </Layout>
    )
  }
}

/******************************************************************************
 * GraphQL
 *****************************************************************************/
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
