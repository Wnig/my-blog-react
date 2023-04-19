import React, { Component } from 'react'
import '../assets/scss/resume.scss'
import About from '../components/Resume/about'
import Work from '../components/Resume/work'
import Project from '../components/Resume/project'
import Education from '../components/Resume/education'
import Contact from '../components/Resume/contact'
import NavList from '../components/Resume/navlist'
import Mask from '../components/Resume/mask'

class Resume extends Component {
  constructor(props) {
    super(props)
    this.state = {
      indexTab: 0,
      imgType: "",
      isImgShow: false
    }
  }
  componentDidMount() {
  }

  getNavList(res, item) {
    if(item.class === '') {
      this.props.history.push(`/blog`)
    } else {
      this.setState({
        indexTab: item.id
      }, ()=> {
        this.judgeRouter()
      })
    }
  }

  getMask(res, item) {
    this.setState({
      isImgShow: true,
      imgType: item
    })
  }

  closeMask(res, item) {
    this.setState({
      isImgShow: false
    })
  }

  judgeRouter() {
    switch(this.state.indexTab) {
      case 0: return <About></About>
      case 1:  return <Work></Work>
      case 2:  return <Project></Project>
      case 3:  return <Education></Education>
      case 4: return <Contact parent={ this }></Contact>
    }
  }

  render() {
    return (
      <div className="resume">
        <div className="resume-con">
          <h1>MY RESUME</h1>
          <NavList parent={ this }></NavList>
          <div className="content">
            { this.judgeRouter() }
          </div>
        </div>
        <Mask parent={ this } imgType={this.state.imgType} isImgShow={this.state.isImgShow}></Mask>
      </div>
    )
  }
}

export default Resume
