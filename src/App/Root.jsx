import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
// import reduxLogger from 'redux-logger';
import reduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import combineReducers from 'App/combineReducers';

import App from 'App/App';

import 'normalize.css/normalize.css';
import 'react-toastify/dist/ReactToastify.css';

// const store = createStore(
//   combineReducers,
//   composeWithDevTools(applyMiddleware(reduxThunk, reduxLogger))
// );
const store = createStore(
  combineReducers,
  composeWithDevTools(applyMiddleware(reduxThunk))
);

const Root = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default Root;
