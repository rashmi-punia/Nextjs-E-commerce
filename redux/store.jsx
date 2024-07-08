import { createStore, applyMiddleware, combineReducers } from "redux";
import {thunk} from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productListReducer } from "@reducers/productReducer";
import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import filterSlice from "@reducers/filterSlice";

const rootreducer = combineReducers({
productList : productListReducer,
filter: filterSlice
})


// const middleware = [thunk]

const makeStore = () =>
  configureStore({
    reducer: rootreducer,
    devTools: process.env.NODE_ENV !== 'production',
  });

// const initialState={
//   productList
// }

const wrapper = createWrapper(makeStore);


// const store = createStore(
//   rootreducer,
//   composeWithDevTools(applyMiddleware(...middleware))
// );

export default wrapper;