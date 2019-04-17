import React from "react"
import { Link } from "gatsby"
import "./style.scss"

export default class Header extends React.Component {
  static defaultProps = {
    title: "",
  }

  render() {
    return (
      <header className="header">
        <span class="logo">{this.props.title}</span>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/books">Books</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </nav>
      </header>
    )
  }
}
