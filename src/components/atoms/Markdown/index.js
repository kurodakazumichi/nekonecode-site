import React from "react"
import Axios from "axios"
import StepCode from "@puyan/stepcode"
import "@puyan/stepcode/styles/style.scss"
import "./style.scss"

export default class extends React.Component {
  static defaultProps = {
    icon: null,
    data: { title: "", html: "" },
  }

  async embedStepCode(elm) {
    const path = elm.dataset.path

    const axios = Axios.create({
      baseURL: "/",
      headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
      },
      responseType: "json",
    })

    const res = await axios.get(`${path}.stepcode.json`)

    if (res.status === 200 && res.data) {
      new StepCode(elm, res.data)
    }
  }
  componentDidMount() {
    document.querySelectorAll(".stepcode").forEach(elm => {
      this.embedStepCode(elm)
    })
  }
  render() {
    const { data } = this.props
    return (
      <div className="a-markdown">
        <div className="title">
          {this.props.icon}
          <h1>{data.title}</h1>
        </div>
        <div dangerouslySetInnerHTML={{ __html: data.html }} />
      </div>
    )
  }
}
