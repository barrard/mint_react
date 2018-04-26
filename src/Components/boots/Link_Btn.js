import React from 'react';
import { Jumbotron, Button } from 'reactstrap';
import {
  Link
} from 'react-router-dom';
class Link_Btn extends Button {
  constructor(props) {
    super(props);
    this.state={
    }
    // this.handleClick = this.handleClick.bind(this)
  }
  // handleClick(){
  //   console.log('click')
  // }onClick={this.handleClick}
  render(){
    console.log('link button')
    console.log(this.props)
    return (
      
      <Link style={{listStyle:'none'}} className="nav_link" to={this.props.link}><Button color={this.props.color}>{this.props.btn_text}
 </Button></Link>



    );    
  }

};

export default Link_Btn;