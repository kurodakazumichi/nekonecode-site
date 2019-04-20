import React from "react"
import { Link } from "gatsby"
import ClassNames from "classnames"
import "./style.scss"

export default class BookNavigation extends React.Component {
  static defaultProps = {
    title: "",
    activeSlug: "",
    notes: [],
  }

  constructor(props) {
    super(props)
    this.ref = React.createRef();
    this.state = {
      iniY:0,
      floating:false
    }
  }

  componentDidMount() {
    const rect = this.ref.current.getBoundingClientRect();
    this.setState({iniY:rect.y});

    window.addEventListener('scroll', () => {
      // スクロールしてBookNavigationが画面上部へ隠れる場合はフローティングする
      const isFloating = (this.state.iniY < window.pageYOffset);

      if (isFloating !== this.state.floating) {
        this.setState({floating:isFloating})
      }      
    });
  }

  Note(note, key) {
    const isActive = note.slug === this.props.activeSlug
    const className = ClassNames("note", { "--active": isActive })

    if (isActive) {
      return (
        <li key={key} className={className}>
          {note.title}
        </li>
      )
    } else {
      return (
        <li key={key} className={className}>
          <Link to={note.slug}>{note.title}</Link>
        </li>
      )
    }
  }
  render() {
    const { title, notes } = this.props

    const style = {
      position: (this.state.floating)? "fixed" : "relative",
      top:0
    }

    return (
      <nav className="o-bookNavigation" style={style} ref={this.ref}>
        <span className="title">{title}</span>
        <ul className="notes">
          {notes.map((note, key) => {
            return this.Note(note, key)
          })}
        </ul>
      </nav>
    )
  }
}
