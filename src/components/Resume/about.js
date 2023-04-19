import React, { Component } from 'react'

class About extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
  }

  render() {
    return (
      <div className="my-item">
        <h3>
          关于我
          <p>About me</p>
        </h3>
        <div className="item-con">
          <div className="item">
            <div className="-con">
              年龄/26
            </div>
          </div>
          <div className="item">
            <div className="-con">
              学历/本科
            </div>
          </div>
          <div className="item">
            <div className="-con">
              坐标/厦门
            </div>
          </div>
          <div className="item">
            <div className="-con">
              状态/离职
            </div>
          </div>
          <div className="item">
            <div className="-con">
              英语/CET4
            </div>
          </div>
          <div className="item">
            <div className="-con">
              专业/计算机-软件开发
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default About
