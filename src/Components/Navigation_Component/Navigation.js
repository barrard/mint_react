import React from 'react';
import {
  Link
} from 'react-router-dom';

class Navigation extends React.Component{
  constructor(props) {
    super(props);
    this.state={
    }
  }

  render(){
    return(
      <nav>
        <Link to=""               className="nav-item">Home</Link>
        <Link to="User_stats"     className="nav-item">User Stats</Link>  
        <Link to="Crowdsale_list" className="nav-item">Crowdsale List</Link>  
        <Link to="Footer"         className="nav-item">Footer</Link>  
      </nav>

    )
  }
}
export default Navigation