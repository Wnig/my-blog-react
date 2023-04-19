import React, { Component } from 'react'
import { Timeline } from 'antd';

class Work extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
  }

  render() {
    return (
      <div className="my-item">
        <h3>
          工作经验
          <p>Work experience</p>
        </h3>
        <Timeline>
          <Timeline.Item>
            <p className="time">2018.11 – 2020.09 | 环球商付厦门科技有限公司</p>
            <p className="content">
              主要通过HTML5、Vue、Element-ui、Electron等技术，实现PC平台、移动平台、PC端桌面应用等项目的开发制作。
            </p>
          </Timeline.Item>
          <Timeline.Item>
            <p className="time">2018.03 – 2018.11 | 司马图（厦门）科技有限公司</p>
            <p className="content">
              主要通过HTML5、Vue、WXML等技术，实现PC平台、移动平台、微信小程序等项目的开发制作。
            </p>
          </Timeline.Item>
          <Timeline.Item>
            <p className="time">
              2016.08 – 2018.03 | 风筝（厦门）信息科技有限公司
            </p>
            <p className="content">
              主要通过HTML5、jQuery等技术，实现PC平台、移动平台等项目的开发制作。
            </p>
          </Timeline.Item>
        </Timeline>
      </div>
    )
  }
}

export default Work
