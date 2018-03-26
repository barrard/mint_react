const web3 = window.web3

export default function reducer(state={
  totalSupply:0, ERC721MintableToken_balance:0, 
  // ERC721MintableToken_address:"0xe02f58465c29b9cb8a7b4b3bc4006d3830c54e1f",
  ERC721MintableToken_address:"0xd008982422687e2e005dd931bcefac532e48201d",//Rinkeby
  contract_obj:'', owner:'', prop_token_counter:'', _crowdsale_counter:'', crowdsaleObj:{}

}, action) {
  switch(action.type){


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