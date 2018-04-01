import React from 'react';
import {connect} from 'react-redux';
import toastr from 'toastr'
// import web3 from 'web3'
import utils from './utils/utils'
import kaChing_m4a from './sounds/ka-ching_sound_effect.m4a'
import crowd_cheer_sound from './sounds/small_crowd_cheering_and_clapping.wav.mp3'
import coin_drop from './sounds/COIN_DROPPED_ON_TABLE.mp3';

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
    this.buy_token = this.buy_token.bind(this)
    this.spend_token = this.spend_token.bind(this)
    this.set_time_limit = this.set_time_limit.bind(this)
    this.set_price_per_token = this.set_price_per_token.bind(this)

    
  }

  set_price_per_token(_ether_unit, _sign){
    console.log(this.state)
    const ether = web3.fromWei("1000000000000000000", 'ether')
    const finney = web3.toWei("1", 'finney')
    const microether = web3.toWei("1", 'microether')
    const picoether = web3.toWei("1", 'picoether')

    const finney_ether = web3.fromWei(finney, 'ether')
    const microether_ether = web3.fromWei(microether, 'ether')
    const picoether_ether = web3.fromWei(picoether, 'ether')
    var original_ether_unit = this.state[_ether_unit]

    var original_price_per_token = new web3.BigNumber(this.state.price_per_token);
    var unit;
    var new_price_per_token;
    var new_ether_unit;


    console.log({ether,finney,microether,picoether,})
    console.log({microether_ether,finney_ether,picoether_ether,})

    console.log(_ether_unit)
    console.log(_sign)

    switch(_ether_unit){
      case 'ether': 
        unit = new web3.BigNumber(ether);
        break;
      case 'finney': 
        unit = new web3.BigNumber(finney_ether);
        break;
      case 'microether':
        unit = new web3.BigNumber(microether_ether);
        break;
      case 'picoether':
        unit = new web3.BigNumber(picoether_ether);
        break;
    
    }

    console.log(unit)
    if (_sign == '-'){
      new_price_per_token = original_price_per_token.minus(unit).toNumber()
      if(new_price_per_token < 0) new_price_per_token = original_price_per_token
      new_ether_unit = original_ether_unit - 1
      if(new_ether_unit < 0) new_ether_unit = original_ether_unit

    }else if (_sign == '+'){
      new_price_per_token = original_price_per_token.plus(unit).toNumber()
      new_ether_unit = original_ether_unit + 1

    }

    this.setState({
      price_per_token:new_price_per_token,
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
    console.log(_time_unit, sign)
    console.log([_time_unit])
    console.log(this.state[_time_unit])
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
  






  buy_token(){
    console.log('buy token')
    try{
      web3.eth.sendTransaction({
        from:web3.eth.coinbase,
        to:this.props.tokens.ERC721MintableToken_address,
        value:web3.toWei(1, "ether")
      }, (e, _txHash)=>{
        if(e){
          utils.hide_spinner('#block-spinner')
          this.props.dispatch({type:"UI_ERR", e:e})
          console.log('an error occured')
          console.log(e)
        }else if(_txHash){
          console.log(_txHash)
          utils.playSound(kaChing_m4a);
          utils.call_when_mined(_txHash, ()=>{
            utils.hide_spinner('#block-spinner')
            utils.playSound(coin_drop);
            toastr.info(`Your Token has been delivered`)
            
          })

          toastr.success(_txHash, 'Success! Your token is on it\'s way soon')
          console.log(_txHash)
        }

      })
    }catch(e){
      console.log('error caught')
      console.log(e)
      this.props.dispatch({type:"UI_ERR", e:e})

    }

  }

  spend_token(){
    console.log('spend token')
    try{
      this.props.tokens.token_contract.get_one_OwnerToken_id(this.props.address, (e, r)=>{
        console.log(e)
        console.log(r)
        const token_id = r.toNumber()
        console.log(
{

  crowdsale_name:this.state.crowdsale_name,
  crowdsale_time_limit:this.state.crowdsale_time_limit,
 price_per_token :this.state.price_per_token,
 crowdsale_goal :this.state.crowdsale_goal,
 crowdsale_goal :this.state.crowdsale_goal,
 token_goal :this.state.crowdsale_goal / this.state.price_per_token,
  token_id:token_id,
}
          )
        this.props.tokens.token_contract.spend_CS_Token(
          this.state.crowdsale_name,//name
          this.state.crowdsale_time_limit,//time limit
          web3.toWei(this.state.price_per_token, 'ether'),//price per token
          web3.toWei(this.state.crowdsale_goal, 'ether'),//usign goal for cap
          web3.toWei(this.state.crowdsale_goal, 'ether'),//actual goal in constructor
          this.state.crowdsale_goal / this.state.price_per_token,//token gol
          token_id,//actual token used to create the crowdsale
          (e, txHash)=>{//callback with txHash, hope for no error
          if(e){
            this.props.dispatch({type:"UI_ERR", e:e})
            // toastr.error(e)
            return
          }else{
            utils.call_when_mined(txHash, function(){
            utils.hide_spinner('#block-spinner')
            utils.playSound(crowd_cheer_sound);
            toastr.info(txHash, 'Token '+token_id+' created a crowdsale')

          })

          toastr.success(txHash, 'Success! Your Crowdsale is being created')
          console.log(txHash)
        }

        })
      })
    }catch(e){
      console.log('error caught')
      console.log(e)
      this.props.dispatch({type:"UI_ERR", e:e})

    }


  }

  render(){
    console.log(this.props)
    console.log(this.state)
    const price_per_token = ()=>{
      if( typeof this.state.price_per_token != 'number'){
        return this.state.price_per_token.toNumber()
      }else{
        return this.state.price_per_token
      }
    }

    const token_goal = ()=>{
      return this.state.crowdsale_goal / this.state.price_per_token
    }

    const total_dollars = ()=>{
      if(this.state.crowdsale_goal * this.props.ETH_DATA.PRICE == NaN) return ''
      return this.state.crowdsale_goal * this.props.ETH_DATA.PRICE 
    }
    const dollars_per_token = ()=>{
      console.log(price_per_token() * this.props.ETH_DATA.PRICE)
      return (price_per_token() * this.props.ETH_DATA.PRICE)
    }

    return(
      <div className="side_bar">
        <div id="block-spinner"></div>

        <p>Total ERC271Mintable Tokens: {this.props.tokens.totalSupply}</p>
        <p>Property Tokens: {this.props.tokens.prop_token_counter}</p>
        <p>Create Crowdsale</p>
          <p>First buy a token</p>
        <button onClick={this.buy_token}>Buy Token</button>
        {/*<button onClick="playSound('ka-ching_sound_effect');">Play</button>*/}
        <div id="sound"></div>
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
            <button className="set_time_btn minus" onClick={(e)=>{this.set_price_per_token('ether', '-')}}>-</button>{this.state.ether} ether<button className="set_time_btn plus" onClick={(e)=>{this.set_price_per_token('ether', '+')}}>+</button>
            <button className="set_time_btn minus" onClick={(e)=>{this.set_price_per_token('finney', '-')}}>-</button><span>{this.state.finney}</span> finney<button className="set_time_btn plus" onClick={(e)=>{this.set_price_per_token('finney', '+')}}>+</button>
            <button className="set_time_btn minus" onClick={(e)=>{this.set_price_per_token('microether', '-')}}>-</button><span>{this.state.microether}</span> microether<button className="set_time_btn plus" onClick={(e)=>{this.set_price_per_token('microether', '+')}}>+</button>
            <button className="set_time_btn minus" onClick={(e)=>{this.set_price_per_token('picoether', '-')}}>-</button><span>{this.state.picoether}</span> picoether<button className="set_time_btn plus" onClick={(e)=>{this.set_price_per_token('picoether', '+')}}>+</button>

          </div>
          <div className="crowdsale_input">
            <label htmlFor='token_goal'>Token Goal</label>
            <input
            disabled
              type="text"
              name="token_goal"
              //value={this.state.token_goal}
              //value={this.state.crowdsale_goal / this.state.price_per_token}
              value={token_goal()}
              // onChange={(e)=>{this.setState({token_goal:e.target.value})}}
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
          <button onClick={this.spend_token}>Create Your Crowdsale</button>
        </div>
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


  console.log({ether,finney,microether,picoether,})
  console.log({microether_ether,finney_ether,picoether_ether,})

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
  console.log(props)
  console.log(    format_date_time_remaining(props.minutes))
  return (
    format_date_time_remaining(props.minutes)
  )
}

function format_date_time_remaining(_minutes){
  // var seconds = _seconds_remaining/1000
  var minutes = _minutes
  var hours = minutes/60
  var days = hours/24
  var years = days/365
  // if (minutes < 0 || hours < 0 || days < 0 || years < 0 ) return '0 Days, 0 Hours, 0 Minutes. 0 Seconds'; 

  console.log({
    minutes, hours, days, years
  })

  return `${Math.floor(years)} Years, ${Math.floor(days%365)} Days,  ${Math.floor(hours%24)} Hours, ${Math.floor(minutes%60)} Minutes`
}


// function add(num1, num2) {
//   num1 = num1.split('');
//   num2 = num2.split('');

//   num1 = num1.map(function (num) {
//     return parseInt(num, 10);
//   });

//   num2 = num2.map(function (num) {
//     return parseInt(num, 10);
//   });

//   if (num2.length > num1.length) {
//     return _add(num2, num1);
//   } else {
//     return _add(num1, num2)
//   }
// }

// function _add(num1, num2) {
//   var num1_idx = num1.length-1;
//   var num2_idx = num2.length-1;
//   var remainder = 0;
  
//   for (; num1_idx > -1; num1_idx--, num2_idx--) {
//     var sum = num1[num1_idx] + remainder;

//     if (num2_idx > -1) {
//       sum += num2[num2_idx];
//     }

//     if (sum <= 9 || num1_idx === 0) {
//       remainder = 0;
//       num1[num1_idx] = sum;
//     } else if (sum >= 10) {
//       remainder = 1;
//       num1[num1_idx] = sum - 10;
//     }
    
//     console.log(remainder);
//   }
  
//   return num1.join('');
// }
