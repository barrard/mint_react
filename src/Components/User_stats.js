import React from 'react';
import {connect} from 'react-redux';

class User_stats extends React.Component{
  constructor(props) {
    super(props);
    this.state={
    }
  }

  render(){
    return(
      <div className="user_stats">
        <h3>user data</h3>
        <div className="">
          <span> Account: {this.props.address}</span> <br/>
           <span> Balance: {this.props.balance}</span> 
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state)=>{
    return{
      address:state.web3.address,
      balance:state.web3.balance,
    }
  }
export default connect(mapStateToProps)(User_stats)