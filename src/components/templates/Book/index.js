import React from "react"
import { graphql } from "gatsby"
import Layout from "../../layouts/Standard"
import ContentsBox from "../../organisms/ContentsBox"
import Markdown from "../../atoms/Markdown"
import * as Util from "../../../util"
import "./style.scss"

export const query = graphql`
  query($slug: String!, $regSlug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
      fields {
        slug
      }
    }
    allMarkdownRemark(
      filter: { fields: { slug: { regex: $regSlug }, name: { ne: "index" } } }
      sort: { fields: fields___name, order: ASC }
    ) {
      edges {
        node {
          fields {
            slug
            group
            name
            template
          }
          frontmatter {
            title
            date
            img
          }
        }
      }
    }
  }
`

export default class Book extends React.Component {
  constructor(props) {
    super(props)
    this.breadcrumb = Util.Breadcrumb.createDataForBook(
      this.props.data.markdownRemark.fields.slug
    )
  }

  render() {
    const { data } = this.props
    const book = data.markdownRemark
    const notes = data.allMarkdownRemark.edges

    return (
      <Layout breadcrumb={this.breadcrumb}>
        <div className="t-book">
          <Markdown data={book} />

          <div className="notes">
            {notes.map((data, key) => {
              return (
                <ContentsBox
                  key={key}
                  {...data.node.frontmatter}
                  to={data.node.fields.slug}
                />
              )
            })}
          </div>
        </div>
      </Layout>
    )
  }
}
