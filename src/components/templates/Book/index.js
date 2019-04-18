import React from "react"
import { graphql } from "gatsby"
import Layout from "../../layouts/Standard"
import ContentsBox from "../../organisms/ContentsBox"
export default ({ data }) => {
  const post = data.markdownRemark
  console.log(data)
  return (
    <Layout>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
      {data.allMarkdownRemark.edges.map((data, key) => {
        return <ContentsBox key={key} title={data.node.frontmatter.title} />
      })}
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!, $regSlug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
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
          }
        }
      }
    }
  }
`
