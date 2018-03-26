export function crowdsale_received_funds(fund_obj){
  return{
    type:"PAYMENT_RECEIVED",
    payload:fund_obj,
  }
}

export function crowdsale_fully_funded(fund_obj){
  return{
    type:"GOAL_REACHED",
    payload:true,
  }
}

export function new_crowdsale_created(crowdsale_obj){
  return{
    type:"NEW_CROWDSALE",
    payload:crowdsale_obj,
  }
}

export function crowdsale_ended(crowdsale_obj){
  return{
    type:"CROWDSALE_END",
    payload:crowdsale_obj,
  }
}