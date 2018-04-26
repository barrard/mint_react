import React from 'react';
import {connect} from 'react-redux';
import toastr from 'toastr'
import utils from './utils/utils'
import Create_Header from './Create_Components/header.js'
import Spend_token_btn from './Create_Components/Spend_token_btn.js'


const web3 = window.web3

class Side_bar extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      price_per_token:0,
      crowdsale_goal:0,
      crowdsale_time_limit:0,
      minute:0,
      hour:0,
      day:0,
      week:0,
      month:0,
      year:0,
      ether:0,
      finney:0,
      picoether:0,
      microether:0,

    }
    this.set_time_limit = this.set_time_limit.bind(this)
    this.set_price_per_token = this.set_price_per_token.bind(this)
    this.token_price_input = this.token_price_input.bind(this)
    this.price_per_token = this.price_per_token.bind(this)

    
  }

  token_price_input(ether_unit, val){
    val = parseInt(val)

    this.setState({
      [ether_unit]:val
    })

  }

  set_price_per_token(_ether_unit, _sign){
    var original_ether_unit = this.state[_ether_unit]
    var new_ether_unit;

    if (_sign == '-'){
      new_ether_unit = original_ether_unit - 1
      if(new_ether_unit < 0) new_ether_unit = original_ether_unit
    }else if (_sign == '+'){
      new_ether_unit = original_ether_unit + 1

    }

    this.setState({
      [_ether_unit]:new_ether_unit
    })

  }

  set_time_limit(_time_unit, sign){
    const minute = 1;
    const hour = 60;
    const day = 1440;
    const week = 10080;
    const month = 43800;
    const year = 525600;

    let original_units_of_time = this.state[_time_unit]
    let original_time = this.state.crowdsale_time_limit
    var new_time;
    var new_units_of_time;
    var unit;
    switch(_time_unit){
      case 'minute': 
        unit = minute;
        break;
      case 'hour': 
        unit = hour;
        break;
      case 'day':
        unit = day;
        break;
      case 'week':
        unit=week;
        break;
      case 'month':
        unit=month;
        break;
      case 'year':
        unit=year;
        break;
  
    }
    if (sign == '-'){
      new_time = original_time - unit
      if(new_time < 0) new_time = original_time
      new_units_of_time = original_units_of_time - 1
      if(new_units_of_time < 0) new_units_of_time = original_units_of_time

    }else if (sign == '+'){
      new_time = original_time + unit
      new_units_of_time = original_units_of_time + 1

    }

    this.setState({
      crowdsale_time_limit:new_time,
      [_time_unit]:new_units_of_time
    })

  }
  





  price_per_token(){
    if(!web3){this.props.dispatch({type:"UI_ERR", e:'There is no Web3.... Check MetaMask'}); return } 
    return web3.fromWei((
            parseInt(web3.toWei(this.state.ether, 'ether'))+
            parseInt(web3.toWei(this.state.finney, 'finney'))+
            parseInt(web3.toWei(this.state.microether, 'microether'))+
            parseInt(web3.toWei(this.state.picoether, 'picoether'))), 'ether');
  }

  render(){
    console.log(this.props)
    console.log(this.state)

    const price_per_token = ()=>{
      return this.price_per_token()
    }


    const token_goal = ()=>{
      var val = Math.ceil(this.state.crowdsale_goal / this.price_per_token())
      console.log(val)
      console.log(typeof val)
      if( isNaN(val))
      console.log(val == NaN)
      console.log(val === NaN)
      console.log(val === 'NaN')
      console.log(val == 'NaN')
      if(isNaN(val)) val = 0 
      return val
    }

    const total_dollars = ()=>{
      if(this.state.crowdsale_goal * this.props.ETH_DATA.PRICE == NaN) return ''
      return this.state.crowdsale_goal * this.props.ETH_DATA.PRICE 
    }
    const dollars_per_token = ()=>{
      var val = price_per_token() * this.props.ETH_DATA.PRICE
      console.log(val=== NaN)
      console.log(typeof val=== NaN)
      console.log(val=== 'NaN')
      if(val === NaN) val = 0
      return val
    }

    return(
      <div className="create-crowdsale-container">
        <div id="block-spinner"></div>
          <Create_Header
            title={`Create a Crowdsale`}
          />
        {this.props.tokens.get_my_tokens.length &&
          <div className='spend_cs_token_contaner'>
            <p>Spend Cowdsale Token</p>
            <div className="crowdsale_input">
              <label htmlFor='crowdsale_name'>Crowdsale name</label>
              <input
                type="text"
                name="crowdsale_name"
                value={this.state.crowdsale_name}
                onChange={(e)=>{this.setState({crowdsale_name:e.target.value})}}
              />
            </div>
            <div className="crowdsale_input">
              <label htmlFor='crowdsale_goal'>Crowdsale Goal (eth)</label>
              <input
                type="number"
                name="crowdsale_goal"
                value={this.state.crowdsale_goal}//TODO ADD IF WE WANT A CAP
                onChange={(e)=>{this.setState({crowdsale_goal:e.target.value})}}
              />
              <span>${total_dollars()}@</span>
              <span>${this.props.ETH_DATA.PRICE} / ETH</span>
            </div>
            <div className="crowdsale_input">
              <label htmlFor='price_per_token'>Price per Token (eth)</label>
              <span>{price_per_token()} eth</span>
              <span> | ${dollars_per_token()}</span>
              <br />                                                                                              
              <button className="set_time_btn minus" onClick={(e)=>{this.set_price_per_token('ether', '-')}}>-</button>
              <input
                type="number"
                name="ether"
                onChange={(e)=>{this.token_price_input('ether', e.target.value)}}
                value={this.state.ether}/>
              ether<button className="set_time_btn plus" onClick={(e)=>{this.set_price_per_token('ether', '+')}}>+</button>
              <button className="set_time_btn minus" onClick={(e)=>{this.set_price_per_token('finney', '-')}}>-</button>
              <input
                type="number"
                name="finney"
                onChange={(e)=>{this.token_price_input('finney', e.target.value)}}
                value={this.state.finney} />
              finney<button className="set_time_btn plus" onClick={(e)=>{this.set_price_per_token('finney', '+')}}>+</button>
              <button className="set_time_btn minus" onClick={(e)=>{this.set_price_per_token('microether', '-')}}>-</button>
              <input
                type="number"
                name="microether"
                onChange={(e)=>{this.token_price_input('microether', e.target.value)}}
                value={this.state.microether}/>
              microether<button className="set_time_btn plus" onClick={(e)=>{this.set_price_per_token('microether', '+')}}>+</button>
              <button className="set_time_btn minus" onClick={(e)=>{this.set_price_per_token('picoether', '-')}}>-</button>
              <input
                type="number"
                name="napicoetherme"
                onChange={(e)=>{this.token_price_input('picoether', e.target.value)}}
                value={this.state.picoether}/>
              picoether<button className="set_time_btn plus" onClick={(e)=>{this.set_price_per_token('picoether', '+')}}>+</button>

            </div>
            <div className="crowdsale_input">
              <label htmlFor='token_goal'>Token Goal</label>
              <input
              disabled
                type="number"
                name="token_goal"
                value={token_goal()}
              />
            </div>
            <div className="crowdsale_input">
              <label htmlFor='crowdsale_time_limit'>Crowdsale Timelimit (min)</label>
              <input
              disabled
                type="number"
                name="crowdsale_time_limit"
                value={this.state.crowdsale_time_limit}
                // onChange={(e)=>{this.setState({crowdsale_time_limit:e.target.value})}}
              />
              <br/>
              <div className="text_time_limit">
                <Time_limit minutes={this.state.crowdsale_time_limit} />
              </div>
              <br/>
              <button className="set_time_btn minus" onClick={(e)=>{this.set_time_limit('minute', '-')}}>-</button>{this.state.minute} minute<button className="set_time_btn plus" onClick={(e)=>{this.set_time_limit('minute', '+')}}>+</button>
              <button className="set_time_btn minus" onClick={(e)=>{this.set_time_limit('hour', '-')}}>-</button><span>{this.state.hour}</span> hour<button className="set_time_btn plus" onClick={(e)=>{this.set_time_limit('hour', '+')}}>+</button>
              <button className="set_time_btn minus" onClick={(e)=>{this.set_time_limit('day', '-')}}>-</button><span>{this.state.day}</span> day<button className="set_time_btn plus" onClick={(e)=>{this.set_time_limit('day', '+')}}>+</button>
              <button className="set_time_btn minus" onClick={(e)=>{this.set_time_limit('week', '-')}}>-</button><span>{this.state.week}</span> week<button className="set_time_btn plus" onClick={(e)=>{this.set_time_limit('week', '+')}}>+</button>
              <button className="set_time_btn minus" onClick={(e)=>{this.set_time_limit('month', '-')}}>-</button><span>{this.state.month}</span> month<button className="set_time_btn plus" onClick={(e)=>{this.set_time_limit('month', '+')}}>+</button>
            </div>
            
          
            <div className="crowdsale_input">
              <label htmlFor='crowdsale_wallet'>Crowdsale Wallet (address)</label>
              <input
              disabled
                type="text"
                name="crowdsale_wallet"
                value={this.props.address}
                onChange={(e)=>{this.setState({crowdsale_wallet:e.target.value})}}
              />
            </div>
            <Spend_token_btn />
          </div>

        }

      </div>
    )
  }
}
const mapStateToProps = (state)=>{
    return{
      tokens:state.tokens,
      address:state.web3.address,
      ETH_DATA:state.web3.ETH_DATA
    }
  }
export default connect(mapStateToProps)(Side_bar);

const Token_price_btns = (props)=>{
  const ether = web3.fromWei("1000000000000000000", 'ether')
  const finney = web3.toWei("1", 'finney')
  const microether = web3.toWei("1", 'microether')
  const picoether = web3.toWei("1", 'picoether')

  const finney_ether = web3.fromWei(finney, 'ether')
  const microether_ether = web3.fromWei(microether, 'ether')
  const picoether_ether = web3.fromWei(picoether, 'ether')


  // console.log({ether,finney,microether,picoether,})
  // console.log({microether_ether,finney_ether,picoether_ether,})

  return (
    <div className="inline">
    <button>1 Ether</button>
    <button>1 Finney ({`${finney_ether} eth`})</button>
    <button>1 Microether ({`${microether_ether} eth`})</button>
    <button>1 Picoether ({`${picoether_ether} eth`})</button>
    </div>
  )
}


const Time_limit = (props)=>{
  // console.log(props)
  // console.log(format_date_time_remaining(props.minutes))
  return (
    format_date_time_remaining(props.minutes)
  )
}

function format_date_time_remaining(_minutes){
  var minutes = _minutes
  var hours = minutes/60
  var days = hours/24
  var years = days/365

  // console.log({
  //   minutes, hours, days, years
  // })

  return `${Math.floor(years)} Years, ${Math.floor(days%365)} Days,  ${Math.floor(hours%24)} Hours, ${Math.floor(minutes%60)} Minutes`
}


