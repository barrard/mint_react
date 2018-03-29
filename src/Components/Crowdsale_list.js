import React from 'react';
import {connect} from 'react-redux';
const web3 = window.web3

class Crowdsale_list extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      current_crowdsale:'Please select a crowdsale to view the details'
    }
    this.display_crowdsale_details = this.display_crowdsale_details.bind(this)
    this.mint = this.mint.bind(this)

  }

  mint(_val, _acct){
    console.log(`mint ${_val} tokens for ${_acct}`)
    this.props.tokens.contract_obj.mint_token_lot(_val, _acct, _acct, (e, r)=>{
      console.log(e)
      console.log(r)
    })
  }

  make_propery_list(){
    console.log('make_propery_list')
    const crowdsale_lists = []
    for(let k in this.props.crowdsales_obj){
      console.log(k)
      crowdsale_lists.push(
        <List_property_element
        balance={this.props.crowdsales_obj[k].balance}
        mintBtn={this.mint}
        onClick={()=>{this.display_crowdsale_details(this.props.crowdsales_obj[k])}}
        key={k} 
        account={k} />)
    }
    return crowdsale_lists
  }

  display_crowdsale_details(_acct){
    // const crowdsale_details= this.props.crowdsales_obj[_acct]
    // console.log('display_crowdsale_details')
    console.log(_acct)
    console.log(_acct.account)

    this.setState({
      current_crowdsale:_acct
    })
    // return crowdsale_details
  }

  render(){
    console.log(this.props)
    return(
      <div className="crowdsale_list">
        <h3>Crowdsale List</h3>
          <p>total crowdsales: => {this.props.crowdsale_counter}</p>
            {this.make_propery_list()}

        <div>Crowdsale Details</div>
        <Crodsale_details 
          current_crowdsale={this.state.current_crowdsale.account} 
          // address={this.state.current_crowdsale.account}
          balance={this.state.current_crowdsale.balance}
          wallet_account={this.state.current_crowdsale.wallet_account}
          id={this.state.current_crowdsale.count}
        />

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
      crowdsales_obj:state.crowdsale.crowdsales_obj
    }
  }
export default connect(mapStateToProps)(Crowdsale_list);

const List_property_element = (props)=>{
  return(
    <div>
      <div 
      onClick={props.onClick}
      >{props.account}</div>
      <button 
        onClick={()=>{props.mintBtn(10, props.account)}}
        >Mint 10
      </button>
      <button 
        onClick={()=>{props.mintBtn(50, props.account)}}
        >Mint 50
      </button>
      <button 
        onClick={()=>{props.mintBtn(75, props.account)}}
        >Mint 75
      </button>
      <span>Balance= {props.balance}</span>
  </div>
  )
}

const Crodsale_details = (props)=>{
  return(
    <div>
    <h2>{props.current_crowdsale}</h2>
    <table>
      <thead>
        <tr>
            {/*<th>Account Address</th>*/}
            <th>Balance</th>
            <th>Wallett</th>
            <th>Id</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          {/*<td>props.address</td>*/}
          <td>{props.balance}</td>
          <td>{props.wallet_account}</td>
          <td>{props.id}</td>
        </tr>
      </tbody>
    </table>
    </div>
  )
}
