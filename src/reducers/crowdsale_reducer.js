import store from '../store';


export default function reducer(state={
  _crowdsale_counter:0, crowdsales_obj:{}
}, action) {
  switch(action.type){

    // case "Seed_Tokes_Minted":{
    //   console.log(action.event)
    //   const 
    //   return {...state, new_Seed_Tokes_Minted:action.event}
    // }

    
    case "BALANCE_OF_CROWDSALE":{
      const _acct = action.address
      const _bal = action.balance
      console.log(_bal)
      console.log(_acct)
      return {...state, 
              crowdsales_obj: {
                ...state.crowdsales_obj,
                  [_acct]:{
                    ...state.crowdsales_obj[_acct],
                    balance:_bal

                  }
              }
      }
    }

    case "ERC721MintableToken__CROWDSALE_COUNTER":{
      const count = action._crowdsale_counter.toNumber()
      return {...state, _crowdsale_counter:count}
    }

    case "CROWDSALE_DATA_OBJ":{
      console.log(action.crowdsale_obj)
      const key = action.crowdsale_obj.account
      return {
        ...state, 
        crowdsales_obj:{
          ...state.crowdsales_obj,
              [key]:action.crowdsale_obj
            
        }
      }
    }



    // case "CROWDSALE_CONTRACT_OBJ":{
    //   console.log(action.crowdsale_address)
    //   console.log(action.crodsale_obj)
    //   const key = action.crowdsale_address
    //   const val = action.crodsale_obj
    //   return {
    //     ...state, 
    //     crowdsale_obj:{
    //       ...state.crowdsale_obj,
    //           [key]:[val]
            
    //     }
    //   }
    // }

    


  }
  return state
}