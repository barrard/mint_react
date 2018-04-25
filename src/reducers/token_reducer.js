import toastr from 'toastr'

const web3 = window.web3

export default function reducer(state={
  Approval_events_count:0, 
  Approval_events_array:[],
  Crowdsale_initiated_events_count:0, 
  Crowdsale_initiated_events_array:[],
  ERC721MintableToken_balance:0,  
  get_my_tokens:[],
  Prop_token_minted_events_count:0, 
  Prop_token_minted_events_array:[],
  Seed_Tokes_Minted_count:0, 
  Seed_Tokes_Minted_events_array:[],
  Transfer_events_count:0, 
  Transfer_events_array:[],
  totalSupply:0,

  data_fetching:{
    Transfer:false,
    Approval:false,
    Seed_Tokes_Minted:false,
    Prop_token_minted:false,
    Crowdsale_initiated:false,
  },


  ERC721MintableToken_address:"0x9b8b0f1c92337e6e7adfb7fa228f9938eb276bca",//Rinkeby
  // ERC721MintableToken_address:"0x3d3Dd4E13674cC2c59E8684d6d818510cCEdc6cB",//OldRinkeby
  // ERC721MintableToken_address:"0xd008982422687e2e005dd931bcefac532e48201d",//OldRinkeby
  token_contract:'', owner:'', prop_token_counter:'', _crowdsale_counter:'', crowdsaleObj:{}

}, action) {
  switch(action.type){

    case "RESET_FLAG_data_fetching":{
      const event = action.event

      return{...state,
        data_fetching:{
          ...state.data_fetching,
          [event]:false
        }
      }
    }

    case "SET_FLAG_data_fetching":{
      const event = action.event

      return{...state,
        data_fetching:{
          ...state.data_fetching,
          [event]:true
        }
      }
    }


    case "Transfer":{
      console.log(action.event)
      // console.log(state.Transfer_events_count)
      // console.log(state.Transfer_events_count++)
      const count = state.Transfer_events_count+1
      const event_array = state.Transfer_events_array.slice()
      event_array.push(action.event)
      // console.log(count)
      return {...state, 
        latest_Transfer_event:action.event,
        Transfer_events_array:event_array,
        Transfer_events_count:count
      }
    }
    
    case "Approval":{
      console.log(action.event)
      const count = state.Approval_events_count+1
      const event_array = state.Approval_events_array.slice()
      event_array.push(action.event)
      // console.log(count)
      return {...state, 
        latest_Approval_event:action.event,
        Approval_events_array:event_array,
        Approval_events_count:count
      }
    }
    
    case "Seed_Tokes_Minted":{
      console.log(action.event)
      const count = state.Seed_Tokes_Minted_count+1
      const event_array = state.Seed_Tokes_Minted_events_array.slice()
      event_array.push(action.event)
      return {...state, 
        latest_Crowdsale_initiated_event:action.event,
        Seed_Tokes_Minted_events_array:event_array,
        Seed_Tokes_Minted_count:count
      }
    }
    
    case "Crowdsale_initiated":{
      const token_id = action.event.args._tokenId.toNumber()
      // toastr.info(`Token ${token_id} spent`)
      console.log(action.event)
      const count = state.Crowdsale_initiated_events_count+1
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
      const count = state.Prop_token_minted_events_count+1
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


    case "CLEAR_Transfer":{
      console.log(action.event)
      const count = 0
      const event_array = [] 
      return {...state, 
        Transfer_events_array:event_array,
        Transfer_events_count:count
      }
    }
    
    case "CLEAR_Approval":{
      const count = 0
      const event_array = [] 
      return {...state, 
        Approval_events_array:event_array,
        Approval_events_count:count
      }
    }
    
    case "CLEAR_Seed_Tokes_Minted":{
      const count = 0
      const event_array = [] 
      return {...state, 
        Seed_Tokes_Minted_events_array:event_array,
        Seed_Tokes_Minted_count:count
      }
    }
    
    case "CLEAR_Crowdsale_initiated":{
      const count = 0
      const event_array = [] 
      return {...state, 
        Crowdsale_initiated_events_array:event_array,
        Crowdsale_initiated_events_count:count
      }
    }
    

    case "CLEAR_Prop_token_minted":{
      console.log(action.event)
      const count = 0
      const event_array = [] 
      return {...state, 
        Prop_token_minted_events_array:event_array,
        Prop_token_minted_events_count:count,
      }
    }



    case "ERC721MintableToken__CROWDSALE_COUNTER":{
      return {...state, _crowdsale_counter:action._crowdsale_counter.toNumber()}
    }
    case "ERC721MintableToken_CONTRACT_OBJ":{
      return {...state, token_contract:action.token_obj}
    }

    case "ERC721MintableToken_TOTALSUPPLY":{
      console.log('Totl supply')
      console.log(action)
      return {...state, totalSupply:action.totalSupply.toNumber()}
    }

    case "ERC721MintableToken_OWNER":{
      return {...state, owner:action.owner}
    }


    case "ERC721MintableToken_BALANCE":{
      return {...state, ERC721MintableToken_balance:web3.fromWei(action.balance, 'ether')}
    }

    case "ERC721MintableToken_PROP_TOKEN_COUNTER":{
      console.log('PROP_TOKEN_COUNTER')
      const count = action.prop_token_counter.toNumber()
      console.log(count)
      var crowdsaleObj:{}
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


