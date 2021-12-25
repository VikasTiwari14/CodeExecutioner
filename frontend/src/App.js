import React from 'react'
import { MainPage } from './MainPage/MainPage'
import Login from "./Login/Login"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

const App = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/main-page"><MainPage/> </Route>
          <Route exact path="/"><Login /></Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App
