import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layouts/Standard"
import ContentsBox from "../components/organisms/ContentsBox"
import "./books.scss"
export default class extends React.Component {
  // _render() {
  //   let prevCategory = ""
  //   return (
  //     <Layout>
  //       <div className="p-books">
  //         <h2>新着</h2>
  //         <div className="contents">
  //           {this.props.data.allMarkdownRemark.edges.map(({ node }, key) => {
  //             const currentCategory = node.fields.slug
  //               .substring(1)
  //               .split("/")[1]
  //             const changedCategory = prevCategory !== currentCategory
  //             return (
  //               <React.Fragment key={key}>
  //                 <ContentsBox
  //                   to={node.fields.slug}
  //                   title={node.frontmatter.title}
  //                   date={node.frontmatter.date}
  //                   img="https://junjun-web.net/wp-content/uploads/2019/03/password-checkup-640x336.png"
  //                 />
  //               </React.Fragment>
  //             )
  //           })}
  //         </div>
  //       </div>
  //     </Layout>
  //   )
  // }
  render() {
    //let prevCategory = ""
    return (
      <Layout>
        <article className="p-books">
          <h1>Books</h1>
          <section>
            <h2>HTML</h2>
            <div className="books">
              <ContentsBox
                title="サンプル１"
                date="2019.04.17"
                img="https://junjun-web.net/wp-content/uploads/2019/03/password-checkup-640x336.png"
              />
              <ContentsBox
                title="サンプル１"
                date="2019.04.17"
                img="https://junjun-web.net/wp-content/uploads/2019/03/password-checkup-640x336.png"
              />
              <ContentsBox
                title="サンプル１"
                date="2019.04.17"
                img="https://junjun-web.net/wp-content/uploads/2019/03/password-checkup-640x336.png"
              />
            </div>
          </section>
          <section>
            <h2>HTML</h2>
            <div className="books">
              <ContentsBox
                title="サンプル１"
                date="2019.04.17"
                img="https://junjun-web.net/wp-content/uploads/2019/03/password-checkup-640x336.png"
              />
              <ContentsBox
                title="サンプル１"
                date="2019.04.17"
                img="https://junjun-web.net/wp-content/uploads/2019/03/password-checkup-640x336.png"
              />
              <ContentsBox
                title="サンプル１"
                date="2019.04.17"
                img="https://junjun-web.net/wp-content/uploads/2019/03/password-checkup-640x336.png"
              />
            </div>
          </section>
        </article>
      </Layout>
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
            name
            template
          }
          frontmatter {
            title
            date
          }
        }
      }
    }
  }
`
