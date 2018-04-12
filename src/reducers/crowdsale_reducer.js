import store from '../store';


export default function reducer(state={
  _crowdsale_counter:0, crowdsales_obj:{}, getAllCrowdsaleObjsdata:false,
  ERC721_CS_creator_address:"0x01ed6f621b628e58cfed4ebcbd62026734d5aac2",//Rinkeby

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
    

   case "HAS_GOT_ALL_CROWDSALES":{
     // const count = action._crowdsale_counter.toNumber()
     return {...state, getAllCrowdsaleObjsdata:action.flag}
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
          [key]:{
            ...action.crowdsale_obj,
            ...state.crowdsales_obj[key],
          }
        }
      }
    }
    


  }
  return state
}