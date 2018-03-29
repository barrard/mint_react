import toastr from 'toastr'

const web3 = window.web3

export default function reducer(state={
  totalSupply:0, ERC721MintableToken_balance:0,  
  Approval_events_count:0, 
  Approval_events_array:[],
  Transfer_events_count:0, 
  Transfer_events_array:[],
  Prop_token_minted_events_count:0, 
  Prop_token_minted_events_array:[],
  Crowdsale_initiated_events_count:0, 
  Crowdsale_initiated_events_array:[],
  get_my_tokens:[],


  // ERC721MintableToken_address:"0x769387d444ff8a4059983186deadcd1ab8e99390",
  ERC721MintableToken_address:"0xd008982422687e2e005dd931bcefac532e48201d",//Rinkeby
  contract_obj:'', owner:'', prop_token_counter:'', _crowdsale_counter:'', crowdsaleObj:{}

}, action) {
  switch(action.type){


    case "Transfer":{
      console.log(action.event)
      const count = state.Transfer_events_count++
      const event_array = state.Transfer_events_array.slice()
      event_array.push(action.event)
      return {...state, 
        latest_Transfer_event:action.event,
        Transfer_events_array:event_array,
        Transfer_events_count:count
      }
    }
    
    case "Approval":{
      console.log(action.event)
      const count = state.Approval_events_count++
      const event_array = state.Approval_events_array.slice()
      event_array.push(action.event)
      return {...state, 
        latest_Approval_event:action.event,
        Approval_events_array:event_array,
        Approval_events_count:count
      }
    }
    
    // case "Seed_Tokes_Minted":{
    //   console.log(action.event)
    //   return {...state, new_Seed_Tokes_Minted:action.event}
    // }
    
    case "Crowdsale_initiated":{
      const token_id = action.event.args._tokenId.toNumber()
      toastr.info(`Token ${token_id} spent`)
      console.log(action.event)
      const count = state.Crowdsale_initiated_events_count++
      const event_array = state.Crowdsale_initiated_events_array.slice()
      event_array.push(action.event)
      return {...state, 
        latest_Crowdsale_initiated_event:action.event,
        Crowdsale_initiated_events_array:event_array,
        Crowdsale_initiated_events_count:count
      }
    }
    

    case "Prop_token_minted":{
      console.log(action.event)
      const _bal = parseInt(state.ERC721MintableToken_balance) + 1
      const count = state.Prop_token_minted_events_count++
      const event_array = state.Prop_token_minted_events_array.slice()
      const my_tokens = state.get_my_tokens;
      if(action.event.args)
      event_array.push(action.event)
      return {...state, 
        latest_Prop_token_minted_event:action.event,
        Prop_token_minted_events_array:event_array,
        Prop_token_minted_events_count:count,
        ERC721MintableToken_balance:_bal
      }
    }



    case "ERC721MintableToken__CROWDSALE_COUNTER":{
      return {...state, _crowdsale_counter:action._crowdsale_counter.toNumber()}
    }
    case "ERC721MintableToken_CONTRACT_OBJ":{
      return {...state, contract_obj:action.token_obj}
    }

    case "ERC721MintableToken_TOTALSUPPLY":{
      return {...state, totalSupply:action.totalSupply.toNumber()}
    }

    case "ERC721MintableToken_OWNER":{
      return {...state, owner:action.owner}
    }


    case "ERC721MintableToken_BALANCE":{
      return {...state, ERC721MintableToken_balance:web3.fromWei(action.balance, 'ether')}
    }

    case "ERC721MintableToken_PROP_TOKEN_COUNTER":{
      console.log('CALL UTILITY FUNCTION HERE')
      var crowdsaleObj:{}
      const count = action.prop_token_counter.toNumber()
      return {...state, prop_token_counter:count}
    }
    case "ERC721MintableToken_GET_MY_TOKENS":{
      console.log('REDUCER GET MY TOKENSSSS')
      // console.log(action.get_my_tokens)
      const my_tokens = action.get_my_tokens.map((i)=>{
        return i.toNumber()
      })
      console.log(my_tokens)

      return {...state, get_my_tokens:my_tokens}
    }




  }
  return state

}


