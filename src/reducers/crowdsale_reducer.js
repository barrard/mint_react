import store from '../store';


export default function reducer(state={
  _crowdsale_counter:0, crowdsale_obj_array:[]
}, action) {
  switch(action.type){

    
    case "ERC721MintableToken__CROWDSALE_COUNTER":{
      const count = action._crowdsale_counter.toNumber()
      return {...state, _crowdsale_counter:count}
    }

    case "CROWDSALE_DATA_OBJ":{
      const crowdsale_data_array = state.crowdsale_obj_array.slice()
      crowdsale_data_array.push(action.crowdsale_obj)
      return{...state, crowdsale_obj_array:crowdsale_data_array}
    }



    case "CROWDSALE_CONTRACT_OBJ":{
      console.log(action.crowdsale_address)
      console.log(action.crodsale_obj)
      const key = action.crowdsale_address
      const val = action.crodsale_obj
      return {
        ...state, 
        crowdsale_obj:{
          ...state.crowdsale_obj,
              [key]:[val]
            
        }
      }
    }

    


  }
  return state
}