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

    }
    this.buy_token = this.buy_token.bind(this)
    this.spend_token = this.spend_token.bind(this)
    this.set_time_limit = this.set_time_limit.bind(this)

    
  }

  set_time_limit(_time, sign){
    const hour = 60;
    const day = 1440;
    const week = 10080;
    const month = 43200;
    const year = 15768000;
    console.log(_time, sign)


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
          toastr.warning('Failed to send Ether')
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
      this.props.tokens.contract_obj.get_one_OwnerToken_id(this.props.address, (e, r)=>{
        console.log(e)
        console.log(r)
        const token_id = r.toNumber()
        this.props.tokens.contract_obj.spend_CS_Token(r, (e, txHash)=>{
          if(e){
            toastr.error(e)
            return
          }else{
            utils.call_when_mined(txHash, function(){
            utils.hide_spinner('#block-spinner')
            utils.playSound(crowd_cheer_sound);
            toastr.info(txHash, 'Token '+token_id+' created a crowdsale')

          })

          toastr.success(txHash, 'Success! Your token is on it\'s way soon')
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
            disabled
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
          </div>
          <div className="crowdsale_input">
            <label htmlFor='price_per_token'>Price per Token (eth)</label>
            <input
            
              type="text"
              name="price_per_token"
              value={this.state.price_per_token}
              onChange={(e)=>{this.setState({price_per_token:e.target.value})}}
            />
          </div>
          <div className="crowdsale_input">
            <label htmlFor='token_goal'>Token Goal</label>
            <input
            disabled
              type="text"
              name="token_goal"
              //value={this.state.token_goal}
              value={this.state.crowdsale_goal / this.state.price_per_token}
              onChange={(e)=>{this.setState({token_goal:e.target.value})}}
            />
          </div>
          <div className="crowdsale_input">
            <label htmlFor='crowdsale_time_limit'>Crowdsale Timelimit (min)</label>
            <input
              type="number"
              name="crowdsale_time_limit"
              value={this.state.crowdsale_time_limit}
              onChange={(e)=>{this.setState({crowdsale_time_limit:e.target.value})}}
            />
            <br/>
            <button className="set_time_btn minus" onClick={(e)=>{this.set_time_limit('hour', '-')}}>-</button>1 hour<button className="set_time_btn plus" onClick={(e)=>{this.set_time_limit('hour', '+')}}>+</button>
            <button className="set_time_btn minus" onClick={(e)=>{this.set_time_limit('day', '-')}}>-</button>1 day<button className="set_time_btn plus" onClick={(e)=>{this.set_time_limit('day', '+')}}>+</button>
            <button className="set_time_btn minus" onClick={(e)=>{this.set_time_limit('week', '-')}}>-</button>1 week<button className="set_time_btn plus" onClick={(e)=>{this.set_time_limit('week', '+')}}>+</button>
            <button className="set_time_btn minus" onClick={(e)=>{this.set_time_limit('month', '-')}}>-</button>1 month<button className="set_time_btn plus" onClick={(e)=>{this.set_time_limit('month', '+')}}>+</button>
            <button className="set_time_btn minus" onClick={(e)=>{this.set_time_limit('year', '-')}}>-</button>1 year<button className="set_time_btn plus" onClick={(e)=>{this.set_time_limit('year', '+')}}>+</button>
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
      address:state.web3.address
    }
  }
export default connect(mapStateToProps)(Side_bar);
