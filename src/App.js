import React, { Component } from 'react';
// import {connect} from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

// import { Web3Provider } from 'react-web3';

import Background_img from './Components/background_image.js'
import Tokens from './Components/Tokens.js';
import Navigation from './Components/Navigation'
import Search from './Components/Search'
import Create from './Components/Create'
import Home from './Components/Home'
import Crowdsale_list from './Components/Crowdsale_list'
import { Container, Row, Col } from 'reactstrap';

// import Blockchain_data from './Components/Data/Blockchain_data'
// import logo from './logo.svg';
import './App.css';
// import 'toastr/build/toastr.min.css'

import BC_Data from './Components/Data/Blockchain_data';

        


class App extends Component {
  componentWillMount(){
    // var bc = new Blockchain_data
  }

  render() {
    

    return (
      <Router basename={'mint_crowdsale'}>
      <div className="container">
      <BC_Data /> {/* Blockchain Data lives here */}
      <div id="sound"></div> {/* to enable the sounds for events */}  

        <Background_img />
        <Container>
        <Row>
{/*          <Col xs={12}>
            <Top_infobar />
          </Col>*/}
          <Col xs={12}>
          <Navigation />
          </Col>
          <Col xs={12}>
            <Route exact path='/' component={Home} />
            <Route exact path='/Create' component={Create} />
            <Route exact path='/Tokens' component={Tokens} />
            <Route  path='/Search' component={Search} />
          </Col>
        </Row>
        </Container>
      </div>
      </Router>

    );
  }
}

export default App;
