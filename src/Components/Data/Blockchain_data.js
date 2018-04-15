import React from 'react';
import {connect} from "react-redux";
// import store from '../../store';

import ERC721MintableToken_abi from './ERC721MintableToken_abi.js';
import ERC721Crowdsale_abi from './ERC721Crowdsale_abi.js';
import RefundVault_abi from './RefundVault_abi.js';
import utils from '../utils/utils.js'
import toastr from 'toastr'
import openSocket from 'socket.io-client';
import CCC from './ccc-streamer-util.js'
const socket = openSocket('wss://streamer.cryptocompare.com');



const web3 = window.web3
var ERC721MintableToken_contract;

class Blockchain_data extends React.Component{

  constructor(props){
    super(props);
    if(!web3)return
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
    if(!web3) {toastr.error('No Web3 found'); return;}

    console.log(this.props);
    this.get_balance();
    this.get_ERC721MintableToken_balance();
    // this.testing('prop_token_counter');
    this.get_data_array();
    this.setTokenWatchers();
    this.getAllCrowdsaleObjsdata();
    this.init_wss_data()

  }

  testing(k){
    console.log('Testing works')
    console.log(ERC721MintableToken_contract)
    ERC721MintableToken_contract[k]((e, r)=>{
      console.log('is results?????')
      console.log(e)
      console.log(r)
    })
  }

  init_wss_data(){
    var currentPrice = {};
      // var socket = io.connect('https://streamer.cryptocompare.com/');
      //Format: {SubscriptionId}~{ExchangeName}~{FromSymbol}~{ToSymbol}
      //Use SubscriptionId 0 for TRADE, 2 for CURRENT and 5 for CURRENTAGG
      //For aggregate quote updates use CCCAGG as market
      var subscription = [ '5~CCCAGG~ETH~USD']; //'5~CCCAGG~BTC~USD',
      socket.emit('SubAdd', { subs: subscription });
      socket.on("m", function(message) {
        var messageType = message.substring(0, message.indexOf("~"));
        var res = {};
        if (messageType == CCC.STATIC.TYPE.CURRENTAGG) {
          res = CCC.CURRENT.unpack(message);
          dataUnpack(res);
        }
      });

      var dataUnpack = (data)=>{
        var from = data['FROMSYMBOL'];
        var to = data['TOSYMBOL'];
        var fsym = CCC.STATIC.CURRENCY.getSymbol(from);
        var tsym = CCC.STATIC.CURRENCY.getSymbol(to);
        var pair = from + to;
        // console.log(data);

        if (!currentPrice.hasOwnProperty(pair)) {
          currentPrice[pair] = {};
        }

        for (var key in data) {
          currentPrice[pair][key] = data[key];
        }

        if (currentPrice[pair]['LASTTRADEID']) {
          currentPrice[pair]['LASTTRADEID'] = parseInt(currentPrice[pair]['LASTTRADEID']).toFixed(0);
        }
        currentPrice[pair]['CHANGE24HOUR'] = CCC.convertValueToDisplay(tsym, (currentPrice[pair]['PRICE'] - currentPrice[pair]['OPEN24HOUR']));
        currentPrice[pair]['CHANGE24HOURPCT'] = ((currentPrice[pair]['PRICE'] - currentPrice[pair]['OPEN24HOUR']) / currentPrice[pair]['OPEN24HOUR'] * 100).toFixed(2) + "%";;
        displayData(currentPrice[pair], from, tsym, fsym);
      };

      var displayData = (current, from, tsym, fsym)=>{
        console.log(current);
        this.props.dispatch({
          type:'CURRENT_ETH_PRICE',
          data:current
        })
        var priceDirection = current.FLAGS;
        for (var key in current) {
          if (key == 'CHANGE24HOURPCT') {
            // $('#' + key + '_' + from).text(' (' + current[key] + ')');
          }
          else if (key == 'LASTVOLUMETO' || key == 'VOLUME24HOURTO') {
            // $('#' + key + '_' + from).text(CCC.convertValueToDisplay(tsym, current[key]));
          }
          else if (key == 'LASTVOLUME' || key == 'VOLUME24HOUR' || key == 'OPEN24HOUR' || key == 'OPENHOUR' || key == 'HIGH24HOUR' || key == 'HIGHHOUR' || key == 'LOWHOUR' || key == 'LOW24HOUR') {
            // $('#' + key + '_' + from).text(CCC.convertValueToDisplay(fsym, current[key]));
          }
          else {
            // $('#' + key + '_' + from).text(current[key]);
          }
        }

        // $('#PRICE_' + from).removeClass();
        if (priceDirection & 1) {
          // $('#PRICE_' + from).addClass("up");
        }
        else if (priceDirection & 2) {
          // $('#PRICE_' + from).addClass("down");
        }
        if (current['PRICE'] > current['OPEN24HOUR']) {
          // $('#CHANGE24HOURPCT_' + from).removeClass();
          // $('#CHANGE24HOURPCT_' + from).addClass("up");
        }
        else if (current['PRICE'] < current['OPEN24HOUR']) {
          // $('#CHANGE24HOURPCT_' + from).removeClass();
          // $('#CHANGE24HOURPCT_' + from).addClass("down");
        }
      };


  }

  make_crowdsale_contract(_address){
    const ERC721Crowdsale = web3.eth.contract(ERC721Crowdsale_abi)
    const ERC721Crowdsale_contract = ERC721Crowdsale.at(_address)
    return ERC721Crowdsale_contract;



  }

  get_data_array(){
    const iteratore_counter=0;
    const data_array = [
      'owner',
      'totalSupply',
      'get_my_tokens',
      'get_wei_balance', //getting balance of adderss instead
      "CS_token_counter", 
      "_crowdsale_counter"
      ];
    data_array.forEach((v)=>{
      console.log(v)
      ERC721MintableToken_contract[v]((e, r)=>{
        if(e){
          this.props.dispatch({type:"UI_ERR", e:e})
          console.log(v+':'+e)
        } else{

          console.log(v+':'+r)
          const type = v.toUpperCase()
          this.props.dispatch({type:`ERC721MintableToken_${type}`,[v]:r})
          utils.call_when_done(data_array, iteratore_counter, this.setTokenWatchers())
        }
      })
    })
  }

  get_ERC721MintableToken_balance(){
    web3.eth.getBalance(this.props.token_address,(e, r)=>{
      if(e){console.log(e);this.props.dispatch({type:"UI_ERR", e:e})}
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


        try {//throws error if metamast not logged in
          web3.eth.getBalance(r[0],(e, r)=>{
            if(e){
              console.log(e)
              this.props.dispatch({type:"UI_ERR", e:e})
              return

            }
              const balance = web3.fromWei(r.toNumber(), 'ether')
              toastr.info(`Your Wei Balance: ${balance}`)
              this.props.dispatch({type:"USER_BALANCE", balance:balance})
          })
        }catch(e){
          console.log('error caught')
          console.log(e)
          this.props.dispatch({type:"UI_ERR", e:e})

        }


    })

  }



  setTokenWatchers(){
     const token_events_array = [
       'Transfer'
       ,'Approval'
       ,'Seed_Tokes_Minted'
       ,'Crowdsale_initiated'
       ,'CS_token_minted'
     ]
     console.log(this.props.web3.address)
     token_events_array.forEach((event)=>{
       let event_event = ERC721MintableToken_contract[event](
         // {_to:this.props.web3.address}, {fromBlock:0, toBlock:'latest'})
         {}, {fromBlock:"latest", toBlock:'latest'})
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

     })
     

  }


  get_balanceOf_crowdsale(_acct){
    ERC721MintableToken_contract.balanceOf(_acct, (e, r)=>{
      if(e){
        this.props.dispatch({type:"UI_ERR", e:e})
        console.log(e)
        return
      }else{
        console.log(r)
        this.props.dispatch({
          type:'BALANCE_OF_CROWDSALE', address:_acct, balance:r.toNumber()
        })
      }
    })
  }
  getAllCrowdsaleObjsdata(){
    if(this.props.has_got_all_crowdsales) return
    ERC721MintableToken_contract._crowdsale_counter((e, r)=>{
      const count = r
      console.log('CROWDSALE COUNT LETS GET tHIS mANY '+count)
      this.props.dispatch({type:'HAS_GOT_ALL_CROWDSALES', flag:true})
      console.log('does i have '+this.props.crowdsale_count)
      for ( let x = 0 ; x < count ; x++){
        ERC721MintableToken_contract.get_crowdsale_by_id(x, (e, r)=>{
          if (e) {
            this.props.dispatch({type:"UI_ERR", e:e})
            console.log(e)
            return
          }else{
        //string _name;
        // uint _cap;
        // uint _token_goal;
        // uint _goal;
        // uint _price_per_token;
        // uint _time_limit;
        // uint _id;
        // address _address;
        // bool _visible;
        // string[] _pics;
        // address _wallet_raising_funds;
        // uint _token_id;
            console.log(r)
            const cs_data = [
              '_name','_cap','_token_goal','_goal','_price_per_token',
              '_time_limit','_id','_address','_visible',
              '_wallet_raising_funds','_token_id'
            ]
            var compiled_data ={}
            cs_data.forEach((key, count)=>{
              compiled_data[key]=r[count]
            })
            console.log(compiled_data)
            const name = compiled_data._name;
            const cap = compiled_data._cap.toNumber();
            const token_goal = compiled_data._token_goal.toNumber();
            const goal = compiled_data._goal.toNumber();
            const price_per_token = compiled_data._price_per_token.toNumber();
            const time_limit = compiled_data._time_limit.toNumber();
            const id = compiled_data._id.toNumber();
            const token_id = compiled_data._token_id.toNumber();
            const visible = compiled_data._visible;
            const wallet_account = compiled_data._wallet_raising_funds
            const account = compiled_data._address
            const cs_contract = this.make_crowdsale_contract(account);
            var hasClosed;
            var vault_address;
            var isFinalized;

            cs_contract.hasClosed((e, r)=>{
              if(r) hasClosed=r
                cs_contract.vault((e, r)=>{
                  if(r) vault_address=r
                    cs_contract.isFinalized((e, r)=>{
                      if(r) isFinalized=r
                        this.props.dispatch({
                          type:'CROWDSALE_DATA_OBJ',
                          crowdsale_obj:{
                            name,
                            cap,
                            token_goal,
                            goal,
                            price_per_token,
                            time_limit,
                            id,
                            token_id,
                            visible,
                            wallet_account,
                            account,
                            cs_contract,
                            hasClosed,
                            vault_address,
                            isFinalized}
                        })

                    })

                })


            })



            this.get_balanceOf_crowdsale(compiled_data['_address'])
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
    crowdsale_count:state.crowdsale._crowdsale_counter,
    has_got_all_crowdsales:state.crowdsale.getAllCrowdsaleObjsdata
  }
}


export default connect(mapStateToProps)(Blockchain_data)