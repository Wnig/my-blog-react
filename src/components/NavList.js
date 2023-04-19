import React, { Component } from 'react'
import '../assets/scss/navlist.scss'

class NavList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isAdmin: false,
      nowIndex: 1,
      navData: [
        {
          name: "Home",
          link: "home",
          type: ""
        },
        {
          name: "All",
          link: "blog",
          type: ''
        },
        {
          name: "Daily",
          link: "blog",
          type: 1
        },
        {
          name: "Accumulate",
          link: "blog",
          type: 2
        },
        {
          name: "Professional",
          link: "blog",
          type: 3
        },
        {
          name: "Photograph",
          link: "photograph",
          type: ""
        },
        {
          name: "Archives",
          link: "archives",
          type: ""
        },
        {
          name: "About",
          link: "about",
          type: ""
        },
        {
          name: "Resume",
          link: "resume",
          type: ""
        },
        {
          name: "Manage",
          link: "manage",
          type: ""
        }
      ]
    }
  }

  componentDidMount() {
    if (sessionStorage.getItem("Access-Token")) {
      this.setState({
        isAdmin: true
      })
    }
  }

  toParent(item, ind) {
    this.setState({
      nowIndex: ind
    })
    this.props.parent.getNavList(this, item)
  }

  getNavListItem() {
    this.state.navData.map((item, key)=> {
      return (<p key={key} className={this.state.nowIndex === key ? 'sel-item': ''} onClick={this.toParent.bind(this, item, key)}>
            <span>
            {item.name}
            </span>
          </p>)
        })
  }

  render() {
    return (
      <div className="nav">
        <div className="left-con">
        <div className="myheader">
          <img className="my-header"
               src={ this.props.infoObj.img_url}
               alt="" />
        </div>
        <div className="info-list">
          <strong>{ this.props.infoObj.blog_name }</strong>
          <span>{ this.props.infoObj.blog_sign }</span>
        </div>
        <div className="nav">
          {
            this.state.navData.map((item, key)=> {
              if(this.state.isAdmin) {
                return (<p key={key} className={this.state.nowIndex === key ? 'sel-item': ''} onClick={this.toParent.bind(this, item, key)}>
                      <span>
                      {item.name}
                      </span>
                    </p>)
              } else if(item.name !== 'Manage') {
                return (<p key={key} className={this.state.nowIndex === key ? 'sel-item': ''} onClick={this.toParent.bind(this, item, key)}>
                      <span>
                      {item.name}
                      </span>
                    </p>)
              }
            })
          }
        </div>
      </div>
      </div>
    )
  }
}

export default NavList
