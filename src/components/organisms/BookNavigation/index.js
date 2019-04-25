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
      floating:false
    }

    // addEventListnerのタイミングでbindする方法だと
    // removeEventListenerがうまくいかないのでここでbindする。
    this.onScroll = this.onScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll, false);
  }

  componentWillUnmount() {
    // ここでイベントを破棄しておかないと、他のページへ遷移し
    // このコンポーネントが存在しない状態でもonScrollが発火しエラーが出る
    window.removeEventListener('scroll', this.onScroll, false);
  }

  onScroll() {
    // スクロールしてBookNavigationが画面上部へ隠れる場合はフローティングする
    const rect = this.ref.current.getBoundingClientRect();
    const isFloating = (rect.top < 0);
    
    if (isFloating !== this.state.floating) {
      this.setState({floating:isFloating})
    }
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

    const innerClass = ClassNames("inner", {"floating": this.state.floating})

    return (
      <nav className="o-bookNavigation" ref={this.ref}>
        <div className={innerClass}>
          <span className="title">{title}</span>
          <ul className="notes">
            {notes.map((note, key) => {
              return this.Note(note, key)
            })}
          </ul>
        </div>
      </nav>
    )
  }
}
