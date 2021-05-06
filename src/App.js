

//alphavantage api key
//RL8262AMSHINMOF0

import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './home/Home'
import View from './view/View'

export default function App() {
  return (
    <Router>
      
      <div>
        <nav>
          <ul className="header">
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/view">Saved Items</Link>
            </li>
          </ul>
        </nav>
        <div>
          <div><img src="../public/AMZN.svg" alt="amazon"/></div>
          <div><img src="../public/FB.png" alt="facebook"/></div>
          <div><img src="../public/GOOGL.png" alt="google"/></div>
        </div>

        <Switch>
    
          <Route path="/view">
            <View />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}


 