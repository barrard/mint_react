import React from 'react';

import Navigation from './Navigation_Component/Navigation'

class Header extends React.Component{
  constructor(props) {
    super(props);
    this.state={
    }
  }



  render(){
    return(
      <div className="header">
        <h1 className="title">{this.props.title}</h1>

        <Navigation />

      </div>
    )
  }
}
export default Header