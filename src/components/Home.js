import React, { Component } from 'react'
import Weather from '../components/Weather'
import '../assets/scss/home.scss'
import bgImg from '../assets/images/img_02.jpg'
import myHeader from '../assets/images/my_header.jpg'
import pic from '../assets/images/img_05.jpg'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  enterHome () {
    this.props.history.push(`/blog`)
  }
  render() {
    return (
      <div className="home">
        <Weather></Weather>
        <div className="my-home">
        <div className="my-home-con">
          <div className="my-bg">
            <img className="bg-img"
                src={bgImg}
                 alt="" />
          </div>
          <div className="my-info-con">
            <div className="my-info">
              <p>Wnig.</p>
              <img onClick={this.enterHome.bind(this)} className="my-header"
                   src={myHeader}
                   alt="" />
            </div>
            <p className="signature">“长夜将尽，来日可期。”</p>
          </div>
        </div>
        <div className="my-intro">
          <div className="item">
          <img onClick={this.enterHome.bind(this)} className="my-header"
                src={myHeader}
                 alt="" />
            <div className="my-content">
              <strong className="name">Wnig</strong>
              <div className="content">
                <p>QQ : 770225508</p>
                <p>E-mail : 770225508@qq.com</p>
                <p>WeChat : xxxibwnig</p>
                <img src={pic}
                     alt="" />
              </div>
              <div className="from">
                <span className="time">2017-08-18</span>
                <p>来自 权志龙未公开小女友的手机</p>
              </div>
            </div>
          </div>
          <div className="bottom-bor"></div>
        </div>
      </div>
      </div>
    )
  }
}

export default Home
