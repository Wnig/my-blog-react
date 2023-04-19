import React, { Component } from 'react'
import '../assets/scss/header.scss'

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: ''
    }
  }
  componentDidMount() {
    if (sessionStorage.getItem("user_art")) {
      this.setState({
        username: sessionStorage.getItem("user_art")
      })
    }
  }

  goParentLogin() {
    this.props.parent.goLogin(this, this.state.username)
  }

  isManage() {
    if(this.props.linkPath.path === '/manage') {
      return (
        <div>
          <strong onClick={this.goParentBlog.bind(this)}>
            Blog
          </strong>
          <strong className="strong">Wnig's</strong>
          <strong>Back</strong>
        </div>
      )
    }
  }

  goParentBlog() {
    this.props.parent.goBlog(this)
  }

  render() {
    return (
      <div className="header">
        <img className="bg"
              src={ this.props.infoObj.header_url }
            alt="" />
        <div className="header-con">
          <div className="login-ico" onClick={this.goParentLogin.bind(this)}>
          { this.state.username ? this.state.username : "登录" }
          </div>
          { this.isManage() }
          <span className="sign">{ this.props.infoObj.sign }</span>
        </div>
      </div>
    )
  }
}

export default Header
