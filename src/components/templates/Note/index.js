import React from "react"
import { graphql } from "gatsby"
import Layout from "../../layouts/Standard"
import Markdown from "../../atoms/Markdown"
export default ({ data }) => {
  const post = data.markdownRemark
  return (
    <Layout>
      <Markdown data={post} />
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`
