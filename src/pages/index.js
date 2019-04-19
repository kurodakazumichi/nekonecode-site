import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layouts/Standard"
import ContentsBox from "../components/organisms/ContentsBox"
import "./index.scss"
export default class extends React.Component {
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
            <ContentsBox
              title="初心者がプログラムを学ぶ前に覚えておくと少しマシになること"
              date="2019.04.17"
              to="/books/misc/before-the-program"
              img="/books/misc/before-the-program/book.png"
              description="初心者がプログラムを学ぶときに立ちはだかるのは、これくらい知ってるよねという暗黙の了解。いや知らねーよ！"
            />
          </div>
          <h2>新着</h2>
          <div className="contents">
            {this.props.data.allMarkdownRemark.edges.map(({ node }, key) => {
              return (
                <ContentsBox
                  key={key}
                  to={node.fields.slug}
                  title={node.frontmatter.title}
                  date={node.frontmatter.date}
                  img={node.frontmatter.img}
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
    allMarkdownRemark(
      filter: { fields: { group: { eq: "books" }, name: { ne: "index" } } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "YYYY.MM.DD")
            img
          }
          fields {
            slug
            group
          }
          excerpt
        }
      }
    }
  }
`
