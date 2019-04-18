import React from "react"
import { graphql } from "gatsby"
import Layout from "../../layouts/Standard"
import Markdown from "../../atoms/Markdown"
import Icon, { StyleType } from "../../atoms/Icon"
import * as Util from "../../../util"
import "./style.scss"
export const query = graphql`
  query($slug: String!, $bookSlug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
      fields {
        slug
      }
    }
    allMarkdownRemark(filter: { fields: { slug: { eq: $bookSlug } } }) {
      edges {
        node {
          frontmatter {
            title
            date
            img
            desc
          }
          fields {
            slug
          }
        }
      }
    }
  }
`

export default class Note extends React.Component {
  constructor(props) {
    super(props)
    this.breadcrumb = Util.Breadcrumb.craeteDataForNote(
      this.props.data.allMarkdownRemark.edges[0].node.fields.slug,
      this.props.data.allMarkdownRemark.edges[0].node.frontmatter
    )
  }

  render() {
    const { data } = this.props
    const post = data.markdownRemark

    return (
      <Layout breadcrumb={this.breadcrumb}>
        <div className="t-note">
          <Markdown
            data={post}
            icon={<Icon style={StyleType.Regular} type="sticky-note" />}
          />
        </div>
      </Layout>
    )
  }
}
