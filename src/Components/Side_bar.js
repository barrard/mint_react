import React from 'react';
import {connect} from 'react-redux';
import toastr from 'toastr'
// import web3 from 'web3'
import utils from './utils/utils'
import kaChing_m4a from '../ka-ching_sound_effect.m4a'
import crowd_cheer_sound from '../small_crowd_cheering_and_clapping.wav.mp3'
import coin_drop from '../COIN_DROPPED_ON_TABLE.mp3';

const web3 = window.web3

class Side_bar extends React.Component{
  constructor(props) {
    super(props);
    this.state={
    }
    this.buy_token = this.buy_token.bind(this)
    this.spend_token = this.spend_token.bind(this)

  }

  buy_token(){
    console.log('buy token')
    web3.eth.sendTransaction({
      from:web3.eth.coinbase,
      to:this.props.tokens.ERC721MintableToken_address,
      value:web3.toWei(1, "ether")
    }, function(e, _txHash){
      if(e){
        utils.hide_spinner('#block-spinner')
        toastr.warning(e, 'Failed to send Ether')
        console.log('an error occured')
        console.log(e)
      }else if(_txHash){
        utils.playSound(kaChing_m4a);
        utils.call_when_mined(_txHash, function(){
          utils.hide_spinner('#block-spinner')
          utils.playSound(coin_drop);
          
        })

        toastr.success(_txHash, 'Success! Your token is on it\'s way soon')
        console.log(_txHash)
      }

    })
  }

  spend_token(){
    console.log('spend token')
    this.props.tokens.contract_obj.get_one_OwnerToken_id(this.props.address, (e, r)=>{
      console.log(e)
      console.log(r)
      this.props.tokens.contract_obj.spend_CS_Token(r, (e, txHash)=>{
        if(e){
          toastr.error(e)
          return
        }else{
          utils.call_when_mined(txHash, function(){
          utils.hide_spinner('#block-spinner')
          utils.playSound(crowd_cheer_sound);
        })

        toastr.success(txHash, 'Success! Your token is on it\'s way soon')
        console.log(txHash)
      }

      })
    })


  }

  render(){
    console.log(this.props)
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

        <p>Spend Cowdsale Token</p>
        <button onClick={this.spend_token}>Create Your Crowdsale</button>
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
