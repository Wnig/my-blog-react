import React from 'react'
import './assets/scss/reset.scss'
import './App.scss'

import { BrowserRouter as Router, Route } from 'react-router-dom'
import routes from './model/router'

function App() {
  return (
    <div className="App">
      <div>
        <Router>
          {routes.map((route, key) => {
            if (route.exact) {
              return (
                <Route
                  key={key}
                  exact
                  path={route.path}
                  component={route.component}
                />
              )
            } else {
              return (
                <Route
                  key={key}
                  path={route.path}
                  component={route.component}
                />
              )
            }
          })}
        </Router>
      </div>
    </div>
  )
}

export default App
