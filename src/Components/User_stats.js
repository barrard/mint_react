import React from 'react';
import {connect} from 'react-redux';

class User_stats extends React.Component{
  constructor(props) {
    super(props);
    this.state={
    }
    this.set_event_filters = this.set_event_filters.bind(this)
    this.get_events_for = this.get_events_for.bind(this)
    this.handle_filter_input = this.handle_filter_input.bind(this)

  }
  set_event_filters(e){
    console.log(e.target)
    const event = e.target.innerHTML
    console.log('get events for '+event)
    const event_props = {
      Transfers:['_from', '_to', '_tokenId'],
      Approval:['_owner', '_approved', '_tokenId'],
      Seed_Tokes_Minted:['_to',  '_metadata' , '_tokenId'],
      Prop_token_minted:[ 'prop_token_counter',   '_buyer',   '_from',  '_token_id'],
      Crowdsale_initiated:[ 'crowdsale', '_from', '_tokenId'],

    }

    this.setState({
      event:event,
      event_filters:event_props[event]
    })
  }

  get_events_for(event){

    const ERC721MintableToken_contract = this.props.token.contract_obj
     console.log(this.props.address)
     let event_event = ERC721MintableToken_contract[event](
       // {_to:this.props.web3.address}, {fromBlock:0, toBlock:'latest'})
       {}, {fromBlock:"latest", toBlock:'latest'})
     event_event.watch((e, r)=>{
       console.log(event+'_event');
       if(e){
        //TODO log errors
         console.log('error')
         console.log(e)
       }else if (r){
        if(!this.check_block(r)){
          console.log('blocking duplicate')
          return
        }
        //TODO log reulst
         console.log(r)
         //emiting events to store, do listeners(reducers) exist
         this.props.dispatch({
          type:event,
          event:r
         })
       }
     })       
  }

  handle_filter_input(val, filter){
    this.setState({
      [filter+'_input']:val
    })
  }

  render(){
    console.log(this.state)
    let filters = []
    console.log(this.state.event_filters)
    if(this.state.event_filters){
      this.state.event_filters.forEach((filter)=>{
        const el = <Filter_inputs 
                      onChange={(e)=>{this.handle_filter_input(e.target.value, filter)}}
                      key={filters.length} 
                      filter={filter}
                      value={this.state[filter+'_input']}
                    />
        filters.push(el)
        console.log(filters)
      })
    }

    const label = ()=>{
      if (this.state.event){return this.state.event}
      else{ return 'please select an event to view'}

      // this.state.event ? 'list here for' : 'please select an event to view'
    }
    console.log(label())
    const btn = ()=>{
      console.log(filters.length)
      if(filters.length){
        return <Get_events_btn get_events_for={this.get_events_for} />
      }else{
        return 'null'
      } 
    }

    return(
      <div className="user_stats">
        <h3>user data</h3>
        <div className="">
          <span> Account: {this.props.address}</span> <br/>
           <span> Balance: {this.props.balance}</span> 
        </div>
        <div className="user_events_grid">
        <div className="user_events_column">
          <div className="clickable" onClick={this.set_event_filters}><h4>Transfers</h4></div>
          <div className="clickable" onClick={this.set_event_filters}><h4>Approval</h4></div>
          <div className="clickable" onClick={this.set_event_filters}><h4>Seed_Tokes_Minted</h4></div>
          <div className="clickable" onClick={this.set_event_filters}><h4>Prop_token_minted</h4></div>
          <div className="clickable" onClick={this.set_event_filters}><h4>Crowdsale_initiated</h4></div>
        </div>
        <div className="selected_events_list_column">
          <h3>{label()}</h3>
          {filters}
          {btn()}
          
        </div>

        </div>
      </div>
    )
  }
}

const mapStateToProps = (state)=>{
    return{
      token:state.tokens,
      address:state.web3.address,
      balance:state.web3.balance,
    }
  }
export default connect(mapStateToProps)(User_stats)

function Filter_inputs(props){
  return ( 
    <div>
      {props.filter} <input value={props.value} onChange={props.onChange}type="text"/>
    </div>
  )

}

const Get_events_btn = (props)=>{
  return (
    <button onClick={props.get_events_for}>Get events list</button>
  )
}