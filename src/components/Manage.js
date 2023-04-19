import React, { Component } from 'react'
import '../assets/scss/Manage.scss'
import Header from '../components/Header'
import Footer from '../components/Footer'
import img_12 from '../assets/images/img_12.jpg'
import img_03 from '../assets/images/img_03.jpg'
import img_14 from '../assets/images/img_14.jpg'
import img_13 from '../assets/images/img_13.jpg'

import { getBlogInfo, counter } from "../api/http"

class Manage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      infoObj: {},
      infoVis: {
        totalVis: 0,
        visitors: 0
      },
      linkPath: ''
    }
  }
  componentDidMount() {
    this.getInfo()
    this.getCounter()
    this.setState({
      linkPath: this.props.match
    })
  }

  getInfo () {
    getBlogInfo().then(res => {
      if (res.data.code === 200) {
        this.setState({
          infoObj: res.data.result[0],
        })
      } 
    })
  }

  // 统计访问人数
  getCounter () {
    counter().then(res => {
      if (res.data.code === 200) {
        let infoVis = this.state.infoVis
        infoVis.visitors = res.data.counter
        infoVis.totalVis = res.data.total
        this.setState({
          infoVis: infoVis
        })
      }
    });
  }

  goBlog() {
    this.props.history.push(`/blog`)
  }

  render() {
    return (
      <div className="manage">
        <Header parent={ this }  infoObj={ this.state.infoObj } linkPath={this.state.linkPath}></Header>
        <div className="content">
          <div className="img-show">
            <div className="img-con">
              <img src={img_12} alt="" />
              <img src={img_03} alt="" />
            </div>
            <div className="img-con">
              <img src={img_14} alt="" />
              <img src={img_13} alt="" />
            </div>
          </div>
          <div className="says">
            <p className="say">❤태어나서 널 만나고 죽을 만큼 사랑하고❤</p>
            <p className="say">
              我有一个男朋友，<br />
              我很爱他，他也很爱我，<br />
              甚至我嫁不出去都会娶我。<br />
              他受伤从来不让我知道，<br />
              他写的歌词都是亲身感受，<br />
              他不让我染头发，<br />
              说我喜欢什么颜色他染给我看。<br />
              他向全世界承认我是他的女朋友，<br />
              他说喜欢笑是因为我喜欢他微笑的样子，<br />
              他说只要不是他说的都不要信，<br />
              他说我是他坚持下来的动力，<br />
              他说他要服兵役，我说愿意等。<br />
              只是我们还不认识。
            </p>
            <p className="say">❤나 정말 너 좋아해.❤</p>
            <p className="say say-from">from : 无所畏惧的小射手♬</p>
          </div>
        </div>
        <Footer parent={ this } infoVis={this.state.infoVis}></Footer>
      </div>
    )
  }
}

export default Manage
