import React, { Component } from 'react'
import '../assets/scss/archives.scss'

class Archives extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <div className="archives">
        <div className="article-cons">
            <div className="art-con">
              <div className="tit">归档</div>
              <div className="article">
                {
                  this.props.list.map((item, key)=> {
                    if(item.isYare) {
                      return (
                        <div className="list" key={key}>
                          <div className="year">
                            { item.time_art.substring(0, 4) }
                          </div>
                          <div className="art-link">
                            <div className="link" >
                              { item.tit_art }
                            </div>
                            <span>{ item.time_art.substring(0, 10) }</span>
                          </div>
                        </div>
                      )
                    } else {
                      return (
                        <div className="list" key={key}>
                          <div className="art-link">
                            <div className="link" >
                              { item.tit_art }
                            </div>
                            <span>{ item.time_art.substring(0, 10) }</span>
                          </div>
                        </div>
                      )
                    }
                  })
                }
              </div>
            </div>
          </div>
      </div>
    )
  }
}

export default Archives
