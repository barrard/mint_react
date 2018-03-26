import React, { Component } from 'react';
import {connect} from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

// import { Web3Provider } from 'react-web3';

import Background_img from './Components/background_image.js'
import Top_infobar from './Components/Top_infobar.js';
import Header from './Components/Header'
import User_stats from './Components/User_stats'
import Side_bar from './Components/Side_bar'
import Crowdsale_list from './Components/Crowdsale_list'
// import Blockchain_data from './Components/Data/Blockchain_data'
// import logo from './logo.svg';
import './App.css';
// import 'toastr/build/toastr.min.css'



class App extends Component {
  componentWillMount(){
    // var bc = new Blockchain_data
  }

  render() {
    

    return (
      <Router>
      <div className="container">
      <div id="sound"></div>  

        <Background_img />

        <Top_infobar />

        <Header 
          title="Start a Blockchain Crowdsale"
        />

        <Route exact path='/' component={Side_bar} />
        <Route exact path='/User_stats' component={User_stats} />
        <Route exact path='/Crowdsale_list' component={Crowdsale_list} />

      </div>
      </Router>

    );
  }
}

export default App;
