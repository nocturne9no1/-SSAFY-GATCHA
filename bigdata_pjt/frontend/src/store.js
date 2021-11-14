// import redux from "redux";
import { createStore } from "redux";

// action- types
const SET_TOKEN = "SET_TOKEN";
const DEL_TOKEN = "DEL_TOKEN";

export const setToken = (token) => {
  // console.log(token)
  return {
    type: SET_TOKEN,
    token
  };
};
export const delToken = () => {
  return {
    type: DEL_TOKEN,
  };
};

// reducer
const tokenState = {
  token: '',
  isLogin: false,
}
const tokenReducer = (state=tokenState, action) => {
  switch(action.type){
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload,
        isLogin: true
      }
    case DEL_TOKEN:
      return {
        ...state,
        token: '',
        isLogin: false,
      }
    default: return state;
  }
}

// store
export const store = createStore(tokenReducer);

// console.log(store.getState())

// store.dispatch(setToken());

// export default store;
