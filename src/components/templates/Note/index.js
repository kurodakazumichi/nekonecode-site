/******************************************************************************
 * import area
 *****************************************************************************/
import React from "react"
import { graphql } from "gatsby"
import Layout from "../../layouts/Standard"
import Markdown from "../../atoms/Markdown"
import Icon, { StyleType } from "../../atoms/Icon"
import BookNavigation from "../../organisms/BookNavigation"
import * as Util from "../../../util"
import "./style.scss"

/******************************************************************************
 * １記事を表示するテンプレート
 *****************************************************************************/
export default class Note extends React.Component 
{
  constructor(props) 
  {
    super(props)
    const { markdownRemark, allMarkdownRemark } = this.props.data

    this.book       = Util.Service.getBook(allMarkdownRemark.edges)
    this.notes      = Util.Service.getNotes(allMarkdownRemark.edges)
    this.note       = Util.Service.createNode(markdownRemark)
    this.breadcrumb = Util.Breadcrumb.craeteDataForNote(this.book)
  }

  render() {
    return (
      <Layout breadcrumb={this.breadcrumb} leftContents={this.Navigation}>
        <div className="t-note">
          <Markdown
            data={this.note}
            icon={<Icon style={StyleType.Regular} type="sticky-note" />}
          />
        </div>
      </Layout>
    )
  }

  get Navigation() {
    const props = {
      title     : this.book.title,
      notes     : this.notes,
      activeSlug: this.note.slug,
    }

    return <BookNavigation {...props} />
  }

}

/******************************************************************************
 * GraphQL
 *****************************************************************************/
export const query = graphql`
  query($slug: String!, $bookSlug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
      fields {
        slug
        group
      }
    }
    allMarkdownRemark(
      filter: { fields: { slug: { regex: $bookSlug } } }
      sort: { fields: fields___slug, order: ASC }
    ) {
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
            name
            group
            category
          }
        }
      }
    }
  }
`