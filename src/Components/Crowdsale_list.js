import React from 'react';
import {connect} from 'react-redux';
const web3 = window.web3

class Crowdsale_list extends React.Component{
  constructor(props) {
    super(props);
    this.state={
    }
  }

  make_propery_list(){
    console.log('make_propery_list')
    const crowdsale_lists = []
    this.props.crowdsale_objs.forEach((obj, key)=>{
      crowdsale_lists.push(<List_property_element key={key} account={obj.account} />)
    })
    return crowdsale_lists
  }

  render(){
    console.log(this.props)
    return(
      <div className="crowdsale_list">
        <h3>Crowdsale List</h3>
          <p>total crowdsales: => {this.props.crowdsale_counter}</p>
            <p>SNIPIT dd</p>
            {this.make_propery_list()}
      </div>
    )
  }
}

const mapStateToProps = (state)=>{
    return{
      // web3:state.web3,
      tokens:state.tokens,
      crowdsales:state.tokens.crowdsales,
      crowdsale_counter:state.crowdsale._crowdsale_counter,
      crowdsale_objs:state.crowdsale.crowdsale_obj_array
    }
  }
export default connect(mapStateToProps)(Crowdsale_list);

const List_property_element = (props)=>{
  return(
    <div>
      <a href="#">{props.account}</a>
  </div>
  )
}
