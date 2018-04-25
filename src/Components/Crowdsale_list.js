import React from 'react';
import {connect} from 'react-redux';
import ERC721Crowdsale_abi from './Data/ERC721Crowdsale_abi.js';
import RefundVault_abi from './Data/RefundVault_abi.js';
import utils from './utils/utils.js'
import Time_remaining from './small_components/time_remaining.js'
const web3 = window.web3

class Crowdsale_list extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      current_crowdsale:false,
      to_show:{
        closed:false,
        finalized:true,
        active:true
      }
    }
    this.display_crowdsale_details = this.display_crowdsale_details.bind(this)
    this.mint = this.mint.bind(this)
    this.finalize_crowdsale = this.finalize_crowdsale.bind(this)
    this.handle_show_crowdsale_checkbox = this.handle_show_crowdsale_checkbox.bind(this)
    this.unset_current_crowdsale = this.unset_current_crowdsale.bind(this)
    this.fundBtn = this.fundBtn.bind(this)

  }

  finalize_crowdsale(_acct){
    try{
      console.log(_acct)
      this.props.tokens.token_contract.request_finalization(_acct, (e, r)=>{
        if (e) {console.log(e); this.props.dispatch({type:"UI_ERR", e:e}); return}
        console.log(r)
      })
    }catch(e){
      console.log(e); this.props.dispatch({type:"UI_ERR", e:e}); return
    }


  }

  mint(_amount, _acct){
    console.log(`mint ${_amount} tokens for ${_acct}`)
    this.props.tokens.token_contract.mint_token_lot(_amount, _acct, (e, r)=>{
      if (e) {console.log(e); this.props.dispatch({type:"UI_ERR", e:e}); return}
      console.log(r)
    })
  }

  fund(_amount, _acct){
    console.log(_amount, _acct)
  }

  make_propery_list(){
    console.log('make_propery_list')
    const crowdsale_lists = []
    for(let address in this.props.crowdsales_obj){
      console.log(address)
      crowdsale_lists.push(
        <List_property_element
        to_show={this.state.to_show}      
        name={this.props.crowdsales_obj[address].name}
        hasClosed={this.props.crowdsales_obj[address].hasClosed}
        isFinalized={this.props.crowdsales_obj[address].isFinalized}
        balance={this.props.crowdsales_obj[address].balance}
        onClick={()=>{this.display_crowdsale_details(this.props.crowdsales_obj[address])}}
        key={address} 
        goal={this.props.crowdsales_obj[address].goal}
        price_per_token={this.props.crowdsales_obj[address].price_per_token}
        // is_finished={this.props.crowdsales_obj[address].}
        account={address} />)
    }
    return crowdsale_lists
  }

  display_crowdsale_details(_acct){
    // const crowdsale_details= this.props.crowdsales_obj[_acct]
    // console.log('display_crowdsale_details')
    console.log(_acct)
    console.log(_acct.account)
    var ethRaised = null;
    var openingTime = null;
    var closingTime = null;
    var hasClosed = null;
    var isFinalized = null;

    //make the crowdsale contract obj to call function?
    const ERC721Crowdsale = web3.eth.contract(ERC721Crowdsale_abi)
    const ERC721Crowdsale_contract = ERC721Crowdsale.at(_acct.account)

    ERC721Crowdsale_contract.closingTime((e, r)=>{
      if (e) {console.log(e); this.props.dispatch({type:"UI_ERR", e:e}); return}
      closingTime = r.toNumber()
      console.log('Closing Time = '+closingTime)

    })
    ERC721Crowdsale_contract.openingTime((e, r)=>{
      if (e) {console.log(e); this.props.dispatch({type:"UI_ERR", e:e}); return}
      openingTime = r.toNumber()
      console.log('Opening Time = '+openingTime)

    })
    ERC721Crowdsale_contract.hasClosed((e, r)=>{
      if (e) {console.log(e); this.props.dispatch({type:"UI_ERR", e:e}); return}
      hasClosed = r
      console.log('Has Closed = '+hasClosed)

    })
    ERC721Crowdsale_contract.isFinalized((e, r)=>{
      if (e) {console.log(e); this.props.dispatch({type:"UI_ERR", e:e}); return}
      isFinalized = r
      console.log('Is Finalized = '+isFinalized)

    })
    ERC721Crowdsale_contract.ethRaised((e, r)=>{
      if (e) {console.log(e); this.props.dispatch({type:"UI_ERR", e:e}); return}
      ethRaised = r.toNumber()
      console.log('Eth raised = '+ethRaised)

    })

    var timer = setInterval(()=>{
      if(
        (openingTime === null)||
        (closingTime === null)||
        (hasClosed === null)||
        (isFinalized === null)||
        (ethRaised === null)){
        console.log('NOOOT YEAT')
      console.log({
                  openingTime,
                  closingTime,
                  hasClosed,
                  isFinalized,
                  ethRaised})

        return
      }else{
        console.log({
                    openingTime,
                    hasClosed,
                    isFinalized,
                    ethRaised})
        clearInterval(timer);
        console.log('All done')
        var current_crowdsale = this.state.current_crowdsale
        current_crowdsale = {...current_crowdsale, openingTime,
            closingTime,
            hasClosed,
            isFinalized,
            ethRaised}
        this.setState({
          current_crowdsale,
        })
      }
    }, 200)

    this.setState({
      current_crowdsale:_acct
    })
    // return crowdsale_details
  }

  handle_show_crowdsale_checkbox(type){
    console.log(type)
    var new_state = !this.state.to_show[type]
    var new_showing = {...this.state.to_show}
    this.setState({
      to_show:{
        ...new_showing,
        [type]:new_state
      }

    })
  }

  unset_current_crowdsale(){
    this.setState({
      current_crowdsale:undefined
    })
  }
fundBtn(token_ammount, account_number){
  console.log('fundBtn')
  console.log(`send ${token_ammount} Token(s) to account number: ${account_number}`)

}



  render(){
    var active_arr
    var closed_arr
    var finalized_arr
    const CS_array = ()=>{
      active_arr = [];
      closed_arr = [];
      finalized_arr = [];
      const CS_obj = this.props.crowdsales_obj
      console.log(CS_obj)
      for ( let address in CS_obj ){
        if(CS_obj[address].isFinalized) finalized_arr.push(CS_obj[address])
        else if(CS_obj[address].hasClosed) closed_arr.push(CS_obj[address])
        else active_arr.push(CS_obj[address])
      }
    }
    CS_array()
  const active_sale_count = ()=>{
    return active_arr.length

    // const arr
    // return ()=>{this.props.crowdsales_obj}
  }
  const closed_sale_count= ()=>{
    return closed_arr.length
  }
  const finalized_sale_count= ()=>{
    return finalized_arr.length

  }
    // console.log(this.state)
    // console.log(this.props)
    // console.log(this.state.current_crowdsale)
    return(
      <div className="crowdsale_list_view">
      {this.state.current_crowdsale &&
        <div className="top-right-pannel">
          <div>Crowdsale Details</div>
          <Crowdsale_details 
            unset_current_crowdsale={this.unset_current_crowdsale}
            current_crowdsale={this.state.current_crowdsale.account} 
            // address={this.state.current_crowdsale.account}
            balance={this.state.current_crowdsale.balance}
            wallet_account={this.state.current_crowdsale.wallet_account}
            id={this.state.current_crowdsale.id}
            goal={web3.fromWei(this.state.current_crowdsale.goal, 'ether')}
            token_goal={this.state.current_crowdsale.token_goal}
            ethRaised={this.state.current_crowdsale.ethRaised}
            time_limit={this.state.current_crowdsale.time_limit}
            name={this.state.current_crowdsale.name}
            user_account={this.props.user_account}
            mintBtn={this.mint}
            fundBtn={this.fundBtn}
            openingTime={this.state.current_crowdsale.openingTime}
            closingTime={this.state.current_crowdsale.closingTime}
            hasClosed={this.state.current_crowdsale.hasClosed}
            isFinalized={this.state.current_crowdsale.isFinalized}
            time_remaining={this.state.current_crowdsale.time_remaining}
            finalize={()=>{this.finalize_crowdsale(this.state.current_crowdsale.account)}}

          />
        </div>
      }{!this.state.current_crowdsale &&
        <div className="top-right-pannel">Please slect a crowdsale to see details </div>
      }
        <h3>Crowdsale List</h3>
        <Crowdsale_counters 
          active_sale_count={active_sale_count()}
          closed_sale_count={closed_sale_count()}
          finalized_sale_count={finalized_sale_count()}
          crowdsale_counter={this.props.crowdsale_counter}
          show_active_crowdsale={this.state.to_show.active}
          show_closed_crowdsale={this.state.to_show.closed}
          show_finalized_crowdsale={this.state.to_show.finalized}
          handle_show_crowdsale_checkbox={this.handle_show_crowdsale_checkbox}
        />
        {this.make_propery_list()}
      </div>
    )
  }
}

const mapStateToProps = (state)=>{
    return{
      // web3:state.web3,
      tokens:state.tokens,
      user_account:state.web3.address,
      crowdsales:state.tokens.crowdsales,
      crowdsale_counter:state.crowdsale._crowdsale_counter,
      crowdsales_obj:state.crowdsale.crowdsales_obj
    }
  }
export default connect(mapStateToProps)(Crowdsale_list);

const Crowdsale_counters = (props)=>{
  return(
    <div>
      <p>total crowdsales: => {props.crowdsale_counter}</p>
      <span>
        Active 
        <input
          type="checkbox"
          checked={props.show_active_crowdsale}
          onChange={()=>{props.handle_show_crowdsale_checkbox('active')}}
        />
      </span>
      <div className="small-box active_sale">
        {props.active_sale_count} 
      </div>
      <span>
        Closed
        <input
          type="checkbox"
          checked={props.show_closed_crowdsale}
          onChange={()=>{props.handle_show_crowdsale_checkbox('closed')}}
        />
      </span>
      <div className="small-box closed_sale">
        {props.closed_sale_count}
      </div>
      <span>
        Finalized
        <input
          type="checkbox"
          checked={props.show_finalized_crowdsale}
          onChange={()=>{props.handle_show_crowdsale_checkbox('finalized')}}
        />
      </span>
      <div className="small-box finalized_sale">
        {props.finalized_sale_count}
      </div>
    </div>
  )
}

const List_property_element = (props)=>{
  console.log(props)
  var state_of_sale;
  var show = ''

  state_of_sale = 'active_sale'
  if(props.hasClosed && !props.isFinalized) {
    state_of_sale = 'closed_sale'
   show = props.to_show.closed ? '' :  'hidden'

  }
  if(props.isFinalized) {
    state_of_sale = 'finalized_sale'
   show = props.to_show.finalized ? '' :  'hidden'

  }

  if(state_of_sale === 'active_sale'){
   show = props.to_show.active ? '' :  'hidden'
  }

  const tokens_needed_to_sell = ()=>{
    if(props.ethRaised == 0) return props.token_goal
    props.token_goal - (props.ethRaised/props.price_per_token)
  }
  const ETH_needed_to_go = ()=>{
    // console.log(props.goal)
    // console.log(props.ethRaised)
   return (props.goal - props.ethRaised)
  }

  return(
    <div className={`red_border ${show} ${state_of_sale}`}>
      <div className="crowdsale_list_name"
      onClick={props.onClick}
      >{props.name}</div>

      <span>Token Balance= {props.balance}</span>
      <br/>
      <span>Goal= {web3.fromWei(props.goal,'ether')} ETH</span>
      <br/>
      <span>price_per_token= {web3.fromWei(props.price_per_token,'ether')} ETH</span>
      <div>
        Percentages....    <br/>
        Lets look at a few things     <br/>

      </div>
  </div>
  )
}



const Crowdsale_details = (props)=>{
  console.log(props)
  const wallet_account = props.wallet_account;
  const user_account = props.user_account;
  const hasClosed = props.hasClosed
  const tokens_needed_to_sell = ()=>{
    if(props.ethRaised == 0) return props.token_goal
    props.token_goal - (props.ethRaised/props.price_per_token)
  }

  const ETH_needed_to_go = ()=>{
    // console.log(props.goal)
    // console.log(props.ethRaised)
   return (props.goal - props.ethRaised)
  }

  return(
    <div>
      {utils.close_btn(()=>{
        props.unset_current_crowdsale()
      })}
    <div className="crowdsale_grid">

    <h1>{props.name}</h1>
    <h2>{props.current_crowdsale}</h2>
    <div><h5>Wallet  <span>{props.wallet_account}</span></h5>
         
    </div>

    <Crowdsale_buttons 
      current_crowdsale ={props.current_crowdsale}
      mintBtn ={props.mintBtn}
      hasClosed ={props.hasClosed}
      isFinalized ={props.isFinalized}
      finalize ={props.finalize}
      wallet_account={props.wallet_account}
      user_account={props.user_account}
      fundBtn={props.fundBtn}
    />
    <div>ID: {props.id}</div>

    <div>Tokens available: {props.balance}</div>


    <div>Goal: ${props.goal} ETH</div>

    <div>We need to sell {props.token_goal} Tokens to reach our goal</div>

    <div>We have raised {props.ethRaised} ETH so far</div>
    <div>Started on {utils.format_date_time_stamp(props.openingTime*1000)}</div>
    <div>We have {props.time_limit} Minutes to finish</div>
    <Time_remaining closingTime={props.closingTime} />
    <div>We need to raise {ETH_needed_to_go()} more ETH To reach our goal</div>
    <div>This means we need to sell {tokens_needed_to_sell()} more Tokens</div>
    </div>
    </div>
  )
}

const Crowdsale_buttons = (props)=>{
  if(props.wallet_account == props.user_account && !props.hasClosed ){
    return(<Minting_Buttons account={props.current_crowdsale} mintBtn={props.mintBtn} />)
  }else if(props.hasClosed  && !props.isFinalized){
    var finalized = [<div key={'over'}>This cowdsale is over, but not yet finalized</div>]
    if(props.wallet_account == props.user_account){
      finalized.push(<button key={'final'} onClick={props.finalize}>Finalize</button>)
    }
    console.log('finalized?')
    return (<div>{finalized}</div>)


  }else if(props.hasClosed  && props.isFinalized){
    return (<div>THIS CROWDSALE IS OVER!</div>)
  }else{
    return(<Funding_Buttons account={props.current_crowdsale} fundBtn={props.fundBtn}/>)
  }
}

const Funding_Buttons = (props)=>{
  return(
    <div>  
      <p>Fund this crowdsale</p>
      <button onClick={()=>{props.fundBtn(1, props.account)}}>Buy 1 Token</button>
      <button onClick={()=>{props.fundBtn(10, props.account)}}>Buy 10 Tokens</button>
    </div>
  )
}

const Minting_Buttons = (props)=>{

  return(
    <div>
      <button className="mint_btn mint_10" 
        onClick={()=>{props.mintBtn(10, props.account)}}
        >Mint 10
      </button>
      <button className="mint_btn mint_50" 
        onClick={()=>{props.mintBtn(50, props.account)}}
        >Mint 50
      </button>
      <button className="mint_btn mint_1" 
        onClick={()=>{props.mintBtn(1, props.account)}}
        >Mint 1
      </button>
    </div>
  )
}
