import React from "react"
import { Link } from "gatsby"
import { Helmet } from "react-helmet"
import Header from "../../organisms/Header"
import "./style.scss"
export default class extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Helmet>
          <link
            href="https://fonts.googleapis.com/css?family=M+PLUS+Rounded+1c:400,700"
            rel="stylesheet"
          />
        </Helmet>
        <div className="l-standard">
          <Header title="Nekonecode" />
          <main>
            <div className="container">{this.props.children}</div>
          </main>
        </div>
      </React.Fragment>
    )
  }
}
