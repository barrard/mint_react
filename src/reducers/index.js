import {combineReducers } from 'redux';

import tokens from './token_reducer'
import web3 from  './web3_reducer'
import crowdsale from './crowdsale_reducer'

export default combineReducers({
  tokens, web3, crowdsale
})