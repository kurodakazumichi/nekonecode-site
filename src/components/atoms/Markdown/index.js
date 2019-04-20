import React from "react"
import "./style.scss"
export default class extends React.Component {
  static defaultProps = {
    icon: null,
    data: { title: "", html: "" },
  }
  render() {
    const { data } = this.props
    return (
      <div className="a-markdown">
        <div className="title">
          {this.props.icon}
          <h1>{data.title}</h1>
        </div>
        <h1 />
        <div dangerouslySetInnerHTML={{ __html: data.html }} />
      </div>
    )
  }
}
