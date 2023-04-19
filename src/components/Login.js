import React, { Component } from 'react'
import { Button, Input } from 'antd'
import { UserOutlined, UnlockOutlined } from '@ant-design/icons'
import logo from '../assets/images/logo.png'
import '../assets/scss/login.scss'
import { login } from "../api/http"

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      formInline: {
        username: "",
        password: ""
      }
    }
  }

  componentDidMount() {
  }

  enterHome() {
    this.props.history.replace(`/`)
  }

  changeUser(e) {
    let formInline = this.state.formInline
    formInline.username = e.target.value
    this.setState({
      formInline
    })
  }

  changePwd(e) {
    let formInline = this.state.formInline
    formInline.password = e.target.value
    this.setState({
      formInline
    })
  }

  onKeyDownInput(e) {
    if (e.keyCode === 13) {
			this.handleSubmit()
		}
  }

  handleSubmit() {
      if(this.state.formInline.username === '') {
        return
      }
      if(this.state.formInline.password === '') {
        return
      }
      let obj = {
        user_art: this.state.formInline.username,
        pwd_art: this.state.formInline.password
      };
      login(obj).then(res => {
        if (res.data.code === 200) {
          sessionStorage.setItem("Access-Token", res.data.token);
          sessionStorage.setItem("user_art", res.data.username);
          // this.$toast(res.data.msg);
          setTimeout(() => {
            this.props.history.go(-1)
          }, 200);
        } 
        // else {
        //   this.$toast(res.data.msg);
        // }
      });
  }

  render() {
    return (
      <div className="login">
        <div className="login-con">
          <img src={logo} alt="" />
          <div className="item">
              <UserOutlined />
              <Input size="large" placeholder="请输入账号" value={this.state.formInline.username} onChange={this.changeUser.bind(this)}/>
          </div>
          <div className="item">
              <UnlockOutlined />
              <Input size="large" placeholder="请输入密码" type="password"  value={this.state.formInline.password} onChange={this.changePwd.bind(this)} onKeyDown={this.onKeyDownInput.bind(this)}/>
          </div>
          <div className="control-btn">
            <Button type="primary" ghost  onClick={this.handleSubmit.bind(this)}>Signin</Button>
            <Button onClick={this.enterHome.bind(this)}>Home</Button>
          </div>
        </div>
        <div className="login-footer">
          <p>❤我不相信所谓的命运，我只相信我自己。❤</p>
          <p>Copyright ©2017 Powered By Wnig 闽ICP备18014223号</p>
        </div>
      </div>
    )
  }
}

export default Login
