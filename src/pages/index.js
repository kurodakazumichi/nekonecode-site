import React from "react"
import Layout from "../components/layouts/Standard"
import ContentsBox from "../components/organisms/ContentsBox"
import "./styles/index.scss"
export default class extends React.Component {
  render() {
    return (
      <Layout>
        <div className="p-index">
          <div className="about">
            <p>
              小学校が勉強するところと知ったのは小学５年生になってからだった
            </p>
            <p>そんな奴でもプログラミングができるようになった</p>
            <p>その感動と技術を届けたい</p>
          </div>
          <h2>初心者へ</h2>
          <div className="contents">
            <ContentsBox
              img="https://junjun-web.net/wp-content/uploads/2019/03/headline-simple-design-640x336.png"
              title="HTML #01"
              date="2019.04.17"
            />
            <ContentsBox
              img="https://junjun-web.net/wp-content/uploads/2019/04/scroll-junk-640x336.png"
              title="HTML #02"
              date="2019.04.17"
            />
            <ContentsBox
              img="https://junjun-web.net/wp-content/uploads/2019/03/iconsvg-640x336.png"
              title="HTML #02"
              date="2019.04.17"
            />
          </div>
          <h2>新着</h2>
          <div class="contents">
            <ContentsBox
              img="https://junjun-web.net/wp-content/uploads/2019/03/password-checkup-640x336.png"
              title="HTML #02"
              description="わかりやすくまとめました。"
              date="2019.04.17"
            />
          </div>
        </div>
      </Layout>
    )
  }
}
