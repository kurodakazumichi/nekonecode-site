import React from "react"
import "./style.scss"
export default class ContentsBox extends React.Component {
  static defaultProps = {
    img: "",
    title: "",
    description: "",
    date: "",
  }
  render() {
    const { img, title, date } = this.props
    return (
      <div className="o-contentsBox">
        <div className="kv">
          <img className="image" src={img} alt="" />
        </div>
        <div className="info">
          <span className="title">{title}</span>
          {this.Description}
        </div>

        <div className="date">{date}</div>
      </div>
    )
  }

  get Description() {
    if (!this.props.description) {
      return null
    }

    return <p className="desc">{this.props.description}</p>
  }
}
