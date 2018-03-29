import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import reducer from './reducers'
import axios from 'axios';
import { composeWithDevTools } from 'redux-devtools-extension';


// const middleware = composeWithDevTools(
//   // applyMiddleware(thunk, logger)
//   applyMiddleware(thunk)
// );

const middleware = applyMiddleware(thunk, logger)
export default createStore(reducer, middleware)

