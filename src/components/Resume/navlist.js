import React, { Component } from 'react'

class NavList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      nowIndex: 0,
      navList: [
        {
          id: 0,
          name: "关于我",
          class: "iconyuzhouxingqiu-22 ufo",
          isHover: false
        },
        {
          id: 1,
          name: "工作经验",
          class: "iconyuzhouxingqiu-10 sun",
          isHover: false
        },
        {
          id: 2,
          name: "项目经验",
          class: "iconyuzhouxingqiu-23 rocket",
          isHover: false
        },
        {
          id: 3,
          name: "教育背景",
          class: "iconyuzhouxingqiu-05 star",
          isHover: false
        },
        {
          id: 4,
          name: "联系我",
          class: "iconyuzhouxingqiu-07 moon",
          isHover: false
        },
        {
          id: 5,
          name: "我的博客",
          class: "",
          isHover: false
        }
      ],
    }
  }
  componentDidMount() {
  }

  toParent(item, ind) {
    this.setState({
      nowIndex: ind
    })
    this.props.parent.getNavList(this, item)
  }

  enter (item) {
    let navList = this.state.navList
    navList[item.id].isHover = true
    this.setState({
      navList: navList
    })
  }

  leave (item) {
    let navList = this.state.navList
    navList[item.id].isHover = false
    this.setState({
      navList: navList
    })
  }

  render() {
    return (
      <div className="left-nav">
        {
          this.state.navList.map((item, key)=> {
            if(item.class === '') {
              return <span className="tag" key={key} onClick={this.toParent.bind(this, item, key)}>{item.name}</span>
            } else {
              return (<span className={`tag ${key === this.state.nowIndex ? 'clicked' : ''} ${item.isHover ? 'sel' : ''}`} key={key} onClick={this.toParent.bind(this, item, key)} onMouseOver={this.enter.bind(this, item, key)}
                    onMouseLeave={this.leave.bind(this, item, key)}><i className={`iconfont ${item.class}`}></i>{item.name}</span>)
            }
          })
        }
      </div>
    )
  }
}

export default NavList
