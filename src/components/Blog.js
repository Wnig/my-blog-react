import React, { Component } from 'react'

import { Pagination } from 'antd'

import '../assets/scss/blog.scss'
import Header from '../components/Header'
import Footer from '../components/Footer'
import NavList from '../components/NavList'
import ArtList from '../components/ArtList'
import Photograph from '../components/Photograph'
import Archives from '../components/Archives'
import About from '../components/About'

import { getBlogInfo, artList, getBlogPhotoInfo, artsList, counter } from "../api/http"

class Blog extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [],
      pageNum: 1,
      pageSize: 5,
      total: 0,
      pageList: 0,
      type_art: '',
      status_art: 1,
      artType: '',
      linkType: 'blog',
      infoObj: {},
      defaultCurrent: 1,
      infoVis: {
        totalVis: 0,
        visitors: 0
      },
      linkPath: ''
    }
  }
  componentDidMount() {
    this.getInfo()
    this.getCounter()
    this.getArtList()
    this.setState({
      linkPath: this.props.match
    })
  }

  getInfo () {
    getBlogInfo().then(res => {
      if (res.data.code === 200) {
        this.setState({
          infoObj: res.data.result[0],
        })
      } 
    })
  }

  getArtList () {
    let obj = {
      pageNum: this.state.pageNum,
      pageSize: this.state.pageSize,
      status_art: this.state.status_art,
      type_art: this.state.type_art
    };
    artList(obj)
      .then(res => {
        if (res.data.code === 200) {
          this.setState({
            list: res.data.result,
            total: res.data.total,
            pageList: Math.ceil(this.state.total / this.state.pageSize)
          })
        }
      })
      .catch(data => {
        console.log(data);
      })
      .finally(() => {
      });
  }

  getBlogPhoto () {
    this.loadShows = true;
    let obj = {
      pageNum: this.state.pageNum,
      pageSize: this.state.pageSize
    };
    getBlogPhotoInfo(obj)
      .then(res => {
        if (res.data.code === 200) {
          this.setState({
            list: res.data.result,
            total: res.data.total
          })
        }
      })
      .catch(data => {
        console.log(data);
      })
      .finally(() => {
      });
  }

  getAll () {
    let obj = {
      status_art: this.state.status_art
    };
    artsList(obj)
      .then(res => {
        if (res.data.code === 200) {
          let list = res.data.result;
          let yare = null;
          let month = null;
          let date = null;
          for (let i = 0; i < list.length; i++) {
            if (i === 0) {
              list[i].isYare = true;
              list[i].isMonth = true;
              list[i].isDate = true;
              yare = list[i].time_art.substring(0, 4);
              month = list[i].time_art.substring(5, 7);
              date = list[i].time_art.substring(8, 10);
            } else {
              if (list[i].time_art.substring(0, 4) === yare) {
                list[i].isYare = false;
                if (list[i].time_art.substring(5, 7) === month) {
                  list[i].isMonth = false;
                  if (list[i].time_art.substring(8, 10) === date) {
                    list[i].isDate = false;
                  } else {
                    list[i].isDate = true;
                    date = list[i].time_art.substring(8, 10);
                  }
                } else {
                  list[i].isMonth = true;
                  list[i].isDate = true;
                  month = list[i].time_art.substring(5, 7);
                  date = list[i].time_art.substring(8, 10);
                }
              } else {
                list[i].isYare = true;
                list[i].isMonth = true;
                list[i].isDate = true;
                yare = list[i].time_art.substring(0, 4);
                month = list[i].time_art.substring(5, 7);
                date = list[i].time_art.substring(8, 10);
              }
            }
          }

          this.setState({
            list: list
          })
        }
      })
      .catch(data => {
        console.log(data);
      })
      .finally(() => {
      });
  }

  goLogin (res, username) {
    console.log(res)
    if(!username) {
      this.props.history.push(`/login`)
    }
  }

  getNavList(res, item) {
    this.setState({
      artType: item.type,
      linkType: item.link
    })
    if(item.link === 'blog') {
      this.setState({
        type_art: item.type,
        pageNum: 1
      }, ()=> {
        this.getArtList()
      })
    } else {
      if(item.link === 'home') {
        this.props.history.push(`/`)
      }
      if(item.link === 'photograph') {
        this.getBlogPhoto()
      }
      if(item.link === 'archives') {
        this.getAll()
      }
      if(item.link === 'about') {
        this.getInfo()
      }
      if(item.link === 'resume') {
        this.props.history.push(`/resume`)
      }
      if(item.link === 'manage') {
        this.props.history.push(`/manage`)
      }
    }
    this.judgeRouter()
  }

  // 统计访问人数
  getCounter () {
    counter().then(res => {
      if (res.data.code === 200) {
        let infoVis = this.state.infoVis
        infoVis.visitors = res.data.counter
        infoVis.totalVis = res.data.total
        this.setState({
          infoVis: infoVis
        })
      }
    });
  }

  // 分页
  onPageChange(page, pageSize) {
    this.setState({
      pageNum: page
    }, ()=> {
      this.getArtList()
    })
  }

  judgePagination() {
    if(this.state.linkType === 'blog' || this.state.linkType === 'photograph') {
      return (
        <div className="nav-list">
            <Pagination 
            defaultCurrent={ this.state.pageNum }
            current={ this.state.pageNum }
            pageSize={ this.state.pageSize } 
            total={this.state.total} 
            onChange={ this.onPageChange.bind(this) }/>
          </div> 
      )
    }
  }

  judgeRouter() {
    if(this.state.linkType === 'blog') {
      return (
        <ArtList list={this.state.list} artType={this.state.artType}></ArtList>
      )
    } else {
      if(this.state.linkType === 'photograph') {
        return <Photograph list={this.state.list}></Photograph>
      }
      if(this.state.linkType === 'archives') {
        return <Archives list={this.state.list}></Archives>
      }
      if(this.state.linkType === 'about') {
        return <About infoObj={this.state.infoObj}></About>
      }
    }
  }

  render() {
    return (<div className="blog">
      <Header parent={ this }  infoObj={ this.state.infoObj } linkPath={this.state.linkPath}></Header>
      <div className="blog-con">
        <NavList parent={ this } infoObj={this.state.infoObj}></NavList>
        <div className="right-con">
          { this.judgeRouter() }
          { this.judgePagination()}
          <Footer parent={ this } infoVis={this.state.infoVis}></Footer>
        </div>
      </div>
    </div>)
  }
}

export default Blog
