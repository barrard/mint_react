import toastr from 'toastr'


const web3 = window.web3

export default function reducer(state={
  address:'',balance:'', tokens:[], 

}, action) {
  switch(action.type){

    case "UI_ERR":{
      toastr.error(action.e)
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



    


  }

  return state
}