export function mint_lot_in_process(token_mint_data){
  return{
    type:"MINTING_TOKENS",
    payload:token_mint_data,
  }
}

export function done_mintin_tokens(token_mint_data){
  return{
    type:"MINTING_COMPLETE",
    payload:token_mint_data,
  }
}

export function crowdsale_token_purchased(token_data){
  return{
    type:"CROWDSALE_TOKEN_PURCHASED",
    payload:token_data,
  }
}

export function crowdsale_token_spent(token_data){
  return{
    type:"CROWDSALE_TOKEN_SPENT",
    payload:token_data,
  }
}