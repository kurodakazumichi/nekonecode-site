import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { Helmet } from "react-helmet"
import BreadCrumb from "../../atoms/Breadcrumb"
import Header from "../../organisms/Header"
import "./style.scss"

const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`

export default class extends React.Component {
  static defaultProps = {
    breadcrumb: [],
    leftContents: null,
    title:""
  }

  get Left() {
    if (!this.props.leftContents) return null
    return <div className="left">{this.props.leftContents}</div>
  }

  HeadTitle(siteName) {
    const title = (this.props.title)? this.props.title : siteName;
    return (<title>{title}</title>)
  }
  render() {
    return (
      <StaticQuery
        query={query}
        render={data => (
          <React.Fragment>
            <Helmet>
              {this.HeadTitle(data.site.siteMetadata.title)}
              <link
                href="https://fonts.googleapis.com/css?family=M+PLUS+Rounded+1c:400,700"
                rel="stylesheet"
              />
            </Helmet>
            <div className="l-standard">
              <Header title={data.site.siteMetadata.title} />
              <BreadCrumb links={this.props.breadcrumb} />
              <main>
                {this.Left}
                <div className="main">{this.props.children}</div>
              </main>
            </div>
          </React.Fragment>
        )}
      />
    )
  }
}
