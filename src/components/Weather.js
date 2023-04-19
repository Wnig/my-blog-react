import React, { Component } from 'react'
import '../assets/scss/weather.scss'
import fetchJsonp from 'fetch-jsonp'

class Weather extends Component {
  constructor(props) {
    super(props)
    this.state = {
      location: '',
      weather: {
        city: '',
        date: '',
        week: '',
        tem1: '',
        tem2: '',
        win: '',
        win_speed: '',
        tem: '',
        wea: '',
        air: '',
        update_time: '',
      },
    }
  }
  //当组件输出到 DOM 后会执行 componentDidMount()
componentDidMount() {
  this.getLocation()
}
getLocation() {
  var data = {
    key: "FDRBZ-2T7RI-J5MGG-5OOCF-7D7KQ-N4FDM"
  };
  var url = "https://apis.map.qq.com/ws/location/v1/ip"; //这个就是地理位置信息的接口
  data.output = "jsonp";

  fetchJsonp(`${url}?key=${data.key}&output=${data.output}`)
      .then((response)=> {
        return response.json()
      }).then((json) => {
        this.setState({
          location: json.result.ip
        })

        this.getWeather()
      }).catch((err)=> {
        console.log(err)
      })
}

getWeather () {
  // 获取天气
  var data = {
    version: "v61",
    appid: "58527382",
    appsecret: "f6Cz0gZr",
    ip: this.state.location
  };
  var url = `https://tianqiapi.com/api`;
  data.output = "jsonp";

    fetchJsonp(`${url}?version=${data.version}&appid=${data.appid}&appsecret=${data.appsecret}&ip=${data.ip}&output=${data.output}`)
      .then((response)=> {
        return response.json()
      }).then((json) => {
      this.setState({
        weather: json
      })
      // this.state.weather.date = `${this.state.weather.date.substring(5,7)}/${this.weather.date.substring(8, 10)}`
      let weather = this.state.weather
      weather.date = `${json.date.substring(5,7)}/${json.date.substring(8, 10)}`
      this.setState({
        weather
      })

      }).catch((err)=> {
        console.log(err)
      })
}

  render() {
    return (
      <div className="weather">
        <div className="tips">
          <span className="name">{this.state.weather.city}</span>
          <div className="location">
            <p>
              <span className="date">{this.state.weather.date}</span>
              <span className="week">{this.state.weather.week}</span>
            </p>
            <p>
              <span className="tems">
                {this.state.weather.tem1}°~{this.state.weather.tem2}°
              </span>
              <span className="tems">
                {this.state.weather.win}
                {this.state.weather.win_speed}
              </span>
            </p>
          </div>
          <div className="weather-con">
            <span className="tem">{this.state.weather.tem}°</span>
            <span className="wea">{this.state.weather.wea}</span>
            <span className="air">空气质量 : {this.state.weather.air}</span>
          </div>
          <p>更新时间 : {this.state.weather.update_time}</p>
        </div>
      </div>
    )
  }
}

export default Weather
