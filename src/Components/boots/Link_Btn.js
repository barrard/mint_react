import React from 'react';
import { Jumbotron, Button } from 'reactstrap';

class Link_Btn extends Button {
  constructor(props) {
    super(props);
    this.state={
    }
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick(){
    console.log('click')
  }
  render(){
    console.log('link button')
    console.log(this.props)
    return (
      <Button onClick={this.handleClick} color={this.props.color}>{this.props.btn_text}</Button>

    );    
  }

};

export default Link_Btn;