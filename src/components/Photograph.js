import React, { Component } from 'react'
import '../assets/scss/photograph.scss'

class Photograph extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <div className="photograph">
        <div className="article-cons-photo">
            <div className="art-con">
              <div className="title">
                <h1>相册</h1>
                <p>你是年少的欢喜，倒过来也是你。</p>
              </div>
              <div className="waterfall">
                {
                  this.props.list.map((item, index)=> {
                    return (
                      <div className="item" key={index}>
                        <div className="item-content">
                          <img src={item.photo_url}
                              alt="" />
                          <div className="describe">
                            <p></p>
                            <div className="time">
                              { item.creat_art }
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
              {
                this.props.list.length ? '' :  <div className="no-data"><p>没有照片哦~ㄟ( ▔, ▔ )ㄏ</p></div>
              }
            </div>
          </div>
      </div>
    )
  }
}

export default Photograph
