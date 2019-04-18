import React from "react"
import { Link } from "gatsby"
import Icon from "../../atoms/Icon"
import "./style.scss"
export default class BreadCrumb extends React.Component {
  static defaultProps = {
    links: [],
  }

  render() {
    return <ul className="a-breadcrumb">{this.Item(this.props.links)}</ul>
  }

  Item(links) {
    const lastIndex = links.length - 1

    return links.map((link, index) => {
      return (
        <React.Fragment key={index}>
          <li>
            <Link to={link.to}>{link.caption}</Link>
          </li>
          {index !== lastIndex && (
            <li>
              <Icon type="angle-double-right" />
            </li>
          )}
        </React.Fragment>
      )
    })
  }
}
