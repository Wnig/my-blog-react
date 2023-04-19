import React, { Component } from 'react'
import { Timeline } from 'antd';

class Project extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
  }

  render() {
    return (
      <div className="my-item">
        <h3>
          项目经验
          <p>Project experience</p>
        </h3>
        <Timeline>
          <Timeline.Item>
            <p className="time">2018.11 – 2020.09 | 环球商付厦门科技有限公司</p>
            <p className="content">美味导航微信公众号
            </p>
            <p className="content">
              项目描述：为平台的商户提供管理店铺、商品的管理系统，主要用Vue+Element-ui搭建，利用EChart.js展示报表数据，Vue-Cropper实现截图功能，Vue.Draggable实现餐台区域上下拖动排序。
            </p>
            <p className="content">美味导航后台管理系统
            </p>
            <p className="content">
              项目描述：互联网+新餐饮的全方位体验，快速寻找美食，饭友帮忙点餐，记录美食路上的旅程，平台为商家打造了完整的互联网新餐饮解决方案，让商家快速跻身互联网潮店。主要用Vue搭建，利用postcss-px-to-viewport实现移动端适配，EChart.js展示营业数据，Vue-Cropper实现截图功能。
            </p>
            <p className="content">会员中心微信端、会员后台管理系统
            </p>
            <p className="content">
              项目描述：为平台的商户提供独立的会员系统，更好的管理顾客资源。会员后台管理主要用Vue+Element-ui搭建，利用EChart.js展示报表数据，Vue-Cropper实现截图功能。会员中心微信端主要用Vue搭建，利用postcss-px-to-viewport实现移动端适配。
            </p>
            <p className="content">美味导航PC端快速点餐收银
            </p>
            <p className="content">
              项目描述：PC端桌面应用，不同收银设备，满足平台商户多样的收银需求。适用于笔记本电脑、一体机、PC触摸屏、Windows平板电脑等Windows设备。主要用Vue + Electron搭建，利用Lodop插件实现打印小票功能，利用Serialport插件实现串口通信，获取电子秤数据。
            </p>

          </Timeline.Item>
          <Timeline.Item>
            <p className="time">2018.03 – 2018.11 | 司马图（厦门）科技有限公司</p>
            <p className="content">悠易游（平台、商户） 小程序
            </p>
            <p className="content">
              项目描述：专注开发旅游产品、线路，提供旅游产品及相关服务，专业提供优质、性价比高的旅游服务。
            </p>
            <p className="content">欣宏途 小程序
            </p>
            <p className="content">
              项目描述：欣宏途旅游，整合境内外优质旅游产品及周边服务资源，通过社交网络所形成的人际脉络形成新的行为冲动和内在。
            </p>
            <p className="content"><a href="http://www.smartmapdt.com">司马图集团官网</a>
            </p>
            <p className="content">
              项目描述：互联网全域解决方案提供商，司马图专注于产业项目资源整合和改造，探索新互联网经济下新兴的产业模式。
            </p>

          </Timeline.Item>
          <Timeline.Item>
            <p className="time">
              2016.08 – 2018.03 | 风筝（厦门）信息科技有限公司
            </p>
            <p className="content">风筝官网、风筝校园旅游微信公众号
            </p>
            <p className="content">
              项目描述：该项目主要为学生打造的校园旅游产品。
            </p>
            <p className="content">六合助手论坛、图库、918500彩票
            </p>
            <p className="content">
              项目描述：该项目主要为用户提供各类彩票资讯。
            </p>
            <p className="content">金足球
            </p>
            <p className="content">
              项目描述：该项目主要为用户提供足球、篮球赛事赛况的体育资讯APP。
            </p>
          </Timeline.Item>
        </Timeline>
      </div>
    )
  }
}

export default Project
