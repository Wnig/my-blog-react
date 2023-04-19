import React, { Component } from 'react'
import '../assets/scss/about.scss'

class About extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  componentDidMount() {
  }

  render() {
    return (
      <div className="about">
        <div className="article-cons">
          <div className="art-con">
            <div className="tit">关于我</div>
            <div className="article markdown-body" dangerouslySetInnerHTML={{__html: this.props.infoObj.introduce }}></div>
          </div>
        </div>
      </div>
    )
  }
}

export default About
