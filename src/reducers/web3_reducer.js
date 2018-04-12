import toastr from 'toastr'


const web3 = window.web3

export default function reducer(state={
  address:'',balance:'', tokens:[],
  ETH_DATA:{
    peice:400
  },

}, action) {
  switch(action.type){

    case "UI_ERR":{
      try{
        toastr.error(action.e)
      }catch(e){
        console.log('WHYYY???')
        console.log(e)
        toastr.error('Transaction cancled')
      }
      return{...state}
    }

    case "USER_BALANCE":{
      return {...state, balance:(action.balance)}
    }

    // case "USER_ADDRESS":{
    //   return {...state, address:action.payload}
    // }
    case "web3/RECEIVE_ACCOUNT":{
      return {...state, address:action.address}
    }
    case "web3/CHANGE_ACCOUNT":{
      return {...state, address:action.address}
    }

    case 'CURRENT_ETH_PRICE':{
      return {...state, ETH_DATA:action.data}

    }



    


  }

  return state
}