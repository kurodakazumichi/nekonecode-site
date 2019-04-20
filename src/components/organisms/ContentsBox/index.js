import React from "react"
import { Link } from "gatsby"
import * as Define from "../../../define"
import Icon, { StyleType } from "../../atoms/Icon"
import "./style.scss"

export default class ContentsBox extends React.Component {
  /**
   * デフォルトプロパティ
   */
  static defaultProps = {
    img: "",
    title: "",
    description: "",
    date: "",
    to: "/",
    label: "",
  }

  /**
   * 描画
   */
  render() {
    const { title, date, to } = this.props

    return (
      <Link to={to} className="o-contentsBox">
        {this.Label}
        <div>
          {this.KeyVisual}
          <div className="info">
            <span className="title">{title}</span>
            {this.Description}
          </div>

          <div className="date">
            <Icon style={StyleType.Regular} type="clock" />
            {date}
          </div>
        </div>
      </Link>
    )
  }

  get Label() {
    const { label } = this.props

    if (!label) return null

    return <span className="label">{label}</span>
  }
  /** KeyVisual */
  get KeyVisual() {
    const src = this.props.img ? this.props.img : Define.Src.DUMMY_KV

    return (
      <div className="kv">
        <img className="image" src={src} alt="" />
      </div>
    )
  }

  /** 解説 */
  get Description() {
    if (!this.props.description) {
      return null
    }

    return <p className="desc">{this.props.description}</p>
  }
}
