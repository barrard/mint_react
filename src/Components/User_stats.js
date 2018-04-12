import React from 'react';
import {connect} from 'react-redux';
import {
  Redirect,
  Route,
  Link
} from 'react-router-dom';

import utils from './utils/utils.js'
import toastr from 'toastr'


class User_stats extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      owner_of_token:'',
      get_owner_of_token_input:'0',
      Transfer_filter_inputs:{},
      Approval_filter_inputs:{},
      Seed_Tokes_Minted_filter_inputs:{},
      Prop_token_minted_filter_inputs:{},
      Crowdsale_initiated_filter_inputs:{},
      event_props:{
        Transfer:['_from', '_to', '_tokenId'],
        Approval:['_owner', '_approved', '_tokenId'],
        Seed_Tokes_Minted:['_to',  '_metadata' , '_tokenId'],
        Prop_token_minted:[ 'prop_token_counter',   '_buyer',   '_from',  '_token_id'],
        Crowdsale_initiated:[ 'crowdsale', '_from', '_tokenId'],

      }
    }
    this.set_event_filters = this.set_event_filters.bind(this)
    this.get_events_for = this.get_events_for.bind(this)
    this.handle_filter_input = this.handle_filter_input.bind(this)
    this.get_owner_of_token_input = this.get_owner_of_token_input.bind(this)

  }
  set_event_filters(e){
    console.log(e.target)
    const event = e.target.innerHTML
    console.log('get events for '+event)
    const event_filters = this.state.event_props[event]

    this.setState({
      event:event,
      event_filters:event_filters
    })
  }
//removes _input
  set_for_filter_obj(obj){
    const filter_obj = {}
    for(let k in obj){
      if(obj[k]!=''){
        let key = k.split('_input')[0]
        filter_obj[key]=obj[k]
      }

    }
    return filter_obj
  }

  get_events_for(event){
    if(this.props.token.data_fetching[event]) return
    this.props.dispatch({
      type:"SET_FLAG_data_fetching",
      event:event
    })
    console.log(event)
    console.log(this.state)
    this.props.dispatch({
      type:'CLEAR_'+event,
      event:event
    })
    const ERC721MintableToken_contract = this.props.token.token_contract
     // console.log(this.props.address)
     console.log(event)
     console.log(ERC721MintableToken_contract[event])
     const filter_data = this.state[event+'_filter_inputs']
     const filter_obj = this.set_for_filter_obj(filter_data)
     console.log(filter_obj)
     try{
      let event_event = ERC721MintableToken_contract[event](
        // {_to:this.props.web3.address}, {fromBlock:0, toBlock:'latest'})
        filter_obj, {fromBlock:0, toBlock:'latest'})
      event_event.watch((e, r)=>{
        console.log(event+'_event');
        if(e){
         this.props.dispatch({type:"UI_ERR", e:e})
          console.log('error')
          console.log(e)
        }else if (r){
         if(!utils.check_block(r)){
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
    }catch(e){
      this.props.dispatch({type:"UI_ERR", e:"Check your MetaMask"})

    }
     
  }

  handle_filter_input(val, event, filter){
    console.log('filter input')
    this.props.dispatch({
      type:'RESET_FLAG_data_fetching',
      event:event
    })
    console.log(val)
    console.log(event)
    console.log(filter)
    const event_filters_input_obj = {...this.state[event+`_filter_inputs`]}
    event_filters_input_obj[filter+'_input'] = val
    console.log(event_filters_input_obj)
    this.setState({
      [event+`_filter_inputs`]:event_filters_input_obj
    })
  }

  get_owner_of(_id){
    console.log(`get address of ${_id}`)
    try{
      this.props.token.token_contract.ownerOf(_id, (e, r)=>{
        if(e){
          this.props.dispatch({type:"UI_ERR", e:e})
        }else{
          console.log(r)
          this.setState({
            owner_of_token:r
          })
        }
      })
    }catch(e){
      this.props.dispatch({type:"UI_ERR", e:"Check your MetaMask connection"})

    }

  }
  get_owner_of_token_input(e){
    console.log('token owner of who whaaa')
    const id = e.target.value;
    this.setState({
      get_owner_of_token_input:id
    })
  }

  render(){
    // console.log(this.props.location.pathname.split('/').length)
    console.log(this.state)   // hack to avoid not having an event selected
    if(!this.state.event && this.props.location.pathname.split('/').length>2) return <Redirect to='/User_stats' />;

    const label = ()=>{
      if (this.state.event){return this.state.event}
      else{ return 'please select an event to view'}

      // this.state.event ? 'list here for' : 'please select an event to view'
    }
    // console.log(label())
    const event = this.state.event
    // const btn = ()=>{
    //   console.log(filters.length)
    //   if(filters.length){
    //     return <Get_events_btn get_events_for={this.get_events_for} />
    //   }else{
    //     return 'null'
    //   } 
    // }

    return(
      <div className="user_stats">
        <h3>user data</h3>
        <div className="">
          <span> Account: {this.props.address}</span> <br/>
           <span> Balance: {this.props.balance}</span> 
        </div>
        <div className="get_token_owner">
          Token <input
          className="short_input"
            type="text"
            name="token_id"
            value={this.state.get_owner_of_token_input}
            onChange={this.get_owner_of_token_input}
          />
          <button
            onClick={(e)=>{this.get_owner_of(this.state.get_owner_of_token_input)}}
          >Get Owner of Token:{this.state.get_owner_of_token_input}</button>    
          <span> - {this.state.owner_of_token}</span>
        </div>
        <div className="user_events_grid">
          <div className="user_events_column">
            <Link className="clickable" onClick={this.set_event_filters} to="/User_stats/Transfer"><h4>Transfer</h4></Link>
            <Link className="clickable" onClick={this.set_event_filters} to="/User_stats/Approval"><h4>Approval</h4></Link>
            <Link className="clickable" onClick={this.set_event_filters} to="/User_stats/Seed_Tokes_Minted"><h4>Seed_Tokes_Minted</h4></Link>
            <Link className="clickable" onClick={this.set_event_filters} to="/User_stats/Prop_token_minted"><h4>Prop_token_minted</h4></Link>
            <Link className="clickable" onClick={this.set_event_filters} to="/User_stats/Crowdsale_initiated"><h4>Crowdsale_initiated</h4></Link>
          </div>
        <div className="selected_events_list_column">
          <h3>{label()}</h3>
          <Route path='/User_stats/:stat'  render={(props)=>{
            console.log(props)
            console.log(this.state[props.match.params.stat+'_filter_inputs'])
            return( 
              <div>
                <div>Set your filters, then click the button</div>
                <Filter 
                  event={props.match.params.stat}
                  filters={this.state.event_filters}
                  onChange={this.handle_filter_input}
                  value={this.state[props.match.params.stat+'_filter_inputs']}
                />
                <Get_events_btn onClick={()=>{this.get_events_for(this.state.event)}} />
              </div>
            )
          }}/>
          
        </div>
        <div className="events_readout">readout
          <Events_table 
            headers={this.state.event_filters}
            data={this.props.token[event+'_events_array']}
          />
        </div>

        </div>

      </div>
    )
  }
}

const Events_table = (props)=>{
  const background_color_array=['hsla(170, 50%, 45%, 1)',
                                'hsla(33, 100%, 70%, 1)',
                                'hsla(67, 43%, 22%, 1)',
                                'hsla(67, 43%, 37%, 1)',
                                'hsla(0, 43%, 22%, 1)',
                                'hsla(17, 43%, 37%, 1)',
                                'hsla(0, 100%, 70%, 1)'];
  var color_index=0;
  var background_color_mapper = {}
  const Headers = ()=>{
    const head_array=[]
    if(!props.headers) return  <th>Select an event to view chart</th>
    props.headers.map((head, key)=>{(
      head_array.push( <th key={key}>{head}</th>)
    )})
  return head_array
  }
  const Data = ()=>{
    const data_array=[]
    console.log(props.data)
    if(!props.data) return <tr><td>No Data yet</td></tr>
    props.data.forEach((data_obj, key)=>{
      const row_data = []
      let block_number = data_obj.blockNumber
      let args = data_obj.args
      console.log(data_obj)
      console.log(data_obj.args)
      for(let arg in args){
        console.log(args[arg])
        console.log(typeof args[arg])
        if(typeof args[arg] === 'object'){
          row_data.push(<td>{args[arg].toNumber()}</td>)

        }else if(args[arg].length>20){
          if(!background_color_mapper[args[arg]]){
            console.log('new color')
            background_color_mapper[args[arg]] = background_color_array[color_index]
            color_index++
          } 
          console.log(background_color_mapper)

          let bg = {backgroundColor:background_color_mapper[args[arg]]}
          row_data.push(<td style={bg} className="tiny_text">{args[arg]}</td>)

        }else{
          row_data.push(<td>{args[arg]}</td>)

        }
      }
      data_array.push( <tr key={key}>{row_data}</tr>)
    })
  return data_array
  }
  // console.log(props)
  // console.log(Headers())
  return(<table>
    <thead>
     <tr>{Headers()}</tr>
    </thead>
    <tbody>
      {Data()}
    </tbody>
  </table>
)}

const Filter = (props)=>{
  let filters = []
  if(!props.filters) return(<div></div>)
    props.filters.forEach((filter)=>{
      const val = ()=>{
        if (!props.value[filter+'_input']) {
          return ''
        }else{
          return props.value[filter+'_input']
        }
      }
      const el = <FilterInputs 
                    onChange={props.onChange}
                    key={filters.length} 
                    filter={filter}
                    event={props.event}
                    value={val()}
                  />
      filters.push(el)
    })

  return filters
}

const mapStateToProps = (state)=>{
    return{
      token:state.tokens,
      address:state.web3.address,
      balance:state.web3.balance,
    }
  }
export default connect(mapStateToProps)(User_stats)

function FilterInputs(props){
  return ( 
    <div>
      {props.filter} <input value={props.value} onChange={(e)=>{props.onChange(e.target.value, props.event, props.filter)}} type="text"/>
    </div>
  )

}

const Get_events_btn = (props)=>{
  return (
    <button onClick={props.onClick}>Get events list</button>
  )
}