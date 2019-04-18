/******************************************************************************
 * import area
 *****************************************************************************/
import React from "react"
import ClassNames from "classnames"
import "@fortawesome/fontawesome-free/css/all.css"

/******************************************************************************
 *  Enum
 *****************************************************************************/
/** Iconのスタイル */
export const StyleType = {
  /** 黒塗り */
  Solid: "fas",
  /** 中抜き */
  Regular: "far",
  /** ブランド */
  Brand: "fab",
}

/******************************************************************************
 * Icon Component
 *****************************************************************************/
export default class Icon extends React.Component {
  /** props規定値 */
  static defaultProps = {
    /** アイコンのスタイル */
    style: StyleType.Solid,
    type: "info",
    addClass: "",
  }

  /** 描画 */
  render() {
    return <i className={this.className} />
  }

  /** CSSクラス名 */
  get className() {
    return ClassNames(
      "a-icon",
      this.props.style,
      `fa-${this.props.type}`,
      this.props.addClass
    )
  }
}
