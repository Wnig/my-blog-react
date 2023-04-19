import React, { Component } from 'react'
import '../assets/scss/footer.scss'
class Footer extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  render() {
    return (
       <div className="footer">
          <p>❤我不相信所谓的命运，我只相信我自己。❤</p>
          <p>
            Copyright ©2017 Powered By Wnig 闽ICP备18014223号
          </p>
          <p>
            <span>总访问量：{ this.props.infoVis.totalVis }</span><span>访客数：{ this.props.infoVis.visitors }</span>
          </p>
      </div>
    )
  }
}

export default Footer
