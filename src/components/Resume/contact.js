import React, { Component } from 'react'

class Contact extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
  }

  toParent(res) {
    this.props.parent.getMask(this, res)
  }

  render() {
    return (
      <div className="my-item">
        <div className="conts">
          <p onClick={this.toParent.bind(this, 'qq')}>QQ : 770225508</p>
          <p onClick={this.toParent.bind(this, 'wx')}>WeChat : xxxibwnig</p>
          <p>
            <a href="mailto:770225508@qq.com">E-mail : 770225508@qq.com</a>
          </p>
        </div>
      </div>
    )
  }
}

export default Contact
