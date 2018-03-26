import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import reducer from './reducers'
import axios from 'axios';
import { composeWithDevTools } from 'redux-devtools-extension';


const middleware = composeWithDevTools(
  applyMiddleware(thunk, logger)
);

// const middleware = applyMiddleware(thunk, logger)
export default createStore(reducer, middleware)
      // ERC721MintableToken:"0x8D1f10dA2f5A9C2FF4B7fC47e50EF36026F53925"

