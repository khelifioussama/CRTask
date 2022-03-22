import {applyMiddleware, compose, createStore, Store} from 'redux';
import thunk from 'redux-thunk';

import {RootAction, rootReducer, RootState} from './rootReducer';
import {ThunkDispatch} from '@reduxjs/toolkit';

const middlewares = [thunk];
/* 
Property '__REDUX_DEVTOOLS_EXTENSION_COMPOSE__' does not exist on type 'Window & typeof globalThis
*/
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store: Store<RootState, RootAction> = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middlewares)),
);

export type AppDispatch = ThunkDispatch<RootState, unknown, RootAction>;
