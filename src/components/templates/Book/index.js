/******************************************************************************
 * import area
 *****************************************************************************/
import React from "react"
import { graphql } from "gatsby"
import Layout from "../../layouts/Standard"
import ContentsBox from "../../organisms/ContentsBox"
import Markdown from "../../atoms/Markdown"
import Icon from "../../atoms/Icon"
import * as Util from "../../../util"
import "./style.scss"

/******************************************************************************
 * １書籍を表示するテンプレート
 *****************************************************************************/
export default class Book extends React.Component 
{
  constructor(props) {
    super(props)
    const { markdownRemark, allMarkdownRemark } = props.data
    this.book       = Util.Service.createNode(markdownRemark)
    this.notes      = Util.Service.getNotes(allMarkdownRemark.edges)
    this.breadcrumb = Util.Breadcrumb.createDataForBook(this.book)
  }

  render() {
    return (
      <Layout breadcrumb={this.breadcrumb}>
        <div className="t-book">
          <Markdown data={this.book} icon={<Icon type="book" />} />

          <div className="notes">
            {this.notes.map((node, key) => {
              return <ContentsBox key={key} {...node} />
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
  query($slug: String!, $regSlug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
      fields {
        slug
        group
        name
        category
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