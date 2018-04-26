import React from 'react';
import utils from '../utils/utils'
import toastr from 'toastr'
import crowd_cheer_sound from '../sounds/small_crowd_cheering_and_clapping.wav.mp3'
import { Button } from 'reactstrap';

const web3 = window.web3

class Spend_token_btn extends React.Component{
  constructor(props) {
    super(props);
    this.state={
    }

    this.spend_token = this.spend_token.bind(this)

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
   price_per_token :parseInt(web3.toWei(this.price_per_token(), 'ether')),
   crowdsale_goal :parseInt(web3.toWei(this.state.crowdsale_goal, 'ether')),
   token_goal :Math.ceil(this.state.crowdsale_goal / this.price_per_token()),
    token_id:token_id,
  }
            )
          try{
            this.props.tokens.token_contract.spend_CS_Token(
              this.state.crowdsale_name,//name
              this.state.crowdsale_time_limit,//time limit
              web3.toWei(this.price_per_token(), 'ether'),//price per token
              web3.toWei(this.state.crowdsale_goal, 'ether'),//usign goal for cap
              web3.toWei(this.state.crowdsale_goal, 'ether'),//actual goal in constructor
              Math.ceil(this.state.crowdsale_goal / this.price_per_token()),//token gol
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
          }catch(e){
            console.log('WHHY ????')
            console.log(e)
            this.props.dispatch({type:"UI_ERR", e:e})

          }

        })
      }catch(e){
        console.log('error caught')
        console.log(e)
        this.props.dispatch({type:"UI_ERR", e:e})

      }


    }

  render(){
    return(
      <Button onClick={this.spend_token}>Create Your Crowdsale</Button>

    )
  }
}
export default Spend_token_btn