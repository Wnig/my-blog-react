import React, { Component } from 'react'
import qq from '../../assets/images/qq.jpg'
import wx from '../../assets/images/wx.jpg'
import { CloseOutlined } from '@ant-design/icons'

class Mask extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
  }

  toParent(res, item) {
    this.props.parent.closeMask(this, false)
  }

  judgeMask() {
    if(this.props.isImgShow) {
      if(this.props.imgType === 'qq') {
        return (
          <div className="mask">
            <div className="img">
              <div className="close" onClick={this.toParent.bind(this)}>
                <CloseOutlined style={{ fontSize: '16px', color: '#fff' }} />
              </div>
              <img src={qq}
                  alt="" />
            </div>
          </div>
        )
      }

      if(this.props.imgType === 'wx') {
        return (
          <div className="mask">
            <div className="img">
              <div className="close" onClick={this.toParent.bind(this)}>
                <CloseOutlined style={{ fontSize: '16px', color: '#fff' }} />
              </div>
              <img src={wx}
                  alt="" />
            </div>
          </div>
        )
      }
    }
  }

  render() {
    return ( 
      <div>
        {this.judgeMask()}
      </div>
    )
  }
}

export default Mask
