import React from 'react';
import Buy_token_btn from './buy_token_btn.js'


class Create_Header extends React.Component{
  constructor(props) {
    super(props);
    this.state={
    }
  }

  render(){
    return(
      <div>
        <h3>{this.props.title}</h3>
        <Buy_token_btn />

      </div>
    )
  }
}
export default Create_Header