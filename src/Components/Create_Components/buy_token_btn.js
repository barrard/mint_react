import React from 'react';
import utils from '../utils/utils'
import toastr from 'toastr'
import kaChing_m4a from '../sounds/ka-ching_sound_effect.m4a'
import coin_drop from '../sounds/COIN_DROPPED_ON_TABLE.mp3';
import { Button } from 'reactstrap';


const web3 = window.web3

class Buy_token_btn extends React.Component{
  constructor(props) {
    super(props);
    this.state={
    }

    this.buy_token = this.buy_token.bind(this)
    this.styles = this.styles.bind(this)

  }

  buy_token(){
    console.log('buy token')
    try{
      web3.eth.sendTransaction({
        from:web3.eth.coinbase,
        to:this.props.ERC721MintableToken_address,
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
          // console.log(_txHash)
        }

      })
    }catch(e){
      console.log('error caught')
      console.log(e)
      this.props.dispatch({type:"UI_ERR", e:e})
    }
  }
  styles(){
    return{
      position:'absolute',
      top:'0px',
      right:'15px'
    }
  }
  render(){
    return(
      <Button style={this.styles()} color="success" onClick={this.buy_token}>Buy Token</Button>


    )
  }
}
export default Buy_token_btn