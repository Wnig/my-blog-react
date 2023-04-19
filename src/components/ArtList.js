import React, { Component } from 'react'
import '../assets/scss/artlist.scss'
class ArtList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      nowIndex: 1,
      nowItem: {},
      titList: [
        {
          type: '',
          name: "全部文章",
          describe: "没有伞的孩子必须努力奔跑。"
        },
        {
          type: 1,
          name: "我的日常",
          describe: "如果生命会说话，它一定说谢谢你爱它。"
        },
        {
          type: 2,
          name: "学习与积累",
          describe:
            "好好努力，你才可能变成自己所想的那种人，走自己想走的那条路。"
        },
        {
          type: 3,
          name: "专业技术问题",
          describe: "若人生掀起大浪，我就会迎风而上。"
        },
      ],
    }
  }

  typeFilter (status) {
    const statusMap = {
      "1": "我的日常",
      "2": "学习与积累",
      "3": "专业技术问题"
    };
    return statusMap[status]
  }

  render() {
    return (
      <div className="art-list">
        <div className="content-area">
            {
                this.state.titList.map((item, index)=> {
                  if(item.type === this.props.artType) {
                    return (
                      <div className="title" key={index}>
                        <h1>分类：{item.name}</h1>
                        <p>{item.describe}</p>
                      </div>
                    )
                  }
                })
            }
            {
              this.props.list.length ? '' : <div className="content"><p className="no-data">没有文章哦~ㄟ( ▔, ▔ )ㄏ</p></div> 
            }
            {this.props.list.map((item, index) => {
              return (
                <div className="art-list" key={index}>
                  <div className="article-cons">
                    <div className="art-con">
                      <div className="tit">{ item.tit_art }</div>
                      <div className="article">{ item.con_txt_art }</div>
                      <div className="enter">继续阅读 →</div>
                    </div>
                    <div className="art-bottom">
                      <span className="time">{ item.time_art }</span>
                      <span className="type">{ this.typeFilter(item.type_art) }</span>
                      <span className="time">{ item.read_art }</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
      </div>
    )
  }
}

export default ArtList
