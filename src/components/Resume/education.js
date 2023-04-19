import React, { Component } from 'react'

class Education extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
  }

  render() {
    return (
      <div className="my-item">
        <h3>
          教育背景
          <p>Education</p>
        </h3>
        <div className="cont">
          <p>2013.07 - 2017.07 | 泉州师范学院 | 软件开发 | 本科</p>
          <p>主修课程：</p>
          <p>1、C语言程序设计、数据结构：具备良好的编程思想</p>
          <p>2、Web编程基础、ASP.NET：对网页的基本组成结构有一定的了解。</p>
          <p>
            3、数据库系统原理与应用、数据库访问技术：能够熟练地操作SQL
            Server数据库，灵活地运用增、删、改、查语句。
          </p>
        </div>
      </div>
    )
  }
}

export default Education
