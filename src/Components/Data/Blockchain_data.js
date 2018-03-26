import React from 'react';
import {connect} from "react-redux";
import store from '../../store';

import ERC721MintableToken_abi from './ERC721MintableToken_abi.js';
import ERC721Crowdsale_abi from './ERC721Crowdsale_abi.js';
import RefundVault_abi from './RefundVault_abi.js';
import toastr from 'toastr'

const web3 = window.web3
var ERC721MintableToken_contract;
class Blockchain_data extends React.Component{

  constructor(props){
    super(props);
    // console.log('block chain construcotr')
    // console.log(ERC721MintableToken_abi)
    // console.log(ERC721Crowdsale_abi)
    // console.log(this.state)
    // console.log(props.web3.ERC721MintableToken)
    const ERC721MintableToken = web3.eth.contract(ERC721MintableToken_abi)
    ERC721MintableToken_contract = ERC721MintableToken.at(props.token_address)
    this.props.dispatch({
      type:"ERC721MintableToken_CONTRACT_OBJ", 
      token_obj:ERC721MintableToken_contract, 
    })


    console.log(ERC721MintableToken_contract)

  }

   get_data(){
    console.log(this.props);
    this.get_balance();
    this.get_ERC721MintableToken_balance();
    this.get_data_array();
    this.setTokenWatchers();
    this.getAllCrowdsaleObjsdata();

  }

  make_crowdsale_contract(_address){
    const ERC721Crowdsale = web3.eth.contract(ERC721Crowdsale_abi)
    const ERC721Crowdsale_contract = ERC721Crowdsale.at(_address)

    this.props.dispatch({
      type:"CROWDSALE_CONTRACT_OBJ", 
      crodsale_obj:ERC721Crowdsale_contract, 
      crowdsale_address:_address})

  }

  get_data_array(){
    const data_array = [
      'owner',
      'totalSupply',
      'get_my_tokens',
      'get_wei_balance', //getting balance of adderss instead
      "prop_token_counter", 
      "_crowdsale_counter"
      ];
    data_array.forEach((v, i)=>{
      ERC721MintableToken_contract[v]((e, r)=>{
        if(e){
          console.log(i+':'+e)
        } else{
          // if(i==="owner" || i === "get_wei_balance"){
          //   var owner_item = App.make_owner_item()
          //   $(sidebar_el).append(owner_item)
          // }
          console.log(i+':'+r)
          const type = v.toUpperCase()
          this.props.dispatch({type:`ERC721MintableToken_${type}`,[v]:r})

          // App.data[i]=r
          // $(sidebar_el).append(`<div>${i}: ${r}</div>`)

        }
      })
    })
  }

  get_ERC721MintableToken_balance(){
    web3.eth.getBalance(this.props.token_address,(e, r)=>{
      if(e){console.log(e)}
        const balance = r.toNumber()
        // toastr.info(`Balance: ${balance}`)
        this.props.dispatch({type:"ERC721MintableToken_BALANCE", balance:balance})
    })
  }

  get_balance(){
    web3.eth.getAccounts((e, r)=>{
      if(e) return
        console.log(r)
        this.props.dispatch({type:'web3/RECEIVE_ACCOUNT', address:r[0]})


      web3.eth.getBalance(r[0],(e, r)=>{
        if(e){console.log(e)}
          const balance = web3.fromWei(r.toNumber(), 'ether')
          toastr.info(`Your Wei Balance: ${balance}`)
          this.props.dispatch({type:"USER_BALANCE", balance:balance})
      })
    })

  }



  setTokenWatchers(){
     const token_events_array = [
       // 'Transfer'
       'Approval'
       // ,'Seed_Tokes_Minted'
       // ,'Crowdsale_initiated'
       // ,'Prop_token_minted'
     ]

     token_events_array.forEach((event)=>{
       let event_event = ERC721MintableToken_contract[event](
         {}, {fromBlock:0, toBlock:'latest'})
       event_event.watch((e, r)=>{
         console.log(event+'_event');
         if(e){
          //TODO log errors
           console.log('error')
           console.log(e)
         }else if (r){
          //TODO log reulst
           console.log(r)
           //emiting events to store, do listeners(reducers) exist
           this.props.dispatch({
            type:event,
            event:r
           })
         }
       })

     })
     

  }

  getAllCrowdsaleObjsdata(){
    ERC721MintableToken_contract._crowdsale_counter((e, r)=>{
      const count = r
      console.log('CROWDSALE COUNT LETS GET tHIS mANY '+count)
      for ( let x = 0 ; x < count ; x++){
        ERC721MintableToken_contract.get_property_by_id(x, (e, r)=>{
          if (e) {
            console.log(e)
            return
          }else{
            console.log(r)
            const count = r[0].toNumber()
            const account = r[1];
            const visible = r[2];
            const wallet_account = r[3];
            this.props.dispatch({
              type:'CROWDSALE_DATA_OBJ',
              crowdsale_obj:{count, account, visible, wallet_account}
            })
          }
        })
      }

    })
  }

  setCrowdsaleWatcher(_acct){
      const crowdsale_events_array =  [
         ,'TokenPurchase'
         ,'Finalized'
       ]
  }

  setRefundWatcher(_acct){
       const refund_vault_events_array = [
          'Closed'
         ,'RefundsEnabled'
         ,'Refunded'
       ]
  }



  componentDidMount(){
    this.get_data()
    console.log('Block chain mount')
  }

  render(){
    return(
      <div></div>
    )
  }
}

const mapStateToProps = (state)=>{
  return{
    web3:state.web3,
    token_address:state.tokens.ERC721MintableToken_address,
    crowdsale_count:state.crowdsale._crowdsale_counter
  }
}


export default connect(mapStateToProps)(Blockchain_data)