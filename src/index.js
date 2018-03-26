import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import store from './store';


// store.subscribe(() =>{
//   console.log('Store changed', store.getState())
// })
// store.dispatch((dispatcher)=>{
//   dispatcher({type:"TEST_TOKEN"})
//   //to something async
//   dispatcher({type:"TEST_CROWDSALE"})
// })
// store.dispatch({type:"TEST_TOKEN", payload:'KA_CHING'})
// store.dispatch({type:"TEST_CROWDSALE", payload:'Sold!'})

console.log(store.getState())


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
    , document.getElementById('root'));
registerServiceWorker();

console.log(store.getState())

