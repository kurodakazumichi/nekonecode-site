import React from "react"
import "./style.scss"
export default class extends React.Component {
  static defaultProps = {
    data: { frontmatter: { title: "" }, html: "" },
  }
  render() {
    const { data } = this.props
    return (
      <div className="a-markdown">
        <h1>{data.frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: data.html }} />
      </div>
    )
  }
}
